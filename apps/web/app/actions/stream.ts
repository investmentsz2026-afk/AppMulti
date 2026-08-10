'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Global cache to track active viewers in local testing environments
const activeViewersMap = new Map<string, Set<string>>();

export async function updateStreamStatus(
  isLive: boolean,
  title?: string,
  category?: string
) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id;

  try {
    // 1. Update user model status
    await prisma.user.update({
      where: { id: userId },
      data: { isLive },
    });

    // 2. Upsert or update Stream model
    if (isLive) {
      const stream = await prisma.stream.upsert({
        where: { userId },
        update: {
          isLive: true,
          title: title || '¡Transmisión en Vivo! 🎮',
          category: category || 'Gaming',
          startedAt: new Date(),
          endedAt: null,
        },
        create: {
          userId,
          title: title || '¡Transmisión en Vivo! 🎮',
          category: category || 'Gaming',
          isLive: true,
          startedAt: new Date(),
        },
      });

      // Reset LiveRoom status and clear previous chat comments
      await prisma.liveRoom.upsert({
        where: { streamId: stream.id },
        update: { activeViewers: 0, likes: 0 },
        create: { streamId: stream.id, activeViewers: 0, likes: 0 }
      });

      await prisma.message.deleteMany({
        where: { streamId: stream.id }
      });
    } else {
      // Find stream first to make sure it exists
      const existingStream = await prisma.stream.findUnique({
        where: { userId },
      });
      
      if (existingStream) {
        await prisma.stream.update({
          where: { userId },
          data: {
            isLive: false,
            endedAt: new Date(),
          },
        });
      }
    }

    revalidatePath(`/u/${session.username}`);
    revalidatePath('/dashboard');
    revalidatePath('/explorar');
    revalidatePath(`/live/${session.username}`);

    return { success: true };
  } catch (error: any) {
    console.error('Error al actualizar el estado de transmisión:', error);
    return { error: error.message || 'Error del servidor al actualizar el live' };
  }
}

export async function checkStreamStatus(streamerUsernameOrId: string) {
  try {
    const streamer = await prisma.user.findFirst({
      where: { 
        OR: [
          {
            username: {
              equals: streamerUsernameOrId,
              mode: 'insensitive'
            }
          },
          {
            id: streamerUsernameOrId
          }
        ]
      },
      select: {
        id: true,
        username: true,
        isLive: true,
        stream: {
          select: {
            id: true,
            title: true,
            category: true,
            liveRoom: {
              select: {
                activeViewers: true,
                likes: true
              }
            }
          },
        },
      },
    });

    if (!streamer) {
      return { isLive: false, viewers: 0, likes: 0 };
    }

    return {
      isLive: streamer.isLive,
      title: streamer.stream?.title || '',
      category: streamer.stream?.category || 'Gaming',
      viewers: streamer.stream?.liveRoom?.activeViewers || 0,
      likes: streamer.stream?.liveRoom?.likes || 0,
    };
  } catch (error) {
    console.error('Error al verificar el estado de transmisión:', error);
    return { isLive: false, viewers: 0, likes: 0 };
  }
}

export async function joinStreamViewerAction(streamerUsername: string) {
  try {
    const session = await getSession();
    if (session && session.username) {
      if (!activeViewersMap.has(streamerUsername)) {
        activeViewersMap.set(streamerUsername, new Set());
      }
      activeViewersMap.get(streamerUsername)!.add(session.username);
    }

    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
      include: { stream: true }
    });
    if (streamer && streamer.stream) {
      await prisma.liveRoom.upsert({
        where: { streamId: streamer.stream.id },
        update: { activeViewers: { increment: 1 }, totalViews: { increment: 1 } },
        create: { streamId: streamer.stream.id, activeViewers: 1, totalViews: 1 }
      });
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function leaveStreamViewerAction(streamerUsername: string) {
  try {
    const session = await getSession();
    if (session && session.username) {
      if (activeViewersMap.has(streamerUsername)) {
        activeViewersMap.get(streamerUsername)!.delete(session.username);
      }
    }

    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
      include: { stream: true }
    });
    if (streamer && streamer.stream) {
      const liveRoom = await prisma.liveRoom.findUnique({
        where: { streamId: streamer.stream.id }
      });
      if (liveRoom && liveRoom.activeViewers > 0) {
        await prisma.liveRoom.update({
          where: { streamId: streamer.stream.id },
          data: { activeViewers: { decrement: 1 } }
        });
      }
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function likeStreamAction(streamerUsername: string) {
  try {
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
      include: { stream: true }
    });
    if (streamer && streamer.stream) {
      const liveRoom = await prisma.liveRoom.upsert({
        where: { streamId: streamer.stream.id },
        update: { likes: { increment: 1 } },
        create: { streamId: streamer.stream.id, likes: 1 }
      });
      return { success: true, likes: liveRoom.likes };
    }
    return { error: 'Stream not found' };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function keepStreamAliveAction() {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };
  try {
    await prisma.stream.update({
      where: { userId: session.id },
      data: { updatedAt: new Date() }
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function sendStreamChatMessage(streamerUsername: string, content: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
      include: { stream: true }
    });

    if (!streamer || !streamer.stream) {
      return { error: 'Streamer offline o no encontrado' };
    }

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        userId: session.id,
        streamId: streamer.stream.id
      },
      include: {
        user: { select: { id: true, username: true, avatar: true } }
      }
    });

    return { success: true, message };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getStreamChatMessages(streamerUsername: string) {
  try {
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
      include: { stream: true }
    });

    if (!streamer || !streamer.stream) {
      return [];
    }

    const messages = await prisma.message.findMany({
      where: { streamId: streamer.stream.id },
      orderBy: { createdAt: 'asc' },
      take: 50,
      include: {
        user: { select: { id: true, username: true, avatar: true } }
      }
    });

    return messages;
  } catch (error) {
    console.error('Error fetching stream messages:', error);
    return [];
  }
}

