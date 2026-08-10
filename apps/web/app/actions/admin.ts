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

// Toggle user canPost restriction
export async function toggleUserPostRestrictionAction(userId: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { error: 'Usuario no encontrado' };

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { canPost: !user.canPost }
    });

    revalidatePath('/admin/users');
    return { success: true, canPost: updated.canPost };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Toggle user canChat restriction
export async function toggleUserChatRestrictionAction(userId: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { error: 'Usuario no encontrado' };

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { canChat: !user.canChat }
    });

    revalidatePath('/admin/users');
    return { success: true, canChat: updated.canChat };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Fetch all direct messages in database for audit logs
export async function getAllDMsAction() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const dms = await prisma.directMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      }
    });
    return dms;
  } catch (error) {
    console.error('Error fetching DM audit logs:', error);
    return [];
  }
}

// Fetch full conversation between two users
export async function getUserConversationAction(user1Id: string, user2Id: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const dms = await prisma.directMessage.findMany({
      where: {
        OR: [
          { senderId: user1Id, receiverId: user2Id },
          { senderId: user2Id, receiverId: user1Id }
        ]
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      }
    });
    return dms;
  } catch (error) {
    console.error('Error fetching conversation details:', error);
    return [];
  }
}

// Send warning/system notification to a user
export async function sendSystemNotificationAction(userId: string, title: string, message: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    const formattedContent = `Sistema|https://api.dicebear.com/7.x/icons/svg?seed=Alert|⚠️ ${title}: ${message}`;

    await prisma.notification.create({
      data: {
        userId,
        type: 'SYSTEM',
        content: formattedContent,
        link: '/notificaciones'
      }
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// User submits support request/help from profile
export async function submitHelpRequestAction(title: string, message: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    await prisma.moderationReport.create({
      data: {
        reporterId: session.id,
        reportedId: session.id, // Self-ticket
        reason: `[SOPORTE] ${title}`,
        details: message,
        status: 'PENDING'
      }
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Fetch all reports and support tickets for admin
export async function getAdminReportsAndTicketsAction() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const items = await prisma.moderationReport.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: { select: { id: true, username: true, avatar: true } },
        reported: { select: { id: true, username: true, avatar: true } }
      }
    });
    return items;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}

// Admin responds to support ticket and notifies user
export async function respondToTicketAction(ticketId: string, userId: string, replyMessage: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    await prisma.moderationReport.update({
      where: { id: ticketId },
      data: { status: 'ACTION_TAKEN' }
    });

    const formattedContent = `Sistema|https://api.dicebear.com/7.x/icons/svg?seed=AdminSupport|✉️ Respuesta del Administrador: ${replyMessage}`;
    await prisma.notification.create({
      data: {
        userId,
        type: 'SYSTEM',
        content: formattedContent,
        link: '/notificaciones'
      }
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Fetch all live battles and PvP GameRooms for admin view
export async function getAdminBattlesAndWagersAction() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const battles = await prisma.streamBattle.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        stream1: { 
          include: { 
            user: { select: { id: true, username: true, avatar: true } } 
          } 
        },
        stream2: { 
          include: { 
            user: { select: { id: true, username: true, avatar: true } } 
          } 
        }
      }
    });

    const rooms = await prisma.gameRoom.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: { select: { id: true, username: true, avatar: true } },
        opponent: { select: { id: true, username: true, avatar: true } }
      }
    });

    return { battles, rooms };
  } catch (error) {
    console.error('Error fetching admin battles and wagers:', error);
    return { battles: [], rooms: [] };
  }
}

