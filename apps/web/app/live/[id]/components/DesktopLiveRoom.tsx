'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Compass, Play, Settings, Share2, 
  Heart, MessageSquare, Gift, User, Star, Plus, Shield, Trophy, Tv, Flame
} from 'lucide-react';
import Link from 'next/link';
import { useLiveStore } from '@/store/useLiveStore';
import { usePublicPosts } from '@/hooks/usePosts';
import { checkStreamStatus, joinStreamViewerAction, leaveStreamViewerAction, likeStreamAction, getStreamChatMessages, sendStreamChatMessage, getRealSpectatorsAction, getUserWalletBalanceAction } from '@/app/actions/stream';
import { checkFollowStatusByUsername, toggleFollowByUsername } from '@/app/actions/social';
import { LiveKitRoom, VideoConference, useTracks, VideoTrack } from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';

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

function LiveKitPlayer({ fallbackVideoSrc, videoRef, streamerName }: { fallbackVideoSrc: string, videoRef: React.RefObject<HTMLVideoElement | null>, streamerName: string }) {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: false },
    { source: Track.Source.ScreenShare, withPlaceholder: false }
  ]);

  const streamerTracks = tracks.filter(t => t.participant.identity === streamerName);
  const cameraTrack = streamerTracks.find(t => t.source === Track.Source.Camera);
  const screenTrack = streamerTracks.find(t => t.source === Track.Source.ScreenShare);

  const activeTrack = screenTrack || cameraTrack;

  if (!activeTrack) {
    return (
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        loop
        onCanPlay={(e) => {
          e.currentTarget.play().catch(() => {});
        }}
        className="w-full h-full object-cover animate-fade-in"
        src={fallbackVideoSrc}
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative">
      <VideoTrack
        trackRef={activeTrack as any}
        className={`w-full h-full ${activeTrack.source === Track.Source.ScreenShare ? 'object-contain' : 'object-cover scale-x-[-1]'}`}
      />
    </div>
  );
}

