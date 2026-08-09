'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
