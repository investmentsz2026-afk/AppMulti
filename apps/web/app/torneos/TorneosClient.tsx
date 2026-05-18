'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Sparkles, Shield, ChevronUp, ChevronDown, Flame, Swords, Star, Send, X, Coins
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function TorneosClient({ user }: { user: any }) {
  const router = useRouter();

  // Wallet and coins
  const [userCoins, setUserCoins] = useState(12450);

  // States
  const [activeCategory, setActiveCategory] = useState('Free Fire');
  const [activeRankingTab, setActiveRankingTab] = useState<'jugadores' | 'equipos' | 'donadores'>('jugadores');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'vivo' | 'proximos' | 'destacados' | 'mis'>('vivo');

  // Live countdown timer state (Copa Live X Free Fire)
  const [countdown, setCountdown] = useState({ hrs: 2, mins: 45, secs: 30 });

  // Arena/Bracket Modal
  const [activeArenaTournament, setActiveArenaTournament] = useState<any | null>(null);
  const [selectedPredictionTeam, setSelectedPredictionTeam] = useState<string | null>(null);
  const [predictionMessage, setPredictionMessage] = useState('');
  const [flyingReactionEmojis, setFlyingReactionEmojis] = useState<{ id: number; char: string; x: number; y: number }[]>([]);
  const [arenaChatMessages, setArenaChatMessages] = useState([
    { id: 1, user: 'SofiLive', text: '¡VAMOS TEAM COBRA! 🐍🔥', time: '16:02' },
    { id: 2, user: 'AndrésGG', text: 'Gran tiro de Diego, espectacular la zona', time: '16:02' },
    { id: 3, user: 'GamerX', text: 'Esa granada definió la ronda, increíble', time: '16:03' },
    { id: 4, user: 'DiegoStream', text: '¡Seguimos de pie gente! Apoyen con regalos! 💎', time: '16:03' }
  ]);
  const [newArenaMessage, setNewArenaMessage] = useState('');
  const arenaChatEndRef = useRef<HTMLDivElement>(null);

  // Ticking live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hrs > 0) {
          return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        } else {
          return { hrs: 2, mins: 45, secs: 30 }; // resets
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll arena chat internally
  useEffect(() => {
    if (arenaChatEndRef.current) {
      arenaChatEndRef.current.scrollTop = arenaChatEndRef.current.scrollHeight;
    }
  }, [arenaChatMessages]);

  const handleLogout = async () => {
    await logoutUser();
  };

  // Mock categories
  const categories = [
    { name: 'Free Fire', count: 12, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300' },
    { name: 'Valorant', count: 8, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300' },
    { name: 'Fortnite', count: 5, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' },
    { name: 'Call of Duty', count: 7, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300' },
    { name: 'EA FC 24', count: 5, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300' },
    { name: 'League of Legends', count: 4, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' }
  ];

  // Mock live tournaments
  const liveTournaments = [
    {
      id: 'torneo-1',
      title: 'COPA LIVE X FREE FIRE',
      phase: 'GRAN FINAL',
      prize: '$50,000',
      viewers: '25.6K',
      slots: '16/16',
      organizer: 'LiveX Esports',
      duration: '4 horas',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'torneo-2',
      title: 'VALORANT MASTERS CUP',
      phase: 'SEMIFINAL',
      prize: '$20,000',
      viewers: '12.4K',
      slots: '8/8',
      organizer: 'Riot Games Latam',
      duration: '6 horas',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'torneo-3',
      title: 'COD: LEGENDS CUP',
      phase: 'FASE 3',
      prize: '$15,000',
      viewers: '8.7K',
      slots: '12/12',
      organizer: 'Activision Arena',
      duration: '3 días',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'torneo-4',
      title: 'STREAMER BATTLE ARENA',
      phase: 'RONDA 2',
      prize: '$10,000',
      viewers: '6.2K',
      slots: '4/4',
      organizer: 'Twitch Rivals Latam',
      duration: '2 horas',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&flip=1'
    }
  ];

  // Mock upcoming tournaments
  const upcomingTournaments = [
    {
      id: 'up-1',
      title: 'FORTNITE CHAMPIONS CUP',
      startsIn: '02:45:30',
      date: '25 MAY • 6:00 PM',
      slots: '32/32',
      prize: '$30,000',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'up-2',
      title: 'VALORANT CLASH SERIES',
      startsIn: '05:10:20',
      date: '26 MAY • 5:00 PM',
      slots: '16/16',
      prize: '$10,000',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'up-3',
      title: 'EA FC 24 ULTIMATE CUP',
      startsIn: '10:20:15',
      date: '27 MAY • 7:00 PM',
      slots: '16/16',
      prize: '$8,000',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'up-4',
      title: 'LEAGUE OF LEGENDS RIFT WARS',
      startsIn: '12:45:30',
      date: '28 MAY • 6:00 PM',
      slots: '16/16',
      prize: '$12,000',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400&flip=1'
    }
  ];

  // Gift sending triggers
  const triggerGift = (giftEmoji: string, giftName: string, cost: number) => {
    if (userCoins < cost) {
      alert('¡Monedas insuficientes! Por favor recarga en tu Wallet 💎');
      return;
    }
    setUserCoins(prev => prev - cost);
    
    // Add to chat messages
    const newMsg = {
      id: Date.now(),
      user: 'Tú',
      text: `Envió un regalo: ${giftName} ${giftEmoji}`,
      time: 'Ahora'
    };
    setArenaChatMessages(prev => [...prev, newMsg]);

    // Flying animations
    for (let i = 0; i < 5; i++) {
      const newId = Date.now() + Math.random();
      setFlyingReactionEmojis(prev => [
        ...prev, 
        { 
          id: newId, 
          char: giftEmoji, 
          x: Math.random() * 200 - 100, 
          y: Math.random() * -100 - 50 
        }
      ]);
      setTimeout(() => {
        setFlyingReactionEmojis(prev => prev.filter(g => g.id !== newId));
      }, 2000);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white overflow-hidden font-sans">
      
      {/* ------------------- DESKTOP SIDEBAR ------------------- */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar hidden lg:flex">
        
        {/* Brand logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </div>

        {/* Primary Navigation */}
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
          <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Gaming
          </Link>
          <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Compass className="w-5 h-5" /> Explorar
          </Link>
          <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Sword className="w-5 h-5" /> Batallas
          </Link>
          <Link href="/torneos" className="flex items-center gap-3 px-3 py-2.5 text-white bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-500/20 rounded-xl transition-colors font-black shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Trophy className="w-5 h-5 text-purple-400" /> Torneos
          </Link>
        </nav>

        {/* Secondary Navigation */}
        <nav className="flex flex-col gap-1 mb-8">
          <Link href="/mensajes" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Mensajes</div>
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href={`/u/${user?.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <User className="w-5 h-5" /> Perfil
          </Link>
          <Link href="/wallet" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Wallet className="w-5 h-5" /> Wallet
          </Link>
        </nav>

        {/* Streaming Go Live Button */}
        <button 
          onClick={() => router.push('/en-vivo')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-8 text-xs uppercase tracking-wider"
        >
          <Plus className="w-4.5 h-4.5" /> Transmitir en vivo
        </button>

        {/* Wallet info panel */}
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
          <button 
            onClick={() => setUserCoins(prev => prev + 5000)}
            className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors"
          >
            Comprar monedas
          </button>
        </div>

        {/* Level preview panel */}
        <div className="bg-[#12152b] rounded-xl p-4 border border-white/5 mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10" alt="" />
            <div>
              <div className="text-[11px] font-bold flex items-center gap-0.5">{user?.username} <BadgeCheck className="w-3 h-3 text-blue-400" /></div>
              <div className="text-[9px] text-zinc-500 font-semibold">Nivel 24</div>
            </div>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-1">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-[75%]" />
          </div>
          <div className="text-[8px] text-zinc-500 text-right font-bold">75% para nivel 25</div>
        </div>

      </aside>

      {/* ------------------- MAIN WRAPPER ------------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* ------------------- MOBILE HEADER (Matching Screenshot exactly!) ------------------- */}
        <div className="flex flex-col shrink-0 z-20 bg-[#05050a] border-b border-white/5 lg:hidden">
          {/* Row 1: Main Header Bar */}
          <div className="h-[60px] px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Back to Gaming button */}
              <Link href="/en-vivo" className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-black text-zinc-300 hover:text-white transition-all active:scale-95 shrink-0">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Gaming</span>
              </Link>
              <span className="w-[1px] h-4 bg-white/10 shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-black tracking-tight text-white">Torneos</span>
              </div>
            </div>

            {/* Right icons (Crown, Coins, Search) */}
            <div className="flex items-center gap-2.5">
              <button className="text-zinc-400 hover:text-yellow-400 transition-colors shrink-0">
                <Crown className="w-4 h-4" />
              </button>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-[0_0_8px_rgba(234,179,8,0.1)] shrink-0">
                <Coins className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] font-black text-yellow-500">12.5K</span>
              </div>
              <button className="text-zinc-400 hover:text-white transition-colors shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Row 2: Sub-tabs matching screenshot */}
          <div className="flex items-center gap-6 px-4 pb-2 pt-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'vivo', label: 'En vivo' },
              { id: 'proximos', label: 'Próximos' },
              { id: 'destacados', label: 'Destacados' },
              { id: 'mis', label: 'Mis torneos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMobileActiveTab(tab.id as any)}
                className={`text-[12px] font-black uppercase tracking-wider pb-1.5 transition-all shrink-0 border-b-2 ${
                  mobileActiveTab === tab.id
                    ? 'border-purple-600 text-white font-black'
                    : 'border-transparent text-zinc-500 font-bold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------- DESKTOP HEADER ------------------- */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20 hidden lg:flex">
          
          {/* Tournament search bar */}
          <div className="w-72 lg:w-96 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar torneos, juegos, equipos..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </div>

          {/* User profile & Create action */}
          <div className="flex items-center gap-4">
            
            <button className="text-zinc-400 hover:text-yellow-400 transition-colors">
              <Crown className="w-4.5 h-4.5" />
            </button>

            <button className="text-zinc-400 hover:text-white relative transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </button>

            {/* Wallet economy quick display */}
            <div 
              onClick={() => setUserCoins(prev => prev + 2500)}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)] shrink-0 cursor-pointer"
            >
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
            </div>

            {/* Create Tournament Button */}
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-[0_4px_12px_rgba(236,72,153,0.2)]"
            >
              + Crear torneo
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-0.5">{user?.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● Esports Competidor</div>
              </div>
            </div>

          </div>
        </header>

        {/* ------------------- SCROLLABLE CONTENT BODY ------------------- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 space-y-8 bg-[#05050a]">

          {/* DYNAMIC TABBED VIEW FOR MOBILE / FULL ESports PANELS FOR PC */}

          {/* 1. HERO + RANKINGS SECTION */}
          <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${
            mobileActiveTab === 'vivo' || mobileActiveTab === 'destacados' ? 'block xl:grid' : 'hidden xl:grid'
          }`}>
            {/* HERO PRINCIPAL SECTION (Copa Live X Free Fire) */}
            <div className={`xl:col-span-2 rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl h-[340px] sm:h-[400px] ${
              mobileActiveTab === 'vivo' ? 'block' : 'hidden xl:block'
            }`}>
              
              {/* Cinematic Image Background */}
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Free Fire Arena Tournament"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050af2] via-[#05050a7c] to-black/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />

              {/* Badges on top */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="px-3 py-1 bg-red-600 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> TORNEO PRINCIPAL EN VIVO
                </div>
              </div>

              {/* Countdown bottom left info */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-10">
                <div className="space-y-2">
                  <span className="text-pink-500 text-xs font-black uppercase tracking-widest">Gran Final</span>
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md leading-tight">
                    COPA LIVE X FREE FIRE
                  </h1>

                  {/* Rewards, slots and details row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-300">
                    <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-2.5 py-1 text-yellow-500">
                      <Coins className="w-4 h-4" />
                      <span>Premio: <strong className="font-black">$50,000</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1">
                      <UsersIcon className="w-4 h-4 text-purple-400" />
                      <span>Equipos: <strong className="text-white">16 / 16</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1">
                      <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>Viewers: <strong className="text-white">25.6K</strong></span>
                    </div>
                  </div>
                </div>

                {/* Live Countdown Clock and CTA button */}
                <div className="flex flex-col gap-2 items-stretch shrink-0 w-full sm:w-auto">
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex gap-4 text-center justify-center">
                    <div>
                      <div className="text-lg font-black text-white">{countdown.hrs.toString().padStart(2, '0')}</div>
                      <div className="text-[8px] font-bold text-zinc-400 uppercase">HORAS</div>
                    </div>
                    <div className="text-lg font-black text-zinc-500">:</div>
                    <div>
                      <div className="text-lg font-black text-white">{countdown.mins.toString().padStart(2, '0')}</div>
                      <div className="text-[8px] font-bold text-zinc-400 uppercase">MINS</div>
                    </div>
                    <div className="text-lg font-black text-zinc-500">:</div>
                    <div>
                      <div className="text-lg font-black text-white text-red-500">{countdown.secs.toString().padStart(2, '0')}</div>
                      <div className="text-[8px] font-bold text-zinc-400 uppercase">SEG</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveArenaTournament(liveTournaments[0])}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black py-3 px-6 rounded-2xl shadow-lg shadow-pink-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-center"
                  >
                    <Trophy className="w-4 h-4" /> Ver torneo en vivo
                  </button>
                </div>
              </div>

            </div>

            {/* INTERACTIVE RANKINGS SIDEBAR PANEL (Desktop) */}
            <div className={`bg-[#0a0a0f]/90 border border-white/5 rounded-3xl p-5 shadow-2xl flex flex-col relative overflow-hidden h-[340px] sm:h-[400px] ${
              mobileActiveTab === 'destacados' ? 'flex' : 'hidden xl:flex'
            }`}>
              <div className="absolute top-0 left-0 w-24 h-24 bg-purple-600/5 blur-2xl rounded-full" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Ranking Global</h3>
                <span className="text-[9px] text-pink-500 font-bold uppercase tracking-wider">LiveX Arena</span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-xl p-1 mb-4 text-center">
                {(['jugadores', 'equipos', 'donadores'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveRankingTab(tab)}
                    className={`py-1.5 text-[10px] font-black rounded-lg uppercase transition-all ${
                      activeRankingTab === tab 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Rankings List */}
              <div className="flex-1 overflow-y-auto scrollbar-none space-y-3">
                {activeRankingTab === 'jugadores' && [
                  { rank: 1, name: 'AndrésGG', pts: '125.4K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres' },
                  { rank: 2, name: 'DiegoStream', pts: '98.7K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego' },
                  { rank: 3, name: 'SofiLive', pts: '76.5K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofi' },
                  { rank: 4, name: 'MartinCV', pts: '64.2K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martin' },
                  { rank: 5, name: 'NickyPlay', pts: '52.1K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nicky' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black w-4 text-center ${item.rank === 1 ? 'text-yellow-400' : item.rank === 2 ? 'text-zinc-300' : item.rank === 3 ? 'text-amber-600' : 'text-zinc-500'}`}>
                        {item.rank}
                      </span>
                      <img src={item.avatar} className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10" alt="" />
                      <span className="text-[11px] font-black">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-purple-400">{item.pts}</span>
                  </div>
                ))}

                {activeRankingTab === 'equipos' && [
                  { rank: 1, name: 'Cobra Team', pts: '12 victorias', avatar: '🐍' },
                  { rank: 2, name: 'Titans Esports', pts: '10 victorias', avatar: '⚡' },
                  { rank: 3, name: 'Phoenix Clan', pts: '9 victorias', avatar: '🔥' },
                  { rank: 4, name: 'Viper Squad', pts: '7 victorias', avatar: '🦂' },
                  { rank: 5, name: 'Ice Wolves', pts: '6 victorias', avatar: '🐺' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black w-4 text-center text-zinc-400">{item.rank}</span>
                      <span className="text-lg">{item.avatar}</span>
                      <span className="text-[11px] font-black">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-pink-400">{item.pts}</span>
                  </div>
                ))}

                {activeRankingTab === 'donadores' && [
                  { rank: 1, name: 'AlexM', pts: '12,450 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
                  { rank: 2, name: 'ValenLG', pts: '8,760 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valen' },
                  { rank: 3, name: 'CamiLove', pts: '6,540 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cami' },
                  { rank: 4, name: 'Zeta', pts: '5,420 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeta' },
                  { rank: 5, name: 'ElKomanche', pts: '4,210 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Komanche' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black w-4 text-center text-zinc-400">{item.rank}</span>
                      <img src={item.avatar} className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10" alt="" />
                      <span className="text-[11px] font-black">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-yellow-500">{item.pts}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* 2. CATEGORIES SECTION (Horizontal Scroll) */}
          <div className={`space-y-4 ${
            mobileActiveTab === 'destacados' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black uppercase tracking-widest text-zinc-200">Categorías</h2>
              <span className="text-xs text-purple-400 font-bold hover:underline cursor-pointer">Ver todas</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-none py-1.5">
              {categories.map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all shrink-0 cursor-pointer w-[180px] relative overflow-hidden group ${
                    activeCategory === cat.name 
                      ? 'bg-gradient-to-br from-purple-950/40 to-pink-950/40 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.15)] scale-[1.02]' 
                      : 'bg-[#0a0a0f] border-white/5 hover:border-white/15'
                  }`}
                >
                  <img src={cat.img} className="w-10 h-10 rounded-xl object-cover" alt="" />
                  <div className="text-xs relative z-10">
                    <div className="font-black text-white">{cat.name}</div>
                    <div className="text-[9px] text-zinc-500 font-bold">{cat.count} torneos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. DYNAMIC TORNEOS EN VIVO GRID */}
          <div className={`space-y-4 ${
            mobileActiveTab === 'vivo' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black uppercase tracking-widest text-zinc-200">Torneos en vivo</h2>
              <span className="text-xs text-pink-400 font-bold hover:underline cursor-pointer">Ver todos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {liveTournaments.map((tournament) => (
                <div 
                  key={tournament.id}
                  onClick={() => setActiveArenaTournament(tournament)}
                  className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300 group cursor-pointer shadow-xl flex flex-col relative"
                >
                  <div className="relative h-[150px] overflow-hidden shrink-0">
                    <img src={tournament.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> EN VIVO
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-md text-[8px] font-black rounded flex items-center gap-1 border border-white/10">
                      <Eye className="w-3 h-3 text-red-500 animate-pulse" /> {tournament.viewers}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-pink-500 mb-1">{tournament.phase}</div>
                      <h4 className="text-xs font-black text-white leading-tight line-clamp-1 group-hover:text-pink-400 transition-colors">{tournament.title}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 font-bold">Por {tournament.organizer}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4 text-[10px]">
                      <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20 text-yellow-500 font-extrabold">
                        <Coins className="w-3.5 h-3.5" />
                        <span>{tournament.prize}</span>
                      </div>
                      <span className="text-zinc-400 font-bold flex items-center gap-1">
                        <UsersIcon className="w-3.5 h-3.5 text-zinc-500" /> {tournament.slots}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. PRÓXIMOS TORNEOS GRID + PREDICT BANNER CONTAINER */}
          <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${
            mobileActiveTab === 'proximos' || mobileActiveTab === 'destacados' ? 'block xl:grid' : 'hidden xl:grid'
          }`}>

            {/* Upcoming tournaments */}
            <div className={`xl:col-span-2 space-y-4 ${
              mobileActiveTab === 'proximos' ? 'block' : 'hidden xl:block'
            }`}>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-black uppercase tracking-widest text-zinc-200">Próximos torneos</h2>
                <span className="text-xs text-purple-400 font-bold hover:underline cursor-pointer">Ver todos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcomingTournaments.map((tournament) => (
                  <div key={tournament.id} className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-purple-500/25 transition-colors">
                    <img src={tournament.img} className="w-16 h-16 rounded-xl object-cover shrink-0" alt="" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[8px] font-black bg-purple-600/20 border border-purple-500/30 text-purple-400 px-1.5 py-0.5 rounded uppercase">
                            INICIA EN {tournament.startsIn}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-bold">{tournament.date}</span>
                        </div>
                        <h4 className="text-xs font-black text-white line-clamp-1">{tournament.title}</h4>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px]">
                        <span className="text-yellow-500 font-extrabold flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5" /> {tournament.prize}
                        </span>
                        <span className="text-zinc-500 font-bold flex items-center gap-1">
                          <UsersIcon className="w-3.5 h-3.5" /> {tournament.slots}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PREDICE Y GANA BANNER PANEL (Desktop) */}
            <div className={`bg-gradient-to-br from-[#1b122e] to-[#0d091a] border border-purple-500/20 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group ${
              mobileActiveTab === 'destacados' ? 'flex' : 'hidden xl:flex'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
              
              <div className="space-y-2">
                <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">Predice y gana</span>
                <h3 className="text-base font-black text-white leading-tight">¿Quién ganará la Copa LiveX Free Fire?</h3>
                <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">Apoya a tu equipo favorito, acierta la predicción del torneo y duplica tus monedas 💎</p>
              </div>

              {/* Selector buttons */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <button 
                  onClick={() => setSelectedPredictionTeam('cobra')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedPredictionTeam === 'cobra' 
                      ? 'bg-purple-600/30 border-purple-500 text-white font-black scale-[1.02]' 
                      : 'bg-white/5 border-transparent hover:border-white/10 text-zinc-400 font-bold'
                  }`}
                >
                  <div className="text-lg mb-1">🐍</div>
                  <div className="text-[10px] uppercase">Team Cobra</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">X1.85 Retorno</div>
                </button>

                <button 
                  onClick={() => setSelectedPredictionTeam('titans')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedPredictionTeam === 'titans' 
                      ? 'bg-purple-600/30 border-purple-500 text-white font-black scale-[1.02]' 
                      : 'bg-white/5 border-transparent hover:border-white/10 text-zinc-400 font-bold'
                  }`}
                >
                  <div className="text-lg mb-1">⚡</div>
                  <div className="text-[10px] uppercase">Titans Esports</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">X2.10 Retorno</div>
                </button>
              </div>

              <button 
                onClick={() => {
                  if (!selectedPredictionTeam) {
                    alert('Por favor selecciona un equipo first!');
                    return;
                  }
                  alert('¡Predicción colocada! 🔮 ¡Que gane el mejor!');
                  setSelectedPredictionTeam(null);
                }}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-black py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform uppercase tracking-wider text-center"
              >
                Participar
              </button>

            </div>

          </div>

          {/* 5. MIS TORNEOS MOBILE VIEW */}
          {mobileActiveTab === 'mis' && (
            <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-[#0a0a0f] border border-white/5 rounded-3xl lg:hidden">
              <div className="w-16 h-16 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)] animate-bounce">
                <Trophy className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-base font-black text-white mb-2 uppercase tracking-wide">Mis Torneos</h3>
              <p className="text-xs text-zinc-500 font-semibold max-w-xs mb-6">No estás inscrito en ningún torneo de esports actualmente. ¡Únete a la Copa LiveX en vivo o predice tus ganadores!</p>
              <button 
                onClick={() => setMobileActiveTab('vivo')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black px-6 py-3 rounded-xl shadow-lg shadow-pink-500/20 uppercase tracking-widest active:scale-95 transition-transform"
              >
                Explorar en Vivo
              </button>
            </div>
          )}

        </div>

        {/* ------------------- MOBILE BOTTOM NAVIGATION BAR ------------------- */}
        <div className="h-[70px] shrink-0 bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5 lg:hidden">
          <Link href="/dashboard?tab=inicio" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Inicio</span>
          </Link>
          <Link href="/en-vivo" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Play className="w-6 h-6" />
            <span className="text-[10px] font-bold">Gaming</span>
          </Link>
          
          <div className="relative -top-4">
            <button 
              onClick={() => setShowQuickActions(true)}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a]"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>

          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href={`/u/${user?.username}`} className="flex flex-col items-center gap-1 text-zinc-500">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Perfil</span>
          </Link>
        </div>

      </main>

      {/* ----------------- MOBILE QUICK ACTIONS OVERLAY (Creator Hub) ----------------- */}
      {showQuickActions && (
        <div className="fixed inset-0 z-50 bg-[#05050ad9] backdrop-blur-xl flex flex-col justify-end p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowQuickActions(false)} />
          <div className="bg-[#0f0e1a]/95 border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 max-w-sm mx-auto w-full mb-4">
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Acceso Rápido</h4>
                <h3 className="text-base font-black text-white">LiveX Creator Studio</h3>
              </div>
              <button onClick={() => setShowQuickActions(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link href="/en-vivo" className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 hover:border-purple-500/50 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-2">
                  <Play className="w-6 h-6 fill-purple-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Transmitir</span>
                <span className="text-[9px] text-zinc-500">Iniciar streaming</span>
              </Link>

              <Link href="/batallas" className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-pink-600/10 to-rose-600/10 border border-pink-500/20 hover:border-pink-500/50 text-center relative overflow-hidden">
                <div className="absolute top-1.5 right-1.5 bg-pink-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase animate-pulse">NEW</div>
                <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400 mb-2">
                  <Swords className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Batallas PvP</span>
                <span className="text-[9px] text-zinc-500">Desafiar en vivo</span>
              </Link>

              <Link href="/torneos" className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 hover:border-yellow-500/50 text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Torneos</span>
                <span className="text-[9px] text-zinc-500">Crear o Unirte</span>
              </Link>

              <button 
                onClick={() => { setShowQuickActions(false); setUserCoins(prev => prev + 1000); }}
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 hover:border-cyan-500/50 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center text-cyan-400 mb-2">
                  <Coins className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Wallet</span>
                <span className="text-[9px] text-zinc-500">Monedas</span>
              </button>
            </div>
            
            <p className="text-[10px] text-zinc-500 text-center font-bold">LiveX Creator Hub © 2026</p>
          </div>
        </div>
      )}

      {/* ----------------- CREATE TORNEO MODAL ----------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0a12] border border-white/10 rounded-3xl max-w-lg w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" /> Organizar Nuevo Torneo
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('¡Torneo creado exitosamente! 🏆 ¡A competir!'); setShowCreateModal(false); }} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Nombre del Torneo</label>
                <input type="text" placeholder="Ej: Torneo Relámpago Free Fire Cobra" className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Juego / Categoría</label>
                  <select className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500">
                    <option>Free Fire</option>
                    <option>Valorant</option>
                    <option>Fortnite</option>
                    <option>Call of Duty</option>
                    <option>League of Legends</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Premio Acumulado ($)</label>
                  <input type="number" placeholder="Ej: 5000" className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Máximo de Equipos</label>
                  <input type="number" defaultValue={16} className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Fecha de Inicio</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black py-3 rounded-xl mt-6 hover:scale-[1.01] transition-transform shadow-lg shadow-pink-500/20"
              >
                Crear Torneo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- ESPORTS BRACKETS ARENA MODAL ----------------- */}
      {activeArenaTournament && (
        <div className="fixed inset-0 z-50 bg-[#05050ad9] backdrop-blur-xl flex flex-col lg:flex-row justify-center items-stretch p-4 lg:p-6 overflow-y-auto">
          
          {/* Main Tournament Arena Box */}
          <div className="bg-[#0b0a12]/95 border border-white/10 rounded-3xl flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full shadow-2xl relative">
            
            {/* Header */}
            <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> EN VIVO
                </span>
                <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">{activeArenaTournament.title} • Arena de Esports</h2>
              </div>
              <button 
                onClick={() => setActiveArenaTournament(null)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Split layout: left = stream + bracket, right = chat + prediction */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
              
              {/* Left column (stream + brackets) */}
              <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-6 space-y-6">
                
                {/* 1. Cinematic Simulated Esports Stream Player */}
                <div className="aspect-video bg-zinc-950 rounded-3xl border border-white/5 overflow-hidden relative shadow-lg group">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  
                  {/* Floating particles reaction layer */}
                  <div className="absolute bottom-16 right-16 pointer-events-none w-64 h-64 overflow-hidden z-20">
                    {flyingReactionEmojis.map(emoji => (
                      <div 
                        key={emoji.id} 
                        style={{ 
                          position: 'absolute', 
                          left: '50%', 
                          bottom: '0px', 
                          transform: `translate(${emoji.x}px, ${emoji.y}px)`,
                          fontSize: '32px',
                          opacity: 1,
                          transition: 'all 2s ease-out'
                        }}
                        className="animate-bounce"
                      >
                        {emoji.char}
                      </div>
                    ))}
                  </div>

                  {/* Top stream HUD overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <div className="bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                      <span className="text-[10px] font-black tracking-wider text-white">LIVE TRANSMISIÓN OFICIAL ESPORTS</span>
                    </div>
                    <div className="bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md text-[10px] font-black text-white flex items-center gap-1.5">
                      <UsersIcon className="w-3.5 h-3.5 text-purple-400" /> 25.6K espectando
                    </div>
                  </div>

                  {/* Play controller display */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </button>
                      <div>
                        <div className="font-bold text-white">Copa LiveX Free Fire - Gran Final</div>
                        <div className="text-[9px] text-zinc-400">Ronda 4 de 7 • Servidor Latam</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-black text-white uppercase">1080p60fps</span>
                      <span className="bg-red-600 px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-wider">LIVE</span>
                    </div>
                  </div>

                </div>

                {/* 2. Visual Bracket System */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-400 animate-bounce" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Esports Bracket Eliminación Directa</h3>
                  </div>

                  {/* Graphical Bracket Arena Layout */}
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-6 overflow-x-auto scrollbar-none flex gap-8 items-center justify-around min-w-[700px]">
                    
                    {/* Semifinales Column */}
                    <div className="flex flex-col gap-8">
                      <div className="text-[10px] font-black uppercase text-zinc-500 tracking-wider text-center mb-1">Semifinales</div>
                      
                      {/* Match 1 */}
                      <div className="flex flex-col gap-1.5 p-3.5 bg-white/5 border border-white/5 rounded-2xl w-44 shadow-lg relative group">
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-purple-500" />
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-zinc-300 flex items-center gap-1.5">🐍 Cobra Team</span>
                          <span className="font-black text-purple-400">2</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-t border-white/5 pt-1.5 mt-0.5">
                          <span className="font-bold text-zinc-500 flex items-center gap-1.5">🦂 Viper Squad</span>
                          <span className="font-black text-zinc-500">0</span>
                        </div>
                      </div>

                      {/* Match 2 */}
                      <div className="flex flex-col gap-1.5 p-3.5 bg-white/5 border border-white/5 rounded-2xl w-44 shadow-lg relative group">
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-purple-500" />
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-zinc-300 flex items-center gap-1.5">⚡ Titans Esports</span>
                          <span className="font-black text-purple-400">2</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-t border-white/5 pt-1.5 mt-0.5">
                          <span className="font-bold text-zinc-500 flex items-center gap-1.5">🔥 Phoenix Clan</span>
                          <span className="font-black text-zinc-500">1</span>
                        </div>
                      </div>

                    </div>

                    {/* Semis to Finals Glowing Connectors */}
                    <div className="flex flex-col justify-around h-full gap-24 py-10 shrink-0">
                      <div className="w-6 h-28 border-t-2 border-r-2 border-b-2 border-purple-500/40 rounded-r-xl" />
                    </div>

                    {/* Gran Final Column */}
                    <div className="flex flex-col justify-center items-center">
                      <div className="text-[10px] font-black uppercase text-pink-500 tracking-wider text-center mb-2 animate-pulse">Gran Final</div>
                      
                      {/* Finals Card */}
                      <div className="flex flex-col gap-2 p-4 bg-gradient-to-br from-purple-950/20 to-pink-950/20 border-2 border-pink-500/40 rounded-3xl w-52 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-black text-white flex items-center gap-1.5">🐍 Cobra Team</span>
                          <span className="font-black text-pink-500 animate-pulse">3</span>
                        </div>
                        <div className="text-[9px] font-black text-center text-zinc-500 uppercase my-1">RONDA 6 - MAPA BERMUDA</div>
                        <div className="flex justify-between items-center text-xs border-t border-white/5 pt-1.5">
                          <span className="font-black text-white flex items-center gap-1.5">⚡ Titans Esports</span>
                          <span className="font-black text-zinc-300">2</span>
                        </div>
                      </div>
                    </div>

                    {/* Winner crown display */}
                    <div className="flex flex-col justify-center items-center shrink-0">
                      <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/40 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-bounce mb-2">
                        👑
                      </div>
                      <div className="text-[9px] font-black uppercase text-yellow-500 tracking-widest">Campeón Copa LiveX</div>
                      <div className="text-[11px] font-black text-white mt-0.5">TEAM COBRA</div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Right column (chat + predictors + gift panels) */}
              <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col bg-[#07060d]/80 shrink-0">
                
                {/* 1. Arena live comments */}
                <div className="flex-1 flex flex-col overflow-hidden p-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-400" /> Chat Arena Live
                  </h3>
                  
                  <div ref={arenaChatEndRef} className="flex-grow overflow-y-auto scrollbar-none space-y-3 pr-1 pb-4">
                    {arenaChatMessages.map(msg => (
                      <div key={msg.id} className="text-xs p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-pink-400 flex items-center gap-1">{msg.user}</span>
                          <span className="text-[8px] text-zinc-600">{msg.time}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newArenaMessage.trim()) return;
                      setArenaChatMessages(prev => [
                        ...prev, 
                        { id: Date.now(), user: 'Tú', text: newArenaMessage, time: 'Ahora' }
                      ]);
                      setNewArenaMessage('');
                    }}
                    className="flex gap-2 border-t border-white/5 pt-3 mt-auto shrink-0"
                  >
                    <input 
                      type="text" 
                      placeholder="Escribe un mensaje de apoyo..." 
                      value={newArenaMessage}
                      onChange={e => setNewArenaMessage(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                    />
                    <button type="submit" className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center justify-center transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* 2. Arena Gifts panel */}
                <div className="border-t border-white/10 p-4 shrink-0 bg-black/40">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Enviar regalos arena</span>
                    <span className="text-[10px] font-black text-yellow-500 flex items-center gap-1"><Coins className="w-3.5 h-3.5" /> {userCoins.toLocaleString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { emoji: '🌹', name: 'Rosa', cost: 10 },
                      { emoji: '❤️', name: 'Corazón', cost: 50 },
                      { emoji: '👑', name: 'Corona', cost: 200 },
                      { emoji: '🦁', name: 'León', cost: 500 }
                    ].map(gift => (
                      <button 
                        key={gift.name} 
                        onClick={() => triggerGift(gift.emoji, gift.name, gift.cost)}
                        className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all text-center"
                      >
                        <span className="text-xl mb-0.5">{gift.emoji}</span>
                        <span className="text-[8px] font-bold text-zinc-300 line-clamp-1">{gift.name}</span>
                        <span className="text-[8px] font-black text-yellow-500">{gift.cost}💎</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

// Sub components to fix simple undefined variables issues
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
