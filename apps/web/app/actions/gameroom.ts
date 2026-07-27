'use server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. Create a game room (wager)
export async function createGameRoomAction(data: {
  title: string;
  game: string;
  wager: number;
  roomCode: string;
  roomPassword: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado.' };

  try {
    // Validate creator has enough coins
    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.id }
    });

    if (!wallet || wallet.balance < data.wager) {
      return { error: `Monedas insuficientes. Necesitas al menos ${data.wager} monedas para la apuesta.` };
    }

    // Deduct coins from creator
    await prisma.wallet.update({
      where: { userId: session.id },
      data: { balance: { decrement: data.wager } }
    });

    // Log transaction
    await prisma.transaction.create({
      data: {
        amount: -data.wager,
        type: 'TOURNAMENT_FEE',
        walletId: wallet.id
      }
    });

    const room = await prisma.gameRoom.create({
      data: {
        title: data.title,
        game: data.game || 'Free Fire',
        wager: data.wager,
        roomCode: data.roomCode,
        roomPassword: data.roomPassword,
        creatorId: session.id,
        status: 'WAITING'
      }
    });

    revalidatePath('/batallas');
    return { success: true, room };
  } catch (error: any) {
    console.error('Error creating game room:', error);
    return { error: error.message || 'Error del servidor al crear la sala.' };
  }
}

// 2. Get all game rooms
export async function getGameRoomsAction() {
  try {
    const rooms = await prisma.gameRoom.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { id: true, username: true, avatar: true }
        },
        opponent: {
          select: { id: true, username: true, avatar: true }
        }
      }
    });
    return rooms;
  } catch (error) {
    console.error('Error fetching game rooms:', error);
    return [];
  }
}

// 3. Join a game room (Opponent challenges & wagers)
export async function joinGameRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado.' };

  try {
    const room = await prisma.gameRoom.findUnique({
      where: { id: roomId }
    });

    if (!room) return { error: 'La sala de juego no existe.' };
    if (room.creatorId === session.id) return { error: 'No puedes unirte a tu propia sala.' };
    if (room.status !== 'WAITING') return { error: 'Esta sala ya no está disponible.' };

    // Validate opponent has enough coins
    const opponentWallet = await prisma.wallet.findUnique({
      where: { userId: session.id }
    });

    if (!opponentWallet || opponentWallet.balance < room.wager) {
      return { error: `Monedas insuficientes. Necesitas al menos ${room.wager} monedas para cubrir la apuesta.` };
    }

    // Deduct coins from opponent
    await prisma.wallet.update({
      where: { userId: session.id },
      data: { balance: { decrement: room.wager } }
    });

    // Log transaction for opponent
    await prisma.transaction.create({
      data: {
        amount: -room.wager,
        type: 'TOURNAMENT_FEE',
        walletId: opponentWallet.id,
        referenceId: room.id
      }
    });

    // Update room status
    const updatedRoom = await prisma.gameRoom.update({
      where: { id: roomId },
      data: {
        opponentId: session.id,
        status: 'PLAYING'
      },
      include: {
        creator: { select: { username: true } },
        opponent: { select: { username: true } }
      }
    });

    revalidatePath('/batallas');
    return { success: true, room: updatedRoom };
  } catch (error: any) {
    console.error('Error joining game room:', error);
    return { error: error.message || 'Error al ingresar a la sala.' };
  }
}

// 4. Submit proof of victory
export async function submitRoomWinAction(data: {
  roomId: string;
  winScreenshot: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado.' };

  try {
    const room = await prisma.gameRoom.findUnique({
      where: { id: data.roomId }
    });

    if (!room) return { error: 'Sala no encontrada.' };
    if (room.creatorId !== session.id && room.opponentId !== session.id) {
      return { error: 'No eres participante de esta sala.' };
    }

    const updated = await prisma.gameRoom.update({
      where: { id: data.roomId },
      data: {
        winnerId: session.id,
        winScreenshot: data.winScreenshot,
        submittedWin: true,
        status: 'FINISHED'
      }
    });

    revalidatePath('/batallas');
    return { success: true, room: updated };
  } catch (error: any) {
    console.error('Error submitting room win proof:', error);
    return { error: error.message || 'Error al subir la captura.' };
  }
}

// 5. Admin approves and payouts double wager pool to winner
export async function approveRoomWinnerAction(roomId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado.' };

  // Verify Admin role
  const user = await prisma.user.findUnique({
    where: { id: session.id }
  });

  if (!user || user.role !== 'ADMIN') {
    return { error: 'No tienes permisos de administrador.' };
  }

  try {
    const room = await prisma.gameRoom.findUnique({
      where: { id: roomId }
    });

    if (!room) return { error: 'Sala no encontrada.' };
    if (room.status !== 'FINISHED' || !room.winnerId) {
      return { error: 'Esta sala no tiene una victoria reportada pendiente.' };
    }

    const totalPrize = room.wager * 2;

    // Credit full prize to winner
    const winnerWallet = await prisma.wallet.upsert({
      where: { userId: room.winnerId },
      update: { balance: { increment: totalPrize } },
      create: { userId: room.winnerId, balance: totalPrize }
    });

    // Log transaction
    await prisma.transaction.create({
      data: {
        amount: totalPrize,
        type: 'TOURNAMENT_PRIZE',
        walletId: winnerWallet.id,
        referenceId: room.id
      }
    });

    // Update room status
    const updated = await prisma.gameRoom.update({
      where: { id: roomId },
      data: {
        status: 'APPROVED'
      }
    });

    revalidatePath('/batallas');
    return { success: true, room: updated };
  } catch (error: any) {
    console.error('Error approving room winner:', error);
    return { error: error.message || 'Error al aprobar al ganador.' };
  }
}
