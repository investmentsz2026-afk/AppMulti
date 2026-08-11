'use server'

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Pre-calculated bcrypt hash for '123456' to speed up mock seeding
const passwordHash = "$2a$10$7Z26eT.F/rpep73oH2t5z.G5kLhYm7y4V4P8D47gV88oP8T/14bXq";

export async function seedMockData() {
  return; // Disabled to keep database 100% real as per user request
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

      // Create notification
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { userId: true, title: true }
      });
      if (post && post.userId !== userId) {
        await prisma.notification.create({
          data: {
            userId: post.userId,
            type: 'SYSTEM',
            content: `${session.username}|${session.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.username}`}|le dio me gusta a tu video: "${post.title.substring(0, 30)}..."`,
            link: `/dashboard?tab=parati&postId=${postId}`
          }
        });
      }
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

      // Create notification
      await prisma.notification.create({
        data: {
          userId: targetUserId,
          type: 'NEW_FOLLOWER',
          content: `${session.username}|${session.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.username}`}|comenzó a seguirte.`,
          link: `/u/${session.username}`
        }
      });
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
          savedBy: { select: { userId: true } },
          comments: { select: { id: true } }
        }
      });
      return posts.map(p => ({
        ...p,
        likesCount: p.likes.length,
        commentsCount: p.comments.length,
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
          savedBy: { select: { userId: true } },
          comments: { select: { id: true } }
        }
      });
      return posts.map(p => ({
        ...p,
        likesCount: p.likes.length,
        commentsCount: p.comments.length,
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
          savedBy: { select: { userId: true } },
          comments: { select: { id: true } }
        }
      });
      return posts.map(p => ({
        ...p,
        likesCount: p.likes.length,
        commentsCount: p.comments.length,
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
        isStream: true,
        isLive: s.isLive,
        likesCount: 0,
        commentsCount: 0
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
              savedBy: { select: { userId: true } },
              comments: { select: { id: true } }
            }
          }
        }
      });
      return saved.map(s => s.post).filter(Boolean).map(p => ({
        ...p,
        likesCount: p.likes.length,
        commentsCount: p.comments.length,
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
              savedBy: { select: { userId: true } },
              comments: { select: { id: true } }
            }
          }
        }
      });
      return liked.map(l => l.post).filter(Boolean).map(p => ({
        ...p,
        likesCount: p.likes.length,
        commentsCount: p.comments.length,
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

  // Check user restriction
  const dbUser = await prisma.user.findUnique({ where: { id: senderId } });
  if (!dbUser || !dbUser.canChat) {
    return { error: 'Tu cuenta tiene restringido el envío de mensajes privados.' };
  }

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
      select: { id: true, username: true, avatar: true, isVerified: true }
    });
  } catch (err) {
    return null;
  }
}

// ================= COMMENTS ACTIONS =================

export async function getPostComments(postId: string) {
  const session = await getSession();
  const userId = session?.id as string | undefined;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        },
        likes: {
          select: { userId: true }
        }
      }
    });

    return comments.map(c => {
      const likesCount = c.likes.length;
      const isLiked = userId ? c.likes.some(l => l.userId === userId) : false;
      return {
        id: c.id,
        content: c.content,
        postId: c.postId,
        userId: c.userId,
        createdAt: c.createdAt,
        user: c.user,
        likesCount,
        isLiked
      };
    });
  } catch (err) {
    console.error('Error fetching comments:', err);
    return [];
  }
}

