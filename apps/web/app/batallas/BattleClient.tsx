'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Sparkles, Flame, Swords, Send, X, Coins, Sparkle, Clock
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';

interface GiftType {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  color: string;
}

const AVAILABLE_GIFTS: GiftType[] = [
  { id: 'rose', name: 'Rosa', emoji: '🌹', cost: 5, color: 'from-red-500 to-pink-500' },
  { id: 'heart', name: 'Corazón', emoji: '❤️', cost: 50, color: 'from-pink-500 to-rose-500' },
  { id: 'diamond', name: 'Diamante', emoji: '💎', cost: 200, color: 'from-blue-400 to-indigo-500' },
  { id: 'crown', name: 'Corona', emoji: '👑', cost: 1000, color: 'from-yellow-400 to-amber-500' },
  { id: 'rocket', name: 'Cohete', emoji: '🚀', cost: 5000, color: 'from-purple-500 to-indigo-600 animate-pulse' },
  { id: 'lion', name: 'León', emoji: '🦁', cost: 10000, color: 'from-orange-400 to-red-600 font-bold' },
];

export default function BattleClient({ user }: { user: any }) {
  // Global States
  const [userCoins, setUserCoins] = useState(12450);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'envivo' | 'proximas' | 'historial'>('envivo');
  
  // Battle arena specific states
  const [battleTimer, setBattleTimer] = useState(165); // 2:45 in seconds
  const [leftPoints, setLeftPoints] = useState(12450);
  const [rightPoints, setRightPoints] = useState(9876);
  
  // Interactive gift sending states
  const [isGiftPopupOpen, setIsGiftPopupOpen] = useState(false);
  const [selectedStreamer, setSelectedStreamer] = useState<'left' | 'right'>('left');
  const [flyingGifts, setFlyingGifts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [isPointsFlashing, setIsPointsFlashing] = useState<'left' | 'right' | null>(null);

  // Chat Simulation states
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userComment, setUserComment] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'gift', user: 'AlexM', giftName: 'León', giftEmoji: '🦁', quantity: 10, time: 'hace 1 min', color: 'text-amber-400' },
    { id: 2, type: 'gift', user: 'ValenLG', giftName: 'Diamante', giftEmoji: '💎', quantity: 50, time: 'hace 1 min', color: 'text-blue-400' },
    { id: 3, type: 'chat', user: 'NickyPlay', text: '¡Vamos Andrés! ¡Tú puedes ganar esta batalla! 🔥', time: 'hace 2 min' },
    { id: 4, type: 'chat', user: 'AndrésGG', text: '¡Muchas gracias por todo el apoyo, gente! 🙏❤️', time: 'hace 2 min' },
    { id: 5, type: 'chat', user: 'DiegoStream', text: '¡Esto se pone bueno! ¡La ronda de regalos apenas comienza!', time: 'hace 2 min' },
    { id: 6, type: 'gift', user: 'SofiLive', giftName: 'Cohete', giftEmoji: '🚀', quantity: 1, time: 'hace 2 min', color: 'text-purple-400' },
    { id: 7, type: 'chat', user: 'ElKomanche', text: 'Vamos! A romper el récord semanal hoy!', time: 'hace 3 min' },
    { id: 8, type: 'gift', user: 'CamiLove', giftName: 'Corazón', giftEmoji: '❤️', quantity: 20, time: 'hace 3 min', color: 'text-rose-400' },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Timer Countdown Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBattleTimer(prev => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Chat Auto-simulation
  useEffect(() => {
    const randomUsers = ['GamerPro', 'EsportsFan', 'SofiLive', 'Zeta', 'NickyPlay', 'MartinCV', 'CamiLove', 'AlexM'];
    const randomComments = [
      '¡Qué locura de batalla! 🚀',
      '¡Vamos Diego! ¡Apoyen con diamantes! 💎',
      '¡Increíble remontada de Andrés! 😱',
      '¿Quién ganará esta ronda?',
      '¡El León sumó muchísimo! 🦁🔥',
      '¡Apoyen con rosas! 🌹🌹🌹',
      '¡La mejor batalla del mes sin duda!',
      '¡Se acaba el tiempo! ¡Denle con todo!',
    ];

    const chatInterval = setInterval(() => {
      const randType = Math.random() > 0.6 ? 'gift' : 'chat';
      const randUser = randomUsers[Math.floor(Math.random() * randomUsers.length)] || 'Espectador';
      
      if (randType === 'gift') {
        const randGift = AVAILABLE_GIFTS[Math.floor(Math.random() * AVAILABLE_GIFTS.length)];
        if (!randGift) return;
        const qty = Math.floor(Math.random() * 5) + 1;
        
        // Simular suma de puntos en la batalla
        const isLeft = Math.random() > 0.5;
        const totalPoints = randGift.cost * qty;
        
        if (isLeft) {
          setLeftPoints(prev => prev + totalPoints);
          setIsPointsFlashing('left');
          setTimeout(() => setIsPointsFlashing(null), 600);
        } else {
          setRightPoints(prev => prev + totalPoints);
          setIsPointsFlashing('right');
          setTimeout(() => setIsPointsFlashing(null), 600);
        }

        const newMsg = {
          id: Date.now(),
          type: 'gift',
          user: randUser,
          giftName: randGift.name,
          giftEmoji: randGift.emoji,
          quantity: qty,
          time: 'ahora',
          color: randGift.id === 'rose' ? 'text-red-400' : randGift.id === 'heart' ? 'text-pink-400' : 'text-yellow-400'
        };
        setChatMessages(prev => [...prev, newMsg]);
      } else {
        const randComment = randomComments[Math.floor(Math.random() * randomComments.length)] || '¡Increíble!';
        const newMsg = {
          id: Date.now(),
          type: 'chat',
          user: randUser,
          text: randComment,
          time: 'ahora'
        };
        setChatMessages(prev => [...prev, newMsg]);
      }
    }, 4500);

    return () => clearInterval(chatInterval);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newMsg = {
      id: Date.now(),
      type: 'chat',
      user: 'Tú',
      text: userComment.trim(),
      time: 'ahora'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setUserComment('');
    triggerToast('¡Comentario enviado! 💬');
  };

  const handleSendGift = (gift: GiftType) => {
    if (userCoins < gift.cost) {
      triggerToast('❌ Monedas insuficientes para enviar este regalo.');
      return;
    }

    // Restar monedas
    setUserCoins(prev => prev - gift.cost);
    
    // Sumar puntos al streamer apoyado
    if (selectedStreamer === 'left') {
      setLeftPoints(prev => prev + gift.cost);
      setIsPointsFlashing('left');
      setTimeout(() => setIsPointsFlashing(null), 600);
    } else {
      setRightPoints(prev => prev + gift.cost);
      setIsPointsFlashing('right');
      setTimeout(() => setIsPointsFlashing(null), 600);
    }

    // Agregar regalo volador en pantalla
    const newFlyingGift = {
      id: Date.now(),
      emoji: gift.emoji,
      x: Math.floor(Math.random() * 200) - 100, // Variación horizontal
      y: Math.floor(Math.random() * 200) - 100 // Variación vertical
    };

    setFlyingGifts(prev => [...prev, newFlyingGift]);
    
    // Remover regalo volador después de la animación
    setTimeout(() => {
      setFlyingGifts(prev => prev.filter(g => g.id !== newFlyingGift.id));
    }, 2000);

    // Agregar al log de chat
    const newMsg = {
      id: Date.now(),
      type: 'gift',
      user: 'Tú',
      giftName: gift.name,
      giftEmoji: gift.emoji,
      quantity: 1,
      time: 'ahora',
      color: 'text-purple-400 font-extrabold'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setIsGiftPopupOpen(false);
    triggerToast(`🎁 ¡Enviaste ${gift.name} a ${selectedStreamer === 'left' ? 'AndrésGG' : 'DiegoStream'}!`);
  };

  // Calcular porcentaje de la barra de batalla VS
  const totalBattlePoints = leftPoints + rightPoints;
  const leftPercent = totalBattlePoints > 0 ? (leftPoints / totalBattlePoints) * 100 : 50;

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white relative overflow-hidden font-sans">
      
      {/* ----------------- LEFT SIDEBAR (Desktop 260px wide) ----------------- */}
      <aside className="hidden lg:flex w-[260px] border-r border-white/5 bg-[#0a0a0f] flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard?tab=inicio" className="flex items-center gap-3 mb-8 px-2">
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
          <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Gaming
          </Link>
          <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Compass className="w-5 h-5" /> Explorar
          </Link>
          <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <Swords className="w-5 h-5 text-pink-400" /> Batallas
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

        <button onClick={() => triggerToast('👑 ¡Creando Sala de Batalla PVP!')} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-8">
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
           <button onClick={() => setUserCoins(prev => prev + 500)} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
        </div>

        {/* Rewards / Levels progress bar */}
        <div className="bg-[#12152b]/50 border border-white/5 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">Progreso</span>
            <span className="text-[10px] font-black text-pink-400">Nivel 24</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%]" />
          </div>
          <span className="text-[9px] text-zinc-500 font-bold">75% para Nivel 25</span>
        </div>

        <div className="mt-auto flex items-center gap-2 px-2 py-3 border-t border-white/5">
          <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors shrink-0"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* ----------------- MAIN ARENA WORKSPACE AND CENTRAL PANEL ----------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOP SEARCH AND ACTION HEADER */}
        <header className="h-16 border-b border-white/5 px-4 lg:px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          
          {/* Mobile Logo & Tabs Navigation */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
               <Play className="text-white fill-white w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black tracking-tighter">LiveX</span>
          </div>

          <div className="flex items-center gap-4 text-[13px] sm:text-[14px] font-bold overflow-x-auto scrollbar-none py-1 pr-2 shrink-0 max-w-[65%] lg:hidden">
            <Link href="/dashboard?tab=siguiendo" className="transition-all shrink-0 text-zinc-500">
              Siguiendo
            </Link>
            <Link href="/dashboard?tab=parati" className="transition-all shrink-0 text-zinc-500">
              Para ti
            </Link>
            <Link href="/batallas" className="transition-all shrink-0 text-white border-b-2 border-pink-500 pb-0.5 font-black">
              Batallas ⚔️
            </Link>
            <Link href="/explorar" className="text-zinc-500 hover:text-white flex items-center gap-0.5 shrink-0">
              Explorar <Compass className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="w-72 lg:w-96 relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar streamers, batallas, retos..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </div>

          {/* User profile / global achievements */}
          <div className="flex items-center gap-3">
            <button className="text-zinc-400 hover:text-yellow-400 hidden sm:block">
              <Crown className="w-4.5 h-4.5" />
            </button>
            <button className="text-zinc-400 hover:text-white relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </button>

            {/* Economy wallet */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1.5 hidden sm:flex items-center gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)] shrink-0 cursor-pointer" onClick={() => setUserCoins(prev => prev + 500)}>
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
            </div>

            {/* Profile info */}
            <div className="flex items-center gap-2 pl-4 border-l border-white/10 hidden sm:flex">
              <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-1">{user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● En línea</div>
              </div>
            </div>
          </div>
        </header>

        {/* FEED / CONTENT ARENA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 lg:p-6 pb-24">
          
          {/* TAB SYSTEM AND TITLE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                Batallas en vivo
              </h2>
              <p className="text-xs text-zinc-500 font-bold mt-0.5">Apoya a tus creadores preferidos en tiempo real</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="bg-white/5 border border-white/5 rounded-xl p-0.5 flex gap-1">
                <button 
                  onClick={() => setActiveTab('envivo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'envivo' ? 'bg-[#181330] text-pink-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}
                >
                  En vivo
                </button>
                <button 
                  onClick={() => setActiveTab('proximas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'proximas' ? 'bg-[#181330] text-pink-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}
                >
                  Próximas
                </button>
                <button 
                  onClick={() => setActiveTab('historial')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'historial' ? 'bg-[#181330] text-pink-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}
                >
                  Historial
                </button>
              </div>

              <button 
                onClick={() => triggerToast('⭐ ¡Creando tu Batalla Arena! Invita a tus amigos.')} 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/10 shrink-0"
              >
                Crear batalla
              </button>
            </div>
          </div>

          {/* MOBILE LIVE BUBBLES CAROUSEL */}
          <div className="lg:hidden mb-6 overflow-x-auto pb-2 flex gap-4 scrollbar-none snap-x">
            {[
              { id: 'left', name: 'AndrésGG', viewers: '2.3K', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
              { id: 'right', name: 'DiegoStream', viewers: '2.1K', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
              { id: 'sofi', name: 'SofiLive', viewers: '1.2K', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
              { id: 'martin', name: 'MartinCV', viewers: '987', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
            ].map(streamer => (
              <button 
                key={streamer.id}
                onClick={() => {
                  setSelectedStreamer(streamer.id === 'right' ? 'right' : 'left');
                  triggerToast(`Estás sintonizando a @${streamer.name}`);
                }}
                className="flex flex-col items-center gap-1 shrink-0 snap-center focus:outline-none"
              >
                <div className="relative p-[2.5px] rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] animate-pulse">
                  <img src={streamer.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-[#05050a]" alt="" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border border-[#05050a] flex items-center gap-0.5">
                    VS
                  </span>
                </div>
                <span className="text-[10px] font-bold text-zinc-200 mt-1">{streamer.name}</span>
                <span className="text-[8px] text-zinc-500 font-semibold">👁 {streamer.viewers}</span>
              </button>
            ))}
          </div>

          {/* TWO COLUMN GRID FOR CONTENT & CHAT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUMN 1 & 2: HERO BATTLE ARENA & CAROUSELS */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* BATTLE HERO CARD */}
              <div className="bg-[#0b0a12] border border-white/5 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                
                {/* Neon dynamic gradients in background */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-pink-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full" />

                {/* Score countdown header */}
                <div className="flex items-center justify-between mb-6 z-10 relative">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 bg-pink-600 text-white text-[9px] font-black rounded uppercase tracking-wider">Ronda 2 de 3</span>
                    <span className="text-[10px] text-zinc-500 font-bold">1 min restante</span>
                  </div>

                  {/* Countdown Timer */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 flex items-center gap-1.5 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-xs font-black tracking-widest">{formatTime(battleTimer)}</span>
                  </div>
                </div>

                {/* VISUAL STREAMERS FACEOFF AREA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 mb-6">
                  
                  {/* Left Streamer (AndrésGG) */}
                  <div className={`rounded-2xl overflow-hidden relative group border transition-all duration-300 ${selectedStreamer === 'left' ? 'border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.15)] scale-[1.01]' : 'border-white/5'}`}>
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" 
                      className="w-full h-[220px] sm:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="" 
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-pink-600 text-white text-[9px] font-black rounded-md flex items-center gap-1 shadow-lg shadow-pink-500/20">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Gaming
                    </span>
                    <span className="absolute top-3 right-3 text-[9px] bg-black/60 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Eye className="w-3 h-3 text-pink-400" /> 2.3K viewers
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          AndrésGG <BadgeCheck className="w-3.5 h-3.5 text-pink-400" />
                        </div>
                        <span className="text-[9px] text-zinc-400">Streamer Free Fire</span>
                      </div>

                      <button 
                        onClick={() => triggerToast('¡Estás siguiendo a AndrésGG! ⚔️')} 
                        className="px-2 py-1 bg-pink-600 hover:bg-pink-700 text-white font-bold text-[9px] rounded-lg shadow-lg"
                      >
                        Apoyar
                      </button>
                    </div>
                  </div>

                  {/* Giant VS Indicator Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0b0a12] border-2 border-purple-500 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse hidden sm:flex">
                    <Swords className="w-6 h-6 text-purple-400" />
                  </div>

                  {/* Right Streamer (DiegoStream) */}
                  <div className={`rounded-2xl overflow-hidden relative group border transition-all duration-300 ${selectedStreamer === 'right' ? 'border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.01]' : 'border-white/5'}`}>
                    <img 
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" 
                      className="w-full h-[220px] sm:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="" 
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-cyan-600 text-white text-[9px] font-black rounded-md flex items-center gap-1 shadow-lg shadow-cyan-500/20">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Just Chatting
                    </span>
                    <span className="absolute top-3 right-3 text-[9px] bg-black/60 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Eye className="w-3 h-3 text-cyan-400" /> 2.1K viewers
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          DiegoStream <BadgeCheck className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <span className="text-[9px] text-zinc-400">Streamer IRL / Retos</span>
                      </div>

                      <button 
                        onClick={() => triggerToast('¡Estás siguiendo a DiegoStream! ⚔️')} 
                        className="px-2 py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[9px] rounded-lg shadow-lg"
                      >
                        Apoyar
                      </button>
                    </div>
                  </div>

                </div>

                {/* ANIMATED VS POINTS SCORE BAR */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    {/* Left Streamer Points */}
                    <div className={`flex flex-col text-left transition-all duration-300 ${isPointsFlashing === 'left' ? 'scale-105 text-pink-400' : 'text-pink-500'}`}>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">AndrésGG</span>
                      <span className="text-lg font-black">{leftPoints.toLocaleString()}</span>
                    </div>

                    {/* Objective indicator */}
                    <div className="text-center">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Objetivo</span>
                      <div className="text-[10px] font-black text-white bg-white/5 border border-white/5 rounded-full px-3 py-0.5">20,000 puntos</div>
                    </div>

                    {/* Right Streamer Points */}
                    <div className={`flex flex-col text-right transition-all duration-300 ${isPointsFlashing === 'right' ? 'scale-105 text-cyan-400' : 'text-cyan-500'}`}>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">DiegoStream</span>
                      <span className="text-lg font-black">{rightPoints.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Dual Scoring bar */}
                  <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex relative">
                    {/* Left side progress */}
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 rounded-l-full transition-all duration-500 relative"
                      style={{ width: `${leftPercent}%` }}
                    >
                      <div className="absolute top-0 right-0 w-2 h-full bg-white/20 blur-[1px] animate-pulse" />
                    </div>

                    {/* VS splitter dot */}
                    <div className="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,1)]" style={{ left: `${leftPercent}%` }} />

                    {/* Right side progress */}
                    <div 
                      className="h-full bg-gradient-to-l from-indigo-600 via-cyan-500 to-cyan-400 rounded-r-full transition-all duration-500 relative"
                      style={{ width: `${100 - leftPercent}%` }}
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-white/20 blur-[1px] animate-pulse" />
                    </div>
                  </div>

                  {/* Donors / Supporters small avatar bubbles */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center -space-x-1.5">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80" className="w-5 h-5 rounded-full border border-[#0b0a12] object-cover" alt="" />
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=80" className="w-5 h-5 rounded-full border border-[#0b0a12] object-cover" alt="" />
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80" className="w-5 h-5 rounded-full border border-[#0b0a12] object-cover" alt="" />
                      <span className="text-[8px] text-zinc-500 pl-3 font-semibold">+ 42 apoyan</span>
                    </div>

                    <div className="flex items-center -space-x-1.5">
                      <span className="text-[8px] text-zinc-500 pr-3 font-semibold">+ 38 apoyan</span>
                      <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=80" className="w-5 h-5 rounded-full border border-[#0b0a12] object-cover" alt="" />
                      <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=80" className="w-5 h-5 rounded-full border border-[#0b0a12] object-cover" alt="" />
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80" className="w-5 h-5 rounded-full border border-[#0b0a12] object-cover" alt="" />
                    </div>
                  </div>
                </div>

                {/* ACTION INTERACTIVE BUTTONS BAR */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 z-10 relative">
                  
                  {/* Select supporting streamer */}
                  <div className="flex items-center bg-white/5 border border-white/5 p-0.5 rounded-xl">
                    <button 
                      onClick={() => setSelectedStreamer('left')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedStreamer === 'left' ? 'bg-pink-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                    >
                      AndrésGG 👑
                    </button>
                    <button 
                      onClick={() => setSelectedStreamer('right')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedStreamer === 'right' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                    >
                      DiegoStream ⚡
                    </button>
                  </div>

                  {/* Ultimate gift trigger button */}
                  <button 
                    onClick={() => setIsGiftPopupOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/20 flex items-center gap-1.5"
                  >
                    <Gift className="w-4 h-4" /> Enviar regalo
                  </button>

                </div>

                {/* FLOATING GIFTS ESCAPING ANIMATIONS (Visualizer overlay) */}
                <div className="absolute inset-0 pointer-events-none z-30">
                  {flyingGifts.map(gift => (
                    <div 
                      key={gift.id} 
                      className="absolute bottom-20 left-1/2 -translate-x-1/2 text-5xl animate-bounce select-none"
                      style={{ 
                        transform: `translate(${gift.x}px, ${gift.y}px)`, 
                        animation: 'bounce 0.8s infinite alternate',
                        transition: 'opacity 1.5s',
                      }}
                    >
                      {gift.emoji}
                    </div>
                  ))}
                </div>

              </div>

              {/* OTRAS BATALLAS EN VIVO */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" /> Otras batallas activas
                  </h3>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider cursor-pointer hover:text-purple-300">Ver todas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Battle Card 2 */}
                  <div className="bg-[#0b0a12]/75 border border-white/5 rounded-2xl p-4 shadow-md hover:border-pink-500/20 transition-all group">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="px-2 py-0.5 bg-pink-600/10 text-pink-400 text-[8px] font-black rounded border border-pink-500/20">EN VIVO</span>
                      <span className="text-[9px] text-zinc-500 font-semibold flex items-center gap-0.5">👁 1.2K viewers</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 mb-4">
                      {/* Left Streamer */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" className="w-11 h-11 rounded-full object-cover border-2 border-pink-500" alt="" />
                        <span className="text-[10px] font-black truncate w-full text-center">SofiLive</span>
                        <span className="text-[9px] text-zinc-500">8,450 pts</span>
                      </div>

                      {/* VS Giant badge */}
                      <div className="w-8 h-8 rounded-full bg-zinc-950 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-black text-purple-400">VS</span>
                      </div>

                      {/* Right Streamer */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500" alt="" />
                        <span className="text-[10px] font-black truncate w-full text-center">CamiloLive</span>
                        <span className="text-[9px] text-zinc-500">7,230 pts</span>
                      </div>
                    </div>

                    {/* Dual Scoring bar */}
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/5 flex mb-3">
                      <div className="h-full bg-pink-500 w-[55%] rounded-l-full" />
                      <div className="h-full bg-cyan-500 w-[45%] rounded-r-full" />
                    </div>

                    <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold border-t border-white/5 pt-3">
                      <span>Ronda 2 de 3</span>
                      <span>Duración: 01:45</span>
                    </div>
                  </div>

                  {/* Battle Card 3 */}
                  <div className="bg-[#0b0a12]/75 border border-white/5 rounded-2xl p-4 shadow-md hover:border-pink-500/20 transition-all group">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="px-2 py-0.5 bg-pink-600/10 text-pink-400 text-[8px] font-black rounded border border-pink-500/20">EN VIVO</span>
                      <span className="text-[9px] text-zinc-500 font-semibold flex items-center gap-0.5">👁 987 viewers</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 mb-4">
                      {/* Left Streamer */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150" className="w-11 h-11 rounded-full object-cover border-2 border-pink-500" alt="" />
                        <span className="text-[10px] font-black truncate w-full text-center">NickyPlay</span>
                        <span className="text-[9px] text-zinc-500">6,540 pts</span>
                      </div>

                      {/* VS Giant badge */}
                      <div className="w-8 h-8 rounded-full bg-zinc-950 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-black text-purple-400">VS</span>
                      </div>

                      {/* Right Streamer */}
                      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500" alt="" />
                        <span className="text-[10px] font-black truncate w-full text-center">Zeta</span>
                        <span className="text-[9px] text-zinc-500">5,980 pts</span>
                      </div>
                    </div>

                    {/* Dual Scoring bar */}
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/5 flex mb-3">
                      <div className="h-full bg-pink-500 w-[52%] rounded-l-full" />
                      <div className="h-full bg-cyan-500 w-[48%] rounded-r-full" />
                    </div>

                    <div className="flex justify-between items-center text-[8px] text-zinc-500 font-bold border-t border-white/5 pt-3">
                      <span>Ronda 1 de 3</span>
                      <span>Duración: 02:15</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* COLUMN 3: BATTLE CHAT & TOP DONORS (Desktop right side) */}
            <div className="flex flex-col gap-6">
              
              {/* TOP DONATEURS DESKTOP CARD */}
              <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-2xl rounded-full" />
                
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-yellow-500" /> Top donadores
                </h3>

                <div className="flex flex-col gap-3">
                  {[
                    { rank: 1, name: 'SofiLive', coins: '12,450', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80', color: 'border-yellow-500' },
                    { rank: 2, name: 'MartinCV', coins: '8,760', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80', color: 'border-zinc-400' },
                    { rank: 3, name: 'CamiLove', coins: '6,540', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80', color: 'border-amber-700' },
                  ].map(donor => (
                    <div key={donor.rank} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-black text-zinc-500 w-3">{donor.rank}</span>
                        <img src={donor.avatar} className={`w-8 h-8 rounded-full object-cover border-2 ${donor.color}`} alt="" />
                        <span className="text-xs font-black truncate">{donor.name}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs font-bold text-yellow-500">{donor.coins}</span>
                        <span className="text-[10px] text-yellow-500">L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BATTLE LIVE CHAT LOG PANEL */}
              <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col h-[400px] sm:h-[450px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-purple-600/5 blur-2xl rounded-full" />
                
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-purple-400" /> Chat de la batalla
                </h3>

                {/* Messages stream */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1 mb-3">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={msg.id} 
                      className={`text-xs p-2 rounded-xl border transition-all ${
                        msg.type === 'gift' 
                          ? 'bg-gradient-to-r from-purple-950/30 to-pink-950/30 border-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.05)]' 
                          : 'bg-white/5 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-1 justify-between">
                        <span className={`font-black flex items-center gap-1 ${msg.user === 'Tú' ? 'text-pink-400' : msg.user === 'AndrésGG' ? 'text-purple-400' : 'text-zinc-400'}`}>
                          {msg.user} 
                          {(msg.user === 'AndrésGG' || msg.user === 'DiegoStream') && <BadgeCheck className="w-3.5 h-3.5 inline" />}
                        </span>
                        <span className="text-[8px] text-zinc-600">{msg.time}</span>
                      </div>

                      {msg.type === 'gift' ? (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-200">
                          envió <span className={`uppercase tracking-wider ${msg.color}`}>{msg.giftName}</span> 
                          <span className="text-lg">{msg.giftEmoji}</span> 
                          <span className="text-xs font-black text-pink-500">x{msg.quantity}</span>
                        </div>
                      ) : (
                        <p className="text-zinc-300 leading-relaxed text-[11px]">{msg.text}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Custom message input form */}
                <form onSubmit={handleSendCustomMessage} className="flex gap-2 border-t border-white/5 pt-3">
                  <input 
                    type="text" 
                    placeholder="Escribe un mensaje..." 
                    value={userComment}
                    onChange={e => setUserComment(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-purple-500/50 text-white placeholder-zinc-600"
                  />
                  <button 
                    type="submit" 
                    className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-lg shadow-purple-500/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>

            </div>

          </div>

          {/* SECTION 4: GLOBAL RANKINGS & TROPHIES PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            
            {/* SUBSECTION A: RANKING DE BATALLAS */}
            <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-5 shadow-lg">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-pink-500" /> Ranking de batallas
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  { rank: 1, name: 'AndrésGG', points: '125.4K', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80' },
                  { rank: 2, name: 'DiegoStream', points: '98.7K', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=80' },
                  { rank: 3, name: 'SofiLive', points: '76.5K', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80' },
                  { rank: 4, name: 'MartinCV', points: '64.2K', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80' },
                  { rank: 5, name: 'NickyPlay', points: '52.1K', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80' },
                ].map(item => (
                  <div key={item.rank} className="flex items-center justify-between p-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-zinc-500 w-3">{item.rank}</span>
                      <img src={item.avatar} className="w-8 h-8 rounded-full object-cover border border-white/5" alt="" />
                      <span className="text-xs font-bold text-zinc-200">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBSECTION B: TORNEO DE STREAMERS CARD */}
            <div className="bg-gradient-to-br from-[#1b122e]/60 to-[#0c0817]/95 border border-purple-500/20 rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 blur-2xl rounded-full" />
              
              <div>
                <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-1.5 block">Torneo Especial</span>
                <h4 className="text-sm font-black text-white mb-2 leading-relaxed">Torneo de Streamers LiveX</h4>
                <p className="text-[10px] text-zinc-400 mb-4">Gran final hoy a las 8:00 PM con batallas 1vs1 épicas.</p>
              </div>

              <div className="flex items-center justify-center w-full my-4 relative">
                {/* Glowing trophy shadow */}
                <div className="absolute w-24 h-24 bg-yellow-500/10 blur-xl rounded-full" />
                <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div>
                  <span className="text-[8px] text-zinc-500 font-bold uppercase block">Premio Total</span>
                  <span className="text-xs font-black text-yellow-500">50,000 monedas</span>
                </div>
                <button onClick={() => triggerToast('👑 Cargando detalles del torneo...')} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-[10px] font-black shadow-lg">Ver detalles</button>
              </div>
            </div>

            {/* SUBSECTION C: REGLAMENTO DE BATALLAS CARD */}
            <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Sparkle className="w-4 h-4 text-purple-400 animate-pulse" /> ¿Cómo funcionan las batallas?
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-200">Elige a tu oponente</span> y desafía a otro streamer a una batalla épica en directo.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-200">Envía regalos</span> para apoyarlo. Los regalos se convierten en puntos de forma instantánea.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-200">Gana la batalla</span>. El que consiga más puntos al final de la cuenta regresiva será el campeón.</p>
                  </div>
                </div>
              </div>

              <span className="text-[9px] text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider cursor-pointer border-t border-white/5 pt-3 block mt-4" onClick={() => triggerToast('⭐ Reglamento completo de PvP enviado a tu correo.')}>Ver reglas completas</span>
            </div>

          </div>

        </div>

        {/* ----------------- MOBILE BOTTOM NAVIGATION BAR ----------------- */}
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
            <button className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] hover:scale-105 transition-transform" onClick={() => triggerToast('👑 ¡Creando Sala de Batalla Arena!')}>
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href={`/u/${user.username}`} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Perfil</span>
          </Link>
        </div>

      </main>

      {/* ----------------- INTERACTIVE GIFT SELECT MODAL POPUP (TikTok Style) ----------------- */}
      {isGiftPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0b0a12] border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Close button */}
            <button 
              onClick={() => setIsGiftPopupOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">Apoyar Streamer</h4>
            <h3 className="text-base font-black text-white mb-4">
              Enviar regalo a <span className={selectedStreamer === 'left' ? 'text-pink-500' : 'text-cyan-400'}>
                {selectedStreamer === 'left' ? 'AndrésGG' : 'DiegoStream'}
              </span>
            </h3>

            {/* Gifts grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {AVAILABLE_GIFTS.map(gift => (
                <button 
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/50 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">{gift.emoji}</span>
                  <span className="text-[10px] font-bold text-zinc-200 mb-1">{gift.name}</span>
                  <div className="flex items-center gap-0.5 text-[9px] text-yellow-500 font-bold">
                    <span>{gift.cost}</span>
                    <span>L</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Current wallet status */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-bold text-zinc-300">Tus Monedas:</span>
                <span className="text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => {
                  setUserCoins(prev => prev + 500);
                  triggerToast('💎 ¡Recarga exitosa de +500 monedas!');
                }}
                className="text-[10px] font-bold text-purple-400 uppercase tracking-wider hover:text-purple-300"
              >
                Recargar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- TOAST BANNER NOTIFICATION ----------------- */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#161230] border border-purple-500/30 px-6 py-3 rounded-full text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
