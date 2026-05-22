'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home, Play, Compass, Sword, Trophy, MessageSquare, Bell, User, Wallet,
  Plus, Search, Crown, LogOut, ChevronRight, BadgeCheck, Eye, Gift, Film,
  Share2, Heart, Edit3, Grid, List, Shield, Check, MessageCircle, AlertCircle,
  Settings, Smartphone, Sparkles, X, QrCode, Lock, Image as ImageIcon
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useUserPosts, DBPost } from '@/hooks/usePosts';

// TikTok Custom SVG Icon
function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2.02 3.73 2.37v3.91c-1.39-.02-2.77-.4-3.99-1.12-.62-.37-1.18-.84-1.66-1.38v5.82c.04 1.52-.32 3.03-1.04 4.35-.72 1.33-1.8 2.42-3.1 3.15-1.31.74-2.81 1.13-4.33 1.11-1.52-.01-3.02-.43-4.32-1.2-1.28-.76-2.31-1.88-2.98-3.21C-.3 16.71-.46 15.19-.2 13.68c.26-1.5.94-2.91 1.96-4.04 1.02-1.14 2.37-1.92 3.86-2.26v4.06c-.84.23-1.6.72-2.18 1.4-.58.68-.9 1.55-.92 2.45-.02.91.24 1.8.76 2.53.51.74 1.26 1.28 2.11 1.53.86.25 1.77.19 2.59-.16.82-.35 1.5-1.0 1.94-1.81.44-.82.61-1.75.5-2.68v-14.8c.01-.02.01-.03.01-.05z" />
    </svg>
  );
}

