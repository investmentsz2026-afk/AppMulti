'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. Create a tournament
export async function createTournamentAction(data: {
  title: string;
  game: string;
  format?: string;
  prize: number;
  entryFee?: number;
  maxTeams: number;
  roomCode?: string;
  roomPassword?: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const tournament = await prisma.tournament.create({
      data: {
        title: data.title,
        game: data.game || 'Free Fire',
        format: data.format || 'BO3',
        prize: data.prize,
        entryFee: data.entryFee || 0,
        maxTeams: data.maxTeams || 16,
        roomCode: data.roomCode || null,
        roomPassword: data.roomPassword || null,
        creatorId: session.id,
      }
    });

    // Auto-join the creator to the tournament without fee
    await prisma.tournamentParticipant.create({
      data: {
        tournamentId: tournament.id,
        userId: session.id,
        freeFireId: 'CREATOR',
        freeFireName: session.username
      }
    });

    revalidatePath('/torneos');
    return { success: true, tournament };
  } catch (error: any) {
    console.error('Error creating tournament:', error);
    return { error: error.message || 'Error del servidor al crear el torneo.' };
  }
}

// 2. Get list of tournaments
export async function getTournamentsAction(game?: string) {
  try {
    const tournaments = await prisma.tournament.findMany({
      where: game ? { game } : undefined,
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return tournaments;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
}

// 3. Join a tournament with Free Fire credentials and Entry Fee verification
export async function joinTournamentAction(data: {
  tournamentId: string;
  freeFireId: string;
  freeFireName: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  if (!data.freeFireId.trim() || !data.freeFireName.trim()) {
    return { error: 'Debes proporcionar tu ID y Nombre de perfil de Free Fire.' };
  }

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: data.tournamentId },
      include: { participants: true }
    });

    if (!tournament) return { error: 'Torneo no encontrado.' };
    if (tournament.status !== 'UPCOMING') return { error: 'El torneo ya ha iniciado o finalizado.' };
    
    // Check if tournament is full
    if (tournament.participants.length >= tournament.maxTeams) {
      return { error: 'El torneo ya está lleno.' };
    }

    // Check if already joined
    const alreadyJoined = tournament.participants.some(p => p.userId === session.id);
    if (alreadyJoined) {
      return { error: 'Ya estás inscrito en este torneo.' };
    }

    // Check entry fee coins deduction
    if (tournament.entryFee > 0) {
      const playerWallet = await prisma.wallet.findUnique({
        where: { userId: session.id }
      });

      if (!playerWallet || playerWallet.balance < tournament.entryFee) {
        return { error: `Monedas insuficientes. Requiere ${tournament.entryFee} monedas para ingresar.` };
      }

      // Deduct coins from player
      await prisma.wallet.update({
        where: { userId: session.id },
        data: { balance: { decrement: tournament.entryFee } }
      });

      // Transfer entry fee to creator's wallet
      await prisma.wallet.upsert({
        where: { userId: tournament.creatorId },
        update: { balance: { increment: tournament.entryFee } },
        create: { userId: tournament.creatorId, balance: tournament.entryFee }
      });

      // Log transaction for player
      await prisma.transaction.create({
        data: {
          amount: -tournament.entryFee,
          type: 'TOURNAMENT_FEE',
          walletId: playerWallet.id,
          referenceId: data.tournamentId
        }
      });

      // Log transaction for creator
      const creatorWallet = await prisma.wallet.findUnique({
        where: { userId: tournament.creatorId }
      });
      if (creatorWallet) {
        await prisma.transaction.create({
          data: {
            amount: tournament.entryFee,
            type: 'GIFT_RECEIVED', // Log as received fee
            walletId: creatorWallet.id,
            referenceId: session.id
          }
        });
      }
    }

    const participant = await prisma.tournamentParticipant.create({
      data: {
        tournamentId: data.tournamentId,
        userId: session.id,
        freeFireId: data.freeFireId,
        freeFireName: data.freeFireName
      }
    });

    revalidatePath('/torneos');
    return { success: true, participant };
  } catch (error: any) {
    console.error('Error joining tournament:', error);
    return { error: error.message || 'Error al inscribirse.' };
  }
}

// 4. Start a tournament
export async function startTournamentAction(tournamentId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId }
    });

    if (!tournament) return { error: 'Torneo no encontrado.' };
    if (tournament.creatorId !== session.id) return { error: 'Solo el creador del torneo puede iniciarlo.' };
    if (tournament.status !== 'UPCOMING') return { error: 'El torneo ya se encuentra activo o finalizado.' };

    const updated = await prisma.tournament.update({
      where: { id: tournamentId },
      data: { status: 'ONGOING' }
    });

    revalidatePath('/torneos');
    return { success: true, tournament: updated };
  } catch (error: any) {
    console.error('Error starting tournament:', error);
    return { error: error.message || 'Error del servidor al iniciar el torneo.' };
  }
}

// 4.5. Finish a tournament
export async function finishTournamentAction(tournamentId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId }
    });

    if (!tournament) return { error: 'Torneo no encontrado.' };
    if (tournament.creatorId !== session.id) return { error: 'Solo el creador del torneo puede finalizarlo.' };
    if (tournament.status !== 'ONGOING') return { error: 'La competencia no se encuentra en curso.' };

    const updated = await prisma.tournament.update({
      where: { id: tournamentId },
      data: { status: 'FINISHED' }
    });

    revalidatePath('/torneos');
    return { success: true, tournament: updated };
  } catch (error: any) {
    console.error('Error finishing tournament:', error);
    return { error: error.message || 'Error del servidor al finalizar el torneo.' };
  }
}

