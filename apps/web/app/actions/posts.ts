'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

  // Generate unique filename
  const ext = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg');
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

  // Save file to public/uploads/
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(uploadsDir, uniqueName);
  await writeFile(filePath, buffer);

  // URL relative to public
  const fileUrl = `/uploads/${uniqueName}`;

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
  const posts = await prisma.post.findMany({
    where: { isPrivate: false },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      user: {
        select: { id: true, username: true, avatar: true }
      }
    }
  });
  return posts;
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
      }
    }
  });

  return posts;
}
