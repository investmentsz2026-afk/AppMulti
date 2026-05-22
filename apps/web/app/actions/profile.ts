'use server'

import { getSession, encrypt } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updateProfile(data: {
  username?: string;
  bio?: string;
  avatar?: string;
  cover?: string;
  tiktokActive?: boolean;
  tiktokUrl?: string;
  instagramActive?: boolean;
  instagramUrl?: string;
  youtubeActive?: boolean;
  youtubeUrl?: string;
  facebookActive?: boolean;
  facebookUrl?: string;
}) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id;

  // Validate username uniqueness if changed
  if (data.username && data.username !== session.username) {
    const cleanUsername = data.username.trim().replace(/\s+/g, '');
    if (cleanUsername.length < 3) {
      return { error: 'El nombre de usuario debe tener al menos 3 caracteres.' };
    }
    const existing = await prisma.user.findUnique({
      where: { username: cleanUsername }
    });
    if (existing) {
      return { error: 'El nombre de usuario ya está en uso' };
    }
    data.username = cleanUsername;
  }

  // Update DB user
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.username ? { username: data.username } : {}),
      ...(data.bio !== undefined ? { bio: data.bio } : {}),
      ...(data.avatar ? { avatar: data.avatar } : {}),
      ...(data.cover ? { cover: data.cover } : {}),
      ...(data.tiktokActive !== undefined ? { tiktokActive: data.tiktokActive } : {}),
      ...(data.tiktokUrl !== undefined ? { tiktokUrl: data.tiktokUrl } : {}),
      ...(data.instagramActive !== undefined ? { instagramActive: data.instagramActive } : {}),
      ...(data.instagramUrl !== undefined ? { instagramUrl: data.instagramUrl } : {}),
      ...(data.youtubeActive !== undefined ? { youtubeActive: data.youtubeActive } : {}),
      ...(data.youtubeUrl !== undefined ? { youtubeUrl: data.youtubeUrl } : {}),
      ...(data.facebookActive !== undefined ? { facebookActive: data.facebookActive } : {}),
      ...(data.facebookUrl !== undefined ? { facebookUrl: data.facebookUrl } : {}),
    }
  });

  // Re-encrypt and update session cookie if username or avatar changed
  if (data.username || data.avatar) {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    const newSession = await encrypt({
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
      avatar: updatedUser.avatar
    });
    const cookieStore = await cookies();
    cookieStore.set('session', newSession, { expires, httpOnly: true, path: '/' });
  }

  revalidatePath(`/u/${updatedUser.username}`);
  revalidatePath(`/dashboard`);

  return { success: true, user: updatedUser };
}
