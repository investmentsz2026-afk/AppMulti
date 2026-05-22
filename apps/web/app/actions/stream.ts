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
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername },
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
