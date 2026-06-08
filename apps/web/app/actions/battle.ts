'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Helper to seed standard gifts if not present
async function ensureGiftExists(id: string, name: string, price: number, icon: string) {
  return await prisma.gift.upsert({
    where: { id },
    update: { name, price, icon },
    create: { id, name, price, icon }
  });
}

// 1. Get other live streamers who are not currently in a battle
export async function getLiveStreamers() {
  const session = await getSession();
  const userId = session?.id;

  try {
    const streamers = await prisma.user.findMany({
      where: {
        isLive: true,
        id: userId ? { not: userId } : undefined,
        stream: {
          isLive: true,
          // Check that they aren't currently in an ongoing battle
          battles1: { none: { status: 'ONGOING' } },
          battles2: { none: { status: 'ONGOING' } },
        }
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        stream: {
          select: {
            id: true,
            title: true,
            category: true,
          }
        }
      }
    });

    return streamers;
  } catch (error) {
    console.error('Error fetching live streamers for battle:', error);
    return [];
  }
}

// 2. Get ongoing battles
export async function getOngoingBattles() {
  try {
    const battles = await prisma.streamBattle.findMany({
      where: { status: 'ONGOING' },
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
      },
      orderBy: { createdAt: 'desc' }
    });

    return battles;
  } catch (error) {
    console.error('Error fetching ongoing battles:', error);
    return [];
  }
}

