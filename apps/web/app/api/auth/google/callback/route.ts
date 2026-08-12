import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const host = req.headers.get('host') || '';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/auth/google/callback`;
  const baseUrl = `${protocol}://${host}`;

  if (error || !code) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(`${baseUrl}/login?error=google_denied`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing Google OAuth environment variables');
    return NextResponse.redirect(`${baseUrl}/login?error=server_error`);
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Failed to get access token from Google:', tokenData);
      return NextResponse.redirect(`${baseUrl}/login?error=token_error`);
    }

    // 2. Fetch user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const googleUser = await userRes.json();
    if (!googleUser.email) {
      return NextResponse.redirect(`${baseUrl}/login?error=no_email`);
    }

    const email = googleUser.email.toLowerCase().trim();
    const name = googleUser.name || email.split('@')[0];
    const avatar = googleUser.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    // 3. Find or create user in Database
    let dbUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: email.split('@')[0] }
        ]
      }
    });

    if (!dbUser) {
      // Create new user
      let baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
      if (!baseUsername) baseUsername = 'user';
      let username = baseUsername;
      let count = 1;
      
      // Ensure unique username
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${count}`;
        count++;
      }

      dbUser = await prisma.user.create({
        data: {
          email,
          username,
          password: '', // OAuth user without password
          avatar,
          role: 'USER'
        }
      });
    }

    // 4. Create Session Cookie (JWT)
    const sessionToken = await encrypt({ id: dbUser.id });
    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/'
    });

    // 5. Redirect to Dashboard
    const targetPath = dbUser.role === 'ADMIN' ? '/admin' : '/dashboard';
    return NextResponse.redirect(`${baseUrl}${targetPath}`);

  } catch (err: any) {
    console.error('Error during Google Auth Callback:', err);
    return NextResponse.redirect(`${baseUrl}/login?error=callback_exception`);
  }
}