export default function DesktopLiveRoom({ user, streamerName }: { user: any, streamerName: string }) {
  const { isLive, streamTitle, streamCategory, viewers, likes, comments, addComment } = useLiveStore();
  const { posts: dbPosts } = usePublicPosts();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [livekitToken, setLivekitToken] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [streamTitleState, setStreamTitleState] = useState(streamTitle);
  const [dbViewers, setDbViewers] = useState(0);
  const [dbLikes, setDbLikes] = useState(0);
  const [dbChatMessages, setDbChatMessages] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [spectators, setSpectators] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    async function loadBalance() {
      const bal = await getUserWalletBalanceAction();
      setWalletBalance(bal);
    }
    loadBalance();
  }, []);

  useEffect(() => {
    async function getLKToken() {
      if (!isStreamActive || !streamerName || !user?.username) return;
      try {
        const res = await fetch(`/api/livekit/token?room=${streamerName}&username=${user.username}_viewer_${Math.floor(Math.random()*1000)}`);
        const data = await res.json();
        if (data.token) {
          setLivekitToken(data.token);
        }
      } catch (err) {
        console.error("Failed to load LiveKit token:", err);
      }
    }
    getLKToken();
  }, [isStreamActive, streamerName, user?.username]);

  useEffect(() => {
    async function loadSpectators() {
      const data = await getRealSpectatorsAction(streamerName);
      setSpectators(data);
    }
    if (streamerName) {
      loadSpectators();
    }
  }, [streamerName]);

  useEffect(() => {
    async function loadFollowStatus() {
      if (streamerName && streamerName !== user?.username) {
        const res = await checkFollowStatusByUsername(streamerName);
        setIsFollowing(res.following);
      }
    }
    loadFollowStatus();
  }, [streamerName, user]);

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
            console.warn("Could not get both video/audio in Desktop Live Room. Trying video only...", err);
            try {
              const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
              activeStream = s;
              setStream(s);
              if (videoRef.current) {
                videoRef.current.srcObject = s;
              }
            } catch (videoErr) {
              console.warn("Could not get video only in Desktop Live Room. Trying audio only...", videoErr);
              try {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                activeStream = s;
                setStream(s);
                if (videoRef.current) {
                  videoRef.current.srcObject = s;
                }
              } catch (audioErr) {
                console.error("Failed to acquire any media for Desktop Live Room:", audioErr);
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
  // 1. Join / Leave stream viewers count
  useEffect(() => {
    if (streamerName !== user?.username) {
      joinStreamViewerAction(streamerName);
      return () => {
        leaveStreamViewerAction(streamerName);
      };
    }
  }, [streamerName, user]);

  // 2. Track stream status, viewers, and likes in real-time
  useEffect(() => {
    async function checkInitialStatus() {
      const res = await checkStreamStatus(streamerName);
      setIsStreamActive(res.isLive);
      if (res.title) {
        setStreamTitleState(res.title);
      }
      if (res.viewers !== undefined) setDbViewers(res.viewers);
      if (res.likes !== undefined) setDbLikes(res.likes);
    }
    
    checkInitialStatus();

    const interval = setInterval(async () => {
      const res = await checkStreamStatus(streamerName);
      setIsStreamActive(res.isLive);
      if (res.title) {
        setStreamTitleState(res.title);
      }
      if (res.viewers !== undefined) setDbViewers(res.viewers);
      if (res.likes !== undefined) setDbLikes(res.likes);

      // Refresh active spectators list in real-time
      const activeSpecs = await getRealSpectatorsAction(streamerName);
      setSpectators(activeSpecs);

      // Refresh wallet balance in real-time
      const bal = await getUserWalletBalanceAction();
      setWalletBalance(bal);
    }, 4000);

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

  // Effect to guarantee fallback video playback on mount and changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.warn("Autoplay failed for fallback video:", err);
      });
    }
  }, [isStreamActive, streamTitleState]);

  // 3. Poll Real database Live chat comments
  useEffect(() => {
    async function loadChat() {
      const msgs = await getStreamChatMessages(streamerName);
      setDbChatMessages(msgs);
    }
    loadChat();
    const interval = setInterval(loadChat, 2000);
    return () => clearInterval(interval);
  }, [streamerName]);

  // 4. Send chat message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const text = inputMessage.trim();
    setInputMessage('');

    const res = await sendStreamChatMessage(streamerName, text);
    if (res.success && res.message) {
      setDbChatMessages(prev => [...prev, res.message]);
    }
  };



  if (!isStreamActive) {
    return (
      <div className="flex h-screen bg-[#05050a] text-white font-sans overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 w-full flex flex-col items-center">
          
          {/* Stream Ended Header - Premium TikTok Style */}
          <div className="text-center flex flex-col items-center gap-5 mb-12 mt-8 max-w-xl bg-[#0d0d18] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />
            <div className="w-20 h-20 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
              <Tv className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                Este usuario finalizó el live
              </h1>
              <p className="text-zinc-400 mt-3 text-sm font-semibold leading-relaxed">
                La transmisión en vivo de <span className="text-purple-400 font-bold">@{streamerName}</span> ha terminado. Pero no te preocupes, hay mucho más contenido esperándote.
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="mt-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider shadow-lg shadow-purple-500/20"
            >
              Salir al Inicio
            </Link>
          </div>

          <hr className="w-full border-white/5 mb-10" />

          {/* Recommendations Title */}
          <div className="w-full mb-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-pink-500 animate-bounce" /> Contenido Recomendado para Ti
            </h2>
            <p className="text-xs text-zinc-500 mt-1 font-bold">Sigue disfrutando de otros videos, imágenes y en vivos en la plataforma</p>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
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
            ].slice(0, 8).map((item) => (
              <Link 
                key={item.id} 
                href={`/dashboard?tab=parati&postId=${item.id}`}
                className="group bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between cursor-pointer"
              >
                {/* Media Thumbnail */}
                <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                  {/* Badge type */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-wider text-zinc-300 border border-white/10">
                    {item.type}
                  </span>
                </div>

                {/* Info Footer */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                  <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <img src={item.avatar} className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10" />
                    <span className="text-[10px] font-black text-zinc-400 truncate">@{item.username}</span>
                  </div>
                </div>

              </Link>
            ))}
          </div>

        </div>
      </div>
    );
  }

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
              <Heart 
                onClick={async () => {
                  const res = await likeStreamAction(streamerName);
                  if (res.likes !== undefined) {
                    setDbLikes(res.likes);
                  }
                }}
                className="w-3 h-3 fill-pink-500 text-pink-500 cursor-pointer hover:scale-120 transition-transform" 
              /> {dbLikes.toLocaleString()}
            </div>
          </div>
          {streamerName !== user?.username && (
            <button 
              onClick={async () => {
                const res = await toggleFollowByUsername(streamerName);
                if (res && res.success) {
                  setIsFollowing(res.following);
                }
              }}
              className={`${
                isFollowing 
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' 
                  : 'bg-pink-600 hover:bg-pink-500 text-white'
              } text-xs font-bold px-4 py-1.5 rounded-full ml-2 transition-colors`}
            >
              {isFollowing ? 'Siguiendo' : '+ Seguir'}
            </button>
          )}
        </div>

        {/* Video Player */}
        <div 
          onDoubleClick={async () => {
            const res = await likeStreamAction(streamerName);
            if (res.likes !== undefined) {
              setDbLikes(res.likes);
            }
          }}
          className="flex-1 relative flex items-center justify-center bg-black overflow-hidden group cursor-pointer"
        >
          {isStreamActive ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              {livekitToken ? (
                <LiveKitRoom
                  token={livekitToken}
                  serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                  connect={true}
                  video={false}
                  audio={false}
                  className="w-full h-full"
                >
                  <LiveKitPlayer 
                    fallbackVideoSrc="/uploads/1779484645064-rwef26.mp4" 
                    videoRef={videoRef} 
                    streamerName={streamerName}
                  />
                </LiveKitRoom>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  loop
                  onCanPlay={(e) => {
                    e.currentTarget.play().catch(() => {});
                  }}
                  className="w-full h-full object-cover animate-fade-in"
                  src="/uploads/1779484645064-rwef26.mp4"
                />
              )}
            </div>
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
              alt="Stream Offline" 
              className="w-full h-full object-contain" 
            />
          )}
          
          {/* Player Controls Overlay (Hover) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center px-6 gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-white cursor-pointer hover:text-pink-400 transition-colors" />
            <div className="flex items-center gap-1.5 bg-red-600/20 px-2 py-0.5 rounded border border-red-500/30">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">EN VIVO</span>
            </div>
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
          
          <button 
            onClick={async () => {
              const res = await likeStreamAction(streamerName);
              if (res.likes !== undefined) {
                setDbLikes(res.likes);
              }
            }}
            className="px-5 h-[72px] bg-gradient-to-br from-pink-500 to-rose-500 hover:opacity-90 rounded-xl text-white font-black text-sm transition-opacity flex flex-col items-center justify-center shrink-0 shadow-lg shadow-pink-500/20 active:scale-95 transition-transform gap-0.5"
          >
             <Heart className="w-5 h-5 fill-white animate-pulse" />
             <span className="text-[10px] tracking-wider uppercase">Dar Like</span>
          </button>

          <button className="px-6 h-[72px] bg-gradient-to-br from-yellow-500 to-orange-500 hover:opacity-90 rounded-xl text-black font-black text-sm transition-opacity flex flex-col items-center justify-center shrink-0">
             <span>Recargar</span>
             <span className="text-[10px] opacity-80">Saldo: {walletBalance.toLocaleString()}</span>
          </button>
        </div>

      </main>

      {/* Right Sidebar (Chat) */}
      <aside className="w-[340px] bg-[#0c0c11] border-l border-white/5 flex flex-col z-20 shrink-0">
        
        {/* Top Donators List */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3 text-sm font-bold">
            <span>Espectadores • {dbViewers}</span>
          </div>
          <div className="flex flex-col gap-2">
            {spectators.length > 0 ? (
              spectators.slice(0, 3).map((user) => (
                <div key={user.pos} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-black w-3 text-center ${user.pos === 1 ? 'text-yellow-400' : user.pos === 2 ? 'text-zinc-300' : 'text-amber-600'}`}>{user.pos}</span>
                    <img src={user.img} className="w-5 h-5 rounded-full bg-zinc-800" />
                    <span className="font-bold text-zinc-300 truncate w-[140px]">{user.name}</span>
                  </div>
                  <span className="font-bold text-yellow-500">3</span>
                </div>
              ))
            ) : (
              <div className="text-[10px] text-zinc-500 font-bold text-center py-2">No hay espectadores en la sala.</div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
           <div className="bg-white/5 text-zinc-400 rounded-xl p-3 text-xs font-medium w-full text-center mb-2">
             ¡Bienvenido al chat! Sé respetuoso.
           </div>

           {dbChatMessages.map(msg => (
             <div key={msg.id} className="flex gap-2 items-start text-sm animate-fade-in">
               <img 
                 src={msg.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user.username}`} 
                 className="w-7 h-7 rounded-full bg-zinc-800 shrink-0 mt-0.5" 
                 alt=""
               />
               <div className="flex flex-col">
                 <div className="flex items-center gap-1.5 mb-0.5">
                   {msg.user.username === streamerName && (
                     <span className="text-[9px] px-1 py-0.5 rounded uppercase font-black bg-purple-600/20 text-purple-400 border border-purple-500/20">
                       Streamer
                     </span>
                   )}
                   <span className="text-zinc-400 text-xs font-bold">@{msg.user.username}</span>
                 </div>
                 <p className="text-white text-[13px] leading-tight font-medium">{msg.content}</p>
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
