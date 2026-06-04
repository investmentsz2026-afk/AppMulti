import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MensajesClient from '@/app/mensajes/MensajesClient';

export default async function MensajesPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return <MensajesClient sessionUser={session} />;
}
