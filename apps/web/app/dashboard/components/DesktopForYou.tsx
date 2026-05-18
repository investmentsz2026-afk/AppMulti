'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  Heart, MessageCircle, Share2, ChevronUp, ChevronDown, BadgeCheck, Music, ChevronRight,
  Volume2, VolumeX, Swords, Coins, Flame, Tv, Image, Gift, PlayCircle, PauseCircle
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function DesktopForYou({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const lastScrollTime = useRef(0);

  // Keyboard navigation
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % FEED_POSTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + FEED_POSTS.length) % FEED_POSTS.length);
  }, []);

  // Handle keydown for Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  // Handle mouse scroll wheeling (Throttled at 800ms)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;

      if (e.deltaY > 0) {
        handleNext();
        lastScrollTime.current = now;
      } else if (e.deltaY < 0) {
        handlePrev();
        lastScrollTime.current = now;
      }
    };

    const container = document.getElementById('desktop-feed-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleNext, handlePrev, activeIndex]);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden select-none">
      
      {/* Left Sidebar */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </Link>

        <nav className="flex flex-col gap-1 mb-8">
          <button 
            onClick={() => setTab('inicio')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'inicio' ? 'bg-white/5 text-purple-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Home className="w-5 h-5" /> Inicio
          </button>
          <button 
            onClick={() => setTab('parati')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'parati' ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Play className="w-5 h-5" /> Para ti
          </button>
          <button 
            onClick={() => setTab('siguiendo')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'siguiendo' ? 'bg-white/5 text-purple-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <User className="w-5 h-5" /> Siguiendo
          </button>
          <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Gaming
          </Link>
          <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Compass className="w-5 h-5" /> Explorar
          </Link>
          <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Sword className="w-5 h-5" /> Batallas
          </Link>
          <Link href="/torneos" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Trophy className="w-5 h-5" /> Torneos
          </Link>
        </nav>

        <nav className="flex flex-col gap-1 mb-8">
          <Link href="/mensajes" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Mensajes</div>
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href="/notificaciones" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notificaciones</div>
            <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
          </Link>
          <Link href={`/u/${user?.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <User className="w-5 h-5" /> Perfil
          </Link>
          <Link href="/wallet" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Wallet className="w-5 h-5" /> Wallet
          </Link>
        </nav>

        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-8">
          <Plus className="w-5 h-5" /> Transmitir en vivo
        </button>

        {/* Monedas Card */}
        <div className="bg-[#12152b] rounded-xl p-4 mb-4 border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-zinc-400">Monedas</span>
             <ChevronRight className="w-4 h-4 text-zinc-500" />
           </div>
           <div className="flex items-center gap-2 mb-3">
             <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                <span className="text-[10px] font-black text-black">L</span>
             </div>
             <span className="font-black text-lg">12,450</span>
           </div>
           <button className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
        </div>

        {/* XP Progress Card */}
        <div className="bg-[#12152b] rounded-xl p-4 mb-8 border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-zinc-400">Nivel 24</span>
             <span className="text-[10px] font-black text-purple-400">75%</span>
           </div>
           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
             <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%]" />
           </div>
        </div>

        <div className="mt-auto flex items-center gap-2 px-2 py-3 border-t border-white/5">
          <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user?.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* Main Content: Vertical TikTok Style Feed */}
      <main id="desktop-feed-container" className="flex-1 flex justify-center items-center bg-[#050508] relative h-full">
        
        {/* Header absolute on top */}
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-30 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            <button 
              onClick={() => setTab('parati')}
              className={`px-6 py-1.5 rounded-full text-sm font-black uppercase tracking-wider transition-all ${tab === 'parati' ? 'text-white bg-white/10 shadow-lg' : 'text-zinc-400 hover:text-white'}`}
            >
              Para ti
            </button>
            <button 
              onClick={() => setTab('siguiendo')}
              className={`px-6 py-1.5 rounded-full text-sm font-black uppercase tracking-wider transition-all ${tab === 'siguiendo' ? 'text-white bg-white/10 shadow-lg' : 'text-zinc-400 hover:text-white'}`}
            >
              Siguiendo
            </button>
          </div>
          
          <div className="w-80 relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Buscar streams, videos..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500 backdrop-blur-md font-semibold"
            />
          </div>
        </div>

        {/* Dynamic Post Feed Wrapper */}
        <div className="relative h-[90%] w-full max-w-[460px] flex items-center justify-center py-4">
          
          {FEED_POSTS.map((post, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div 
                key={post.id}
                className={`absolute w-full h-full rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)] border border-white/10 transition-all duration-700 bg-black flex flex-col justify-between ${
                  isActive 
                    ? 'opacity-100 scale-100 translate-y-0 z-20 pointer-events-auto' 
                    : 'opacity-0 scale-95 translate-y-[100px] z-10 pointer-events-none'
                }`}
              >
                {/* 1. MEDIA RENDERING */}
                {post.type === 'stream' && (
                  <>
                    <img src={post.mediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Live indicator top left */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <div className="px-2.5 py-1 bg-pink-600 text-[9px] font-black rounded uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> EN VIVO
                      </div>
                      <div className="px-2 py-1 bg-black/40 backdrop-blur-md text-[9px] font-black rounded flex items-center gap-1.5 border border-white/10">
                        <Flame className="w-3.5 h-3.5 text-pink-500 animate-pulse" /> {post.viewers}
                      </div>
                    </div>

                    {/* Immersive Visualizer overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <Link href={post.liveUrl || '/en-vivo'} className="pointer-events-auto flex items-center gap-2.5 px-6 py-3 bg-purple-600/90 hover:bg-purple-700 backdrop-blur-md border border-purple-500/50 rounded-full text-white font-black text-xs shadow-[0_4px_25px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                         <Tv className="w-4 h-4 text-white animate-bounce" />
                         Entrar al Stream Live
                       </Link>
                    </div>
                  </>
                )}

                {post.type === 'video' && (
                  <VideoPlayer 
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-2.5 py-1 bg-purple-600/80 backdrop-blur-sm text-[9px] font-black rounded uppercase tracking-widest flex items-center gap-1 shadow-lg border border-purple-500/30">
                        <Image className="w-3.5 h-3.5 text-purple-400" /> GALERÍA FOTO
                      </div>
                    </div>
                  </>
                )}

                {post.type === 'battle' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-[#05050a] flex flex-col justify-between overflow-hidden">
                    {/* Live battle indicator top left */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <div className="px-2.5 py-1 bg-red-600 text-[9px] font-black rounded uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <Swords className="w-3.5 h-3.5 text-white animate-pulse" /> LIVE BATTLE PvP
                      </div>
                      <div className="px-2 py-1 bg-black/40 backdrop-blur-md text-[9px] font-black rounded flex items-center gap-1 border border-white/10">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <span className="text-white font-extrabold">{post.timer}</span>
                      </div>
                    </div>

                    {/* Splitscreen battle layout */}
                    <div className="flex-1 flex flex-col divide-y divide-purple-500/20 relative">
                      {/* Player 1 Top */}
                      <div className="flex-1 relative overflow-hidden group">
                        <img src={post.player1?.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 bg-blue-900/60 border border-blue-500/30 rounded-xl p-1.5">
                          <img src={post.player1?.avatar} className="w-7 h-7 rounded-full bg-zinc-800" alt="" />
                          <div className="text-[10px]">
                            <p className="font-black text-white">{post.player1?.name}</p>
                            <p className="text-blue-300 font-bold">{post.player1?.score.toLocaleString()} pts</p>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                          {post.player1?.wins} Victorias
                        </div>
                      </div>

                      {/* Player 2 Bottom */}
                      <div className="flex-1 relative overflow-hidden group">
                        <img src={post.player2?.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 bg-red-950/60 border border-red-500/30 rounded-xl p-1.5">
                          <img src={post.player2?.avatar} className="w-7 h-7 rounded-full bg-zinc-800" alt="" />
                          <div className="text-[10px]">
                            <p className="font-black text-white">{post.player2?.name}</p>
                            <p className="text-red-300 font-bold">{post.player2?.score.toLocaleString()} pts</p>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                          {post.player2?.wins} Victorias
                        </div>
                      </div>

                      {/* Dynamic Battle Progress Meter */}
                      <div className="absolute top-1/2 left-4 right-4 h-3 bg-zinc-900 -translate-y-1/2 rounded-full overflow-hidden border border-white/10 z-10 flex">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '45%' }} />
                        <div className="h-full bg-gradient-to-l from-red-500 to-rose-500 transition-all duration-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ width: '55%' }} />
                      </div>
                    </div>

                    {/* Battle click visualizer button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <Link href={post.liveUrl || '/batallas'} className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 border border-pink-500/30 rounded-full text-white font-black text-[10px] shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-all uppercase tracking-widest">
                         <Swords className="w-3.5 h-3.5 text-white animate-spin" /> Ver Batalla PvP
                       </Link>
                    </div>
                  </div>
                )}

                {/* 2. OVERLAYS & SIDEBAR ACTION MENU */}
                {/* Right Floating TikTok Sidebar */}
                <div className="absolute bottom-24 right-4 flex flex-col items-center gap-5 z-30">
                  {/* Creator Avatar & Follow Button */}
                  <div className="relative mb-2">
                    <img src={post.avatar} className="w-11 h-11 rounded-full border-2 border-white shadow-lg bg-zinc-800" alt="" />
                    <button className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border border-black">
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>

                  {/* Likes */}
                  <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <button className="w-11 h-11 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/10 border border-white/10 transition-colors shadow-lg">
                      <Heart className="w-5.5 h-5.5 text-white group-hover:fill-pink-500 group-hover:text-pink-500 transition-colors" />
                    </button>
                    <span className="text-[10px] font-black text-zinc-300 drop-shadow-md">{post.likes}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <button className="w-11 h-11 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/10 border border-white/10 transition-colors shadow-lg">
                      <MessageCircle className="w-5.5 h-5.5 text-white group-hover:fill-white transition-colors" />
                    </button>
                    <span className="text-[10px] font-black text-zinc-300 drop-shadow-md">{post.comments}</span>
                  </div>

                  {/* Share / Send Gift */}
                  <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <button className="w-11 h-11 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-md rounded-full flex items-center justify-center hover:from-yellow-500/30 hover:to-amber-500/30 border border-yellow-500/30 transition-colors shadow-lg animate-pulse">
                      <Gift className="w-5.5 h-5.5 text-yellow-500 fill-yellow-500/20" />
                    </button>
                    <span className="text-[10px] font-black text-yellow-500 drop-shadow-md">Regalar</span>
                  </div>

                  {/* Share link */}
                  <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <button className="w-11 h-11 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/10 border border-white/10 transition-colors shadow-lg">
                      <Share2 className="w-5.5 h-5.5 text-white" />
                    </button>
                    <span className="text-[10px] font-black text-zinc-300 drop-shadow-md">Compartir</span>
                  </div>
                </div>

                {/* Bottom Creator Info & Title Section */}
                <div className="absolute left-4 bottom-4 right-20 z-10 bg-gradient-to-t from-black/40 to-transparent p-3 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={post.avatar} className="w-8 h-8 rounded-full border border-white/30 bg-zinc-800" alt="" />
                    <div className="text-xs">
                      <div className="font-black text-white flex items-center gap-0.5 hover:underline cursor-pointer">
                        {post.username} 
                        {post.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 inline" />}
                      </div>
                      <div className="text-[9px] text-zinc-400">@usuario_livex</div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-100 font-semibold mb-2 leading-relaxed">
                    {post.title}
                  </p>

                  {/* Hashtags display */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-black text-purple-400 hover:underline cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Music bar rotation */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-300 overflow-hidden max-w-full">
                    <Music className="w-3.5 h-3.5 shrink-0 text-zinc-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="truncate whitespace-nowrap">{post.music}</span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Up/Down Scroll Controls (Perfect matching TikTok layout) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
          <button 
            onClick={handlePrev}
            className="w-11 h-11 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xl hover:scale-105"
            title="Anterior (Flechita Arriba)"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>
          <span className="text-[10px] font-black text-zinc-500 uppercase text-center tracking-widest">{activeIndex + 1} / {FEED_POSTS.length}</span>
          <button 
            onClick={handleNext}
            className="w-11 h-11 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xl hover:scale-105"
            title="Siguiente (Flechita Abajo)"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>

      </main>
    </div>
  );
}

// Sub Component to handle looping HTML5 video player cleanly
interface VideoPlayerProps {
  src: string;
  poster?: string;
  isActive: boolean;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
}

function VideoPlayer({ src, poster, isActive, isPlaying, setIsPlaying, isMuted, setIsMuted }: VideoPlayerProps) {
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

      {/* Floating video control indicators overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="px-2.5 py-1 bg-pink-600 text-[9px] font-black rounded uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
          <Play className="w-3.5 h-3.5 fill-white" /> MULTIMEDIA VIDEO
        </div>
        <button 
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
        </button>
      </div>

      {/* Big Play/Pause Button indicator inside the video */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 cursor-pointer" onClick={togglePlay}>
          <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-2xl animate-ping" />
        </div>
      )}
    </div>
  );
}
