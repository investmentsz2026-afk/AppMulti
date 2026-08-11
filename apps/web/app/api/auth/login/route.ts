import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email: rawEmail, password } = await req.json();

    if (!rawEmail || !password) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 });
    }

    const email = rawEmail.trim();

    // Sudo credentials check
    const isSudo = (email === 'admin' || email === 'admin@livex.com' || email === 'sudo') && (password === 'admin' || password === 'admin123' || password === 'sudo');

    let user;

    if (isSudo) {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: 'admin@livex.com' },
            { username: 'admin' }
          ]
        }
      });

      if (!user) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        user = await prisma.user.create({
          data: {
            username: 'admin',
            email: 'admin@livex.com',
            password: hashedPassword,
            role: 'ADMIN',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
            wallet: {
              create: { balance: 999999 }
            }
          }
        });
      } else if (user.role !== 'ADMIN' || !user.statusActive) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            role: 'ADMIN',
            statusActive: true
          }
        });
      }
    } else {
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.findUnique({ where: { username: email } });
      }

      if (!user) {
        return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
      }

      if (user.statusActive === false) {
        return NextResponse.json({ error: 'Tu cuenta ha sido desactivada por el administrador.' }, { status: 403 });
      }
    }

    const sessionToken = await encrypt({ id: user.id, username: user.username, role: user.role, avatar: user.avatar });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        avatar: user.avatar
      }
    });

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
