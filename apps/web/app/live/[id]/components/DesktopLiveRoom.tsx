'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Compass, Play, Settings, Share2, 
  Heart, MessageSquare, Gift, User, Star, Plus, Shield, Trophy
} from 'lucide-react';
import Link from 'next/link';
import { useLiveStore } from '@/store/useLiveStore';

export default function DesktopLiveRoom({ user, streamerName }: { user: any, streamerName: string }) {
  const { isLive, streamTitle, viewers, likes, comments, addComment } = useLiveStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [localChatMessages, setLocalChatMessages] = useState([
    { id: 1, user: 'Ander_live', badge: 'N.º 1', text: 'en el fercho', color: 'text-blue-400' },
    { id: 2, user: 'Joel', badge: '', text: 'Jajajaja na mentira', color: 'text-zinc-300' },
    { id: 3, user: 'Joel', badge: '', text: 'Pero puedo estar con tu otra hermana pe', color: 'text-zinc-300' },
    { id: 4, user: 'Joel', badge: '', text: 'Cómo te digo entonces capibara xd jajajaja', color: 'text-zinc-300' },
    { id: 5, user: 'Jimmy', badge: 'N.º 3', text: 'ahorita lo saco pe', color: 'text-amber-400' },
  ]);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    if (isLive && streamerName === user?.username) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true })
        .then((s) => {
          activeStream = s;
          setStream(s);
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(err => {
          console.error("Error accessing webcam in Live Room:", err);
        });
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isLive, streamerName, user]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (isLive && streamerName === user?.username) {
      addComment({
        id: Math.random().toString(),
        user: user?.username || 'Creador',
        text: inputMessage,
        badge: 'Creador',
        color: 'text-pink-400'
      });
    } else {
      setLocalChatMessages(prev => [
        ...prev,
        {
          id: Math.random(),
          user: user?.username || 'Invitado',
          badge: '',
          text: inputMessage,
          color: 'text-zinc-300'
        }
      ]);
    }
    setInputMessage('');
  };

  return (
    <div className="flex h-screen bg-[#05050a] text-white overflow-hidden font-sans">
      
      {/* Left Sidebar (Live Context) */}
      <aside className="w-[240px] bg-[#09090e] border-r border-white/5 flex flex-col z-20 shrink-0">
        <div className="p-4 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group w-fit">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold">Volver</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center border border-black shadow-lg">
               <Compass className="w-4 h-4 text-white" />
             </div>
             Descubre LIVE
          </Link>
          <Link href="/emitir" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
               <Play className="w-4 h-4" />
             </div>
             Emitir LIVE
          </Link>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 bg-black relative">
        
        {/* Top Overlay inside Video Area */}
        <div className="absolute top-4 left-4 z-20 flex items-center bg-black/40 backdrop-blur-md rounded-full pr-4 p-1 gap-3 border border-white/10 shadow-lg">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${streamerName}`} className="w-10 h-10 rounded-full border border-pink-500 bg-zinc-800" />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight flex items-center gap-1">
              {streamerName} <Shield className="w-3 h-3 text-blue-400" />
            </span>
            <div className="flex items-center gap-1 text-[11px] text-zinc-300 font-bold">
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> {isLive && streamerName === user?.username ? `${likes}` : '11.6K'}
            </div>
          </div>
          {streamerName !== user?.username && (
            <button className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full ml-2 transition-colors">
              + Seguir
            </button>
          )}
        </div>

        {/* Video Player */}
        <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden group">
          {isLive && streamerName === user?.username ? (
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
              alt="Stream" 
              className="w-full h-full object-contain" 
            />
          )}
          
          {/* Player Controls Overlay (Hover) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center px-6 gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-white cursor-pointer hover:text-pink-400 transition-colors" />
            <div className="text-xs font-bold">0:25:37</div>
            <div className="flex-1" />
            <Settings className="w-5 h-5 text-white cursor-pointer hover:text-pink-400 transition-colors" />
          </div>
        </div>

        {/* Gift Bar (Bottom) */}
        <div className="h-24 bg-[#09090e] border-t border-white/5 flex items-center px-4 gap-2 shrink-0">
          <div className="flex gap-2 flex-1 overflow-x-auto custom-scrollbar pb-2 pt-2">
             {[
               { name: 'Rosa', price: '1', img: 'https://api.dicebear.com/7.x/icons/svg?seed=Rose' },
               { name: 'Rosa blanca', price: '1', img: 'https://api.dicebear.com/7.x/icons/svg?seed=WhiteRose' },
               { name: 'GG', price: '1', img: 'https://api.dicebear.com/7.x/icons/svg?seed=GG' },
               { name: 'Control Retro', price: '100', img: 'https://api.dicebear.com/7.x/icons/svg?seed=Controller' },
               { name: 'Te adoro', price: '1', img: 'https://api.dicebear.com/7.x/icons/svg?seed=Adore' },
             ].map((gift, i) => (
                <button key={i} className="flex flex-col items-center justify-center w-[88px] h-[72px] bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group shrink-0">
                  <img src={gift.img} className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-zinc-300">{gift.name}</span>
                  <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-black">
                     <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center text-black text-[8px]">C</div>
                     {gift.price}
                  </div>
                </button>
             ))}
          </div>
          
          <button className="px-6 h-[72px] bg-gradient-to-br from-yellow-500 to-orange-500 hover:opacity-90 rounded-xl text-black font-black text-sm transition-opacity flex flex-col items-center justify-center shrink-0">
             <span>Recargar</span>
             <span className="text-[10px] opacity-80">Saldo: 0</span>
          </button>
        </div>

      </main>

      {/* Right Sidebar (Chat) */}
      <aside className="w-[340px] bg-[#0c0c11] border-l border-white/5 flex flex-col z-20 shrink-0">
        
        {/* Top Donators List */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3 text-sm font-bold">
            <span>Espectadores • {isLive && streamerName === user?.username ? viewers : 9}</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { pos: 1, name: 'MATCOL', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=U1' },
              { pos: 2, name: 'El Rey', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=U2' },
              { pos: 3, name: 'Fercho_', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=U3' },
            ].map(user => (
               <div key={user.pos} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2">
                   <span className={`font-black w-3 text-center ${user.pos === 1 ? 'text-yellow-400' : user.pos === 2 ? 'text-zinc-300' : 'text-amber-600'}`}>{user.pos}</span>
                   <img src={user.img} className="w-5 h-5 rounded-full bg-zinc-800" />
                   <span className="font-bold text-zinc-300 truncate w-[140px]">{user.name}</span>
                 </div>
                 <span className="font-bold text-yellow-500">3</span>
               </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
           <div className="bg-white/5 text-zinc-400 rounded-xl p-3 text-xs font-medium w-full text-center mb-2">
             ¡Bienvenido al chat! Sé respetuoso.
           </div>

           {(isLive && streamerName === user?.username ? comments : localChatMessages).map(msg => (
             <div key={msg.id} className="flex gap-2 items-start text-sm">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} className="w-7 h-7 rounded-full bg-zinc-800 shrink-0 mt-0.5" />
               <div className="flex flex-col">
                 <div className="flex items-center gap-1.5 mb-0.5">
                   {msg.badge && <span className={`text-[9px] px-1 py-0.5 rounded uppercase font-black bg-white/10 ${msg.color || 'text-pink-400'}`}>{msg.badge}</span>}
                   <span className="text-zinc-400 text-xs font-bold">{msg.user}</span>
                 </div>
                 <p className="text-white text-[13px] leading-tight">{msg.text}</p>
               </div>
             </div>
           ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#0c0c11]">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 h-10 focus-within:border-pink-500 transition-colors">
            <input 
              type="text" 
              placeholder="Escribe algo..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder-zinc-500"
            />
            <button type="submit" className="w-6 h-6 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center transition-colors">
              <Share2 className="w-3 h-3 text-white" />
            </button>
          </div>
        </form>

      </aside>
    </div>
  );
}
