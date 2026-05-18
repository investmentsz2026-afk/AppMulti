'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home, Compass, Plus, MessageSquare, User, Search, Bell, Crown,
  BadgeCheck, Eye, Gamepad2, Mic2, Radio, Trophy, Coffee, Headphones,
  Monitor, Flame, ChevronRight, Play, ArrowLeft, Upload, Menu, Shield,
  Heart, Image, Grid, Film, X, Sparkles, Smartphone, QrCode, LogOut, Edit3
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';

// TikTok Custom SVG Icon
function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2.02 3.73 2.37v3.91c-1.39-.02-2.77-.4-3.99-1.12-.62-.37-1.18-.84-1.66-1.38v5.82c.04 1.52-.32 3.03-1.04 4.35-.72 1.33-1.8 2.42-3.1 3.15-1.31.74-2.81 1.13-4.33 1.11-1.52-.01-3.02-.43-4.32-1.2-1.28-.76-2.31-1.88-2.98-3.21C-.3 16.71-.46 15.19-.2 13.68c.26-1.5.94-2.91 1.96-4.04 1.02-1.14 2.37-1.92 3.86-2.26v4.06c-.84.23-1.6.72-2.18 1.4-.58.68-.9 1.55-.92 2.45-.02.91.24 1.8.76 2.53.51.74 1.26 1.28 2.11 1.53.86.25 1.77.19 2.59-.16.82-.35 1.5-1.0 1.94-1.81.44-.82.61-1.75.5-2.68v-14.8c.01-.02.01-.03.01-.05z" />
    </svg>
  );
}