export async function getActiveStreamsAction() {
  try {
    const activeUsers = await prisma.user.findMany({
      where: { isLive: true },
      include: {
        stream: {
          include: {
            liveRoom: true
          }
        }
      }
    });

    return activeUsers.map(user => ({
      name: user.username,
      viewers: String(user.stream?.liveRoom?.activeViewers || 0),
      title: user.stream?.title || '¡Transmisión en Vivo! 🎮',
      cat: user.stream?.category || 'Gaming',
      tags: ['Live', user.stream?.category || 'Gaming'],
      img: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
    }));
  } catch (error) {
    console.error('Error fetching active streams:', error);
    return [];
  }
}

export async function getTopDonorsAction() {
  try {
    const wallets = await prisma.wallet.findMany({
      take: 5,
      orderBy: { balance: 'desc' },
      include: { user: true }
    });
    return wallets.map(w => ({
      name: w.user.username,
      coins: String(w.balance),
      verified: w.user.role === 'ADMIN' || w.user.role === 'STREAMER'
    }));
  } catch (error) {
    return [];
  }
}

export async function getRealSpectatorsAction(streamerUsername?: string) {
  try {
    if (!streamerUsername) return [];

    const viewersSet = activeViewersMap.get(streamerUsername);
    if (!viewersSet || viewersSet.size === 0) {
      return [];
    }

    const activeUsernames = Array.from(viewersSet);

    const users = await prisma.user.findMany({
      where: {
        username: { in: activeUsernames }
      },
      select: {
        username: true,
        avatar: true
      }
    });

    return users.map((u, i) => ({
      pos: i + 1,
      name: u.username,
      img: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`
    }));
  } catch (err) {
    console.error('Error fetching real spectators:', err);
    return [];
  }
}

export async function getUserWalletBalanceAction() {
  const session = await getSession();
  if (!session) return 0;
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.id }
    });
    return wallet?.balance ?? 0;
  } catch (err) {
    console.error('Error fetching wallet balance:', err);
    return 0;
  }
}

export async function sendGiftAction(streamerUsername: string, giftName: string, giftPrice: number, giftId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id;

  try {
    // 1. Get sender wallet
    const senderWallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!senderWallet || senderWallet.balance < giftPrice) {
      return { error: 'Monedas insuficientes para enviar este regalo.' };
    }

    // 2. Find streamer
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
      include: {
        stream: true,
        wallet: true,
      },
    });

    if (!streamer) {
      return { error: 'Streamer no encontrado.' };
    }

    if (!streamer.wallet) {
      await prisma.wallet.create({
        data: { userId: streamer.id, balance: 0 },
      });
    }

    // Calculate cuts
    const platformCut = Math.floor(giftPrice * 0.30);
    const creatorShare = giftPrice - platformCut; // 70%

    // 3. Update databases in a transaction
    await prisma.$transaction([
      // Deduct from sender
      prisma.wallet.update({
        where: { userId },
        data: { balance: { decrement: giftPrice } },
      }),
      // Add to creator (70%)
      prisma.wallet.update({
        where: { userId: streamer.id },
        data: { balance: { increment: creatorShare } },
      }),
      // Record platform revenue (30%)
      prisma.platformRevenue.create({
        data: {
          amount: platformCut,
          giftName,
          senderId: userId,
          receiverId: streamer.id,
        },
      }),
      // Create Transaction record for sender
      prisma.transaction.create({
        data: {
          amount: -giftPrice,
          type: 'GIFT_SENT',
          walletId: senderWallet.id,
          referenceId: streamer.id,
        },
      }),
    ]);

    // Log transaction for receiver (need target wallet ID)
    const receiverWallet = await prisma.wallet.findUnique({
      where: { userId: streamer.id }
    });
    if (receiverWallet) {
      await prisma.transaction.create({
        data: {
          amount: creatorShare,
          type: 'GIFT_RECEIVED',
          walletId: receiverWallet.id,
          referenceId: userId,
        }
      });
    }

    // 4. Send message in stream chat to show visual notice
    if (streamer.stream) {
      await prisma.message.create({
        data: {
          content: `Envió ${giftName} 🎁`,
          userId,
          streamId: streamer.stream.id,
          isGift: true,
          giftId: giftId,
        },
      });
    }

    return { success: true, newBalance: senderWallet.balance - giftPrice };
  } catch (error: any) {
    console.error('Error al enviar regalo:', error);
    return { error: error.message || 'Error interno del servidor.' };
  }
}
