'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Compass, Plus, MessageSquare, User, 
  Search, Crown, Heart, MessageCircle, Share2, 
  Gift, Play, BadgeCheck, Swords, Sword, Coins, X, Music, Volume2, VolumeX, Flame, Tv, Image, PlayCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';
import { usePublicPosts, DBPost } from '@/hooks/usePosts';

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

  const userStream = isLive && user ? {
    id: 'my-live-stream-post',
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
    comments: '0',
    shares: '0',
    liveUrl: `/live/${user.username}`,
    isUserOwnStream: true
  } : null;

  // Convert DB posts to feed format
  const dbFeedPosts = dbPosts.map((p: DBPost) => ({
    id: `db-${p.id}`,
    type: p.type === 'VIDEO' ? 'video' : 'image',
    username: p.user.username,
    avatar: p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.username}`,
    verified: false,
    title: p.title,
    mediaUrl: p.url,
    posterUrl: p.type === 'VIDEO' ? undefined : undefined,
    tags: ['Contenido', 'LiveX'],
    music: `Publicación - ${p.user.username}`,
    likes: '0',
    comments: '0',
    shares: '0'
  }));

  const activeFeedPosts = [
    ...(userStream ? [userStream] : []),
    ...dbFeedPosts,
    ...FEED_POSTS
  ];

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
                  <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-lg bg-zinc-800" alt="" />
                  <button className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 bg-pink-500 rounded-full flex items-center justify-center border border-black hover:scale-115 active:scale-90 transition-transform">
                    <Plus className="w-2.5 h-2.5 text-white" />
                  </button>
                </div>

                {/* Likes */}
                <div className="flex flex-col items-center gap-1">
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Heart className="w-5.5 h-5.5 text-white" />
                  </button>
                  <span className="text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{post.likes}</span>
                </div>

                {/* Comments */}
                <div className="flex flex-col items-center gap-1">
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <MessageCircle className="w-5.5 h-5.5 text-white" />
                  </button>
                  <span className="text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{post.comments}</span>
                </div>

                {/* Send Gift */}
                <div className="flex flex-col items-center gap-1">
                  <button className="w-10 h-10 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 flex items-center justify-center">
                    <Gift className="w-5.5 h-5.5 text-yellow-500 fill-yellow-500/20" />
                  </button>
                  <span className="text-[10px] font-bold text-yellow-500">{post.shares}</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center gap-1">
                  <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Share2 className="w-5.5 h-5.5 text-white" />
                  </button>
                  <span className="text-[10px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Share</span>
                </div>
              </div>

              {/* Bottom Creator Info & Title Section */}
              <div className="absolute left-3 bottom-20 right-16 z-10 bg-gradient-to-t from-black/50 to-transparent p-2.5 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <img src={post.avatar} className="w-7 h-7 rounded-full border border-white/30 bg-zinc-800" alt="" />
                  <div className="flex items-center gap-0.5">
                    <span className="font-black text-sm shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{post.username}</span>
                    {post.verified && <BadgeCheck className="text-blue-400 w-3.5 h-3.5 drop-shadow-md" />}
                  </div>
                  <button className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-wider border border-white/10 ml-1.5">Seguir</button>
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

        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
          <span className="text-[10px] font-bold">Mensajes</span>
        </button>
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
