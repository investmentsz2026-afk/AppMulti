'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Compass, Plus, MessageSquare, User, 
  Search, Crown, Heart, MessageCircle, Share2, 
  Gift, Play, BadgeCheck, Swords, Sword, Coins, X, Music, Volume2, VolumeX, Flame, Tv, Image, PlayCircle,
  Smile, Trash2, Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';
import { usePublicPosts, DBPost } from '@/hooks/usePosts';
import { toggleLikePost, toggleFollowUser, getFollowingUserIds, getPostComments, createComment, toggleLikeComment, deleteComment, sendDirectMessage, getConversations } from '@/app/actions/social';

// Extremely premium mixed-media posts (Streams, Videos, Cosplay/Images, Live Battles)
const FEED_POSTS = [
  {
    id: 1,
    type: 'stream',
    username: 'SofiLive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiLive',
    verified: true,
    title: '¡Gran Arena PvP con Subs! 🎮 Ven a jugar y pasa el rato! #FreeFire #Gaming',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    tags: ['Gaming', 'PvP', 'FreeFire'],
    music: 'Sonido original - SofiLive',
    viewers: '12.4K',
    likes: '45.2K',
    comments: '3,820',
    shares: '890',
    liveUrl: '/live/SofiLive'
  },
  {
    id: 2,
    type: 'video',
    username: 'GamerPro_2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro',
    verified: true,
    title: '¡Espectacular triple kill en la copa Valorant! 🏆🔥 #esports #gaming',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-streamer-playing-first-person-shooter-40502-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    tags: ['Valorant', 'Clips', 'Esports'],
    music: 'Phonk Gaming Beats - Mixkit',
    likes: '92.1K',
    comments: '5,140',
    shares: '12.3K'
  },
  {
    id: 3,
    type: 'image',
    username: 'CosplayNeon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CosplayNeon',
    verified: false,
    title: 'Mi nuevo cosplay de Jett estilo Cyberpunk 2026 🌌 ¿Qué les parece? #cosplay #jett',
    mediaUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800',
    tags: ['Cosplay', 'Cyberpunk', 'Arte'],
    music: 'Jett Theme Song - Riot Games',
    likes: '28.9K',
    comments: '1,450',
    shares: '780'
  },
  {
    id: 4,
    type: 'battle',
    username: 'DiegoStream vs AndrésGG',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoStream',
    verified: true,
    title: '💥 Batalla Épica PvP en Vivo! Voten y apoyen con regalos 💎 #TikTokLive #PvP',
    player1: {
      name: 'DiegoStream',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400',
      score: 18400,
      wins: 3
    },
    player2: {
      name: 'AndrésGG',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400',
      score: 22600,
      wins: 4
    },
    timer: '01:45',
    tags: ['BattlePvP', 'TikTokLive', 'LiveX'],
    music: 'Battle Theme (Epic Remix)',
    likes: '150.3K',
    comments: '8,900',
    shares: '4,500',
    liveUrl: '/batallas'
  },
  {
    id: 5,
    type: 'video',
    username: 'ApexLegends_Fan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ApexLegends',
    verified: false,
    title: '¡Esquivando balas en la última zona! 🚀🔥 Increíble final #ApexLegends #EpicWins',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-with-a-controller-40508-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=800',
    tags: ['ApexLegends', 'Gaming', 'Fails'],
    music: 'Legends Never Die - Alan Walker',
    likes: '64.5K',
    comments: '2,820',
    shares: '3,100'
  },
  {
    id: 6,
    type: 'image',
    username: 'SetupFuturista',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Setup',
    verified: true,
    title: 'Mi nuevo setup gamer terminado para 2026 🌌⚡ ¿Calificación del 1 al 10? #GamerSetup',
    mediaUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
    tags: ['GamerSetup', 'RGB', 'PCMR'],
    music: 'Lofi Chill Gaming Beats',
    likes: '45.8K',
    comments: '3,120',
    shares: '950'
  }
];

