'use server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Fetch all users with their wallets
export async function getUsersAction() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        wallet: true,
        stream: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Toggle user statusActive (enable/disable account)
export async function toggleUserStatusAction(userId: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return { error: 'Usuario no encontrado' };
    }

    // Don't disable yourself
    if (user.id === session.id) {
      return { error: 'No puedes desactivar tu propia cuenta de administrador.' };
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { statusActive: !user.statusActive }
    });

    revalidatePath('/admin/users');
    return { success: true, statusActive: updated.statusActive };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Update user role
export async function updateUserRoleAction(userId: string, newRole: 'USER' | 'STREAMER' | 'ADMIN' | 'MODERATOR') {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    // Don't demote yourself
    if (userId === session.id) {
      return { error: 'No puedes cambiar tu propio rol de superusuario.' };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Give or subtract coins from user's wallet
export async function addUserCoinsAction(userId: string, amount: number) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { wallet: true }
    });

    if (!user) {
      return { error: 'Usuario no encontrado' };
    }

    if (!user.wallet) {
      // Create wallet if it somehow doesn't exist
      await prisma.wallet.create({
        data: {
          userId: user.id,
          balance: Math.max(0, amount)
        }
      });
    } else {
      await prisma.wallet.update({
        where: { userId: user.id },
        data: {
          balance: {
            increment: amount
          }
        }
      });
    }

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Fetch real admin stats and lists from database
export async function getAdminStatsAction() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const totalUsers = await prisma.user.count();
    const activeStreams = await prisma.user.count({
      where: { isLive: true }
    });
    
    const wagers = await prisma.gameRoom.aggregate({
      _sum: {
        wager: true
      }
    });
    const totalWagerAmount = wagers._sum.wager || 0;

    // Recent reports
    const recentReports = await prisma.moderationReport.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: { select: { username: true } },
        reported: { select: { username: true } }
      }
    });

    // Top Streamers
    const topStreamers = await prisma.user.findMany({
      where: { role: 'STREAMER' },
      take: 5,
      include: {
        followers: true,
        stream: true
      }
    });

    return {
      totalUsers,
      activeStreams,
      totalWagers: totalWagerAmount,
      recentReports,
      topStreamers: topStreamers.map(s => ({
        username: s.username,
        followersCount: s.followers.length,
        isLive: s.isLive
      }))
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      activeStreams: 0,
      totalWagers: 0,
      recentReports: [],
      topStreamers: []
    };
  }
}

// Resolve user report
export async function resolveReportAction(reportId: string, action: 'ACTION_TAKEN' | 'DISMISSED') {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    await prisma.moderationReport.update({
      where: { id: reportId },
      data: { status: action }
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
