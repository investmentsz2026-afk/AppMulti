import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No session' }, { status: 401 });
    }

    const payload = await decrypt(sessionCookie);
    if (!payload?.sub) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Force-end any active stream for this user
    await prisma.user.update({
      where: { id: payload.sub },
      data: { isLive: false }
    });

    await prisma.stream.updateMany({
      where: { userId: payload.sub },
      data: { isLive: false }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Stream end error:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