// Admin awards winner of StreamBattle and sets it to FINISHED
export async function adminFinishStreamBattleAction(battleId: string, winnerUserId: string, prizeCoins: number) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { error: 'No autorizado' };
  }

  try {
    // 1. Update StreamBattle status and winner
    const updated = await prisma.streamBattle.update({
      where: { id: battleId },
      data: {
        status: 'FINISHED',
        winnerId: winnerUserId,
        endTime: new Date()
      }
    });

    // 2. Award coins if prizeCoins is positive
    if (prizeCoins > 0) {
      const wallet = await prisma.wallet.upsert({
        where: { userId: winnerUserId },
        update: { balance: { increment: prizeCoins } },
        create: { userId: winnerUserId, balance: prizeCoins }
      });

      // Log transaction
      await prisma.transaction.create({
        data: {
          amount: prizeCoins,
          type: 'TOURNAMENT_PRIZE',
          walletId: wallet.id,
          referenceId: battleId
        }
      });

      // Send SYSTEM notification to winner
      const formattedContent = `Sistema|https://api.dicebear.com/7.x/icons/svg?seed=Trophy|🏆 ¡Felicidades! El administrador te ha premiado con ${prizeCoins} monedas por ganar la Batalla Stream.`;
      await prisma.notification.create({
        data: {
          userId: winnerUserId,
          type: 'SYSTEM',
          content: formattedContent,
          link: '/wallet'
        }
      });
    }

    return { success: true, battle: updated };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Fetch real explore data from database (no simulation)
export async function getRealExploreDataAction() {
  try {
    const heartbeatThreshold = new Date(Date.now() - 75000);
    
    // 1. Get real active streams
    const activeStreams = await prisma.stream.findMany({
      where: {
        isLive: true,
        updatedAt: { gte: heartbeatThreshold }
      },
      include: {
        user: { select: { id: true, username: true, avatar: true } },
        liveRoom: true
      }
    });

    // 2. Get top streamers ordered by wallet balance
    const topStreamers = await prisma.user.findMany({
      where: {
        role: 'STREAMER'
      },
      orderBy: {
        wallet: {
          balance: 'desc'
        }
      },
      take: 5,
      include: {
        wallet: { select: { balance: true } }
      }
    });

    // 3. Get top donors ordered by wallet balance (users in general)
    const topDonors = await prisma.user.findMany({
      orderBy: {
        wallet: {
          balance: 'desc'
        }
      },
      take: 5,
      include: {
        wallet: { select: { balance: true } }
      }
    });

    // 4. Get active battles
    const activeBattles = await prisma.streamBattle.findMany({
      where: {
        status: 'ONGOING'
      },
      include: {
        stream1: { include: { user: { select: { username: true } } } },
        stream2: { include: { user: { select: { username: true } } } }
      },
      take: 4
    });

    return {
      streams: activeStreams,
      topStreamers,
      topDonors,
      activeBattles
    };
  } catch (error) {
    console.error('Error fetching explore data:', error);
    return {
      streams: [],
      topStreamers: [],
      topDonors: [],
      activeBattles: []
    };
  }
}

export async function getPlatformRevenueAction() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    throw new Error('No autorizado');
  }

  try {
    const revenues = await prisma.platformRevenue.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const totalRevenue = revenues.reduce((sum: number, item: any) => sum + item.amount, 0);

    const resolvedRevenues = await Promise.all(revenues.map(async (rev: any) => {
      const sender = await prisma.user.findUnique({
        where: { id: rev.senderId },
        select: { username: true }
      });
      const receiver = await prisma.user.findUnique({
        where: { id: rev.receiverId },
        select: { username: true }
      });
      return {
        id: rev.id,
        amount: rev.amount,
        giftName: rev.giftName,
        senderName: sender?.username || 'Usuario eliminado',
        receiverName: receiver?.username || 'Streamer eliminado',
        createdAt: rev.createdAt
      };
    }));

    return {
      totalRevenue,
      transactionsCount: revenues.length,
      transactions: resolvedRevenues
    };
  } catch (error) {
    console.error('Error fetching platform revenues:', error);
    return {
      totalRevenue: 0,
      transactionsCount: 0,
      transactions: []
    };
  }
}
