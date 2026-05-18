import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import GamingClient from './GamingClient';

export default async function GamingPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  return <GamingClient user={session} />;
}