// Instagram Custom SVG Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="24" height="24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// YouTube Custom SVG Icon
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function DesktopProfile({ sessionUser, targetUsername, isOwnProfile }: { sessionUser: any, targetUsername: string, isOwnProfile: boolean }) {
  const [activeTab, setActiveTab] = useState('Videos');
  const [activeFilter, setActiveFilter] = useState('Más recientes');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Fetch real posts
  const { posts: userPosts, loading: postsLoading } = useUserPosts(targetUsername, sessionUser?.id);
  
  // Settings & Adjustment Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState('perfil'); // perfil | monedas | apk | cuenta
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Recharge coins state
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Profile fields state
  const [profileName, setProfileName] = useState('ValenLG');
  const [profileBio, setProfileBio] = useState('Creadora de contenido | Directos todos los días 💜 Jugamos, charlamos y creamos la mejor comunidad ✨');
  const [profileEmail, setProfileEmail] = useState('contacto@valenlg.com');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('¡Perfil actualizado con éxito! ✨');
    setTimeout(() => setIsSettingsOpen(false), 800);
  };

  const handleBuyCoins = (packName: string) => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      triggerToast(`¡Compra exitosa! Se añadieron las monedas de tu paquete ${packName} 🪙`);
      setSelectedPack(null);
    }, 1500);
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('¡Enlace de perfil copiado al portapapeles! 🔗');
  };

  const creator = {
    name: profileName,
    username: targetUsername,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
    followers: '1.2M',
    following: '248',
    likes: '3.6M',
    bio: profileBio,
    businessEmail: profileEmail,
    level: 24,
    levelName: 'Stream Queen',
    xpProgress: 75,
  };

  const tabs = ['Videos', 'Shorts', 'Fotos', 'Streams', 'Guardados', 'Me gusta'];
  const filters = ['Más recientes', 'Populares', 'Más antiguos'];

  const staticGridItems = [
    { id: 1, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400', views: '1.2M', title: 'Así fue mi primera vez en torneo internacional 🏆💜', pinned: true },
    { id: 2, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=1', views: '840K', title: 'Pov: Cuando ganas la partida épica 🔥😎', pinned: true },
    { id: 3, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400&u=2', views: '2.3M', title: 'Probando el nuevo set up ✨ ¿Qué les parece?', pinned: true },
    { id: 4, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400&u=3', views: '1.1M', title: 'Noche de chill y charlas con ustedes 💜', pinned: true },
    { id: 5, img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=400', views: '560K', title: 'Explorando lugares increíbles en directo 🌲' },
    { id: 6, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=4', views: '950K', title: 'Ustedes hacen todo esto posible 💜' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white relative">
      {/* Left Sidebar (Perfectly matching other pages!) */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard?tab=inicio" className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </Link>

        <nav className="flex flex-col gap-1 mb-8">
          <Link 
            href="/dashboard?tab=inicio"
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-left"
          >
            <Home className="w-5 h-5" /> Inicio
          </Link>
          <Link 
            href="/dashboard?tab=parati"
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-left"
          >
            <Play className="w-5 h-5" /> Para ti
          </Link>
          <Link 
            href="/dashboard?tab=siguiendo"
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-left"
          >
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
          <Link href={`/u/${sessionUser.username}`} className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <User className="w-5 h-5 text-pink-400" /> Perfil
          </Link>
          <Link href="/wallet" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Wallet className="w-5 h-5" /> Wallet
          </Link>
        </nav>

        <button 
          onClick={() => useCreatorStore.getState().open()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-8"
        >
          <Plus className="w-5 h-5" /> Crear
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
           <button onClick={() => { setSettingsActiveTab('monedas'); setIsSettingsOpen(true); }} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
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
          <img src={sessionUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionUser.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{sessionUser.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/5 px-6 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          <div className="w-full max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input type="text" placeholder="Buscar streamers, batallas, torneos..." className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50 text-white placeholder:text-zinc-600" />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Ctrl K</kbd>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-yellow-400"><Crown className="w-4.5 h-4.5" /></button>
            <button className="text-zinc-400 hover:text-white relative"><Bell className="w-4.5 h-4.5" /><span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" /></button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"><span className="text-[7px] font-black text-black">L</span></div>
                <span className="text-xs font-bold text-yellow-400">12.5K</span>
              </div>
              <img src={sessionUser.avatar} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-1">{sessionUser.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● En línea</div>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/10">Transmitir en vivo</button>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          
          {/* Banner and Profile Header Section */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0c0c14] border border-white/5 mb-6">
            {/* Banner Cover */}
            <div className="h-[200px] relative w-full overflow-hidden">
              <img src={creator.banner} className="w-full h-full object-cover opacity-60" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-black/30" />
              {isOwnProfile && (
                <div className="absolute top-4 right-4 flex items-center gap-2.5 z-20">
                  {/* Button Group (Exactly as the third reference image!) */}
                  <button onClick={() => { setSettingsActiveTab('perfil'); setIsSettingsOpen(true); }} className="bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md">
                    <Edit3 className="w-3.5 h-3.5" /> Editar perfil
                  </button>
                  <button onClick={() => triggerToast('¡Función de promoción activada! 🚀')} className="bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md">
                    Promocionar publicación
                  </button>
                  <button onClick={() => { setSettingsActiveTab('cuenta'); setIsSettingsOpen(true); }} className="w-9 h-9 rounded-full bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button onClick={handleCopyProfileLink} className="w-9 h-9 rounded-full bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Avatar & Profile Details Overlay */}
            <div className="px-8 pb-8 pt-4 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              {/* Profile Avatar, Identity, Stats */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20 md:-mt-16 relative z-10">
                {/* Large Avatar */}
                <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0c0c14]">
                    <img src={creator.avatar} className="w-full h-full object-cover" alt="" />
                  </div>
                  {/* Status dot */}
                  <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0c0c14]" />
                </div>

                {/* Profile Identity Details */}
                <div className="text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-2.5 mb-1.5">
                    <h1 className="text-2xl font-black flex items-center gap-1.5 text-white">
                      {creator.name} 
                      <BadgeCheck className="w-6 h-6 text-blue-400 fill-transparent shrink-0" />
                      <div className="w-5 h-5 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center border border-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.3)] shrink-0">
                        <Trophy className="w-3 h-3 text-black fill-black" />
                      </div>
                    </h1>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2.5 text-xs text-zinc-400 mb-3.5">
                    <span className="font-semibold text-zinc-300">@{creator.username}</span>
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-[10px] font-bold rounded-full">Creadora</span>
                    <span className="text-green-400 font-semibold">En línea</span>
                  </div>

                  {/* Followers Stats */}
                  <div className="flex justify-center md:justify-start items-center gap-6">
                    <div>
                      <span className="font-black text-lg text-white block leading-none">{creator.followers}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Seguidores</span>
                    </div>
                    <div className="border-l border-white/5 h-8" />
                    <div>
                      <span className="font-black text-lg text-white block leading-none">{creator.following}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Siguiendo</span>
                    </div>
                    <div className="border-l border-white/5 h-8" />
                    <div>
                      <span className="font-black text-lg text-white block leading-none">{creator.likes}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Me gusta</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* XP Level System MMORPG Card */}
              <div className="bg-[#171333]/80 border border-purple-500/30 rounded-2xl p-4 w-full md:w-[260px] backdrop-blur-md shadow-[0_0_20px_rgba(147,51,234,0.1)] shrink-0">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white leading-tight">Nivel {creator.level}</h3>
                    <p className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">{creator.levelName}</p>
                  </div>
                </div>
                {/* XP Progress Bar */}
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold mb-1.5">
                  <span>{creator.xpProgress}% para nivel {creator.level + 1}</span>
                  <span className="text-purple-400">{creator.xpProgress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-pink-500 rounded-full" style={{ width: `${creator.xpProgress}%` }} />
                </div>
              </div>

            </div>

            {/* Biography & Social Media */}
            <div className="px-8 pb-6 border-t border-white/5 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-xl text-center md:text-left">
                <p className="text-xs leading-relaxed text-zinc-300 mb-1.5">{creator.bio}</p>
                <div className="text-[11px] text-zinc-500 font-medium">Business: <span className="text-purple-400">{creator.businessEmail}</span></div>
              </div>
              
              {/* Linked Accounts & Icons Section */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* 4th Reference Image Capsule Pill (Linked Devices/Acounts) */}
                <div className="bg-[#12152b] border border-white/5 rounded-full px-3 py-1.5 flex items-center gap-2.5 shadow-lg">
                  <TiktokIcon className="w-4 h-4 text-white" />
                  <Smartphone className="w-4 h-4 text-zinc-400" />
                  <div className="w-px h-4 bg-white/10" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center text-[10px] font-black text-black border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)] relative">
                    <span>J</span>
                    <span className="absolute -top-1 -right-1">👑</span>
                  </div>
                </div>

                {/* Social networks icons */}
                <div className="flex items-center gap-2.5">
                  <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer">
                    <TiktokIcon className="w-4.5 h-4.5" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer">
                    <InstagramIcon className="w-4.5 h-4.5" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer">
                    <YoutubeIcon className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-white/5 mb-6 flex items-center justify-between">
            <div className="flex gap-8">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[15px] font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filters and Layout Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${activeFilter === filter ? 'bg-[#1f173d] text-purple-300 border-purple-500/30' : 'bg-white/5 text-zinc-400 border-transparent hover:bg-white/10'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/5">
              <button onClick={() => setViewType('grid')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewType === 'grid' ? 'bg-[#18112d] text-purple-400 border border-purple-500/30' : 'text-zinc-500 hover:text-white'}`}>
                <Grid className="w-4.5 h-4.5" />
              </button>
              <button onClick={() => setViewType('list')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewType === 'list' ? 'bg-[#18112d] text-purple-400 border border-purple-500/30' : 'text-zinc-500 hover:text-white'}`}>
                <List className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Media Grid Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {/* Real uploaded posts */}
            {userPosts.length > 0 ? (
              userPosts.map((post: DBPost) => (
                <div key={post.id} className="group cursor-pointer block">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-purple-500/30 transition-all shadow-md">
                    {post.type === 'VIDEO' ? (
                      <video src={post.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted playsInline />
                    ) : (
                      <img src={post.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Private badge */}
                    {post.isPrivate && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-pink-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <Lock className="w-3 h-3" /> Privado
                        </span>
                      </div>
                    )}

                    {/* Type badge */}
                    <div className="absolute top-3 right-3">
                      {post.type === 'VIDEO' ? (
                        <span className="px-2 py-0.5 bg-purple-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <Film className="w-3 h-3" /> Video
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-blue-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <ImageIcon className="w-3 h-3" /> Foto
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h4 className="text-[13px] font-bold text-zinc-100 group-hover:text-purple-400 line-clamp-2 transition-colors px-1 leading-snug">{post.title}</h4>
                </div>
              ))
            ) : (
              // Fallback to static grid
              staticGridItems.map(item => (
                <div key={item.id} className="group cursor-pointer block">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-purple-500/30 transition-all shadow-md">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {item.pinned && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                          📌 Fijado
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white">
                      <span className="text-[8px] font-black">▷</span> {item.views}
                    </div>
                  </div>
                  
                  <h4 className="text-[13px] font-bold text-zinc-100 group-hover:text-purple-400 line-clamp-2 transition-colors px-1 leading-snug">{item.title}</h4>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center items-center py-6">
            <button className="px-8 py-3 bg-[#0a0a0f] hover:bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 tracking-wider">
              Cargar más
            </button>
          </div>

        </div>
      </main>

      {/* Adjustments & Settings Modal (PC View) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300">
          <div className="bg-[#0b0b12] border border-purple-500/20 w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.25)] flex h-[500px]">
            
            {/* Modal Sidebar */}
            <div className="w-[200px] bg-[#07070b] p-6 border-r border-white/5 flex flex-col justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Ajustes</span>
                <button onClick={() => setSettingsActiveTab('perfil')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'perfil' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Editar Perfil
                </button>
                <button onClick={() => setSettingsActiveTab('monedas')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'monedas' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Recargar Monedas
                </button>
                <button onClick={() => setSettingsActiveTab('apk')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'apk' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Obtener APK Móvil
                </button>
                <button onClick={() => setSettingsActiveTab('cuenta')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'cuenta' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Privacidad & Cuenta
                </button>
              </div>

              <button onClick={() => logoutUser()} className="w-full py-2.5 bg-red-950/20 hover:bg-red-900/40 border border-red-500/20 rounded-xl text-xs font-bold text-red-400 flex items-center justify-center gap-2 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                
                {/* EDIT PROFILE TAB */}
                {settingsActiveTab === 'perfil' && (
                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1">Editar Perfil de Creador</h2>
                      <p className="text-xs text-zinc-400">Actualiza tu información pública de perfil en LiveX.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase">Nombre de Perfil</label>
                      <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white" required />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase">Biografía</label>
                      <textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white resize-none" required />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase">Correo de Negocios</label>
                      <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white" required />
                    </div>

                    <button type="submit" className="mt-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-[1.01] transition-all shadow-lg shadow-pink-500/20">
                      Guardar Cambios
                    </button>
                  </form>
                )}

                {/* RECHARGE COINS (TIK TOK STYLE) */}
                {settingsActiveTab === 'monedas' && (
                  <div className="flex flex-col gap-5 h-full justify-between">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1 flex items-center gap-1.5">Recargar Monedas <Sparkles className="w-4 h-4 text-yellow-400" /></h2>
                      <p className="text-xs text-zinc-400">Obtén monedas para apoyar a tus creadores favoritos con regalos de neón.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-2">
                      {[
                        { coins: 100, price: '0.99', popular: false },
                        { coins: 500, price: '4.99', popular: false },
                        { coins: 1200, price: '9.99', popular: true },
                        { coins: 3500, price: '29.99', popular: false },
                        { coins: 6500, price: '49.99', popular: false },
                        { coins: 14000, price: '99.99', popular: true },
                      ].map((pack) => (
                        <div
                          key={pack.coins}
                          onClick={() => setSelectedPack(pack.coins)}
                          className={`relative border rounded-2xl p-4 flex flex-col items-center justify-between cursor-pointer transition-all ${
                            selectedPack === pack.coins
                              ? 'bg-[#1e143d] border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                          }`}
                        >
                          {pack.popular && (
                            <span className="absolute -top-2 px-2 py-0.5 bg-pink-500 text-[8px] font-black rounded-full uppercase tracking-wider shadow">
                              Popular
                            </span>
                          )}
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)] mb-2">
                            <span className="text-[10px] font-black text-black">L</span>
                          </div>
                          <span className="text-sm font-black block">{pack.coins.toLocaleString()}</span>
                          <span className="text-[10px] text-purple-300 font-bold mt-1">${pack.price} USD</span>
                        </div>
                      ))}
                    </div>

                    {selectedPack ? (
                      <button
                        onClick={() => handleBuyCoins(selectedPack.toLocaleString())}
                        disabled={isPurchasing}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-[1.01] transition-all shadow-lg shadow-pink-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isPurchasing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando pago...
                          </>
                        ) : (
                          `Comprar ${selectedPack.toLocaleString()} Monedas`
                        )}
                      </button>
                    ) : (
                      <div className="w-full py-3 text-center border border-dashed border-white/10 rounded-xl text-xs text-zinc-500">
                        Selecciona un paquete para proceder con la compra
                      </div>
                    )}
                  </div>
                )}

                {/* GET MOBILE APK WITH QR CODE */}
                {settingsActiveTab === 'apk' && (
                  <div className="flex flex-col gap-6 items-center text-center">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1 flex items-center justify-center gap-2">LiveX en tu Bolsillo <Smartphone className="w-5 h-5 text-purple-400" /></h2>
                      <p className="text-xs text-zinc-400 max-w-md mx-auto">Descarga nuestra APK oficial y disfruta la experiencia móvil fluida con notificaciones instantáneas.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 my-3 bg-[#07070b]/60 p-6 rounded-2xl border border-white/5">
                      {/* Neon QR Code Mockup */}
                      <div className="p-4 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <div className="w-28 h-28 bg-[#05050a] rounded-xl flex items-center justify-center text-white">
                          <QrCode className="w-20 h-20 text-purple-400" />
                        </div>
                      </div>

                      <div className="text-left max-w-xs">
                        <h4 className="text-sm font-black text-white mb-1.5">Instrucciones Rápidas</h4>
                        <ol className="text-[11px] text-zinc-400 list-decimal pl-4 flex flex-col gap-1">
                          <li>Escanea el código QR con tu celular.</li>
                          <li>Descarga el archivo APK directamente.</li>
                          <li>Permite fuentes desconocidas al instalar.</li>
                          <li>¡Disfruta de la mejor app de streaming!</li>
                        </ol>
                      </div>
                    </div>

                    <button onClick={() => triggerToast('¡Descarga de APK iniciada! 🚀')} className="px-8 py-3 bg-[#12152b] hover:bg-purple-950/20 border border-purple-500/30 text-purple-300 text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Descargar APK para Android Directamente
                    </button>
                  </div>
                )}

                {/* PRIVACY & ACCOUNT DETAILS */}
                {settingsActiveTab === 'cuenta' && (
                  <div className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1">Configuración de Cuenta & Privacidad</h2>
                      <p className="text-xs text-zinc-400">Protege tu cuenta y administra tus vinculaciones sociales.</p>
                    </div>

                    <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <span className="text-xs font-bold text-white block">Cuenta Verificada</span>
                          <span className="text-[10px] text-zinc-500">Insignia azul activa en tu perfil de creadora.</span>
                        </div>
                        <BadgeCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <span className="text-xs font-bold text-white block">Transmisiones en alta definición</span>
                          <span className="text-[10px] text-zinc-500">Permitir streaming en Full HD 1080p 60 FPS.</span>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">Activo</span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <span className="text-xs font-bold text-white block">Visibilidad de perfil</span>
                          <span className="text-[10px] text-zinc-500">Perfil público visible en buscador de explorar.</span>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">Público</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e0c1f] border border-purple-500/50 text-white rounded-2xl px-5 py-3 shadow-[0_0_30px_rgba(168,85,247,0.35)] flex items-center gap-3 transition-all animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
