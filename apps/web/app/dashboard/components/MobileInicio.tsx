'use client';

import React, { useState } from 'react';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Swords, X, Coins, Tv
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';

export default function MobileInicio({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const router = useRouter();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { isLive, streamTitle, viewers } = useLiveStore();

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden">
      
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-24">
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">En vivo ahora</h2>
          <Link href="/en-vivo" className="text-sm font-bold text-pink-500 flex items-center hover:text-pink-400">
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Scroll Live Streams */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 custom-scrollbar -mx-4 px-4">
          {isLive && user && (
            <div className="snap-start shrink-0 w-[240px] group relative bg-[#1c0933]/45 border-2 border-purple-500 rounded-2xl overflow-hidden hover:border-pink-500 transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Link href={`/live/${user.username}`}>
                <div className="aspect-[3/4] relative">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover animate-pulse" alt="Tu Transmisión en Vivo" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-1.5 py-0.5 bg-pink-600 text-[10px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-pink-500/50">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> TU VIVO
                    </span>
                    <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-[10px] font-black rounded flex items-center gap-1 border border-white/15">
                      <Eye className="w-3 h-3 text-pink-400" /> {viewers}
                    </span>
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full border border-pink-500 bg-purple-900" />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <h3 className="font-bold text-sm text-pink-300 truncate">{user.username}</h3>
                        <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-white font-bold truncate">{streamTitle || 'Transmitiendo en Vivo'}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {[
            { id: 1, name: 'AndrésGG', viewers: '12.5K', desc: 'Rankeds de noche 🌙', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600' },
            { id: 2, name: 'SofiLive', viewers: '8.7K', desc: 'Charlando con ustedes...', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600' },
            { id: 3, name: 'DiegoStream', viewers: '25.5K', desc: 'Batalla épica 🔥', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&flip=1' },
          ].map((stream) => (
            <div key={stream.id} className="snap-start shrink-0 w-[240px] group relative bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer">
              <Link href={`/live/${stream.name}`}>
                <div className="aspect-[3/4] relative">
                  <img src={stream.img} className="w-full h-full object-cover" alt="Stream thumbnail" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-1.5 py-0.5 bg-red-600 text-[10px] font-black rounded uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1 h-1 bg-white rounded-full animate-pulse" /> EN VIVO
                    </span>
                    <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md text-[10px] font-black rounded flex items-center gap-1 border border-white/10">
                      <Eye className="w-3 h-3 text-zinc-300" /> {stream.viewers}
                    </span>
                  </div>
                  
                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.name}`} className="w-8 h-8 rounded-full border border-white/20 bg-zinc-800" />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <h3 className="font-bold text-sm truncate">{stream.name}</h3>
                        <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-zinc-300 truncate">{stream.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Batallas Destacadas */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Batallas destacadas</h2>
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-2xl p-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
             
             <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha" className="w-12 h-12 rounded-full border-2 border-purple-500" />
                  <span className="text-xs font-bold mt-1">TEAM ALPHA</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">VS</span>
                  <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded text-white font-bold mt-1 animate-pulse">AHORA</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Omega" className="w-12 h-12 rounded-full border-2 border-pink-500" />
                  <span className="text-xs font-bold mt-1">TEAM OMEGA</span>
                </div>
             </div>
             <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold border border-white/5">
                Ver Batalla
             </button>
          </div>
        </div>

        {/* Top Donadores */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top donadores</h2>
            <Link href="/ranking" className="text-xs text-zinc-400 hover:text-white">Ver ranking &rarr;</Link>
          </div>
          <div className="flex flex-col gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            {[
              { pos: 1, name: 'DiegoStream', coins: '125,430', color: 'text-yellow-400' },
              { pos: 2, name: 'AndrésGG', coins: '98,760', color: 'text-zinc-300' },
              { pos: 3, name: 'CamiLove', coins: '76,540', color: 'text-amber-600' }
            ].map(user => (
              <div key={user.pos} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`font-black w-4 text-center ${user.color}`}>{user.pos}</span>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} className="w-8 h-8 rounded-full bg-zinc-800" />
                  <span className="font-bold text-sm">{user.name}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] font-black text-black">C</span>
                  <span className="font-bold text-yellow-500 text-xs">{user.coins}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
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
                <span className="text-[9px] text-zinc-500 font-bold font-semibold">Subir video</span>
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