export default function MobileDashboard({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const router = useRouter();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const { isLive, streamTitle, viewers, likes } = useLiveStore();
  const { posts: dbPosts } = usePublicPosts();

  // Social & interactions states
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({});
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [animatingFollows, setAnimatingFollows] = useState<Record<string, boolean>>({});

  // Comments & share states
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsCountState, setCommentsCountState] = useState<Record<string, number>>({});

  // Share states
  const [activeSharePost, setActiveSharePost] = useState<any | null>(null);
  const [friendsForShare, setFriendsForShare] = useState<any[]>([]);
  const [sendingToUserIds, setSendingToUserIds] = useState<Record<string, boolean>>({});

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Load followed users on mount
  useEffect(() => {
    async function loadFollows() {
      try {
        const ids = await getFollowingUserIds();
        setFollowedIds(ids);
        const state: Record<string, boolean> = {};
        ids.forEach(id => {
          state[id] = true;
        });
        setFollowingState(state);
      } catch (err) {
        console.error('Error loading follows:', err);
      }
    }
    loadFollows();
  }, []);

  const userStream = isLive && user ? {
    id: 'my-live-stream-post',
    dbId: null,
    userId: user.id,
    type: 'stream',
    username: user.username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
    verified: true,
    title: streamTitle || '¡Transmisión en Vivo de LiveX! 🎮',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    tags: ['Live', 'Gaming', 'TuVivo'],
    music: `Sonido en vivo - ${user.username}`,
    viewers: viewers > 1000 ? `${(viewers / 1000).toFixed(1)}K` : String(viewers),
    likes: likes > 1000 ? `${(likes / 1000).toFixed(1)}K` : String(likes),
    likesCount: likes,
    isLiked: false,
    comments: '0',
    shares: '0',
    liveUrl: `/live/${user.username}`,
    isUserOwnStream: true
  } : null;

  // Convert DB posts to feed format
  const dbFeedPosts = dbPosts.map((p: DBPost) => ({
    id: `db-${p.id}`,
    dbId: p.id,
    userId: p.user.id,
    type: p.type === 'VIDEO' ? 'video' : 'image',
    username: p.user.username,
    avatar: p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.username}`,
    verified: p.user.username === 'SofiLive' || p.user.username === 'GamerPro_2026' || p.user.username === 'SetupFuturista',
    title: p.title,
    mediaUrl: p.url,
    posterUrl: p.type === 'VIDEO' ? undefined : undefined,
    tags: p.title.match(/#[a-zA-Z0-9_]+/g)?.map(t => t.replace('#', '')) || ['Contenido', 'LiveX'],
    music: `Publicación - ${p.user.username}`,
    likesCount: p.likesCount || 0,
    isLiked: p.isLiked || false,
    commentsCount: p.commentsCount || 0,
    shares: '4'
  }));

  const activeFeedPosts = [
    ...(userStream ? [userStream] : []),
    ...dbFeedPosts,
    ...(dbFeedPosts.length > 0 ? FEED_POSTS.filter(p => p.type === 'battle') : FEED_POSTS)
  ] as any[];

  // Fetch comments for active post
  useEffect(() => {
    if (!activeCommentsPostId) return;
    
    const targetPost = activeFeedPosts.find(p => p.id === activeCommentsPostId);
    if (!targetPost || !targetPost.dbId) return;

    const dbId = targetPost.dbId;

    async function fetchComments() {
      setCommentsLoading(true);
      try {
        const data = await getPostComments(dbId);
        setComments(data);
      } catch (err) {
        console.error('Error fetching For You comments in mobile:', err);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [activeCommentsPostId]);

  // Load conversations when opening share modal
  useEffect(() => {
    if (!activeSharePost || !user) return;
    async function loadConversations() {
      try {
        const chats = await getConversations();
        setFriendsForShare(chats);
      } catch (err) {
        console.error('Error loading conversations for share in mobile:', err);
      }
    }
    loadConversations();
  }, [activeSharePost, user]);

  const handleCreateCommentForYou = async (e: React.FormEvent, postId: string, dbId: string | null) => {
    e.preventDefault();
    if (!dbId || !newCommentText.trim()) return;

    try {
      const res = await createComment(dbId, newCommentText);
      if (res.error) {
        triggerToast(res.error);
      } else if (res.success && res.comment) {
        setComments(prev => [res.comment, ...prev]);
        setNewCommentText('');
        // Update local count
        const currentCount = commentsCountState[postId] ?? activeFeedPosts.find(p => p.id === postId)?.commentsCount ?? 0;
        setCommentsCountState(prev => ({
          ...prev,
          [postId]: currentCount + 1
        }));
      }
    } catch (err) {
      console.error('Error creating comment in mobile feed:', err);
    }
  };

  const handleToggleLikeCommentForYou = async (commentId: string) => {
    // Optimistic update
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        const newLiked = !c.isLiked;
        return {
          ...c,
          isLiked: newLiked,
          likesCount: newLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
        };
      }
      return c;
    }));

    try {
      const res = await toggleLikeComment(commentId);
      if (res.error) {
        // Rollback
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            const newLiked = !c.isLiked;
            return {
              ...c,
              isLiked: newLiked,
              likesCount: newLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
            };
          }
          return c;
        }));
        triggerToast(res.error);
      } else if (res.success) {
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            return { ...c, isLiked: res.liked, likesCount: res.count };
          }
          return c;
        }));
      }
    } catch (err) {
      console.error('Error toggling comment like in mobile:', err);
    }
  };

  const handleDeleteCommentForYou = async (commentId: string, postId: string, dbId: string | null) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este comentario?')) return;
    try {
      const res = await deleteComment(commentId);
      if (res.error) {
        triggerToast(res.error);
      } else if (res.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        triggerToast('Comentario eliminado');
        // Update local count
        const currentCount = commentsCountState[postId] ?? activeFeedPosts.find(p => p.id === postId)?.commentsCount ?? 0;
        setCommentsCountState(prev => ({
          ...prev,
          [postId]: Math.max(0, currentCount - 1)
        }));
      }
    } catch (err) {
      console.error('Error deleting comment in mobile:', err);
    }
  };

  const handleShareToFriend = async (friendId: string, postUrl: string) => {
    setSendingToUserIds(prev => ({ ...prev, [friendId]: true }));
    try {
      const messageText = `Te he compartido una publicación de @${activeSharePost.username} en LiveX: ${postUrl}`;
      const res = await sendDirectMessage(friendId, messageText);
      if (res.error) {
        triggerToast(res.error);
      } else {
        triggerToast('¡Publicación compartida con éxito! ✉️');
      }
    } catch (err) {
      console.error('Error sharing post inside app in mobile:', err);
      triggerToast('Error al compartir.');
    } finally {
      setSendingToUserIds(prev => ({ ...prev, [friendId]: false }));
    }
  };

  // Handlers for follows and likes
  const handleLike = async (post: any) => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (post.dbId) {
      const currentLiked = likesState[post.id]?.liked ?? post.isLiked;
      const currentCount = likesState[post.id]?.count ?? post.likesCount ?? 0;
      
      const newLiked = !currentLiked;
      const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
      
      setLikesState(prev => ({
        ...prev,
        [post.id]: { liked: newLiked, count: newCount }
      }));
      
      try {
        const res = await toggleLikePost(post.dbId);
        if (res.error) {
          setLikesState(prev => ({
            ...prev,
            [post.id]: { liked: currentLiked, count: currentCount }
          }));
        } else if (res.success && typeof res.count === 'number') {
          setLikesState(prev => ({
            ...prev,
            [post.id]: { liked: res.liked ?? newLiked, count: res.count ?? newCount }
          }));
        }
      } catch (err) {
        setLikesState(prev => ({
          ...prev,
          [post.id]: { liked: currentLiked, count: currentCount }
        }));
      }
    } else {
      const currentLiked = likesState[post.id]?.liked ?? false;
      const currentCountStr = post.likes || '0';
      let currentCount = 0;
      if (currentCountStr.endsWith('K')) {
        currentCount = parseFloat(currentCountStr.replace('K', '')) * 1000;
      } else {
        currentCount = parseInt(currentCountStr.replace(/,/g, '')) || 0;
      }
      const newLiked = !currentLiked;
      const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
      
      setLikesState(prev => ({
        ...prev,
        [post.id]: { liked: newLiked, count: newCount }
      }));
    }
  };

  const handleFollow = async (targetUserId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!targetUserId || targetUserId === user.id) return;
    
    setAnimatingFollows(prev => ({ ...prev, [targetUserId]: true }));
    setFollowingState(prev => ({ ...prev, [targetUserId]: true }));
    
    try {
      const res = await toggleFollowUser(targetUserId);
      if (res.error) {
        setFollowingState(prev => ({ ...prev, [targetUserId]: false }));
        setAnimatingFollows(prev => ({ ...prev, [targetUserId]: false }));
      } else {
        setTimeout(() => {
          setAnimatingFollows(prev => {
            const next = { ...prev };
            delete next[targetUserId];
            return next;
          });
        }, 1500);
      }
    } catch (err) {
      setFollowingState(prev => ({ ...prev, [targetUserId]: false }));
      setAnimatingFollows(prev => ({ ...prev, [targetUserId]: false }));
    }
  };

  // Monitor vertical touch scrolling/snapping to update active post
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    if (clientHeight === 0) return;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeIndex && index >= 0 && index < activeFeedPosts.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden select-none">
      
      {/* Top Header */}
      <div className="h-[70px] shrink-0 pt-4 px-4 flex items-center justify-between z-20 bg-[#05050a] border-b border-white/5">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
             <Play className="text-white fill-white w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black tracking-tighter">LiveX</span>
        </div>
        
        {/* Navigation Tabs (Siguiendo, Para ti, Batallas, Explorar) */}
        <div className="flex items-center gap-4 text-[13px] sm:text-[14px] font-bold overflow-x-auto scrollbar-none py-1 pr-2 shrink-0 max-w-[65%]">
          <button 
            onClick={() => setTab('siguiendo')}
            className={`transition-all shrink-0 ${tab === 'siguiendo' ? 'text-white border-b-2 border-pink-500 pb-0.5 font-black' : 'text-zinc-500'}`}
          >
            Siguiendo
          </button>
          <button 
            onClick={() => setTab('parati')}
            className={`transition-all shrink-0 ${tab === 'parati' ? 'text-white border-b-2 border-pink-500 pb-0.5 font-black' : 'text-zinc-500'}`}
          >
            Para ti
          </button>
          
          <Link href="/batallas" className="text-zinc-500 hover:text-white flex items-center gap-0.5 shrink-0">
            Batallas <Swords className="w-3.5 h-3.5" />
          </Link>

          <Link href="/explorar" className="text-zinc-500 hover:text-white flex items-center gap-0.5 shrink-0">
            Explorar <Compass className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        {/* Search Icon */}
        <div className="w-7 h-7 flex items-center justify-end">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Snap Scrollable Feed Area */}
      <div 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-none bg-black relative"
      >
        {activeFeedPosts.map((post: any, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div key={post.id} className="h-full w-full snap-start relative flex flex-col justify-between overflow-hidden bg-black">
              
              {/* 1. MEDIA RENDERING */}
              {post.type === 'stream' && (
                <>
                  <img src={post.mediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Live indicators */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <div className="px-2.5 py-0.5 bg-red-600 text-[9px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> EN VIVO
                    </div>
                    <div className="px-2 py-0.5 bg-black/40 backdrop-blur-md text-[9px] font-black rounded flex items-center gap-1.5 border border-white/10">
                      <Flame className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> {post.viewers}
                    </div>
                  </div>

                  {/* Click to entry button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                     <Link href={post.liveUrl || '/en-vivo'} className="flex items-center gap-2 px-6 py-2.5 bg-purple-600/90 border border-purple-500/30 rounded-full text-white font-black text-xs shadow-[0_4px_12px_rgba(168,85,247,0.4)] transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider">
                       <Tv className="w-4 h-4 text-white animate-bounce" />
                       Haz clic para entrar
                     </Link>
                  </div>
                </>
              )}

              {post.type === 'video' && (
                <MobileVideoPlayer 
                  src={post.mediaUrl || ''} 
                  poster={post.posterUrl} 
                  isActive={isActive} 
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                />
              )}

              {post.type === 'image' && (
                <>
                  <img src={post.mediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-2.5 py-0.5 bg-purple-600/80 backdrop-blur-sm text-[9px] font-black rounded uppercase tracking-wider flex items-center gap-1 border border-purple-500/20">
                      <Image className="w-3.5 h-3.5 text-purple-400" /> FOTO DESTACADA
                    </div>
                  </div>
                </>
              )}

              {post.type === 'battle' && (
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-[#05050a] flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <div className="px-2.5 py-0.5 bg-red-600 text-[9px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <Swords className="w-3.5 h-3.5 animate-pulse" /> PvP BATTLE
                    </div>
                    <div className="px-2 py-0.5 bg-black/40 backdrop-blur-md text-[9px] font-black rounded flex items-center gap-1 border border-white/10">
                      <span className="text-white font-extrabold">{post.timer}</span>
                    </div>
                  </div>

                  {/* Battle split screen */}
                  <div className="flex-1 flex flex-col divide-y divide-purple-500/20 relative">
                    <div className="flex-1 relative overflow-hidden">
                      <img src={post.player1?.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 bg-blue-900/60 border border-blue-500/30 rounded-xl p-1.5">
                        <img src={post.player1?.avatar} className="w-6 h-6 rounded-full bg-zinc-800" alt="" />
                        <span className="text-[10px] font-black text-white">{post.player1?.name}</span>
                      </div>
                    </div>

                    <div className="flex-1 relative overflow-hidden">
                      <img src={post.player2?.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 bg-red-950/60 border border-red-500/30 rounded-xl p-1.5">
                        <img src={post.player2?.avatar} className="w-6 h-6 rounded-full bg-zinc-800" alt="" />
                        <span className="text-[10px] font-black text-white">{post.player2?.name}</span>
                      </div>
                    </div>

                    {/* Progress score bar */}
                    <div className="absolute top-1/2 left-4 right-4 h-2.5 bg-zinc-900 -translate-y-1/2 rounded-full overflow-hidden border border-white/10 z-10 flex">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: '45%' }} />
                      <div className="h-full bg-gradient-to-l from-red-500 to-rose-500" style={{ width: '55%' }} />
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <Link href={post.liveUrl || '/batallas'} className="pointer-events-auto flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 border border-pink-500/20 rounded-full text-white font-black text-[10px] shadow-lg shadow-pink-500/30 active:scale-95 transition-transform uppercase tracking-wider">
                       <Swords className="w-3.5 h-3.5 text-white" /> Entrar PvP
                     </Link>
                  </div>
                </div>
              )}

              {/* 2. OVERLAYS & MOBILE SIDEBAR ACTION MENU */}
              {/* Right Menu */}
              <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-15">
                {/* Avatar & Follow */}
                <div className="relative mb-1">
                  <Link href={`/u/${post.username}`}>
                    <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-lg bg-zinc-800 hover:border-purple-500 transition-colors" alt="" />
                  </Link>
                  {post.userId && post.userId !== user?.id && (!(followingState[post.userId] || followedIds.includes(post.userId)) || animatingFollows[post.userId]) && (
                    <button 
                      onClick={() => handleFollow(post.userId)}
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all duration-700 border border-black ${
                        animatingFollows[post.userId]
                          ? 'bg-green-500 scale-105 opacity-0 rotate-[360deg] pointer-events-none'
                          : 'bg-pink-500 hover:scale-115 active:scale-90 cursor-pointer'
                      }`}
                    >
                      {animatingFollows[post.userId] ? <span className="text-white text-[8px] font-bold">✓</span> : <Plus className="w-2.5 h-2.5 text-white" />}
                    </button>
                  )}
                </div>

                {/* Likes */}
                <div onClick={() => handleLike(post)} className="flex flex-col items-center gap-1 cursor-pointer">
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Heart className={`w-5.5 h-5.5 transition-colors ${
                      (likesState[post.id]?.liked ?? post.isLiked) ? 'text-pink-500 fill-pink-500' : 'text-white'
                    }`} />
                  </button>
                  <span className="text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{
                    (() => {
                      const count = likesState[post.id]?.count ?? post.likesCount ?? 0;
                      return typeof count === 'number' ? (count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count.toString()) : (post.likes || '0');
                    })()
                  }</span>
                </div>

                {/* Comments */}
                <div 
                  onClick={() => {
                    if (!user) {
                      router.push('/login');
                      return;
                    }
                    if (post.dbId) {
                      setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id);
                    } else {
                      triggerToast('Comentarios no disponibles en posts de demostración.');
                    }
                  }}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <MessageCircle className="w-5.5 h-5.5 text-white" />
                  </button>
                  <span className="text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{
                    commentsCountState[post.id] ?? post.commentsCount ?? (typeof post.comments === 'string' ? parseInt(post.comments.replace(/,/g, '')) : 0)
                  }</span>
                </div>

                {/* Send Gift */}
                <div className="flex flex-col items-center gap-1">
                  <button className="w-10 h-10 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 flex items-center justify-center">
                    <Gift className="w-5.5 h-5.5 text-yellow-500 fill-yellow-500/20" />
                  </button>
                  <span className="text-[10px] font-bold text-yellow-500">{post.shares}</span>
                </div>

                {/* Share */}
                <div 
                  onClick={() => {
                    setActiveSharePost(post);
                  }}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Share2 className="w-5.5 h-5.5 text-white" />
                  </button>
                  <span className="text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Compartir</span>
                </div>
              </div>

              {/* Bottom Creator Info & Title Section */}
              <div className="absolute left-3 bottom-20 right-16 z-10 bg-gradient-to-t from-black/50 to-transparent p-2.5 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <Link href={`/u/${post.username}`} className="flex items-center gap-2 group/author">
                    <img src={post.avatar} className="w-7 h-7 rounded-full border border-white/30 bg-zinc-800 group-hover/author:border-purple-500 transition-colors" alt="" />
                    <div className="flex items-center gap-0.5">
                      <span className="font-black text-sm shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover/author:text-purple-400 transition-colors">{post.username}</span>
                      {post.verified && <BadgeCheck className="text-blue-400 w-3.5 h-3.5 drop-shadow-md" />}
                    </div>
                  </Link>
                  {post.userId && post.userId !== user?.id && (!(followingState[post.userId] || followedIds.includes(post.userId)) || animatingFollows[post.userId]) && (
                    <button 
                      onClick={() => handleFollow(post.userId)}
                      className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ml-1.5 transition-all duration-700 ${
                        animatingFollows[post.userId]
                          ? 'bg-green-500 text-white opacity-0 scale-95 pointer-events-none'
                          : 'bg-white/20 backdrop-blur-md border border-white/10 hover:bg-white/30 text-white cursor-pointer'
                      }`}
                    >
                      {animatingFollows[post.userId] ? 'Siguiendo ✓' : 'Seguir'}
                    </button>
                  )}
                </div>
                
                <p className="text-xs text-zinc-100 font-semibold mb-2 leading-relaxed line-clamp-2">
                  {post.title}
                </p>

                {/* Hashtags display */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-[8px] font-black text-purple-400">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-300">
                  <Music className="w-3 h-3 text-zinc-400 animate-spin" />
                  <span className="truncate whitespace-nowrap">{post.music}</span>
                </div>
              </div>

              {/* Comments drawer backdrop for active card */}
              {activeCommentsPostId === post.id && (
                <div 
                  className="absolute inset-0 bg-black/60 z-30 transition-opacity animate-in fade-in duration-200" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCommentsPostId(null);
                  }}
                />
              )}

              {/* Bottom Sheet Drawer for Comments inside Card */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[65%] bg-[#0b0b12]/95 backdrop-blur-md rounded-t-3xl border-t border-white/10 z-40 flex flex-col overflow-hidden transition-transform duration-300 ease-out ${
                  activeCommentsPostId === post.id ? 'translate-y-0' : 'translate-y-full pointer-events-none'
                }`}
              >
                {/* Drawer Header */}
                <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-400">
                    Comentarios ({comments.length})
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCommentsPostId(null);
                    }}
                    className="text-zinc-500 hover:text-white transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-3">
                  {commentsLoading ? (
                    <div className="flex flex-col items-center justify-center p-6 gap-2">
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[9px] text-zinc-500 font-bold">Cargando comentarios...</span>
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment: any) => {
                      const isCommentOwn = user && user.id === comment.userId;
                      const isPostOwn = user && user.id === post.userId;
                      const canDelete = isCommentOwn || isPostOwn;
                      return (
                        <div key={comment.id} className="flex gap-2 items-start text-xs group/item text-left">
                          <Link href={`/u/${comment.user.username}`}>
                            <img 
                              src={comment.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} 
                              className="w-6 h-6 rounded-full border border-white/10 bg-zinc-800 shrink-0 hover:border-purple-500 transition-colors cursor-pointer" 
                              alt="" 
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Link href={`/u/${comment.user.username}`}>
                                <span className="font-extrabold text-white text-[10px] hover:text-purple-400 transition-colors cursor-pointer">@{comment.user.username}</span>
                              </Link>
                              <span className="text-[7px] text-zinc-600 font-medium">
                                {new Date(comment.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <p className="text-zinc-300 break-words pr-2 leading-relaxed text-[10px]">{comment.content}</p>
                          </div>

                          {/* Actions on comment */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleLikeCommentForYou(comment.id);
                              }}
                              className="flex items-center gap-0.5 text-[9px] text-zinc-500 hover:text-pink-500 transition-colors"
                            >
                              <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                              <span className="text-[9px]">{comment.likesCount}</span>
                            </button>
                            {canDelete && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCommentForYou(comment.id, post.id, post.dbId);
                                }}
                                className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                title="Eliminar comentario"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center gap-1.5 mt-4">
                      <MessageCircle className="w-6 h-6 text-zinc-700 animate-pulse" />
                      <h4 className="text-[10px] font-bold text-zinc-500">Sin comentarios todavía</h4>
                      <p className="text-[8px] text-zinc-600 max-w-[120px]">¡Sé el primero en comentar esta publicación!</p>
                    </div>
                  )}
                </div>

                {/* Write Comment Form */}
                <form 
                  onSubmit={(e) => handleCreateCommentForYou(e, post.id, post.dbId)} 
                  className="p-2 border-t border-white/5 bg-[#07070b] shrink-0"
                >
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-2.5 h-9 focus-within:border-purple-500 transition-colors gap-2">
                    <Smile className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Añadir comentario..." 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-[11px] text-white placeholder-zinc-500 font-medium w-full min-w-0"
                      maxLength={300}
                    />
                    <button 
                      type="submit" 
                      disabled={!newCommentText.trim()}
                      className="text-[11px] font-black text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-40 shrink-0"
                    >
                      Publicar
                    </button>
                  </div>

                  {/* Emoji Quick Picker List */}
                  <div className="flex items-center gap-2 mt-1.5 overflow-x-auto py-1 px-1 max-w-full custom-scrollbar">
                    {['❤️', '🔥', '👏', '🙌', '😂', '😍', '😮', '🎉', '💡', '🎮', '⭐️'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewCommentText(prev => prev + emoji);
                        }}
                        className="text-sm hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </form>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-[70px] shrink-0 bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
        <button onClick={() => setTab('inicio')} className="flex flex-col items-center gap-1 text-pink-500">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <Link href="/en-vivo" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
          <Play className="w-6 h-6" />
          <span className="text-[10px] font-bold">Gaming</span>
        </Link>
        
        {/* Center Live Button */}
        <div className="relative -top-4">
          <button 
            onClick={() => setShowQuickActions(true)}
            className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] hover:scale-105 transition-transform"
          >
             <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
          <span className="text-[10px] font-bold">Mensajes</span>
        </Link>
        <Link href={`/u/${user?.username}`} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </Link>
      </div>

      {/* ----------------- MOBILE QUICK ACTIONS OVERLAY (Vision Pro/Esports Style) ----------------- */}
      {showQuickActions && (
        <div className="fixed inset-0 z-50 bg-[#05050ad9] backdrop-blur-xl flex flex-col justify-end p-6 animate-in fade-in duration-200">
          
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowQuickActions(false)} />

          <div className="bg-[#0f0e1a]/95 border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 animate-in slide-in-from-bottom-10 duration-300 max-w-sm mx-auto w-full mb-4">
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Acceso Rápido</h4>
                <h3 className="text-base font-black text-white">LiveX Creator Studio</h3>
              </div>
              <button 
                onClick={() => setShowQuickActions(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              
              {/* 1. Transmitir en vivo */}
              <button 
                onClick={() => {
                  setShowQuickActions(false);
                  router.push('/transmitir');
                }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-1.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Play className="w-5 h-5 fill-purple-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">En Vivo</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Transmitir ahora</span>
              </button>

              {/* 2. Subir video o imagen */}
              <button 
                onClick={() => {
                  setShowQuickActions(false);
                  useCreatorStore.getState().open('upload');
                }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-pink-600/10 to-rose-600/10 border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400 mb-1.5 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  <Plus className="w-5 h-5 text-pink-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Publicar</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Subir video</span>
              </button>

              {/* 3. Batallas PvP */}
              <button 
                onClick={() => {
                  setShowQuickActions(false);
                  router.push('/batallas');
                }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-rose-600/10 to-red-600/10 border border-rose-500/20 hover:border-rose-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-400 mb-1.5 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <Swords className="w-5 h-5 text-rose-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Batallas PvP</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Duelos en vivo</span>
              </button>

              {/* 4. Crear Sala */}
              <button 
                onClick={() => {
                  setShowQuickActions(false);
                  useCreatorStore.getState().open('room');
                }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 mb-1.5 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <Sword className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Crear Sala</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Salas de juego</span>
              </button>

              {/* 5. Recargar monedas */}
              <button 
                onClick={() => {
                  setShowQuickActions(false);
                  useCreatorStore.getState().open('coins');
                }}
                className="col-span-2 flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-600/10 to-yellow-600/10 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:scale-[1.01] text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Coins className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Recargar monedas</span>
                    <span className="text-[9px] text-zinc-500 font-semibold">Compra diamantes LiveX</span>
                  </div>
                </div>
                <Plus className="w-4.5 h-4.5 text-amber-400" />
              </button>

            </div>

            <p className="text-[10px] text-zinc-500 text-center font-bold">LiveX Creator Hub © 2026</p>
          </div>
        </div>
      )}

      {/* Premium Share Modal */}
      {activeSharePost && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveSharePost(null)}>
          <div 
            className="bg-[#0b0b12] border border-purple-500/20 w-full max-w-sm rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.25)] p-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Compartir publicación</h3>
              <button onClick={() => setActiveSharePost(null)} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* External Share Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Mira esta publicación de @' + activeSharePost.username + ' en LiveX: ' + (activeSharePost.dbId ? `${window.location.origin}/post/${activeSharePost.dbId}` : activeSharePost.mediaUrl))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-green-600/10 hover:bg-green-600/20 border border-green-500/30 rounded-xl text-green-400 text-[11px] font-bold transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-green-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.638 1.982 14.19 1.953 12.01 1.953c-5.439 0-9.867 4.373-9.87 9.802-.001 1.761.472 3.478 1.371 5.011L2.453 21.67l5.228-1.374c-.035-.022-.035-.022 0 0z" />
                </svg>
                WhatsApp
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activeSharePost.dbId ? `${window.location.origin}/post/${activeSharePost.dbId}` : activeSharePost.mediaUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 text-[11px] font-bold transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-blue-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>

            {/* Send to App Friends */}
            <div className="border-t border-white/5 pt-3.5">
              <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2.5">Enviar a amigos en LiveX</h4>
              <div className="max-h-[160px] overflow-y-auto custom-scrollbar flex flex-col gap-2">
                {friendsForShare.length > 0 ? (
                  friendsForShare.map((chat: any) => {
                    const isSending = sendingToUserIds[chat.userId] || false;
                    const postUrl = activeSharePost.dbId 
                      ? `${window.location.origin}/post/${activeSharePost.dbId}` 
                      : activeSharePost.mediaUrl;
                    return (
                      <div key={chat.userId} className="flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition-all">
                        <div className="flex items-center gap-2 min-w-0">
                          <img 
                            src={chat.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.username}`} 
                            className="w-6.5 h-6.5 rounded-full border border-white/10 bg-zinc-800 shrink-0" 
                            alt="" 
                          />
                          <span className="text-xs font-bold text-white truncate">@{chat.username}</span>
                        </div>
                        <button 
                          onClick={() => handleShareToFriend(chat.userId, postUrl)}
                          disabled={isSending}
                          className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 active:scale-95 text-[8px] font-black uppercase rounded-full text-white tracking-wider transition-all disabled:opacity-50"
                        >
                          {isSending ? 'Enviando...' : 'Enviar'}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-3 text-[10px] text-zinc-500 font-bold">
                    No tienes chats activos para compartir.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-4 z-[150] bg-[#0e0c1f] border border-purple-500/50 text-white rounded-xl px-4 py-2.5 shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center gap-2 transition-all animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="text-[11px] font-bold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// Sub Component to handle looping HTML5 video player cleanly on mobile touch screens
interface MobileVideoPlayerProps {
  src: string;
  poster?: string;
  isActive: boolean;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
}

function MobileVideoPlayer({ src, poster, isActive, isPlaying, setIsPlaying, isMuted, setIsMuted }: MobileVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      if (isPlaying) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 pointer-events-none" />

      {/* Control overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="px-2 py-0.5 bg-pink-600 text-[9px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Play className="w-3.5 h-3.5 fill-white" /> VIDEO
        </div>
        <button 
          onClick={toggleMute}
          className="w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
        </button>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 cursor-pointer" onClick={togglePlay}>
          <PlayCircle className="w-14 h-14 text-white/80 drop-shadow-2xl animate-pulse" />
        </div>
      )}
    </div>
  );
}