// 3. Get live streams waiting for opponents (Próximas)
export async function getUpcomingStreamers() {
  try {
    const streamers = await prisma.user.findMany({
      where: {
        isLive: true,
        stream: {
          isLive: true,
          // Find streams that aren't in active ONGOING battles
          battles1: { none: { status: 'ONGOING' } },
          battles2: { none: { status: 'ONGOING' } },
        }
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        stream: {
          select: {
            id: true,
            title: true,
            category: true,
            createdAt: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return streamers;
  } catch (error) {
    console.error('Error fetching upcoming streamers:', error);
    return [];
  }
}

// 4. Get completed battles history
export async function getBattleHistory(userId?: string) {
  try {
    const battles = await prisma.streamBattle.findMany({
      where: {
        status: 'FINISHED',
        OR: userId ? [
          { stream1: { userId } },
          { stream2: { userId } }
        ] : undefined
      },
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
      },
      orderBy: { endTime: 'desc' },
      take: 20
    });

    return battles.map(b => {
      let winnerName = 'Empate';
      if (b.winnerId) {
        if (b.winnerId === b.stream1.userId) {
          winnerName = b.stream1.user.username;
        } else if (b.winnerId === b.stream2.userId) {
          winnerName = b.stream2.user.username;
        }
      }
      return {
        ...b,
        winnerName
      };
    });
  } catch (error) {
    console.error('Error fetching battle history:', error);
    return [];
  }
}

// 5. Create a battle challenge request
export async function createBattleInvite(opponentStreamId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    // Check if the current user has an active stream
    const userStream = await prisma.stream.findUnique({
      where: { userId: session.id },
    });

    if (!userStream || !userStream.isLive) {
      return { error: 'Debes iniciar una transmisión en vivo primero.' };
    }

    // Check if oponent exists and is live
    const opponentStream = await prisma.stream.findUnique({
      where: { id: opponentStreamId },
      include: { user: true }
    });

    if (!opponentStream || !opponentStream.isLive) {
      return { error: 'El oponente ya no está transmitiendo en vivo.' };
    }

    // Avoid duplicate battle invite
    const existing = await prisma.streamBattle.findFirst({
      where: {
        stream1Id: userStream.id,
        stream2Id: opponentStreamId,
        status: 'PENDING',
      }
    });

    if (existing) {
      return { success: true, battleId: existing.id, msg: 'Ya existe una invitación pendiente.' };
    }

    // Create the battle request record
    const battle = await prisma.streamBattle.create({
      data: {
        stream1Id: userStream.id,
        stream2Id: opponentStreamId,
        status: 'PENDING',
      }
    });

    // Send notification to opponent
    await prisma.notification.create({
      data: {
        userId: opponentStream.userId,
        type: 'BATTLE_INVITE',
        content: `@${session.username} te ha desafiado a una batalla PvP.`,
        link: `/batallas?invite=${battle.id}`
      }
    });

    return { success: true, battleId: battle.id };
  } catch (error: any) {
    console.error('Error creating battle invite:', error);
    return { error: error.message || 'Error del servidor al crear invitación.' };
  }
}

// 6. Respond to battle challenge
export async function respondToBattleInvite(battleId: string, accept: boolean) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const battle = await prisma.streamBattle.findUnique({
      where: { id: battleId },
      include: {
        stream1: { include: { user: true } },
        stream2: { include: { user: true } }
      }
    });

    if (!battle) return { error: 'Invitación de batalla no encontrada.' };

    if (battle.status !== 'PENDING') {
      return { error: 'Esta invitación ya no está pendiente.' };
    }

    if (accept) {
      const startTime = new Date();
      const endTime = new Date(Date.now() + 120 * 1000); // 2 minutes duration

      const updated = await prisma.streamBattle.update({
        where: { id: battleId },
        data: {
          status: 'ONGOING',
          startTime,
          endTime,
        }
      });

      return { success: true, battle: updated };
    } else {
      await prisma.streamBattle.update({
        where: { id: battleId },
        data: { status: 'CANCELLED' }
      });
      return { success: true, cancelled: true };
    }
  } catch (error: any) {
    console.error('Error responding to battle invite:', error);
    return { error: error.message || 'Error del servidor.' };
  }
}

// 7. Get pending incoming invite for the current user
export async function getPendingInvite() {
  const session = await getSession();
  if (!session) return null;

  try {
    const userStream = await prisma.stream.findUnique({
      where: { userId: session.id }
    });

    if (!userStream) return null;

    const invite = await prisma.streamBattle.findFirst({
      where: {
        stream2Id: userStream.id,
        status: 'PENDING'
      },
      include: {
        stream1: {
          include: {
            user: { select: { username: true, avatar: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return invite;
  } catch (error) {
    console.error('Error getting pending invite:', error);
    return null;
  }
}

// 8. Update battle points (tap tap or gift)
export async function updateBattlePoints(
  battleId: string,
  playerNum: 1 | 2,
  pointsToAdd: number,
  isGift: boolean,
  giftId?: string
) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const battle = await prisma.streamBattle.findUnique({
      where: { id: battleId },
      include: {
        stream1: { include: { user: true } },
        stream2: { include: { user: true } }
      }
    });

    if (!battle) return { error: 'Batalla no encontrada.' };
    if (battle.status !== 'ONGOING') return { error: 'La batalla no está activa.' };

    // Self-checking logic if battle has timed out
    if (battle.endTime && new Date() > battle.endTime) {
      await finishBattleAction(battleId);
      return { error: 'La batalla ya ha finalizado.' };
    }

    if (isGift && giftId) {
      // Find or seed gift definition
      let giftCost = pointsToAdd;
      let giftName = 'Regalo';
      let giftEmoji = '🎁';

      if (giftId === 'rose') { giftName = 'Rosa'; giftEmoji = '🌹'; giftCost = 5; }
      else if (giftId === 'heart') { giftName = 'Corazón'; giftEmoji = '❤️'; giftCost = 50; }
      else if (giftId === 'diamond') { giftName = 'Diamante'; giftEmoji = '💎'; giftCost = 200; }
      else if (giftId === 'crown') { giftName = 'Corona'; giftEmoji = '👑'; giftCost = 1000; }
      else if (giftId === 'rocket') { giftName = 'Cohete'; giftEmoji = '🚀'; giftCost = 5000; }
      else if (giftId === 'lion') { giftName = 'León'; giftEmoji = '🦁'; giftCost = 10000; }

      await ensureGiftExists(giftId, giftName, giftCost, giftEmoji);

      // Check sender wallet
      const wallet = await prisma.wallet.findUnique({
        where: { userId: session.id }
      });

      if (!wallet || wallet.balance < giftCost) {
        return { error: 'Saldo de monedas insuficiente.' };
      }

      // Deduct coins from sender wallet
      await prisma.wallet.update({
        where: { userId: session.id },
        data: { balance: { decrement: giftCost } }
      });

      // Transfer to receiver wallet (streamer)
      const receiverUserId = playerNum === 1 ? battle.stream1.userId : battle.stream2.userId;
      await prisma.wallet.upsert({
        where: { userId: receiverUserId },
        update: { balance: { increment: giftCost } },
        create: { userId: receiverUserId, balance: giftCost }
      });

      // Log transaction for sender
      await prisma.transaction.create({
        data: {
          amount: -giftCost,
          type: 'GIFT_SENT',
          walletId: wallet.id,
          giftId: giftId,
          referenceId: receiverUserId
        }
      });

      // Log transaction for receiver (need target wallet ID)
      const receiverWallet = await prisma.wallet.findUnique({
        where: { userId: receiverUserId }
      });
      if (receiverWallet) {
        await prisma.transaction.create({
          data: {
            amount: giftCost,
            type: 'GIFT_RECEIVED',
            walletId: receiverWallet.id,
            giftId: giftId,
            referenceId: session.id
          }
        });
      }

      // Add special comment to the specific stream's chat logs
      await prisma.message.create({
        data: {
          content: `envió ${giftName} ${giftEmoji}`,
          userId: session.id,
          streamId: playerNum === 1 ? battle.stream1Id : battle.stream2Id,
          isGift: true,
          giftId: giftId
        }
      });

      // Points to add matches gift value
      pointsToAdd = giftCost;
    }

    // Increment points
    const updated = await prisma.streamBattle.update({
      where: { id: battleId },
      data: {
        points1: playerNum === 1 ? { increment: pointsToAdd } : undefined,
        points2: playerNum === 2 ? { increment: pointsToAdd } : undefined,
      },
      include: {
        stream1: { include: { user: true } },
        stream2: { include: { user: true } }
      }
    });

    return { success: true, battle: updated };
  } catch (error: any) {
    console.error('Error updating battle points:', error);
    return { error: error.message || 'Error al actualizar puntos.' };
  }
}

// 9. Force evaluation and finish battle
export async function checkAndUpdateBattleStatus(battleId: string) {
  try {
    const battle = await prisma.streamBattle.findUnique({
      where: { id: battleId }
    });

    if (!battle) return { error: 'Batalla no encontrada.' };

    if (battle.status === 'ONGOING' && battle.endTime && new Date() > battle.endTime) {
      return await finishBattleAction(battleId);
    }

    return { success: true, battle };
  } catch (error: any) {
    console.error('Error checking status:', error);
    return { error: error.message || 'Error del servidor.' };
  }
}

// Helper to finish a battle and compute winner
async function finishBattleAction(battleId: string) {
  const battle = await prisma.streamBattle.findUnique({
    where: { id: battleId },
    include: {
      stream1: true,
      stream2: true
    }
  });

  if (!battle || battle.status !== 'ONGOING') {
    return { success: true, battle };
  }

  let winnerId: string | null = null;
  if (battle.points1 > battle.points2) {
    winnerId = battle.stream1.userId;
  } else if (battle.points2 > battle.points1) {
    winnerId = battle.stream2.userId;
  }

  const finished = await prisma.streamBattle.update({
    where: { id: battleId },
    data: {
      status: 'FINISHED',
      winnerId
    },
    include: {
      stream1: { include: { user: { select: { username: true } } } },
      stream2: { include: { user: { select: { username: true } } } }
    }
  });

  // Turn off isLive for streams and users to revert them back to regular state?
  // No, keep them streaming but end their battle status.
  
  return { success: true, battle: finished };
}

// 10. Fetch specific battle details and messages
export async function getBattleDetails(battleId: string) {
  try {
    const battle = await prisma.streamBattle.findUnique({
      where: { id: battleId },
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

    if (!battle) return null;

    // Fetch messages from both streams
    const messages = await prisma.message.findMany({
      where: {
        streamId: { in: [battle.stream1Id, battle.stream2Id] }
      },
      include: {
        user: { select: { username: true } }
      },
      orderBy: { createdAt: 'asc' },
      take: 100
    });

    return {
      battle,
      messages: messages.map(m => ({
        id: m.id,
        type: m.isGift ? ('gift' as const) : ('chat' as const),
        user: m.user.username,
        text: m.content,
        giftName: m.isGift ? (m.giftId === 'rose' ? 'Rosa' : m.giftId === 'heart' ? 'Corazón' : m.giftId === 'diamond' ? 'Diamante' : m.giftId === 'crown' ? 'Corona' : m.giftId === 'rocket' ? 'Cohete' : 'León') : undefined,
        giftEmoji: m.isGift ? (m.giftId === 'rose' ? '🌹' : m.giftId === 'heart' ? '❤️' : m.giftId === 'diamond' ? '💎' : m.giftId === 'crown' ? '👑' : m.giftId === 'rocket' ? '🚀' : '🦁') : undefined,
        quantity: m.isGift ? 1 : undefined,
        time: 'ahora',
        color: m.isGift ? 'text-yellow-400' : 'text-zinc-300',
        streamId: m.streamId
      }))
    };
  } catch (error) {
    console.error('Error fetching battle details:', error);
    return null;
  }
}

// 11. Send chat message to an ongoing battle stream
export async function sendBattleChatMessage(streamId: string, content: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const message = await prisma.message.create({
      data: {
        content,
        userId: session.id,
        streamId
      }
    });
    return { success: true, message };
  } catch (error: any) {
    console.error('Error sending message in battle:', error);
    return { error: error.message || 'Error al enviar mensaje.' };
  }
}

// 12. Get the logged in user's wallet balance
export async function getUserWalletBalance() {
  const session = await getSession();
  if (!session) return 0;

  try {
    const wallet = await prisma.wallet.upsert({
      where: { userId: session.id },
      update: {},
      create: { userId: session.id, balance: 1000 } // Default balance to start with if it didn't exist
    });
    return wallet.balance;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return 0;
  }
}

// 13. Add coins to the logged in user's wallet
export async function addWalletCoins(amount: number) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const wallet = await prisma.wallet.upsert({
      where: { userId: session.id },
      update: { balance: { increment: amount } },
      create: { userId: session.id, balance: amount }
    });
    return { success: true, balance: wallet.balance };
  } catch (error: any) {
    console.error('Error adding wallet coins:', error);
    return { error: error.message || 'Error al recargar monedas.' };
  }
}

// 14. Check if the current logged-in user is live streaming
export async function checkUserIsLive() {
  const session = await getSession();
  if (!session) return false;
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { isLive: true }
    });
    return user?.isLive ?? false;
  } catch {
    return false;
  }
}


