'use client';

import React, { useState } from 'react';
import { User, X, ChevronRight, Share2, Heart, Gift, MessageCircle, Play } from 'lucide-react';
import Link from 'next/link';

export default function MobileLiveRoom({ user, streamerName }: { user: any, streamerName: string }) {
  const [chatMessages] = useState([
    { id: 1, user: 'MoNito', badge: 'N.º 1', text: 'bro das codigo de nuevo no me deja entrar', color: 'text-zinc-300' },
    { id: 2, user: 'sigo a muertos...', text: 'pasa código mano', color: 'text-zinc-300' },
    { id: 3, user: 'sigo a muertos...', text: 'pasa código de equipo', color: 'text-zinc-300' },
    { id: 4, user: 'Dënnïs', text: 'cuanto x esa cuenta', color: 'text-zinc-300' },
    { id: 5, user: 'Dënnïs', badge: 'N.º 3', text: 'dolares o que', color: 'text-zinc-300' },
  ]);

  return (
    <div className="relative h-[100dvh] w-full bg-black text-white overflow-hidden">
      {/* Video Background (Horizontal video centered on vertical screen) */}
      <div className="absolute inset-0 flex items-center justify-center">
         <img 
           src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
           alt="Stream" 
           className="w-full h-auto aspect-video object-cover" 
         />
      </div>

      {/* Top Gradient for readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      
      {/* Bottom Gradient for Chat */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* Top Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
         <div className="flex flex-col gap-2">
           {/* Host Info */}
           <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full pr-1 p-1 gap-2 border border-white/10 shadow-lg">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${streamerName}`} className="w-8 h-8 rounded-full border border-pink-500 bg-zinc-800" />
             <div className="flex flex-col">
               <span className="text-xs font-bold leading-tight">{streamerName}</span>
               <div className="flex items-center gap-1 text-[10px] text-zinc-300">
                 <Heart className="w-2.5 h-2.5 fill-current" /> 678
               </div>
             </div>
             <button className="bg-pink-600 hover:bg-pink-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full ml-1 transition-colors">
               + Seguir
             </button>
           </div>
           
           {/* Top Badges */}
           <div className="flex gap-2">
             <div className="bg-black/40 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1.5 border border-white/10">
                <span className="text-[10px] text-yellow-400 font-black">🏆 Clasificación de g...</span>
             </div>
             <div className="bg-black/40 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1.5 border border-white/10">
                <span className="text-[10px] text-pink-400 font-black">🍬 0/1</span>
             </div>
           </div>
         </div>

         <div className="flex items-center gap-3">
           {/* Top Donators small avatars */}
           <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
             <div className="flex -space-x-2">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=U1" className="w-7 h-7 rounded-full border border-black z-30" />
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=U2" className="w-7 h-7 rounded-full border border-black z-20" />
             </div>
             <div className="px-2 font-bold text-xs">28</div>
           </div>
           <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors">
             <X className="w-5 h-5" />
           </Link>
         </div>
      </div>

      {/* Chat Area */}
      <div className="absolute bottom-[70px] left-4 right-16 top-1/2 z-20 flex flex-col justify-end pointer-events-none">
        <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-4 pb-4 max-h-full pointer-events-auto">
          {/* Welcome Message */}
          <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 rounded-xl p-2 text-xs font-bold w-fit shadow-md backdrop-blur-sm">
            ¡Bienvenido a LiveX! Protegemos a nuestra comunidad. Se amable.
          </div>
          
          {/* Messages */}
          {chatMessages.map(msg => (
            <div key={msg.id} className="flex gap-2 items-start text-sm drop-shadow-md">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} className="w-6 h-6 rounded-full border border-white/10 bg-zinc-800 shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-400 text-xs font-bold">{msg.user}</span>
                  {msg.badge && <span className="text-[8px] bg-red-600 px-1 py-0.5 rounded uppercase font-black">{msg.badge}</span>}
                </div>
                <p className="font-medium text-white">{msg.text}</p>
              </div>
            </div>
          ))}
          
          <div className="flex items-center gap-2 text-sm drop-shadow-md">
             <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center shrink-0">
               <User className="w-3 h-3" />
             </div>
             <span className="text-pink-400 text-xs font-bold">Elí reyes <span className="text-white font-medium">se unió</span></span>
          </div>
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] px-4 flex items-center gap-3 z-30">
        <div className="flex-1 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center px-4">
          <input 
            type="text" 
            placeholder="Escribe algo..." 
            className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-zinc-400"
          />
        </div>
        
        {/* Quick Action Buttons */}
        <button className="w-10 h-10 flex flex-col items-center justify-center hover:scale-110 transition-transform">
           <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
             <Heart className="w-4 h-4 fill-white text-white" />
           </div>
        </button>
        
        <button className="w-10 h-10 flex flex-col items-center justify-center hover:scale-110 transition-transform">
           <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
             <Gift className="w-4 h-4 fill-white text-white" />
           </div>
        </button>
        
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
          <Share2 className="w-5 h-5 text-white fill-white" />
        </button>
      </div>

    </div>
  );
}