export async function createComment(postId: string, content: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id as string;
  const trimmed = content.trim();
  if (!trimmed) return { error: 'El comentario no puede estar vacío' };

  try {
    const comment = await prisma.comment.create({
      data: {
        content: trimmed,
        postId,
        userId
      },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        }
      }
    });

    // Create notification
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true, title: true }
    });
    if (post && post.userId !== userId) {
      await prisma.notification.create({
        data: {
          userId: post.userId,
          type: 'SYSTEM',
          content: `${session.username}|${session.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.username}`}|comentó en tu video: "${trimmed.substring(0, 30)}..."`,
          link: `/dashboard?tab=parati&postId=${postId}`
        }
      });
    }

    return {
      success: true,
      comment: {
        ...comment,
        likesCount: 0,
        isLiked: false
      }
    };
  } catch (err: any) {
    console.error('Error creating comment:', err);
    return { error: err.message || 'Error al comentar' };
  }
}

export async function toggleLikeComment(commentId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id as string;

  try {
    const existing = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: { userId, commentId }
      }
    });

    let liked = false;
    if (existing) {
      await prisma.commentLike.delete({
        where: {
          userId_commentId: { userId, commentId }
        }
      });
      liked = false;
    } else {
      await prisma.commentLike.create({
        data: { userId, commentId }
      });
      liked = true;
    }

    const count = await prisma.commentLike.count({
      where: { commentId }
    });

    return { success: true, liked, count };
  } catch (err: any) {
    console.error('Error toggling comment like:', err);
    return { error: err.message || 'Error al dar me gusta al comentario' };
  }
}

export async function deleteComment(commentId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id as string;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: {
          select: { userId: true }
        }
      }
    });

    if (!comment) return { error: 'Comentario no encontrado' };

    const isCommentAuthor = comment.userId === userId;
    const isPostOwner = comment.post.userId === userId;

    if (!isCommentAuthor && !isPostOwner) {
      return { error: 'No tienes permiso para eliminar este comentario' };
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    return { success: true };
  } catch (err: any) {
    console.error('Error deleting comment:', err);
    return { error: err.message || 'Error al eliminar comentario' };
  }
}

export async function getNotifications() {
  const session = await getSession();
  if (!session) return [];

  const userId = session.id as string;

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return notifications;
  } catch (err) {
    console.error('Error getting notifications:', err);
    return [];
  }
}

export async function markNotificationRead(notificationId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function markAllNotificationsRead() {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  const userId = session.id as string;

  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getUnreadNotificationsCount() {
  const session = await getSession();
  if (!session) return 0;

  const userId = session.id as string;

  try {
    const count = await prisma.notification.count({
      where: { userId, isRead: false }
    });
    return count;
  } catch (err) {
    return 0;
  }
}

export async function getUnreadDMsCountAction() {
  const session = await getSession();
  if (!session) return 0;

  const userId = session.id as string;

  try {
    const count = await prisma.directMessage.count({
      where: { receiverId: userId, isRead: false }
    });
    return count;
  } catch (err) {
    return 0;
  }
}

export async function getFollowingFeedData() {
  const session = await getSession();
  if (!session) return { followingCount: 0, liveStreamers: [], feedItems: [] };

  const userId = session.id as string;

  try {
    // 1. Get user IDs that this user is following
    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true }
    });

    const followedUserIds = follows.map(f => f.followingId);

    // 2. Count following
    const followingCount = followedUserIds.length;

    if (followingCount === 0) {
      return { followingCount: 0, liveStreamers: [], feedItems: [] };
    }

    // 3. Get actual live streams of followed users
    const liveStreams = await prisma.stream.findMany({
      where: {
        userId: { in: followedUserIds },
        isLive: true
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    const liveStreamers = liveStreams.map(stream => ({
      id: stream.user.id,
      name: stream.user.username,
      avatar: stream.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.user.username}`,
      category: stream.category,
      views: '150', // We can show a default count or calculate
      preview: stream.user.avatar || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300'
    }));

    // 4. Get posts of followed users
    const posts = await prisma.post.findMany({
      where: {
        userId: { in: followedUserIds }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        likes: {
          where: { userId }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    const feedItems = posts.map(post => ({
      id: post.id,
      type: post.type === 'VIDEO' ? 'video' : 'photo',
      name: post.user.username,
      avatar: post.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.username}`,
      title: post.title,
      duration: post.type === 'VIDEO' ? '00:15' : undefined,
      views: post.type === 'VIDEO' ? '1.2K' : undefined,
      img: post.url,
      dbId: post.id,
      mediaUrl: post.url,
      userId: post.userId,
      user: {
        username: post.user.username,
        avatar: post.user.avatar
      },
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      isLiked: post.likes.length > 0
    }));

    return {
      followingCount,
      liveStreamers,
      feedItems
    };
  } catch (err) {
    console.error('Error fetching following feed:', err);
    return { followingCount: 0, liveStreamers: [], feedItems: [] };
  }
}

export async function checkFollowStatusByUsername(streamerUsername: string) {
  const session = await getSession();
  if (!session) return { following: false };

  try {
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername }
    });
    if (!streamer) return { following: false };

    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId: session.id, followingId: streamer.id }
      }
    });
    return { following: !!existing, streamerId: streamer.id };
  } catch (err) {
    return { following: false };
  }
}

export async function toggleFollowByUsername(streamerUsername: string) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  try {
    const streamer = await prisma.user.findUnique({
      where: { username: streamerUsername }
    });
    if (!streamer) return { error: 'Streamer no encontrado' };

    return await toggleFollowUser(streamer.id);
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getFollowersListAction(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) return [];

    const follows = await prisma.follow.findMany({
      where: { followingId: user.id },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            isVerified: true
          }
        }
      }
    });

    return follows.map(f => f.follower);
  } catch (err) {
    console.error('Error fetching followers list:', err);
    return [];
  }
}

export async function getFollowingListAction(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) return [];

    const follows = await prisma.follow.findMany({
      where: { followerId: user.id },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            isVerified: true
          }
        }
      }
    });

    return follows.map(f => f.following);
  } catch (err) {
    console.error('Error fetching following list:', err);
    return [];
  }
}

export async function deletePostAction(postId: string) {
  const session = await getSession();
  if (!session) return { error: 'No autorizado' };

  const userId = session.id as string;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return { error: 'La publicación no existe' };
    }

    if (post.userId !== userId) {
      return { error: 'No tienes permisos para eliminar esta publicación' };
    }

    await prisma.post.delete({
      where: { id: postId }
    });

    return { success: true };
  } catch (err: any) {
    console.error('Error deleting post:', err);
    return { error: err.message || 'Error al eliminar la publicación' };
  }
}

export async function getUserLevelInfoAction(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      return { level: 1, xp: 0, nextLevelXp: 200, prevLevelXp: 0, progressPercentage: 0, totalGiftsCoins: 0, title: 'CREADOR INICIANTE' };
    }

    const userWallet = await prisma.wallet.findUnique({
      where: { userId: user.id }
    });

    let totalGiftsCoins = 0;
    if (userWallet) {
      const giftTxAggregate = await prisma.transaction.aggregate({
        where: {
          walletId: userWallet.id,
          type: 'GIFT_SENT'
        },
        _sum: { amount: true }
      });
      totalGiftsCoins = Math.abs(giftTxAggregate._sum.amount || 0);
    }

    // Formula: Level increases ONLY by donating gifts in live streams (1 coin donated = 1 XP)
    const xp = totalGiftsCoins;

    // Calculate level scale
    // XP for level L: 100 * (L - 1) * L
    let level = 1;
    while (true) {
      const nextLevelXp = 100 * level * (level + 1);
      if (xp >= nextLevelXp) {
        level++;
      } else {
        break;
      }
    }

    const prevLevelXp = 100 * (level - 1) * level;
    const nextLevelXp = 100 * level * (level + 1);
    const xpInCurrentLevel = xp - prevLevelXp;
    const xpNeededForNextLevel = nextLevelXp - prevLevelXp;

    const progressPercentage = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100)));

    // Calculate user title prefix based on level
    let title = 'CREADOR INICIANTE';
    if (level >= 30) title = 'LEYENDA SUPREMA';
    else if (level >= 20) title = 'STREAM QUEEN';
    else if (level >= 10) title = 'CREADOR EXPERTO';
    else if (level >= 5) title = 'CREADOR PRO';

    return {
      level,
      xp,
      nextLevelXp,
      prevLevelXp,
      xpNeededForNextLevel,
      xpInCurrentLevel,
      progressPercentage,
      totalGiftsCoins,
      title
    };
  } catch (err) {
    console.error('Error fetching level info:', err);
    return { level: 1, xp: 0, nextLevelXp: 200, prevLevelXp: 0, xpNeededForNextLevel: 200, xpInCurrentLevel: 0, progressPercentage: 0, totalGiftsCoins: 0, title: 'CREADOR INICIANTE' };
  }
}
