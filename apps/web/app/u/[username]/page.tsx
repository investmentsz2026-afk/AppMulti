import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient';

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { username } = await params;
  const cleanUsername = decodeURIComponent(username).replace('@', '');

  return <ProfileClient sessionUser={session} targetUsername={cleanUsername} />;
}
