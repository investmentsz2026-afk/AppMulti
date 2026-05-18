import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BattleClient from './BattleClient';

export default async function BatallasPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <BattleClient user={session} />
  );
}
