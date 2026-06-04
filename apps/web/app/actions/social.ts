'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Pre-calculated bcrypt hash for '123456' to speed up mock seeding
const passwordHash = "$2a$10$7Z26eT.F/rpep73oH2t5z.G5kLhYm7y4V4P8D47gV88oP8T/14bXq";

export async function seedMockData() {
  try {
    const mockUsernames = ['SofiLive', 'GamerPro_2026', 'CosplayNeon', 'ApexLegends_Fan', 'SetupFuturista'];
    
    // Check if these users exist
    const existingUsers = await prisma.user.findMany({
      where: { username: { in: mockUsernames } }
    });

    if (existingUsers.length === mockUsernames.length) {
      const postsCount = await prisma.post.count();
      if (postsCount > 0) {
        return; // Already seeded
      }
    }

    const seededUsers: Record<string, any> = {};

    for (const username of mockUsernames) {
      let user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            username,
            email: `${username.toLowerCase()}@livex.com`,
            password: passwordHash,
            role: 'STREAMER',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            bio: username === 'SofiLive' 
              ? '¡Gran Arena PvP con Subs! 🎮 Ven a jugar y pasa el rato! #FreeFire #Gaming'
              : username === 'GamerPro_2026'
              ? 'Jugador profesional de Valorant. clips diarios 🏆🔥'
              : username === 'CosplayNeon'
              ? 'Cosplayer y artista digital. Jett Main 🌌'
              : 'Creador de contenido y gamer.',
            cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200'
          }
        });
      }
      seededUsers[username] = user;
    }

    const mockPosts = [
      {
        username: 'SofiLive',
        title: '¡Gran Arena PvP con Subs! 🎮 Ven a jugar y pasa el rato! #FreeFire #Gaming',
        url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
        type: 'IMAGE'
      },
      {
        username: 'GamerPro_2026',
        title: '¡Espectacular triple kill en la copa Valorant! 🏆🔥 #Valorant #Clips #Esports #gaming',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-streamer-playing-first-person-shooter-40502-large.mp4',
        type: 'VIDEO'
      },
      {
        username: 'CosplayNeon',
        title: 'Mi nuevo cosplay de Jett estilo Cyberpunk 2026 🌌 ¿Qué les parece? #cosplay #jett #Arte',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800',
        type: 'IMAGE'
      },
      {
        username: 'ApexLegends_Fan',
        title: '¡Esquivando balas en la última zona! 🚀🔥 Increíble final #ApexLegends #EpicWins #gaming #short',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-with-a-controller-40508-large.mp4',
        type: 'VIDEO'
      },
      {
        username: 'SetupFuturista',
        title: 'Mi nuevo setup gamer terminado para 2026 🌌⚡ ¿Calificación del 1 al 10? #GamerSetup #RGB #PCMR',
        url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
        type: 'IMAGE'
      }
    ];

    for (const postData of mockPosts) {
      const author = seededUsers[postData.username];
      if (!author) continue;

      const exists = await prisma.post.findFirst({
        where: { userId: author.id, title: postData.title }
      });

      if (!exists) {
        await prisma.post.create({
          data: {
            title: postData.title,
            url: postData.url,
            type: postData.type as any,
            userId: author.id
          }
        });
      }
    }

    // Seed mock streams
    for (const username of mockUsernames) {
      const author = seededUsers[username];
      if (!author) continue;

      const exists = await prisma.stream.findUnique({
        where: { userId: author.id }
      });

      if (!exists) {
        await prisma.stream.create({
          data: {
            title: `Directo antiguo de ${username} 🔴`,
            thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
            isLive: false,
            category: 'Gaming',
            userId: author.id
          }
        });
      }
    }

    // Seed some mock follows and likes
    const sofi = seededUsers['SofiLive'];
    const gamer = seededUsers['GamerPro_2026'];
    if (sofi && gamer) {
      const followExists = await prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: sofi.id, followingId: gamer.id } }
      });
      if (!followExists) {
        await prisma.follow.create({
          data: { followerId: sofi.id, followingId: gamer.id }
        });
      }
    }
  } catch (err) {
    console.error('Error seeding mock data:', err);
  }
}

export async function toggleLikePost(postId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id as string;

  try {
    const existing = await prisma.postLike.findUnique({
      where: {
        userId_postId: { userId, postId }
      }
    });

    let liked = false;
    if (existing) {
      await prisma.postLike.delete({
        where: {
          userId_postId: { userId, postId }
        }
      });
      liked = false;
    } else {
      await prisma.postLike.create({
        data: { userId, postId }
      });
      liked = true;
    }

    const count = await prisma.postLike.count({
      where: { postId }
    });

    return { success: true, liked, count };
  } catch (err: any) {
    console.error('Error toggling like:', err);
    return { error: err.message || 'Error al dar me gusta' };
  }
}

