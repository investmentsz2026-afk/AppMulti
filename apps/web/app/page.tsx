import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LandingClient from '@/components/LandingClient';

export default async function LandingPage() {
  const session = await getSession();
  
  if (session) {
    redirect('/dashboard');
  }

  return <LandingClient />;
}
