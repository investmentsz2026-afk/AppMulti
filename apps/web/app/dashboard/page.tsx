import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './components/DashboardClient';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  // Verify if user actually exists in the database (handles wiped/changed DB instances)
  const dbUser = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      avatar: true,
      role: true,
    }
  });

  if (!dbUser) {
    redirect('/login');
  }

  return (
    <DashboardClient user={dbUser} />
  );
}
