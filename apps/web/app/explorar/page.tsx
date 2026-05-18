import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ExplorarClient from './ExplorarClient';

export default async function ExplorarPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  return <ExplorarClient user={session} />;
}
