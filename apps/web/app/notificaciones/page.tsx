import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NotificacionesClient from './NotificacionesClient';

export default async function NotificacionesPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <NotificacionesClient user={session} />;
}
