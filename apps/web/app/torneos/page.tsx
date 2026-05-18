import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TorneosClient from './TorneosClient';

export default async function TorneosPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <TorneosClient user={session} />
  );
}
