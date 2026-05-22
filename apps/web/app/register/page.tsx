import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import RegisterClient from '@/components/RegisterClient';

export default async function RegisterPage() {
  const session = await getSession();
  
  if (session) {
    redirect('/dashboard');
  }

  return <RegisterClient />;
}
