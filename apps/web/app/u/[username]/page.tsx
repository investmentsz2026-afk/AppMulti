import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProfileClient from './ProfileClient';

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { username } = await params;
  const cleanUsername = decodeURIComponent(username).replace('@', '');

  const targetUser = await prisma.user.findUnique({
    where: { username: cleanUsername },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      bio: true,
      cover: true,
      role: true,
      tiktokActive: true,
      tiktokUrl: true,
      instagramActive: true,
      instagramUrl: true,
      youtubeActive: true,
      youtubeUrl: true,
      facebookActive: true,
      facebookUrl: true,
      createdAt: true,
    }
  });

  if (!targetUser) {
    redirect('/dashboard');
  }

  // Refresh sessionUser values from DB to make sure they are up-to-date
  const currentSessionUser = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      avatar: true,
      role: true,
    }
  });

  return <ProfileClient sessionUser={currentSessionUser || session} targetUser={targetUser} />;
}
