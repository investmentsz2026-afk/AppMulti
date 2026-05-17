'use server'

import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { error: 'Faltan credenciales' };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: 'Usuario o contraseña incorrectos' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: 'Usuario o contraseña incorrectos' };

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ id: user.id, username: user.username, role: user.role, avatar: user.avatar });
  
  const cookieStore = await cookies();
  cookieStore.set('session', session, { expires, httpOnly: true, path: '/' });
  
  return { success: true };
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