export async function toggleSavePost(postId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id as string;

  try {
    const existing = await prisma.savedPost.findUnique({
      where: {
        userId_postId: { userId, postId }
      }
    });

    let saved = false;
    if (existing) {
      await prisma.savedPost.delete({
        where: {
          userId_postId: { userId, postId }
        }
      });
      saved = false;
    } else {
      await prisma.savedPost.create({
        data: { userId, postId }
      });
      saved = true;
    }

    return { success: true, saved };
  } catch (err: any) {
    console.error('Error toggling save:', err);
    return { error: err.message || 'Error al guardar publicación' };
  }
}

export async function toggleFollowUser(targetUserId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const followerId = session.id as string;

  if (followerId === targetUserId) {
    return { error: 'No puedes seguirte a ti mismo' };
  }

  try {
    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId: targetUserId }
      }
    });

    let following = false;
    if (existing) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: { followerId, followingId: targetUserId }
        }
      });
      following = false;
    } else {
      await prisma.follow.create({
        data: { followerId, followingId: targetUserId }
      });
      following = true;
    }

    return { success: true, following };
  } catch (err: any) {
    console.error('Error toggling follow:', err);
    return { error: err.message || 'Error al cambiar estado de seguimiento' };
  }
}

export async function checkFollowStatus(targetUserId: string) {
  const session = await getSession();
  if (!session) return { following: false };

  const followerId = session.id as string;

  try {
    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId: targetUserId }
      }
    });
    return { following: !!existing };
  } catch (err) {
    return { following: false };
  }
}

export async function getProfileStats(username: string) {
  await seedMockData(); // ensure mock users are seeded

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) return { followers: 0, following: 0, likes: 0 };

    const followers = await prisma.follow.count({
      where: { followingId: user.id }
    });

    const following = await prisma.follow.count({
      where: { followerId: user.id }
    });

    const likes = await prisma.postLike.count({
      where: {
        post: {
          userId: user.id
        }
      }
    });

    return { followers, following, likes };
  } catch (err) {
    console.error('Error getting profile stats:', err);
    return { followers: 0, following: 0, likes: 0 };
  }
}

export async function getTabPosts(username: string, tab: string, viewerId?: string) {
  await seedMockData(); // ensure mock data is seeded

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) return [];

    const isOwner = viewerId === user.id;

    if (tab === 'Videos') {
      const posts = await prisma.post.findMany({
        where: {
          userId: user.id,
          type: 'VIDEO',
          NOT: [
            { title: { contains: '#short', mode: 'insensitive' } },
            { title: { contains: '#shorts', mode: 'insensitive' } }
          ],
          ...(isOwner ? {} : { isPrivate: false })
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, username: true, avatar: true } },
          likes: { select: { userId: true } },
          savedBy: { select: { userId: true } }
        }
      });
      return posts.map(p => ({
        ...p,
        likesCount: p.likes.length,
        isLiked: viewerId ? p.likes.some(l => l.userId === viewerId) : false,
        isSaved: viewerId ? p.savedBy.some(s => s.userId === viewerId) : false
      }));
    }

    if (tab === 'Shorts') {
      const posts = await prisma.post.findMany({
        where: {
          userId: user.id,
          type: 'VIDEO',
          OR: [
            { title: { contains: '#short', mode: 'insensitive' } },
            { title: { contains: '#shorts', mode: 'insensitive' } }
          ],
          ...(isOwner ? {} : { isPrivate: false })
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, username: true, avatar: true } },
          likes: { select: { userId: true } },
          savedBy: { select: { userId: true } }
        }
      });
      return posts.map(p => ({
        ...p,
        likesCount: p.likes.length,
        isLiked: viewerId ? p.likes.some(l => l.userId === viewerId) : false,
        isSaved: viewerId ? p.savedBy.some(s => s.userId === viewerId) : false
      }));
    }

    if (tab === 'Fotos') {
      const posts = await prisma.post.findMany({
        where: {
          userId: user.id,
          type: 'IMAGE',
          ...(isOwner ? {} : { isPrivate: false })
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, username: true, avatar: true } },
          likes: { select: { userId: true } },
          savedBy: { select: { userId: true } }
        }
      });
      return posts.map(p => ({
        ...p,
        likesCount: p.likes.length,
        isLiked: viewerId ? p.likes.some(l => l.userId === viewerId) : false,
        isSaved: viewerId ? p.savedBy.some(s => s.userId === viewerId) : false
      }));
    }

    if (tab === 'Streams') {
      const streams = await prisma.stream.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, username: true, avatar: true } }
        }
      });
      return streams.map(s => ({
        id: s.id,
        title: s.title || 'Transmisión finalizada',
        url: s.thumbnail || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
        type: 'IMAGE',
        isPrivate: false,
        userId: s.userId,
        createdAt: s.createdAt,
        user: s.user,
        isStream: true
      }));
    }

    if (tab === 'Guardados') {
      if (!isOwner) return [];
      const saved = await prisma.savedPost.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          post: {
            include: {
              user: { select: { id: true, username: true, avatar: true } },
              likes: { select: { userId: true } },
              savedBy: { select: { userId: true } }
            }
          }
        }
      });
      return saved.map(s => s.post).filter(Boolean).map(p => ({
        ...p,
        likesCount: p.likes.length,
        isLiked: viewerId ? p.likes.some(l => l.userId === viewerId) : false,
        isSaved: viewerId ? p.savedBy.some(s => s.userId === viewerId) : false
      }));
    }

    if (tab === 'Me gusta') {
      const liked = await prisma.postLike.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          post: {
            include: {
              user: { select: { id: true, username: true, avatar: true } },
              likes: { select: { userId: true } },
              savedBy: { select: { userId: true } }
            }
          }
        }
      });
      return liked.map(l => l.post).filter(Boolean).map(p => ({
        ...p,
        likesCount: p.likes.length,
        isLiked: viewerId ? p.likes.some(l => l.userId === viewerId) : false,
        isSaved: viewerId ? p.savedBy.some(s => s.userId === viewerId) : false
      }));
    }

    return [];
  } catch (err) {
    console.error('Error fetching tab posts:', err);
    return [];
  }
}

