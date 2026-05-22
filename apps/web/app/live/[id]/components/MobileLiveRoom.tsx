'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, X, ChevronRight, Share2, Heart, Gift, MessageCircle, Play, Tv, Flame } from 'lucide-react';
import Link from 'next/link';
import { useLiveStore } from '@/store/useLiveStore';
import { usePublicPosts } from '@/hooks/usePosts';
import { checkStreamStatus } from '@/app/actions/stream';

const MOCK_REC_POSTS = [
  {
    id: 'mock-1',
    type: 'stream',
    username: 'SofiLive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiLive',
    title: '¡Gran Arena PvP con Subs! 🎮 Ven a jugar y pasa el rato!',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mock-2',
    type: 'video',
    username: 'GamerPro_2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro',
    title: '¡Espectacular triple kill en la copa Valorant! 🏆🔥',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-streamer-playing-first-person-shooter-40502-large.mp4'
  },
  {
    id: 'mock-3',
    type: 'image',
    username: 'CosplayNeon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CosplayNeon',
    title: 'Mi nuevo cosplay de Jett estilo Cyberpunk 2026 🌌',
    mediaUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mock-4',
    type: 'video',
    username: 'ApexLegends_Fan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ApexLegends',
    title: '¡Esquivando balas en la última zona! 🚀🔥 Increíble final',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-with-a-controller-40508-large.mp4'
  }
];

