'use server'

import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function loginUser(formData: FormData) {
  const emailInput = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!emailInput || !password) return { error: 'Faltan credenciales' };

  const email = emailInput.trim();

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
      // Also fallback search by username
      user = await prisma.user.findUnique({ where: { username: email } });
    }

    if (!user) return { error: 'Usuario o contraseña incorrectos' };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: 'Usuario o contraseña incorrectos' };

    if (user.statusActive === false) {
      return { error: 'Tu cuenta ha sido desactivada por el administrador.' };
    }
  }

  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ id: user.id, username: user.username, role: user.role, avatar: user.avatar });
  
  const cookieStore = await cookies();
  cookieStore.set('session', session, { 
    expires, 
    httpOnly: true, 
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  return { 
    success: true, 
    user: { id: user.id, username: user.username, role: user.role, avatar: user.avatar } 
  };
}

export async function registerUser(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !username) return { error: 'Todos los campos son obligatorios' };

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });
  if (existing) return { error: 'El nombre de usuario o correo ya está en uso' };

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      wallet: {
        create: { balance: 0 }
      }
    }
  });

  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