export async function getFollowingUserIds() {
  const session = await getSession();
  if (!session) return [];

  const follows = await prisma.follow.findMany({
    where: { followerId: session.id as string },
    select: { followingId: true }
  });

  return follows.map(f => f.followingId);
}

// ================= PRIVATE MESSAGES ACTIONS =================

export async function sendDirectMessage(receiverId: string, content: string, mediaUrl?: string, mediaType?: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const senderId = session.id as string;
  if (senderId === receiverId) return { error: 'No puedes enviarte mensajes a ti mismo' };

  const trimmed = content.trim();
  if (!trimmed && !mediaUrl) return { error: 'Mensaje vacío' };

  try {
    const dm = await prisma.directMessage.create({
      data: {
        senderId,
        receiverId,
        content: trimmed,
        mediaUrl: mediaUrl || null,
        mediaType: mediaType || null
      },
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      }
    });

    return { success: true, message: dm };
  } catch (err: any) {
    console.error('Error sending DM:', err);
    return { error: err.message || 'Error al enviar mensaje' };
  }
}

export async function getDirectMessages(otherUserId: string) {
  const session = await getSession();
  if (!session) return [];

  const userId = session.id as string;

  try {
    // Fetch DMs between current user and otherUserId
    const dms = await prisma.directMessage.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      }
    });

    // Mark received messages as read
    await prisma.directMessage.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: userId,
        isRead: false
      },
      data: { isRead: true }
    });

    return dms;
  } catch (err) {
    console.error('Error fetching DMs:', err);
    return [];
  }
}

export async function getConversations() {
  const session = await getSession();
  if (!session) return [];

  const userId = session.id as string;

  try {
    const dms = await prisma.directMessage.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, username: true, avatar: true } },
        receiver: { select: { id: true, username: true, avatar: true } }
      }
    });

    const conversationsMap = new Map<string, any>();

    for (const dm of dms) {
      const otherUser = dm.senderId === userId ? dm.receiver : dm.sender;
      if (!conversationsMap.has(otherUser.id)) {
        conversationsMap.set(otherUser.id, {
          user: otherUser,
          lastMessage: dm.mediaType === 'IMAGE' 
            ? '📷 Imagen' 
            : dm.mediaType === 'VIDEO' 
            ? '🎥 Video' 
            : dm.mediaType === 'AUDIO' 
            ? '🎙️ Nota de voz' 
            : dm.content,
          createdAt: dm.createdAt,
          isRead: dm.isRead || dm.senderId === userId
        });
      }
    }

    return Array.from(conversationsMap.values());
  } catch (err) {
    console.error('Error fetching conversations:', err);
    return [];
  }
}

export async function getUserByUsername(username: string) {
  try {
    return await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, avatar: true }
    });
  } catch (err) {
    return null;
  }
}
