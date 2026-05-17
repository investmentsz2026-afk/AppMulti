'use client';

import React from 'react';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  Heart, MessageCircle, Share2, ChevronUp, ChevronDown, BadgeCheck, Music
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DesktopForYou({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati') => void, tab: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      
      {/* Sidebar (Same as DesktopDashboard) */}
      <aside className="w-[260px] bg-[#05050a] border-r border-white/5 flex flex-col z-20 shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="font-black text-2xl tracking-tighter">LiveX</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <div className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-4 px-3">Menú Principal</div>
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
            <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Play className="w-5 h-5" /> Gaming
            </Link>
            <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Compass className="w-5 h-5" /> Explorar
            </Link>
            <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Sword className="w-5 h-5" /> Batallas
            </Link>
          </nav>

          <div className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-4 px-3">Cuenta</div>
          <nav className="flex flex-col gap-1">
            <Link href="/perfil" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <User className="w-5 h-5" /> Perfil
            </Link>
            <Link href="/wallet" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Wallet className="w-5 h-5" /> Wallet
            </Link>
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            Transmitir en vivo
          </button>
        </div>
      </aside>

      {/* Main Content: Vertical TikTok Style Feed */}
      <main className="flex-1 flex justify-center items-center bg-black relative h-full">
        
        {/* Header absolute on top */}
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-20 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex bg-white/10 border border-white/10 rounded-full p-1 backdrop-blur-md">
            <button className="px-6 py-1.5 rounded-full text-sm font-bold text-white bg-white/20">Para ti</button>
            <button className="px-6 py-1.5 rounded-full text-sm font-bold text-zinc-400 hover:text-white">Siguiendo</button>
          </div>
          
          <div className="w-96 relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Buscar streams, creadores..." 
              className="w-full bg-white/10 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all text-white placeholder-zinc-400 backdrop-blur-md"
            />
          </div>
        </div>

        {/* Video Container Area */}
        <div className="relative h-full w-full max-w-[500px] flex items-center justify-center py-6">
          <div className="relative w-full h-full max-h-[850px] aspect-[9/16] bg-[#05050a] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10">
            
            {/* Background Image / Video */}
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Stream background"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Click to Watch Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
               <Link href="/live/SofiLive" className="pointer-events-auto flex items-center gap-2 px-8 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-full text-white font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-black/70 hover:scale-105 transition-all">
                 <div className="flex gap-1 items-end h-4">
                   <div className="w-1.5 h-full bg-pink-500 animate-pulse" />
                   <div className="w-1.5 h-2/3 bg-purple-500 animate-pulse delay-75" />
                   <div className="w-1.5 h-1/2 bg-blue-500 animate-pulse delay-150" />
                 </div>
                 Haz clic para ver el LIVE
               </Link>
            </div>

            {/* Top Left Badge */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="px-2 py-1 bg-pink-600 text-[11px] font-black rounded uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> EN VIVO
              </div>
            </div>

            {/* Bottom Left Info */}
            <div className="absolute bottom-4 left-4 right-20 z-10">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                SofiLive <BadgeCheck className="w-4 h-4 text-blue-400" />
              </h3>
              <p className="text-sm text-zinc-200 mb-2">
                Charlando con ustedes 💜 ven a pasar el rato! #JustChatting #LiveX
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Music className="w-3 h-3" /> Sonido original - SofiLive
              </div>
            </div>

          </div>

          {/* Right Floating Sidebar (Inside container but anchored right) */}
          <div className="absolute bottom-20 -right-16 flex flex-col items-center gap-5 z-20">
            {/* Avatar & Follow */}
            <div className="relative mb-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SofiLive" className="w-12 h-12 rounded-full border-2 border-white shadow-lg bg-zinc-800" />
              <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Heart className="w-6 h-6 text-white group-hover:fill-pink-500 group-hover:text-pink-500 transition-colors" />
              </div>
              <span className="text-xs font-bold text-zinc-300">12.5K</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-white group-hover:fill-white transition-colors" />
              </div>
              <span className="text-xs font-bold text-zinc-300">1,234</span>
            </div>

            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 className="w-6 h-6 text-white group-hover:fill-white transition-colors" />
              </div>
              <span className="text-xs font-bold text-zinc-300">Compartir</span>
            </div>
          </div>
          
        </div>

        {/* Up/Down Scroll Controls */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
           <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
             <ChevronUp className="w-6 h-6 text-white" />
           </button>
           <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
             <ChevronDown className="w-6 h-6 text-white" />
           </button>
        </div>

      </main>
    </div>
  );
}
