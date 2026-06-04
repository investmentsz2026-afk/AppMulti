'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCreatorStore } from '@/store/useCreatorStore';
import { 
  Home, Compass, Plus, MessageSquare, User, 
  Search, Crown, Heart, MessageCircle, Share2, 
  Gift, Play, BadgeCheck, Trophy, Sparkles, X, ChevronRight, Swords,
  Coins, Sword, Tv
} from 'lucide-react';

export default function MobileFollowing({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const router = useRouter();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todo');

  const followingCount = 128;

  // Lives horizontal avatars
  const liveStreamers = [
    { id: 1, name: 'SofiLive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', category: 'Chatting', views: '2.3K' },
    { id: 2, name: 'AndrésGG', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', category: 'Warzone', views: '1.2K' },
    { id: 3, name: 'CamiLove', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', category: 'Charlando', views: '987' },
    { id: 4, name: 'MartinCV', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', category: 'Fortnite', views: '854' },
    { id: 5, name: 'NickyPlay', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', category: 'Música', views: '320' },
  ];

  // Feed items
  const feedItems = [
    { id: 1, type: 'live', name: 'SofiLive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', title: 'Charlando con ustedes 💜 ven a pasar el rato!', views: '2.3K', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300' },
    { id: 2, type: 'video', name: 'AndrésGG', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', title: 'Así se ve el nuevo mapa 😍🔥', duration: '00:15', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300' },
    { id: 3, type: 'video', name: 'CamiLove', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', title: 'Storytime: Lo que nadie sabe de mí 🙊', duration: '00:32', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' },
    { id: 4, type: 'short', name: 'MartinCV', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', title: 'Partida épica en ranked 🎮🔥', duration: '01:00', img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=300' },
    { id: 5, type: 'live', name: 'NickyPlay', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', title: 'Batalla de escuadras VS NickyPlay 🏆', views: '320', img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=300' },
    { id: 6, type: 'video', name: 'Zeta', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150', title: 'Nuevo setup del estudio 🛠️✨', duration: '00:15', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&u=9' },
  ];

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden relative">
      
      {/* Top Header (Exactly matches the 3rd reference screenshot!) */}
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

      {/* Main Content Feed Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-24">
        
        {/* Title and Count Badge */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-black tracking-wide">Siguiendo</h2>
          <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] font-black rounded">
            {followingCount}
          </span>
        </div>

        {/* Lives horizontal carrousel (Instagram/TikTok style circles) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" /> En vivo ahora
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar snap-x">
            {liveStreamers.map(streamer => (
              <div key={streamer.id} className="flex flex-col items-center shrink-0 snap-start w-16">
                {/* Glowing Avatar circle */}
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-red-500 shadow-md">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#05050a] bg-zinc-800">
                    <img src={streamer.avatar} className="w-full h-full object-cover" alt="" />
                  </div>
                  {/* Live tag at the bottom of circle */}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[7px] font-black px-1 rounded border border-[#05050a] tracking-tighter uppercase">
                    LIVE
                  </span>
                </div>
                
                {/* Name */}
                <span className="text-[10px] font-bold mt-2 truncate w-full text-center text-zinc-200">
                  {streamer.name}
                </span>
                {/* Viewers */}
                <span className="text-[8px] font-medium text-zinc-500 mt-0.5">
                  ▷ {streamer.views}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tab buttons row */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 border-t border-white/5 pt-4 custom-scrollbar">
          {['Todo', 'Videos', 'Shorts', 'Lives', 'Fotos'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                activeFilter === filter 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 2-Column Media Post Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {feedItems
            .filter(item => {
              if (activeFilter === 'Todo') return true;
              if (activeFilter === 'Videos' && (item.type === 'video' || item.type === 'short')) return true;
              if (activeFilter === 'Shorts' && item.type === 'short') return true;
              if (activeFilter === 'Lives' && item.type === 'live') return true;
              if (activeFilter === 'Fotos' && item.type === 'photo') return true;
              return false;
            })
            .map(item => (
              <div key={item.id} className="flex flex-col bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden shadow-md">
                
                {/* Visual Preview */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Left Label */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider ${
                      item.type === 'live' ? 'bg-red-600 text-white' : 'bg-black/50 text-zinc-300'
                    }`}>
                      {item.type === 'live' ? 'LIVE' : item.type === 'video' ? 'CLIP' : item.type === 'short' ? 'SHORT' : 'PHOTO'}
                    </span>
                  </div>

                  {/* Right view count/duration overlay */}
                  <div className="absolute top-2 right-2">
                    <span className="px-1 py-0.5 bg-black/40 text-[7px] font-bold rounded">
                      {item.type === 'live' ? `▷ ${item.views}` : item.duration}
                    </span>
                  </div>

                  {/* Bottom Avatar overlay */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <img src={item.avatar} className="w-5 h-5 rounded-full border border-white/20 object-cover shrink-0" alt="" />
                    <span className="text-[8px] font-bold text-white truncate max-w-[50px] flex items-center gap-0.5">
                      {item.name} <BadgeCheck className="w-2.5 h-2.5 text-blue-400 shrink-0 inline" />
                    </span>
                  </div>
                </div>

                {/* Text Title */}
                <div className="p-2">
                  <p className="text-[10px] font-bold text-zinc-200 line-clamp-2 leading-tight">
                    {item.title}
                  </p>
                </div>

              </div>
            ))}
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
        <button onClick={() => setTab('inicio')} className="flex flex-col items-center gap-1 text-pink-500">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
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

    </div>
  );
}
