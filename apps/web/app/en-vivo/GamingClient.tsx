'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Sparkles, Shield, ChevronUp, ChevronDown, Flame, Swords, Star, Send, X, Coins
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';

export default function GamingClient({ user }: { user: any }) {
  const [mobileFullscreenStream, setMobileFullscreenStream] = useState<any | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // Game Center state
  const [userCoins, setUserCoins] = useState(12450);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Followed status simulation
  const [followedStreamers, setFollowedStreamers] = useState<number[]>([]);
  
  // PvP Room countdowns simulation
  const [countdowns, setCountdowns] = useState<Record<number, number>>({
    1: 180,
    2: 240,
    3: 310
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdowns(prev => {
        const next: Record<number, number> = {};
        Object.keys(prev).forEach(key => {
          const id = Number(key);
          const current = prev[id];
          if (current !== undefined) {
            next[id] = current > 0 ? current - 1 : 300;
          }
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFollowToggle = (id: number, name: string) => {
    if (followedStreamers.includes(id)) {
      setFollowedStreamers(prev => prev.filter(x => x !== id));
      triggerToast(`Dejaste de seguir a @${name}`);
    } else {
      setFollowedStreamers(prev => [...prev, id]);
      triggerToast(`¡Ahora sigues a @${name}! 💖`);
    }
  };

  // Gift sending simulation
  const [flyingGifts, setFlyingGifts] = useState<{ id: number, emoji: string }[]>([]);
  const sendGift = (giftName: string, cost: number, emoji: string) => {
    if (userCoins < cost) {
      triggerToast('¡Monedas insuficientes! 🪙 Por favor recarga en tu perfil.');
      return;
    }
    setUserCoins(prev => prev - cost);
    triggerToast(`¡Enviaste un regalo: ${giftName} ${emoji}!`);
    
    // Add flying animation effect
    const newId = Date.now();
    setFlyingGifts(prev => [...prev, { id: newId, emoji }]);
    setTimeout(() => {
      setFlyingGifts(prev => prev.filter(g => g.id !== newId));
    }, 2000);
  };

  const liveStreamers = [
    { id: 1, name: 'NobruFF', avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=150', category: 'Clasificatoria Heroico', views: '15.4K', preview: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'A3FF_Gamer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', category: 'Salas 4vs4 Apostado', views: '8.2K', preview: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=1' },
    { id: 3, name: 'Sura_FF', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', category: 'PvP Apostado $100', views: '6.7K', preview: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'DonatoPlay', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', category: 'Torneo Semanal FF', views: '22.3K', preview: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400' },
    { id: 5, name: 'SofiLive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', category: 'Jugando con Seguidores', views: '4.1K', preview: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=400' },
  ];

  const pvpRooms = [
    { id: 1, name: 'PvP Apostado 4vs4', mode: 'Escuadra vs Escuadra', players: '6/8', fee: '50 Monedas', prize: '800 Monedas', roomID: '2287910', online: true },
    { id: 2, name: 'Sala Solo M1014', mode: '1vs1 Clásico', players: '1/2', fee: '20 Monedas', prize: '320 Monedas', roomID: '8876295', online: true },
    { id: 3, name: 'Torneo Rápido Ráfaga', mode: 'Solo vs Todos', players: '32/50', fee: '100 Monedas', prize: '4,500 Monedas', roomID: '4452109', online: true }
  ];

  const topStreamers = [
    { id: 1, name: 'NobruFF', level: 'Nivel 58', followers: '4.2M', wins: '15,240', avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=150', rank: '#1', glowColor: 'rgba(239, 68, 68, 0.4)' },
    { id: 2, name: 'DonatoPlay', level: 'Nivel 52', followers: '3.6M', wins: '12,980', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', rank: '#2', glowColor: 'rgba(168, 85, 247, 0.4)' },
    { id: 3, name: 'A3FF_Gamer', level: 'Nivel 48', followers: '1.8M', wins: '8,420', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', rank: '#3', glowColor: 'rgba(234, 179, 8, 0.4)' },
  ];

  const mainFeedItems = [
    { id: 1, streamerId: 1, name: 'NobruFF', avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=150', views: '15.4K', title: '💥 PvP INVASIÓN HEROICA CON TODO MI CLAN! Apostando 2000 monedas 💥', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600', category: 'Free Fire · Salas PvP', pvpID: '2287910' },
    { id: 2, streamerId: 3, name: 'Sura_FF', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', views: '6.7K', title: '¿Quién contra mí en 1vs1? M1014 tiro a la cabeza solamente. 🔥', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600', category: 'Free Fire · Retos', pvpID: '8876295' },
    { id: 3, streamerId: 4, name: 'DonatoPlay', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', views: '22.3K', title: 'Torneo Relámpago Free Fire! Entrando con los espectadores en vivo 🏆', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600', category: 'Free Fire · Torneo' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#040408] text-white overflow-hidden relative">
      
      {/* ----------------- DESKTOP SIDEBAR (Perfectly cohesive with following sidebar!) ----------------- */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar hidden lg:flex">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </Link>

        <nav className="flex flex-col gap-1 mb-8">
          <Link href="/dashboard?tab=inicio" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Home className="w-5 h-5" /> Inicio
          </Link>
          <Link href="/dashboard?tab=parati" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Para ti
          </Link>
          <Link href="/dashboard?tab=siguiendo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <User className="w-5 h-5" /> Siguiendo
          </Link>
          <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <Play className="w-5 h-5 text-pink-400" /> Gaming
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
          <Link href={`/u/${user.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
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
             <span className="font-black text-lg">{userCoins.toLocaleString()}</span>
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
      </aside>

      {/* ----------------- CENTRAL WORKSPACE AND FEED ----------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOP COMPACT HEADER (Fully responsive on mobile) */}
        <header className="h-16 border-b border-white/5 px-3 sm:px-4 lg:px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Swords className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-pink-500 shrink-0" />
            <h1 className="text-xs sm:text-base lg:text-lg font-black text-white tracking-wide uppercase flex items-center gap-1 sm:gap-2">
              <span className="sm:hidden">FF Arena</span>
              <span className="hidden sm:inline">Free Fire Arena</span>
              <span className="px-1 py-0.5 sm:px-2 bg-red-500/20 text-red-400 text-[8px] sm:text-[10px] font-black rounded border border-red-500/20 shrink-0">
                <span className="sm:hidden">LIVE</span>
                <span className="hidden sm:inline">LIVE PvP</span>
              </span>
            </h1>

            {/* Glowing modern Torneos navigation link button */}
            <Link 
              href="/torneos" 
              className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/60 text-purple-400 text-[10px] font-black rounded-lg px-2.5 py-1.5 shadow-[0_0_10px_rgba(168,85,247,0.15)] hover:scale-105 transition-transform shrink-0"
            >
              <Trophy className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Torneos</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="w-72 lg:w-96 relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar salas, PvP IDs, streamers..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </div>

          {/* Economy Wallet indicator */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)] shrink-0">
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
              <span className="text-[10px] sm:text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
            </div>
            
            <button className="px-2.5 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-[10px] sm:text-xs font-black hover:scale-105 transition-transform shadow-lg shadow-pink-500/10 shrink-0">Crear PvP</button>
          </div>
        </header>

        {/* SCROLLABLE FEED AND SECTIONS */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6 pb-24">
          
          {/* SECTION 1: TOP LIVE STREAMERS CAROUSEL */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" /> Free Fire Directos Destacados
              </h3>
              <span className="text-[10px] text-zinc-600 font-bold uppercase">Desliza para ver</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar snap-x">
              {liveStreamers.map(streamer => (
                <div 
                  key={streamer.id} 
                  className="w-[190px] shrink-0 snap-start bg-[#0d0c16]/80 border border-white/5 rounded-3xl p-3 flex flex-col justify-between items-center text-center relative group hover:border-pink-500/30 transition-all shadow-md"
                >
                  {/* LIVE Indicator overlay */}
                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow flex items-center gap-0.5">
                    ● {streamer.views}
                  </span>

                  <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-600 to-purple-600 mb-2 mt-2">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#040408]">
                      <img src={streamer.avatar} className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>

                  <h4 className="text-xs font-black text-white flex items-center gap-1">
                    {streamer.name} <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase truncate max-w-full mb-3">{streamer.category}</p>

                  <button 
                    onClick={() => setMobileFullscreenStream(streamer)} 
                    className="w-full py-1.5 bg-pink-600 hover:bg-pink-700 text-[10px] font-black rounded-xl uppercase tracking-wider transition-colors shadow-md shadow-pink-600/10"
                  >
                    Entrar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN DOCK: DUAL PANEL LAYOUT (FEED + RIGHT PANEL) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            
            {/* COLUMN 1 & 2: PRIMARY STREAM FEED */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-pink-500" /> Feed de PvP y Clasificatorias
                </h3>
              </div>

              {mainFeedItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl overflow-hidden shadow-lg group hover:border-purple-500/20 transition-all duration-300"
                >
                  {/* Large thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Stats overlay */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-black rounded flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> EN VIVO
                      </span>
                      <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm border border-white/10 text-[9px] font-black rounded text-zinc-200">
                        ▷ {item.views} VIEWS
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 bg-pink-500/20 text-pink-400 border border-pink-500/20 text-[9px] font-bold rounded uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    {/* Click stream overlay button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-10">
                      <button 
                        onClick={() => setMobileFullscreenStream(item)} 
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-black rounded-full shadow-lg shadow-pink-500/20 uppercase tracking-widest hover:scale-105 transition-transform"
                      >
                        Ver Directo
                      </button>
                    </div>
                  </div>

                  {/* Body & actions */}
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex gap-3">
                        <img src={item.avatar} className="w-10 h-10 rounded-full border border-white/10 object-cover" alt="" />
                        <div>
                          <h4 className="font-black text-sm flex items-center gap-1">
                            {item.name} <BadgeCheck className="w-4 h-4 text-blue-400" />
                          </h4>
                          <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">Streamer de Free Fire</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleFollowToggle(item.id, item.name)}
                          className={`px-3.5 py-1 rounded-full text-[10px] font-black border transition-all ${
                            followedStreamers.includes(item.id) 
                              ? 'bg-purple-600/20 border-purple-500/30 text-purple-300' 
                              : 'bg-white/5 border-transparent text-white hover:bg-white/10'
                          }`}
                        >
                          {followedStreamers.includes(item.id) ? 'Siguiendo ✓' : '+ Seguir'}
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-200 mb-4 line-clamp-2 leading-relaxed">
                      {item.title}
                    </h3>

                    {/* Reactions and Quick Comments bar (Ultra responsive) */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 gap-2">
                      <div className="flex items-center gap-3 sm:gap-6">
                        <button onClick={() => triggerToast('¡Le diste Me gusta! ❤️')} className="flex items-center gap-1 text-zinc-400 hover:text-pink-500 transition-colors shrink-0">
                          <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> 
                          <span className="text-[9px] sm:text-[10px] font-bold">1.2K</span>
                        </button>
                        <button onClick={() => triggerToast('Cargando comentarios... 💬')} className="flex items-center gap-1 text-zinc-400 hover:text-purple-400 transition-colors shrink-0">
                          <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> 
                          <span className="text-[9px] sm:text-[10px] font-bold">245</span>
                        </button>
                        <button onClick={() => triggerToast('Enlace de stream copiado! 🔗')} className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors shrink-0">
                          <Share2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> 
                          <span className="text-[9px] sm:text-[10px] font-bold hidden sm:inline">Compartir</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {item.pvpID && (
                          <button 
                            onClick={() => triggerToast(`¡Entrando a la Sala PvP ID: ${item.pvpID}! ⚔️`)}
                            className="px-2.5 sm:px-3.5 py-1.5 bg-yellow-500 text-black text-[9px] sm:text-[10px] font-black rounded-lg uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                          >
                            Sala PvP
                          </button>
                        )}
                        <button 
                          onClick={() => setMobileFullscreenStream(item)} 
                          className="px-2.5 sm:px-3.5 py-1.5 bg-[#171333] border border-purple-500/20 text-purple-300 text-[9px] sm:text-[10px] font-black rounded-lg uppercase tracking-wider hover:bg-[#1f1a44] transition-colors"
                        >
                          Ver Live
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMN 3: RIGHT PANEL (SALAS PvP ACTIVAS & TOP STREAMERS) */}
            <div className="flex flex-col gap-6">
              
              {/* SUBSECTION A: SALAS PvP ACTIVAS */}
              <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-5 shadow-lg">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Sword className="w-4 h-4 text-pink-500" /> Salas PvP Activas
                </h3>

                <div className="flex flex-col gap-3.5">
                  {pvpRooms.map(room => (
                    <div 
                      key={room.id} 
                      className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col gap-2 relative group hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-black text-purple-400 block leading-tight truncate">{room.name}</span>
                          <span className="text-[8px] text-zinc-500 font-bold uppercase mt-0.5">{room.mode}</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[7px] font-black rounded">
                          🏆 {room.prize}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-zinc-400 mt-1 font-semibold">
                        <span>Jugadores: <strong className="text-white">{room.players}</strong></span>
                        <span>ID: <strong className="text-white">{room.roomID}</strong></span>
                      </div>

                      <div className="h-px bg-white/5 my-0.5" />

                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-zinc-500 font-bold">Inicia en: <strong className="text-pink-400 font-black">{formatCountdown(countdowns[room.id] || 180)}</strong></span>
                        <button 
                          onClick={() => triggerToast(`¡Te uniste a la sala PvP ${room.roomID}! 🎮 Costo: ${room.fee}`)}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-[8px] font-black rounded uppercase tracking-widest text-white transition-colors"
                        >
                          Unirse
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBSECTION B: TOP STREAMERS FF RANKING */}
              <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-5 shadow-lg relative overflow-hidden">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Top Streamers FF
                </h3>

                <div className="flex flex-col gap-4">
                  {topStreamers.map(streamer => (
                    <div 
                      key={streamer.id} 
                      className="flex items-center gap-3.5 bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-all relative overflow-hidden"
                      style={{ boxShadow: `0 0 15px ${streamer.glowColor}` }}
                    >
                      {/* Rank badge */}
                      <span className="absolute top-2 right-3 text-[10px] font-black text-yellow-400 uppercase tracking-widest">{streamer.rank}</span>
                      
                      <img src={streamer.avatar} className="w-10 h-10 rounded-xl object-cover bg-zinc-800 border border-white/10" alt="" />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1 truncate">
                          {streamer.name} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        </h4>
                        <div className="flex items-center gap-2 text-[8px] text-zinc-400 mt-1 font-semibold">
                          <span>{streamer.level}</span>
                          <span>•</span>
                          <span className="text-purple-400">{streamer.followers}</span>
                          <span>•</span>
                          <span className="text-green-400">{streamer.wins} Victorias</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ----------------- MOBILE BOTTOM NAVIGATION BAR ----------------- */}
        <div className="h-[70px] shrink-0 bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5 lg:hidden">
          <Link href="/dashboard?tab=inicio" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Inicio</span>
          </Link>
          <Link href="/en-vivo" className="flex flex-col items-center gap-1 text-pink-500 transition-colors">
            <Play className="w-6 h-6" />
            <span className="text-[10px] font-bold">Gaming</span>
          </Link>
          <div className="relative -top-4">
            <button 
              onClick={() => setShowQuickActions(true)}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] hover:scale-105 transition-transform"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href={`/u/${user.username}`} className="flex flex-col items-center gap-1 text-zinc-500">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Perfil</span>
          </Link>
        </div>

      </main>

      {/* ----------------- MOBILE/PC FULL SCREEN VERTICAL STREAM VIEW (Like Bigo Live & TikTok Fullscreen) ----------------- */}
      {mobileFullscreenStream && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col lg:flex-row justify-center items-center">
          
          {/* Main Visual Stream Player Area */}
          <div className="relative flex-1 w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
            
            <img src={mobileFullscreenStream.preview || mobileFullscreenStream.img} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

            {/* Flying emojis animations container */}
            <div className="absolute bottom-32 right-6 w-20 h-48 pointer-events-none flex flex-col justify-end items-center z-40 overflow-hidden">
              {flyingGifts.map(gift => (
                <div key={gift.id} className="text-3xl animate-bounce mb-2 absolute bottom-0 select-none" style={{ animation: 'bounce 1s infinite alternate' }}>
                  {gift.emoji}
                </div>
              ))}
            </div>

            {/* Back Button */}
            <button 
              onClick={() => setMobileFullscreenStream(null)}
              className="absolute top-4 left-4 z-40 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stream Stats Overlay */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-red-600 text-white text-[9px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow">
                ● EN VIVO
              </span>
              <span className="px-2.5 py-1 bg-black/60 border border-white/10 text-[9px] font-bold rounded-lg text-white">
                ▷ {mobileFullscreenStream.views || '1.2K'} ESPECTADORES
              </span>
            </div>

            {/* Bottom Stream Info & Sliding live comments */}
            <div className="absolute bottom-6 left-4 right-20 z-30 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img src={mobileFullscreenStream.avatar} className="w-9 h-9 rounded-full border border-white/20 object-cover" alt="" />
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-1">
                    {mobileFullscreenStream.name} <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <p className="text-[9px] text-pink-400 font-bold uppercase">{mobileFullscreenStream.category || 'Free Fire PvP'}</p>
                </div>
              </div>

              {/* Chat Comments Area */}
              <div className="max-h-24 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 text-[10px] text-zinc-300 pointer-events-none">
                <p><span className="text-purple-400 font-bold">@ElPro_FF:</span> ¡Qué tiro a la cabeza más loco! 🤯🔫</p>
                <p><span className="text-pink-400 font-bold">@Sura_Gamer:</span> ¿Me dejas entrar al PvP? Soy heroico.</p>
                <p><span className="text-yellow-400 font-bold">@LiveX_System:</span> @{mobileFullscreenStream.name} está arrasando la sala!</p>
              </div>
            </div>

          </div>

          {/* Right Gifting Panel (Style Bigo Live / Facebook Gaming) */}
          <div className="w-full lg:w-[350px] shrink-0 bg-[#0d0c15] border-t lg:border-t-0 lg:border-l border-white/15 p-4 flex flex-col gap-4 z-40">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-bold text-zinc-300">Monedas: <strong className="text-white">{userCoins.toLocaleString()}</strong></span>
              </div>
              <span className="text-[10px] text-pink-500 font-black uppercase tracking-widest">Enviar Regalos</span>
            </div>

            {/* Gifts grid */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: 'Fuego', cost: 10, emoji: '🔥' },
                { name: 'Espadas', cost: 50, emoji: '⚔️' },
                { name: 'Corona', cost: 100, emoji: '👑' },
                { name: 'Diamante', cost: 500, emoji: '💎' },
              ].map(gift => (
                <div 
                  key={gift.name}
                  onClick={() => sendGift(gift.name, gift.cost, gift.emoji)}
                  className="bg-white/5 border border-white/5 rounded-2xl p-2.5 flex flex-col items-center justify-between text-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all"
                >
                  <span className="text-2xl mb-1">{gift.emoji}</span>
                  <span className="text-[8px] font-black text-white block truncate w-full">{gift.name}</span>
                  <span className="text-[8px] text-yellow-500 font-bold mt-0.5">{gift.cost} L</span>
                </div>
              ))}
            </div>

            {/* Quick reaction emojis */}
            <div className="flex gap-2 justify-around pt-2">
              {['👍', '😂', '😮', '😡', '👏'].map(emo => (
                <button 
                  key={emo}
                  onClick={() => {
                    triggerToast(`Reaccionaste con ${emo}`);
                    const newId = Date.now();
                    setFlyingGifts(prev => [...prev, { id: newId, emoji: emo }]);
                    setTimeout(() => {
                      setFlyingGifts(prev => prev.filter(g => g.id !== newId));
                    }, 2000);
                  }}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-lg active:scale-90 transition-transform"
                >
                  {emo}
                </button>
              ))}
            </div>

            {/* Quick Input message */}
            <form onSubmit={(e) => { e.preventDefault(); triggerToast('¡Mensaje enviado al chat!'); }} className="flex gap-2 mt-2">
              <input 
                type="text" 
                placeholder="Di algo increíble..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-pink-500 text-white" 
              />
              <button type="submit" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* ----------------- MOBILE QUICK ACTIONS OVERLAY (Esports/VISION PRO Style) ----------------- */}
      {showQuickActions && (
        <div className="fixed inset-0 z-50 bg-[#05050ad9] backdrop-blur-xl flex flex-col justify-end p-6 animate-in fade-in duration-200">
          
          {/* Close Area */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowQuickActions(false)} />

          {/* Quick Actions Panel */}
          <div className="bg-[#0f0e1a]/95 border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 animate-in slide-in-from-bottom-10 duration-300 max-w-sm mx-auto w-full mb-4">
            
            {/* Header */}
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

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              
              <Link 
                href="/en-vivo" 
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Play className="w-6 h-6 fill-purple-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Transmitir</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Iniciar streaming</span>
              </Link>

              <Link 
                href="/batallas" 
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-pink-600/10 to-rose-600/10 border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-[1.02] text-center relative overflow-hidden group"
              >
                <div className="absolute top-1.5 right-1.5 bg-pink-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                  NEW
                </div>
                <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400 mb-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  <Swords className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Batallas PvP</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Desafiar en vivo</span>
              </Link>

              <Link 
                href="/en-vivo" 
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 mb-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <Sword className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Crear Sala</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Salas PvP Free Fire</span>
              </Link>

              <button 
                onClick={() => {
                  setShowQuickActions(false);
                  triggerToast('¡Monedas cargadas! 💎');
                }}
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center text-cyan-400 mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Coins className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Wallet</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Monedas & Recargas</span>
              </button>

            </div>

            <p className="text-[10px] text-zinc-500 text-center font-bold">LiveX Creator Hub © 2026</p>
          </div>
        </div>
      )}

    </div>
  );
}