export default function MobileLiveRoom({ user, streamerName }: { user: any, streamerName: string }) {
  const { isLive, streamTitle, viewers, likes, comments, addComment } = useLiveStore();
  const { posts: dbPosts } = usePublicPosts();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [streamTitleState, setStreamTitleState] = useState(streamTitle);
  const [localChatMessages, setLocalChatMessages] = useState([
    { id: 1, user: 'MoNito', badge: 'N.º 1', text: 'bro das codigo de nuevo no me deja entrar', color: 'text-zinc-300' },
    { id: 2, user: 'sigo a muertos...', text: 'pasa código mano', color: 'text-zinc-300' },
    { id: 3, user: 'sigo a muertos...', text: 'pasa código de equipo', color: 'text-zinc-300' },
    { id: 4, user: 'Dënnïs', text: 'cuanto x esa cuenta', color: 'text-zinc-300' },
    { id: 5, user: 'Dënnïs', badge: 'N.º 3', text: 'dolares o que', color: 'text-zinc-300' },
  ]);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    if (isLive && streamerName === user?.username) {
      if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const getMedia = async () => {
          try {
            const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
            activeStream = s;
            setStream(s);
            if (videoRef.current) {
              videoRef.current.srcObject = s;
            }
          } catch (err) {
            console.warn("Could not get both video/audio in Mobile Live Room. Trying video only...", err);
            try {
              const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
              activeStream = s;
              setStream(s);
              if (videoRef.current) {
                videoRef.current.srcObject = s;
              }
            } catch (videoErr) {
              console.warn("Could not get video only in Mobile Live Room. Trying audio only...", videoErr);
              try {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                activeStream = s;
                setStream(s);
                if (videoRef.current) {
                  videoRef.current.srcObject = s;
                }
              } catch (audioErr) {
                console.error("Failed to acquire any media for Mobile Live Room:", audioErr);
              }
            }
          }
        };
        getMedia();
      } else {
        console.warn("navigator.mediaDevices is not available. Please verify you are using HTTPS or localhost.");
      }
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isLive, streamerName, user]);

  // Track stream status in real-time
  useEffect(() => {
    // 1. Initial check
    async function checkInitialStatus() {
      const res = await checkStreamStatus(streamerName);
      setIsStreamActive(res.isLive);
      if (res.title) {
        setStreamTitleState(res.title);
      }
    }
    
    checkInitialStatus();

    // 2. Poll every 4 seconds to detect cross-device end live
    const interval = setInterval(async () => {
      const res = await checkStreamStatus(streamerName);
      setIsStreamActive(res.isLive);
      if (res.title) {
        setStreamTitleState(res.title);
      }
    }, 4000);

    // 3. Storage event sync (for same-browser tab testing)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'live-stream-storage') {
        try {
          const parsed = JSON.parse(e.newValue || '{}');
          const isLiveFromStorage = parsed.state?.isLive;
          if (isLiveFromStorage !== undefined) {
            setIsStreamActive(isLiveFromStorage);
          }
        } catch (err) {
          console.error('Error parsed storage event:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [streamerName]);

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

  if (!isStreamActive) {
    return (
      <div className="h-screen w-full bg-[#05050a] text-white font-sans overflow-y-auto px-4 py-8 flex flex-col items-center">
        {/* Stream Ended Header - Premium TikTok Style */}
        <div className="text-center flex flex-col items-center gap-4 mb-8 mt-6 max-w-sm bg-[#0d0d18] border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />
          <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
            <Tv className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
              Este usuario finalizó el live
            </h1>
            <p className="text-zinc-400 mt-2 text-xs font-semibold leading-relaxed">
              La transmisión en vivo de <span className="text-purple-400 font-bold">@{streamerName}</span> ha terminado.
            </p>
          </div>
          <Link 
            href="/dashboard"
            className="mt-3 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20"
          >
            Salir al Inicio
          </Link>
        </div>

        <hr className="w-full border-white/5 mb-8" />

        {/* Recommendations Title */}
        <div className="w-full mb-4">
          <h2 className="text-md font-black text-white flex items-center gap-1.5">
            <Flame className="w-4.5 h-4.5 text-pink-500 animate-bounce" /> Recomendados para Ti
          </h2>
          <p className="text-[10px] text-zinc-500 font-semibold">Sigue disfrutando de otros contenidos</p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-2 gap-4 w-full pb-8">
          {[
            ...dbPosts.map(p => ({
              id: p.id,
              type: p.type === 'VIDEO' ? 'video' : 'image',
              username: p.user.username,
              avatar: p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.username}`,
              title: p.title,
              mediaUrl: p.url,
            })),
            ...MOCK_REC_POSTS.map(p => ({
              id: p.id,
              type: p.type,
              username: p.username,
              avatar: p.avatar,
              title: p.title,
              mediaUrl: p.mediaUrl,
            }))
          ].slice(0, 6).map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0c0c14] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[3/4] w-full bg-black overflow-hidden flex items-center justify-center">
                {item.type === 'video' ? (
                  <video 
                    src={item.mediaUrl}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                ) : (
                  <img 
                    src={item.mediaUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                )}
                {/* Badge type */}
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[7px] font-black uppercase tracking-wider text-zinc-300 border border-white/10">
                  {item.type}
                </span>
              </div>

              {/* Info Footer */}
              <div className="p-2.5 flex flex-col gap-1.5 justify-between">
                <h3 className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5">
                  <img src={item.avatar} className="w-4 h-4 rounded-full bg-zinc-800" />
                  <span className="text-[8px] font-black text-zinc-400 truncate">@{item.username}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full bg-black text-white overflow-hidden">
      {/* Video Background (Horizontal video centered on vertical screen) */}
      <div className="absolute inset-0 flex items-center justify-center">
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
             src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
             alt="Stream" 
             className="w-full h-auto aspect-video object-cover" 
           />
         )}
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
                 <Heart className="w-2.5 h-2.5 fill-current" /> {isLive && streamerName === user?.username ? likes : 678}
               </div>
             </div>
             {streamerName !== user?.username && (
               <button className="bg-pink-600 hover:bg-pink-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full ml-1 transition-colors">
                 + Seguir
               </button>
             )}
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
             <div className="px-2 font-bold text-xs">{isLive && streamerName === user?.username ? viewers : 28}</div>
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
          {(isLive && streamerName === user?.username ? comments : localChatMessages).map(msg => (
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
      <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 h-[70px] px-4 flex items-center gap-3 z-30">
        <div className="flex-1 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center px-4">
          <input 
            type="text" 
            placeholder="Escribe algo..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-zinc-400"
          />
        </div>
        
        {/* Quick Action Buttons */}
        <button type="button" className="w-10 h-10 flex flex-col items-center justify-center hover:scale-110 transition-transform">
           <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
             <Heart className="w-4 h-4 fill-white text-white" />
           </div>
        </button>
        
        <button type="button" className="w-10 h-10 flex flex-col items-center justify-center hover:scale-110 transition-transform">
           <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
             <Gift className="w-4 h-4 fill-white text-white" />
           </div>
        </button>
        
        <button type="button" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
          <Share2 className="w-5 h-5 text-white fill-white" />
        </button>
      </form>

    </div>
  );
}