// 5. Submit proof of win screenshots (players only)
export async function submitTournamentWinAction(data: {
  tournamentId: string;
  winScreenshot: string;
  match2Screenshot?: string;
  match3Screenshot?: string;
  profileScreenshot: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  if (!data.winScreenshot || !data.profileScreenshot) {
    return { error: 'Debes subir al menos la captura de la partida 1 y de tu perfil.' };
  }

  try {
    const participant = await prisma.tournamentParticipant.findUnique({
      where: {
        tournamentId_userId: {
          tournamentId: data.tournamentId,
          userId: session.id
        }
      }
    });

    if (!participant) return { error: 'No estás inscrito en este torneo.' };

    const updated = await prisma.tournamentParticipant.update({
      where: {
        tournamentId_userId: {
          tournamentId: data.tournamentId,
          userId: session.id
        }
      },
      data: {
        winScreenshot: data.winScreenshot,
        match2Screenshot: data.match2Screenshot || null,
        match3Screenshot: data.match3Screenshot || null,
        profileScreenshot: data.profileScreenshot,
        submittedWin: true
      }
    });

    revalidatePath('/torneos');
    return { success: true, participant: updated };
  } catch (error: any) {
    console.error('Error submitting tournament proof of win:', error);
    return { error: error.message || 'Error al subir comprobante de victoria.' };
  }
}

// 6. Approve tournament winner & pay tournament prize (creator only)
export async function approveTournamentWinnerAction(data: {
  tournamentId: string;
  winnerUserId: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: data.tournamentId },
      include: { participants: true }
    });

    if (!tournament) return { error: 'Torneo no encontrado.' };
    if (tournament.creatorId !== session.id) return { error: 'Solo el creador del torneo puede aprobar al ganador.' };
    if (tournament.status !== 'ONGOING') return { error: 'La competencia no se encuentra activa para premiar.' };

    const participants = tournament.participants;

    if (tournament.format === 'BO3_2V2') {
      const winnerIndex = participants.findIndex(p => p.userId === data.winnerUserId);
      let teammateIndex = -1;

      if (winnerIndex === 0) teammateIndex = 1;
      else if (winnerIndex === 1) teammateIndex = 0;
      else if (winnerIndex === 2) teammateIndex = 3;
      else if (winnerIndex === 3) teammateIndex = 2;

      const teammate = teammateIndex !== -1 ? participants[teammateIndex] : null;
      const halfPrize = Math.floor(tournament.prize / 2);

      // Pay winner half
      const winnerWallet = await prisma.wallet.upsert({
        where: { userId: data.winnerUserId },
        update: { balance: { increment: halfPrize } },
        create: { userId: data.winnerUserId, balance: halfPrize }
      });

      await prisma.transaction.create({
        data: {
          amount: halfPrize,
          type: 'TOURNAMENT_PRIZE',
          walletId: winnerWallet.id,
          referenceId: data.tournamentId
        }
      });

      await prisma.tournamentParticipant.update({
        where: {
          tournamentId_userId: {
            tournamentId: data.tournamentId,
            userId: data.winnerUserId
          }
        },
        data: { isWinner: true }
      });

      // Pay teammate half if present
      if (teammate) {
        const teammateWallet = await prisma.wallet.upsert({
          where: { userId: teammate.userId },
          update: { balance: { increment: halfPrize } },
          create: { userId: teammate.userId, balance: halfPrize }
        });

        await prisma.transaction.create({
          data: {
            amount: halfPrize,
            type: 'TOURNAMENT_PRIZE',
            walletId: teammateWallet.id,
            referenceId: data.tournamentId
          }
        });

        await prisma.tournamentParticipant.update({
          where: {
            tournamentId_userId: {
              tournamentId: data.tournamentId,
              userId: teammate.userId
            }
          },
          data: { isWinner: true }
        });
      }
    } else {
      // Normal full prize payout for BO3 (1vs1) and BR
      const winnerWallet = await prisma.wallet.upsert({
        where: { userId: data.winnerUserId },
        update: { balance: { increment: tournament.prize } },
        create: { userId: data.winnerUserId, balance: tournament.prize }
      });

      await prisma.transaction.create({
        data: {
          amount: tournament.prize,
          type: 'TOURNAMENT_PRIZE',
          walletId: winnerWallet.id,
          referenceId: data.tournamentId
        }
      });

      await prisma.tournamentParticipant.update({
        where: {
          tournamentId_userId: {
            tournamentId: data.tournamentId,
            userId: data.winnerUserId
          }
        },
        data: { isWinner: true }
      });
    }

    // Mark tournament as finished
    const updated = await prisma.tournament.update({
      where: { id: data.tournamentId },
      data: {
        status: 'FINISHED'
      }
    });

    revalidatePath('/torneos');
    return { success: true, tournament: updated };
  } catch (error: any) {
    console.error('Error approving tournament winner:', error);
    return { error: error.message || 'Error del servidor al aprobar ganador.' };
  }
}
