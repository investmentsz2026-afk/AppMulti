import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BuscarClient from './BuscarClient';

export default async function BuscarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { q = '' } = await searchParams;

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

  if (!currentSessionUser) {
    redirect('/login');
  }

  return <BuscarClient user={currentSessionUser} initialQuery={q} />;
}
