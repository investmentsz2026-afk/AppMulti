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
      await prisma.stream.upsert({
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

export async function checkStreamStatus(streamerUsername: string) {
  try {
    const streamer = await prisma.user.findFirst({
      where: { 
        username: {
          equals: streamerUsername,
          mode: 'insensitive'
        }
      },
      select: {
        isLive: true,
        stream: {
          select: {
            title: true,
            category: true,
          },
        },
      },
    });

    if (!streamer) {
      return { isLive: false };
    }

    return {
      isLive: streamer.isLive,
      title: streamer.stream?.title || '',
      category: streamer.stream?.category || 'Gaming',
    };
  } catch (error) {
    console.error('Error al verificar el estado de transmisión:', error);
    return { isLive: false };
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
