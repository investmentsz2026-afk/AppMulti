'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Sparkles, Shield, ChevronUp, ChevronDown, Calendar, Star, Film, Image, Video
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';

export default function DesktopFollowing({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [activeSort, setActiveSort] = useState('Más recientes');

  const followingCount = 128;

  // Lives carousel data
  const liveStreamers = [
    { id: 1, name: 'SofiLive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', category: 'Just Chatting', views: '2.2K', preview: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: 'AndrésGG', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', category: 'Warzone', views: '1.2K', preview: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: 'CamiLove', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', category: 'Charlando', views: '987', preview: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: 'MartinCV', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', category: 'Fortnite', views: '854', preview: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=300' },
    { id: 5, name: 'NickyPlay', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', category: 'Música', views: '320', preview: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=300' },
    { id: 6, name: 'Zeta', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150', category: 'Apex Legends', views: '150', preview: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&u=12' },
  ];

  // Feed items
  const feedItems = [
    { id: 1, type: 'live', name: 'SofiLive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', title: 'Charlando con ustedes 💜 ven a pasar el rato!', views: '2.2K', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
    { id: 2, type: 'video', name: 'AndrésGG', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', title: 'Así se ve el nuevo mapa 😍🔥', duration: '00:15', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
    { id: 3, type: 'video', name: 'CamiLove', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', title: 'Storytime: Lo que nadie sabe de mí 🙊', duration: '00:32', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400' },
    { id: 4, type: 'short', name: 'MartinCV', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', title: 'Partida épica en ranked 🎮🔥', duration: '01:00', img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400' },
    { id: 5, type: 'live', name: 'NickyPlay', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', title: 'Batalla de escuadras VS NickyPlay 🏆', views: '320', img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=400' },
    { id: 6, type: 'video', name: 'Zeta', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150', title: 'Nuevo setup del estudio 🛠️✨', duration: '00:15', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=9' },
    { id: 7, type: 'live', name: 'AlexM', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', title: 'Probando juegos nuevos 🕹️👾', views: '1.7K', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&u=3' },
    { id: 8, type: 'video', name: 'SofiLive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', title: 'Día de fotos en el bosque 🌲📷', duration: '00:28', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=10' },
    { id: 9, type: 'live', name: 'MartinCV', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', title: 'Torneo de streamers LiveX 🏆🎮', views: '854', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400&u=11' },
    { id: 10, type: 'photo', name: 'CamiLove', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', title: 'Mi nueva mascota 🐱🤍', duration: '00:09', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400' },
    { id: 11, type: 'video', name: 'AndrésGG', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', title: 'Vlog: Un día conmigo 🎬🍿', duration: '01:32', img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400&u=13' },
    { id: 12, type: 'live', name: 'NickyPlay', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', title: 'Cantando en vivo 🎤💜', views: '1.1K', img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=400&u=14' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white">
      
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
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'parati' ? 'bg-white/5 text-purple-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Play className="w-5 h-5" /> Para ti
          </button>
          <button 
            onClick={() => setTab('siguiendo')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'siguiendo' ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
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
          <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          {/* Custom Pill Buttons side-by-side (As in reference image!) */}
          <div className="flex bg-white/5 border border-white/5 rounded-full p-1 backdrop-blur-md">
            <button 
              onClick={() => setTab('parati')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${tab === 'parati' ? 'text-white bg-white/10 shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              Para ti
            </button>
            <button 
              onClick={() => setTab('siguiendo')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${tab === 'siguiendo' ? 'text-white bg-white/10 shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              Siguiendo
            </button>
          </div>

          {/* Search bar */}
          <div className="w-96 relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar streams, creadores, videos..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-yellow-400"><Crown className="w-4.5 h-4.5" /></button>
            <button className="text-zinc-400 hover:text-white relative"><Bell className="w-4.5 h-4.5" /><span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" /></button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-1 truncate max-w-[80px]">{user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● En línea</div>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/10">Transmitir en vivo</button>
          </div>
        </header>

        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          
          {/* Main Title of Page */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-black text-white tracking-wide">Siguiendo</h1>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-black rounded-lg">
              {followingCount}
            </span>
          </div>

          {/* Carrusel Horizontal En Vivo Ahora */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" /> En vivo ahora
              </h2>
              <button className="text-xs font-bold text-purple-400 hover:text-purple-300">Ver todo</button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {liveStreamers.map(streamer => (
                <div 
                  key={streamer.id} 
                  className="w-[180px] shrink-0 snap-start bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={streamer.preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    
                    {/* Live label top left */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase tracking-wider shadow">
                        EN VIVO
                      </span>
                    </div>

                    {/* View Count top right */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-1.5 py-0.5 bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-bold rounded">
                        ▷ {streamer.views}
                      </span>
                    </div>

                    {/* Overlapping circle avatar bottom center */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 p-0.5 rounded-full bg-[#05050a] border border-white/10 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                      <img src={streamer.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-purple-500" alt="" />
                    </div>
                  </div>

                  {/* Name and category info */}
                  <div className="pt-7 pb-3.5 px-3 text-center">
                    <h4 className="text-xs font-bold text-white flex items-center justify-center gap-1 truncate group-hover:text-purple-400 transition-colors">
                      {streamer.name} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline shrink-0" />
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-semibold truncate mt-0.5">{streamer.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Filters and Sort Dropdown */}
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mb-6">
            <div className="flex gap-2">
              {['Todo', 'Videos', 'Shorts', 'Lives', 'Fotos', 'Clips'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${
                    activeFilter === filter 
                      ? 'bg-[#1e143d] text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]' 
                      : 'bg-white/5 text-zinc-400 border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-bold">Ordenar por:</span>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold border border-white/5 flex items-center gap-1.5 text-zinc-300">
                {activeSort} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mixed Feed Media Grid (EXCLUSIVELY Followed content!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {feedItems
              .filter(item => {
                if (activeFilter === 'Todo') return true;
                if (activeFilter === 'Videos' && (item.type === 'video' || item.type === 'short')) return true;
                if (activeFilter === 'Shorts' && item.type === 'short') return true;
                if (activeFilter === 'Lives' && item.type === 'live') return true;
                if (activeFilter === 'Fotos' && item.type === 'photo') return true;
                if (activeFilter === 'Clips' && item.type === 'video') return true;
                return false;
              })
              .map(item => (
                <div key={item.id} className="group cursor-pointer block">
                  {/* Visual Preview Card */}
                  <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden mb-3 border ${
                    item.type === 'live' 
                      ? 'border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.1)] group-hover:border-purple-500' 
                      : 'border-white/5 group-hover:border-white/10'
                  } transition-all`}>
                    
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Badge Indicator Top Left */}
                    {item.type === 'live' ? (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 bg-red-600 text-[9px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-lg">
                          ● EN VIVO
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1">
                          {item.type === 'video' ? '🎬 CLIP' : item.type === 'short' ? '⚡ SHORT' : '📷 FOTO'}
                        </span>
                      </div>
                    )}

                    {/* Top Right Duration or View count */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold rounded-lg">
                        {item.type === 'live' ? `▷ ${item.views}` : item.duration}
                      </span>
                    </div>

                    {/* Bottom overlapping info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                      <img src={item.avatar} className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0" alt="" />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-white block leading-none flex items-center gap-0.5 truncate">
                          {item.name} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0 inline" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-[13px] font-bold text-zinc-100 group-hover:text-purple-400 transition-colors line-clamp-2 px-1 leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center items-center py-10">
            <button className="px-8 py-3 bg-[#0a0a0f] hover:bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-all">
              Cargar más
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}
