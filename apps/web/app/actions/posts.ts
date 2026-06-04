'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createPost(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const title = formData.get('title') as string;
  const file = formData.get('file') as File;
  const privacy = formData.get('privacy') as string; // 'public' | 'private'

  if (!title || !file) return { error: 'Título y archivo son obligatorios' };

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Tipo de archivo no soportado. Usa JPG, PNG, GIF, WEBP, MP4, WEBM o MOV.' };
  }

  // 150MB limit
  if (file.size > 150 * 1024 * 1024) {
    return { error: 'El archivo supera el límite de 150MB.' };
  }

  // Determine type
  const isVideo = file.type.startsWith('video/');
  const postType = isVideo ? 'VIDEO' : 'IMAGE';

  // Convert file to base64 Data URL to support serverless/production deployments without a writable filesystem
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const fileUrl = `data:${file.type};base64,${base64}`;

  // Create post in database
  const post = await prisma.post.create({
    data: {
      title,
      url: fileUrl,
      type: postType as any,
      isPrivate: privacy === 'private',
      userId: session.id as string,
    },
    include: {
      user: {
        select: { id: true, username: true, avatar: true }
      }
    }
  });

  return { success: true, post };
}

export async function getPublicPosts() {
  const session = await getSession();
  const userId = session?.id as string | undefined;

  const posts = await prisma.post.findMany({
    where: { isPrivate: false },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      user: {
        select: { id: true, username: true, avatar: true }
      },
      likes: {
        select: { userId: true }
      },
      savedBy: {
        select: { userId: true }
      }
    }
  });

  return posts.map(post => {
    const likesCount = post.likes.length;
    const isLiked = userId ? post.likes.some(l => l.userId === userId) : false;
    const isSaved = userId ? post.savedBy.some(s => s.userId === userId) : false;
    return {
      ...post,
      likesCount,
      isLiked,
      isSaved
    };
  });
}

export async function getUserPosts(username: string, viewerId?: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return [];

  const isOwner = viewerId === user.id;

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
      ...(isOwner ? {} : { isPrivate: false }),
    },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, username: true, avatar: true }
      },
      likes: {
        select: { userId: true }
      },
      savedBy: {
        select: { userId: true }
      }
    }
  });

  return posts.map(post => {
    const likesCount = post.likes.length;
    const isLiked = viewerId ? post.likes.some(l => l.userId === viewerId) : false;
    const isSaved = viewerId ? post.savedBy.some(s => s.userId === viewerId) : false;
    return {
      ...post,
      likesCount,
      isLiked,
      isSaved
    };
  });
}