// Instagram Custom SVG Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// YouTube Custom SVG Icon
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function MobileProfile({ sessionUser, targetUsername, isOwnProfile }: { sessionUser: any, targetUsername: string, isOwnProfile: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState('grid');
  
  // Mobile drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSubView, setDrawerSubView] = useState<'menu' | 'editar' | 'recargar' | 'apk'>('menu'); // menu | editar | recargar | apk
  
  // Input fields states
  const [profileName, setProfileName] = useState('ValenLG');
  const [profileBio, setProfileBio] = useState('Creadora de contenido | Directos todos los días 💜 Jugamos, charlamos y creamos la mejor comunidad ✨ Business: contacto@valenlg.com');
  
  // Recharge coins packages
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Toast notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('¡Perfil actualizado con éxito! ✨');
    setTimeout(() => {
      setIsDrawerOpen(false);
      setDrawerSubView('menu');
    }, 800);
  };

  const handleBuyCoins = (packAmount: number) => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      triggerToast(`¡Compra exitosa de ${packAmount.toLocaleString()} Monedas! 🪙`);
      setSelectedPack(null);
      setIsDrawerOpen(false);
      setDrawerSubView('menu');
    }, 1500);
  };

  const creator = {
    name: profileName,
    username: targetUsername,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    followers: '1.2M',
    following: '248',
    likes: '3.6M',
    bio: profileBio,
    level: 24,
    levelName: 'Stream Queen',
    xpProgress: 75,
  };

  const gridItems = [
    { id: 1, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300', views: '1.2M', pinned: true },
    { id: 2, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&u=1', views: '840K', pinned: true },
    { id: 3, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300&u=2', views: '2.3M', pinned: true },
    { id: 4, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=300&u=3', views: '1.1M' },
    { id: 5, img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=300', views: '560K' },
    { id: 6, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&u=4', views: '950K' },
    { id: 7, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300&u=5', views: '1.7M' },
    { id: 8, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300&u=6', views: '1.3M' },
    { id: 9, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=300&u=7', views: '620K' },
    { id: 10, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300&u=8', views: '860K' },
    { id: 11, img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=300&u=9', views: '730K' },
    { id: 12, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300&u=10', views: '1.9M' }
  ];

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden relative">
      
      {/* Top Header */}
      <div className="h-[55px] shrink-0 px-4 flex items-center justify-between z-20 bg-[#05050a] border-b border-white/5">
        <Link href="/dashboard" className="text-zinc-300">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-black tracking-wide">Mi perfil</h1>
        <div className="flex items-center gap-4 text-zinc-300">
          <button onClick={() => triggerToast('¡Enlace de perfil copiado! 🔗')} className="cursor-pointer"><Upload className="w-5 h-5" /></button>
          <button className="cursor-pointer" onClick={() => { setDrawerSubView('menu'); setIsDrawerOpen(true); }}><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
        
        {/* Cover Banner & Profile Circle Overlap */}
        <div className="relative">
          {/* Banner */}
          <div className="h-[120px] w-full overflow-hidden relative">
            <img src={creator.banner} className="w-full h-full object-cover opacity-50" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-black/20" />
          </div>

          {/* Centered Large Avatar overlapping banner */}
          <div className="flex flex-col items-center -mt-14 relative z-10 px-4">
            <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-600 to-pink-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#05050a]">
                <img src={creator.avatar} className="w-full h-full object-cover" alt="" />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-3 border-[#05050a]" />
            </div>

            {/* Profile Info */}
            <h2 className="text-lg font-black mt-2.5 flex items-center gap-1">
              {creator.name}
              <BadgeCheck className="w-5 h-5 text-blue-400 fill-transparent" />
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded flex items-center justify-center border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                <Trophy className="w-2.5 h-2.5 text-black fill-black" />
              </div>
            </h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400 mb-2">
              <span className="font-semibold text-zinc-300">@{creator.username}</span>
              <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-[9px] font-bold rounded-full">Creadora</span>
            </div>

            {/* Biography */}
            <p className="text-xs text-zinc-300 text-center max-w-sm px-4 leading-relaxed mb-4">
              {creator.bio}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-5">
              <button className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white">
                <TiktokIcon />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white">
                <InstagramIcon />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white">
                <YoutubeIcon />
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex w-full max-w-xs items-center justify-around bg-white/5 p-3 rounded-2xl border border-white/5 mb-5">
              <div className="text-center">
                <span className="font-black text-sm text-white block leading-none">{creator.followers}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Seguidores</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="text-center">
                <span className="font-black text-sm text-white block leading-none">{creator.following}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Siguiendo</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="text-center">
                <span className="font-black text-sm text-white block leading-none">{creator.likes}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Me gusta</span>
              </div>
            </div>

            {/* XP Level System Card */}
            <div className="w-full max-w-sm bg-[#171333]/70 border border-purple-500/20 rounded-2xl p-3.5 mb-5 shadow-[0_0_12px_rgba(147,51,234,0.05)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center border border-purple-400 shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white leading-tight">Nivel {creator.level}</h3>
                  <p className="text-[9px] text-purple-300 font-bold uppercase tracking-wider">{creator.levelName}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${creator.xpProgress}%` }} />
              </div>
            </div>

          </div>
        </div>

        {/* Tab Icons Row */}
        <div className="border-t border-b border-white/5 flex items-center justify-around py-2.5 mb-2 bg-[#0a0a0f]/50">
          {[
            { id: 'grid', icon: Grid },
            { id: 'video', icon: Film },
            { id: 'photo', icon: Image },
            { id: 'stream', icon: Radio },
            { id: 'heart', icon: Heart }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`p-2 transition-colors ${activeSubTab === tab.id ? 'text-pink-500' : 'text-zinc-500'}`}
            >
              <tab.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* 3-Column Media Grid */}
        <div className="grid grid-cols-3 gap-0.5 px-0.5">
          {gridItems.map(item => (
            <div key={item.id} className="relative aspect-[3/4] overflow-hidden group">
              <img src={item.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Top Pinned Badge */}
              {item.pinned && (
                <div className="absolute top-1.5 left-1.5">
                  <span className="px-1.5 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-[7px] font-black rounded uppercase tracking-wider shadow">
                    📌 Fijado
                  </span>
                </div>
              )}

              {/* Bottom View Count overlay */}
              <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 text-[8px] font-black text-white bg-black/40 px-1 py-0.5 rounded">
                <span>▷</span> {item.views}
              </div>
            </div>
          ))}
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
          <button className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a]">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
          <span className="text-[10px] font-bold">Mensajes</span>
        </Link>
        <Link href={`/u/${sessionUser.username}`} className="flex flex-col items-center gap-1 text-pink-500">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </Link>
      </div>

      {/* Mobile Drawer (Bottom Sheet) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm transition-all duration-300">
          {/* Backdrop Tap to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer content body */}
          <div className="bg-[#0b0b12] border-t border-purple-500/30 rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col gap-5 shadow-[0_-10px_35px_rgba(147,51,234,0.2)]">
            
            {/* Drawer Header Drag Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-2 mb-2" />

            {/* Back arrow inside subviews */}
            {drawerSubView !== 'menu' && (
              <button onClick={() => setDrawerSubView('menu')} className="self-start flex items-center gap-1.5 text-xs text-purple-400 font-bold">
                <ArrowLeft className="w-4 h-4" /> Volver al menú
              </button>
            )}

            {/* VIEW 1: MAIN NAVIGATION OPTIONS */}
            {drawerSubView === 'menu' && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Opciones de Cuenta</h3>
                  <button onClick={() => setIsDrawerOpen(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <button onClick={() => setDrawerSubView('editar')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Edit3 className="w-4.5 h-4.5 text-purple-400" /> Editar Perfil
                </button>

                <button onClick={() => setDrawerSubView('recargar')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Sparkles className="w-4.5 h-4.5 text-yellow-400" /> Recargar Monedas
                </button>

                <button onClick={() => setDrawerSubView('apk')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Smartphone className="w-4.5 h-4.5 text-pink-400" /> Descargar APK Móvil
                </button>

                <button onClick={() => triggerToast('¡Configuración de cuenta activa! 🔒')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Shield className="w-4.5 h-4.5 text-blue-400" /> Privacidad & Seguridad
                </button>

                <button onClick={() => logoutUser()} className="w-full p-4 bg-red-950/20 border border-red-500/20 rounded-2xl text-sm font-black text-red-400 flex items-center justify-center gap-2 active:bg-red-900/20 transition-all mt-4">
                  <LogOut className="w-4.5 h-4.5" /> Cerrar sesión
                </button>
              </div>
            )}

            {/* VIEW 2: EDIT PROFILE FORM */}
            {drawerSubView === 'editar' && (
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Editar Perfil</h3>
                  <p className="text-[10px] text-zinc-400">Actualiza tu nombre y tu biografía pública.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Nombre de Perfil</label>
                  <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white" required />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Biografía</label>
                  <textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white resize-none" required />
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 mt-2">
                  Guardar Cambios
                </button>
              </form>
            )}

            {/* VIEW 3: RECHARGE COINS (TIK TOK PACKAGES) */}
            {drawerSubView === 'recargar' && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-1.5">Recargar Monedas <Sparkles className="w-4 h-4 text-yellow-400" /></h3>
                  <p className="text-[10px] text-zinc-400">Apoya a tus streamers enviando increíbles regalos de neón.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 my-1">
                  {[
                    { coins: 100, price: '0.99' },
                    { coins: 500, price: '4.99' },
                    { coins: 1200, price: '9.99', popular: true },
                    { coins: 3500, price: '29.99' },
                  ].map(pack => (
                    <div
                      key={pack.coins}
                      onClick={() => setSelectedPack(pack.coins)}
                      className={`relative border rounded-2xl p-3 flex flex-col items-center justify-between cursor-pointer transition-all ${
                        selectedPack === pack.coins
                          ? 'bg-[#1e143d] border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2 px-1.5 py-0.5 bg-pink-500 text-[6px] font-black rounded-full uppercase tracking-wider">
                          Recomendado
                        </span>
                      )}
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)] mb-1">
                        <span className="text-[8px] font-black text-black">L</span>
                      </div>
                      <span className="text-xs font-black">{pack.coins.toLocaleString()}</span>
                      <span className="text-[9px] text-purple-300 font-bold">${pack.price} USD</span>
                    </div>
                  ))}
                </div>

                {selectedPack ? (
                  <button
                    onClick={() => handleBuyCoins(selectedPack)}
                    disabled={isPurchasing}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isPurchasing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando pago...
                      </>
                    ) : (
                      `Comprar ${selectedPack.toLocaleString()} Monedas`
                    )}
                  </button>
                ) : (
                  <div className="w-full py-3 text-center border border-dashed border-white/10 rounded-xl text-[10px] text-zinc-500">
                    Selecciona un paquete para proceder
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: APK DOWNLOAD MOBILE PAGE */}
            {drawerSubView === 'apk' && (
              <div className="flex flex-col gap-4 items-center text-center">
                <div>
                  <h3 className="text-base font-black text-white flex items-center justify-center gap-1.5">Descargar APK Oficial <Smartphone className="w-5 h-5 text-purple-400" /></h3>
                  <p className="text-[10px] text-zinc-400">Instala LiveX en tu smartphone y disfruta una experiencia fluida.</p>
                </div>

                <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 w-full flex flex-col items-center gap-4 my-2">
                  <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl shadow-md">
                    <div className="w-20 h-20 bg-[#05050a] rounded flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-left text-[10px] text-zinc-400 flex flex-col gap-1.5 w-full">
                    <p className="font-bold text-white mb-0.5">Pasos de instalación:</p>
                    <p>1. Pulsa el botón de descarga a continuación.</p>
                    <p>2. Abre el archivo .apk en tus descargas.</p>
                    <p>3. Habilita "Permitir desde esta fuente" si tu celular lo solicita.</p>
                  </div>
                </div>

                <button onClick={() => { triggerToast('Descargando APK de LiveX... 🚀'); setIsDrawerOpen(false); }} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5">
                  <Smartphone className="w-4 h-4" /> Descargar APK para Android
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-[#0e0c1f] border border-purple-500/50 text-white rounded-2xl px-4 py-3 shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4.5 h-4.5 text-yellow-400 shrink-0" />
          <span className="text-[11px] font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
