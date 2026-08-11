import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import LoginClient from '@/components/LoginClient';

export default async function LoginPage() {
  const session = await getSession();
  
  if (session) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.id },
        select: { id: true, role: true, statusActive: true }
      });

      if (dbUser && dbUser.statusActive !== false) {
        if (dbUser.role === 'ADMIN') {
          redirect('/admin');
        } else {
          redirect('/dashboard');
        }
      } else {
        const cookieStore = await cookies();
        cookieStore.delete('session');
      }
    } catch (e) {
      const cookieStore = await cookies();
      cookieStore.delete('session');
    }
  }

  return <LoginClient />;
}
