'use client';

import React from 'react';
import { 
  Home, Compass, Plus, MessageSquare, User, 
  Search, Crown, Heart, MessageCircle, Share2, 
  Gift, Play, BadgeCheck
} from 'lucide-react';

import Link from 'next/link';

export default function MobileDashboard({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati') => void, tab: string }) {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden">
      
      {/* Top Header */}
      <div className="h-[70px] shrink-0 pt-4 px-6 flex items-center justify-between z-20 bg-[#05050a]">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
             <Play className="text-white fill-white w-3 h-3" />
          </div>
          <span className="text-sm font-black tracking-tighter">LiveX</span>
        </div>
        
        <div className="flex items-center gap-5 text-[15px] font-bold">
          <button className="text-white/60">Siguiendo</button>
          <button className="text-white border-b-[3px] border-white pb-1">Para ti</button>
          <button className="text-white/60">Gaming</button>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-zinc-200 hover:text-white"><Crown className="w-5 h-5" /></button>
          <button className="text-zinc-200 hover:text-white"><Search className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Scrollable Feed Area */}
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory custom-scrollbar bg-black relative">
        {[
          { id: 1, name: 'SofiLive', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600' },
          { id: 2, name: 'AndrésGG', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600' },
          { id: 3, name: 'CamiLove', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&flip=1' }
        ].map((stream) => (
          <div key={stream.id} className="h-full w-full snap-start relative">
            <img 
              src={stream.img}
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Stream background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Live Badge Top Left */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <div className="px-2 py-1 bg-red-600 text-[10px] font-black rounded uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> EN VIVO
              </div>
              <div className="px-2 py-1 bg-black/40 backdrop-blur-md text-[10px] font-black rounded flex items-center gap-1.5 border border-white/10 shadow-lg">
                <User className="w-3 h-3 text-zinc-300" /> 2,345
              </div>
            </div>

            {/* Pulsa para ver el LIVE Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
               <Link href={`/live/${stream.name}`} className="flex items-center gap-2 px-6 py-2.5 bg-black/40 backdrop-blur-md border border-white/30 rounded-full text-white font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-black/60 transition-colors">
                 <div className="flex gap-0.5 items-end h-3">
                   <div className="w-1 h-full bg-white animate-pulse" />
                   <div className="w-1 h-2/3 bg-white animate-pulse delay-75" />
                   <div className="w-1 h-1/2 bg-white animate-pulse delay-150" />
                 </div>
                 Haz clic para ver el LIVE
               </Link>
            </div>

            {/* Right Floating Action Menu */}
            <div className="absolute right-4 bottom-8 flex flex-col items-center gap-6 z-10">
              {/* Avatar & Follow */}
              <div className="relative mb-2">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.name}`} className="w-11 h-11 rounded-full border-2 border-white shadow-lg bg-zinc-800" />
                <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform">
                  <Plus className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center drop-shadow-lg hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </button>
                <span className="text-[11px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">12.5K</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center drop-shadow-lg hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white fill-white" />
                </button>
                <span className="text-[11px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">1,234</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center drop-shadow-lg hover:scale-110 transition-transform text-pink-500">
                  <Gift className="w-8 h-8 fill-pink-500" />
                </button>
                <span className="text-[11px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">5.6K</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center drop-shadow-lg hover:scale-110 transition-transform">
                  <Share2 className="w-8 h-8 text-white fill-white" />
                </button>
                <span className="text-[11px] font-bold shadow-[0_2px_4px_rgba(0,0,0,0.8)]">789</span>
              </div>
            </div>

            {/* Bottom Info Section */}
            <div className="absolute left-4 bottom-8 right-20 z-10">
              <div className="flex items-center gap-3 mb-2">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.name}`} className="w-8 h-8 rounded-full border border-white/50 bg-zinc-800" />
                <div className="flex items-center gap-1">
                  <span className="font-black text-base shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{stream.name}</span>
                  <BadgeCheck className="text-blue-400 w-4 h-4 drop-shadow-md" />
                </div>
                <button className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/10 ml-2">Seguir</button>
              </div>
              <p className="text-sm text-white shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-3 pr-4">Charlando con ustedes 💜 ven a pasar el rato!</p>
              <div className="flex gap-2">
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">Charlas</span>
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">Español</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-[70px] shrink-0 bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
        <button onClick={() => setTab('inicio')} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-bold">Explorar</span>
        </button>
        
        {/* Center Live Button */}
        <div className="relative -top-4">
          <button className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] hover:scale-105 transition-transform">
             <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 relative">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">12</span>
          <span className="text-[10px] font-bold">Mensajes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>
    </div>
  );
}
