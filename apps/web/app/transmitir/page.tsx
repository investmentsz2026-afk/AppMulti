import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TransmitirClient from './TransmitirClient';

export default async function TransmitirPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <TransmitirClient user={session} />
  );
}
