import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginClient from '@/components/LoginClient';

export default async function LoginPage() {
  const session = await getSession();
  
  if (session) {
    redirect('/dashboard');
  }

  return <LoginClient />;
}
