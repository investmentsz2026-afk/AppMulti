'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';
import {
  Home, Compass, Plus, MessageSquare, User, Search, Bell, Crown, Swords,
  BadgeCheck, Eye, Gamepad2, Mic2, Radio, Trophy, Coffee, Headphones,
  Monitor, Flame, ChevronRight, Play, X, Coins, Sword
} from 'lucide-react';

const streams = [
  { name: 'SofiLive', viewers: '2.3K', title: 'Charlando con ustedes 🫶', cat: 'Just Chatting', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { name: 'MartinCV', viewers: '1.8K', title: 'Jugando torneos con subs!', cat: 'Fortnite', img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400' },
  { name: 'AndrésGG', viewers: '887', title: 'Batalla épica contra Diego...', cat: 'Call of Duty', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { name: 'ElKomanche', viewers: '654', title: 'Reaccionando a videos', cat: 'Just Chatting', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400' },
];

const categories = [
  { name: 'Trending', icon: Flame, color: 'from-orange-500 to-red-500' },
  { name: 'Gaming', icon: Gamepad2, color: 'from-purple-500 to-blue-500' },
  { name: 'Música', icon: Mic2, color: 'from-pink-500 to-rose-500' },
  { name: 'Just Chatting', icon: Coffee, color: 'from-green-500 to-emerald-500' },
  { name: 'Esports', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
  { name: 'IRL', icon: Radio, color: 'from-blue-500 to-cyan-500' },
];

const topCategories = [
  { name: 'Gaming', icon: Gamepad2, viewers: '12.5K', color: 'from-purple-600 to-blue-600' },
  { name: 'IRL', icon: Radio, viewers: '8.7K', color: 'from-blue-600 to-cyan-600' },
  { name: 'Música', icon: Mic2, viewers: '6.2K', color: 'from-pink-600 to-rose-600' },
  { name: 'Esports', icon: Trophy, viewers: '5.1K', color: 'from-yellow-600 to-orange-600' },
];

export default function MobileExplorar({ user }: { user: any }) {
  const router = useRouter();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { isLive, streamTitle, viewers, streamCategory } = useLiveStore();

  const userStream = isLive && user ? {
    name: user.username,
    viewers: viewers > 1000 ? `${(viewers / 1000).toFixed(1)}K` : String(viewers),
    title: streamTitle || '¡Transmisión en Vivo de LiveX! 🎮',
    cat: streamCategory || 'Gaming',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    isOwn: true
  } : null;

  const activeStreams = userStream ? [userStream, ...streams] : streams;

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden">

      {/* Top Header (Unified styling matching Para ti & Siguiendo!) */}
      <div className="h-[70px] shrink-0 pt-4 px-4 flex items-center justify-between z-20 bg-[#05050a] border-b border-white/5">
        <div className="flex items-center gap-1.5 shrink-0">
          <Link href="/dashboard?tab=inicio" className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
             <Play className="text-white fill-white w-3.5 h-3.5" />
          </Link>
          <span className="text-xs font-black tracking-tighter">LiveX</span>
        </div>
        
        {/* Navigation Tabs (Siguiendo, Para ti, Batallas, Explorar) */}
        <div className="flex items-center gap-4 text-[13px] sm:text-[14px] font-bold overflow-x-auto scrollbar-none py-1 pr-2 shrink-0 max-w-[65%]">
          <Link href="/dashboard?tab=siguiendo" className="transition-all shrink-0 text-zinc-500 hover:text-white">
            Siguiendo
          </Link>
          <Link href="/dashboard?tab=parati" className="transition-all shrink-0 text-zinc-500 hover:text-white">
            Para ti
          </Link>
          <Link href="/batallas" className="text-zinc-500 hover:text-white flex items-center gap-0.5 shrink-0">
            Batallas <Swords className="w-3.5 h-3.5" />
          </Link>
          <Link href="/explorar" className="text-white border-b-2 border-pink-500 pb-0.5 flex items-center gap-0.5 shrink-0 font-black">
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">

        {/* Hero Trending */}
        <div className="mx-4 mb-5 relative rounded-2xl overflow-hidden aspect-[16/10]">
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-black/50 to-pink-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-pink-600/80 text-[10px] font-bold rounded-full backdrop-blur-md">🔥 EN TENDENCIA</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl font-black mb-1 leading-tight">La batalla más épica</h2>
            <p className="text-xs text-zinc-300 mb-3">AndrésGG vs DiegoStream en una batalla legendaria</p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xs font-bold flex items-center gap-1">Ver batalla en vivo <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2 text-5xl font-black italic text-white/15 select-none">VS</div>
        </div>

        {/* Category Icons */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 custom-scrollbar">
          {categories.map(cat => (
            <button key={cat.name} className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                <cat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold text-zinc-300">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* En vivo ahora */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base flex items-center gap-2">En vivo ahora <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /></h3>
            <button className="text-[11px] text-purple-400 font-bold flex items-center gap-0.5">Ver todo <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {activeStreams.map((s: any, i: number) => (
              <Link href={`/live/${s.name}`} key={i} className={`group block ${s.isOwn ? 'border border-purple-500/50 rounded-2xl p-2 bg-[#1c0933]/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]' : ''}`}>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2 border border-white/5">
                  <img src={s.img} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="px-1.5 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase flex items-center gap-0.5"><span className="w-1 h-1 bg-white rounded-full animate-pulse" />EN VIVO</span>
                    <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md text-[8px] font-bold rounded flex items-center gap-0.5 border border-white/10"><Eye className="w-2.5 h-2.5" /> {s.viewers}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <img src={s.isOwn && user?.avatar ? user.avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} className="w-6 h-6 rounded-full border border-white/20 bg-zinc-800" alt="" />
                      <span className="text-[11px] font-bold flex items-center gap-0.5">{s.name} <BadgeCheck className="w-2.5 h-2.5 text-blue-400" /></span>
                    </div>
                    <p className="text-[9px] text-zinc-400 truncate">{s.title}</p>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-500 px-0.5">{s.cat}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Batallas en vivo */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">Batallas en vivo</h3>
            <button className="text-[11px] text-purple-400 font-bold flex items-center gap-0.5">Ver todo <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
            <div className="relative z-10 flex items-center justify-between mb-3">
              <div className="flex flex-col items-center flex-1">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AndrésGG" className="w-12 h-12 rounded-full border-2 border-purple-500 mb-1" />
                <span className="text-xs font-bold">AndrésGG</span>
                <span className="text-[9px] text-zinc-400 flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> 2.4K</span>
              </div>
              <div className="flex flex-col items-center px-4">
                <div className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">VS</div>
                <span className="text-[9px] text-zinc-400 mt-1">⏱ 02:45</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoStream" className="w-12 h-12 rounded-full border-2 border-pink-500 mb-1" />
                <span className="text-xs font-bold">DiegoStream</span>
                <span className="text-[9px] text-zinc-400 flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> 2.1K</span>
              </div>
            </div>
            {/* Score bar */}
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] font-bold text-purple-400">55%</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-l-full" style={{width:'55%'}} />
                <div className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-r-full" style={{width:'45%'}} />
              </div>
              <span className="text-[10px] font-bold text-pink-400">45%</span>
            </div>
          </div>
        </div>

        {/* Top Categorías */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">Top categorías</h3>
            <button className="text-[11px] text-purple-400 font-bold flex items-center gap-0.5">Ver todo <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {topCategories.map(cat => (
              <button key={cat.name} className="flex flex-col items-center gap-2 bg-white/5 rounded-xl p-3 border border-white/5 hover:border-purple-500/20 transition-all">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold">{cat.name}</span>
                <span className="text-[9px] text-zinc-500">👁 {cat.viewers}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
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
            className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] hover:scale-105 transition-transform"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
          <span className="text-[10px] font-bold">Mensajes</span>
        </Link>
        <Link href={`/u/${user?.username}`} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </Link>
      </div>

      {/* ----------------- MOBILE QUICK ACTIONS OVERLAY ----------------- */}
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
