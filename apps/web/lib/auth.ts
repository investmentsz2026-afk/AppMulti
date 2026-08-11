import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const secretKey = process.env.JWT_SECRET || 'super-secret-key-change-me';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { id: string }) {
  return await new SignJWT({ sub: payload.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(key);
}

export async function decrypt(input: string): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as { sub: string };
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  
  const payload = await decrypt(session);
  if (!payload?.sub) return null;

  // Fetch full user data from DB
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      username: true,
      role: true,
      avatar: true,
    }
  });

  if (!user) return null;

  return user;
}

