'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, X, ChevronRight, Share2, Heart, Gift, MessageCircle, Play, Tv, Flame, Send, Maximize2, RotateCcw, Swords, Clock, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useLiveStore } from '@/store/useLiveStore';
import { usePublicPosts } from '@/hooks/usePosts';
import { toast } from 'react-hot-toast';
import { checkStreamStatus, getStreamChatMessages, sendStreamChatMessage, joinStreamViewerAction, leaveStreamViewerAction, likeStreamAction, sendGiftAction, getUserWalletBalanceAction } from '@/app/actions/stream';
import { checkFollowStatusByUsername, toggleFollowByUsername } from '@/app/actions/social';
import { getActiveBattleForStreamer, updateBattlePoints } from '@/app/actions/battle';
import { LiveKitRoom, VideoConference, useTracks, VideoTrack, RoomAudioRenderer } from '@livekit/components-react';
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

export default function MobileLiveRoom({ user, streamerName }: { user: any, streamerName: string }) {
  const { isLive, streamTitle, streamCategory, viewers, likes } = useLiveStore();
  const [livekitToken, setLivekitToken] = useState<string | null>(null);
  const { posts: dbPosts } = usePublicPosts();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [floatingGifts, setFloatingGifts] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [streamTitleState, setStreamTitleState] = useState(streamTitle);
  const [dbChatMessages, setDbChatMessages] = useState<any[]>([]);
  const [dbViewers, setDbViewers] = useState(0);
  const [dbLikes, setDbLikes] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeBattle, setActiveBattle] = useState<any | null>(null);
  const [battleTimer, setBattleTimer] = useState<number>(180);
  const [selectedGiftTarget, setSelectedGiftTarget] = useState<1 | 2>(1);

  // Poll current streamer's active battle (PENDING or ONGOING)
  useEffect(() => {
    async function pollBattle() {
      if (!streamerName) return;
      try {
        const battle = await getActiveBattleForStreamer(streamerName);
        setActiveBattle(battle);
        if (battle && battle.status === 'ONGOING' && battle.endTime) {
          const remaining = Math.max(0, Math.floor((new Date(battle.endTime).getTime() - Date.now()) / 1000));
          setBattleTimer(remaining);
        } else if (battle && battle.status === 'PENDING') {
          setBattleTimer(180);
        }
      } catch (err) {
        console.error('Error polling battle for streamer:', err);
      }
    }
    pollBattle();
    const interval = setInterval(pollBattle, 2500);
    return () => clearInterval(interval);
  }, [streamerName]);

  const handleLikePlayer = async (playerNum: 1 | 2) => {
    if (!activeBattle) return;
    try {
      await updateBattlePoints(activeBattle.id, playerNum, 1, false);
      setActiveBattle((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          points1: playerNum === 1 ? (prev.points1 || 0) + 1 : prev.points1,
          points2: playerNum === 2 ? (prev.points2 || 0) + 1 : prev.points2,
        };
      });
    } catch (err) {
      console.error('Error updating like points:', err);
    }
  };

  const handleSendGiftToPlayer = async (gift: any, playerNum: 1 | 2) => {
    if (!activeBattle) return;
    if (walletBalance < gift.price) {
      toast.error('Saldo insuficiente de monedas');
      return;
    }
    setWalletBalance(prev => prev - gift.price);
    const targetUsername = playerNum === 1 ? activeBattle.stream1?.user?.username : activeBattle.stream2?.user?.username;
    toast.success(`🎁 ¡Regalo ${gift.name} enviado a @${targetUsername}!`);

    try {
      await updateBattlePoints(activeBattle.id, playerNum, gift.price, true, gift.id);
      setActiveBattle((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          points1: playerNum === 1 ? (prev.points1 || 0) + gift.price : prev.points1,
          points2: playerNum === 2 ? (prev.points2 || 0) + gift.price : prev.points2,
        };
      });
    } catch (err) {
      console.error('Error updating gift points:', err);
    }
  };

  const toggleOrientation = async () => {
    try {
      if (!isLandscape) {
        setIsLandscape(true);
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen().catch(() => {});
        }
        if (screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock('landscape').catch(() => {});
        }
      } else {
        setIsLandscape(false);
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen().catch(() => {});
        }
        if (screen.orientation && (screen.orientation as any).unlock) {
          (screen.orientation as any).unlock();
        }
      }
    } catch (e) {
      setIsLandscape(!isLandscape);
    }
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerWidth > window.innerHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };
    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

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
    let lastMsgCount = 0;
    async function loadChatMessages() {
      try {
        const msgs = await getStreamChatMessages(streamerName);
        setDbChatMessages(msgs || []);

        if (msgs && msgs.length > lastMsgCount) {
          if (lastMsgCount > 0) {
            const newMsgs = msgs.slice(lastMsgCount);
            newMsgs.forEach((msg: any) => {
              if (msg.isGift) {
                let giftName = 'Regalo';
                let giftImg = 'https://api.dicebear.com/7.x/icons/svg?seed=Rose';
                if (msg.giftId === 'rose') { giftName = 'Rosa'; giftImg = 'https://api.dicebear.com/7.x/icons/svg?seed=Rose'; }
                else if (msg.giftId === 'white_rose') { giftName = 'Rosa blanca'; giftImg = 'https://api.dicebear.com/7.x/icons/svg?seed=WhiteRose'; }
                else if (msg.giftId === 'gg') { giftName = 'GG'; giftImg = 'https://api.dicebear.com/7.x/icons/svg?seed=GG'; }
                else if (msg.giftId === 'retro_controller') { giftName = 'Control Retro'; giftImg = 'https://api.dicebear.com/7.x/icons/svg?seed=Controller'; }
                else if (msg.giftId === 'adore') { giftName = 'Te adoro'; giftImg = 'https://api.dicebear.com/7.x/icons/svg?seed=Adore'; }

                const animId = Date.now() + Math.random();
                setFloatingGifts(prev => [...prev, {
                  id: animId,
                  name: giftName,
                  img: giftImg,
                  sender: msg.user?.username || 'Espectador',
                  x: 20 + Math.random() * 60,
                }]);

                setTimeout(() => {
                  setFloatingGifts(prev => prev.filter(g => g.id !== animId));
                }, 4000);
              }
            });
          }
          lastMsgCount = msgs.length;
        }
      } catch (err) {
        console.error('Error loading chat messages:', err);
      }
    }
    loadChatMessages();
    const interval = setInterval(loadChatMessages, 3000);
    return () => clearInterval(interval);
  }, [streamerName]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.warn("Autoplay failed for fallback video:", err);
      });
    }
  }, [isStreamActive, streamTitleState]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      const res = await sendStreamChatMessage(streamerName, inputMessage);
      if (res.success && res.message) {
        setDbChatMessages(prev => [...prev, res.message]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
    setInputMessage('');
  };

  const handleSendGift = async (gift: { id: string, name: string, price: number, img: string }) => {
    if (streamerName === user?.username) {
      toast.error('No puedes enviarte regalos a ti mismo.');
      return;
    }

    const confirmSend = window.confirm(`¿Confirmar envío de ${gift.name} por ${gift.price} monedas?`);
    if (!confirmSend) return;

    const res = await sendGiftAction(streamerName, gift.name, gift.price, gift.id);
    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success(`¡Enviaste ${gift.name} a ${streamerName}!`);
    if (res.newBalance !== undefined) {
      setWalletBalance(res.newBalance);
    }

    // Spawn floating animation locally immediately
    const animId = Date.now() + Math.random();
    setFloatingGifts(prev => [...prev, {
      id: animId,
      name: gift.name,
      img: gift.img,
      sender: user?.username || 'Espectador',
      x: 20 + Math.random() * 60,
    }]);

    setTimeout(() => {
      setFloatingGifts(prev => prev.filter(g => g.id !== animId));
    }, 4000);
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
      <div 
        onDoubleClick={async () => {
          const res = await likeStreamAction(streamerName);
          if (res.likes !== undefined) {
            setDbLikes(res.likes);
          }
        }}
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
      >
          {activeBattle ? (
            <div className="w-full h-full relative bg-black flex flex-col items-center justify-center">
              
              {/* TikTok PvP Score Header Bar */}
              <div className="absolute top-14 left-3 right-3 z-30 max-w-xl mx-auto flex flex-col gap-1 pointer-events-auto">
                <div className="flex items-center justify-between px-2 text-[11px] font-black text-white">
                  {/* Left Streamer */}
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-pink-500/40 shadow-lg">
                    <img src={activeBattle.stream1?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBattle.stream1?.user?.username}`} className="w-4 h-4 rounded-full border border-pink-500 bg-zinc-800 shrink-0" />
                    <span className="truncate max-w-[80px]">@{activeBattle.stream1?.user?.username}</span>
                    <span className="text-pink-400 font-black ml-1 shrink-0">{activeBattle.points1 || 0} pts</span>
                  </div>

                  {/* Timer Badge */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-2.5 py-0.5 rounded-full text-white font-black text-[11px] shadow-xl flex items-center gap-1 shrink-0 border border-white/20">
                    <Clock className="w-3 h-3 text-yellow-300 animate-pulse" />
                    <span>
                      {Math.floor(battleTimer / 60).toString().padStart(2, '0')}:{(battleTimer % 60).toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Right Streamer */}
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-blue-500/40 shadow-lg">
                    <span className="text-blue-400 font-black mr-1 shrink-0">{activeBattle.points2 || 0} pts</span>
                    <span className="truncate max-w-[80px]">@{activeBattle.stream2?.user?.username}</span>
                    <img src={activeBattle.stream2?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBattle.stream2?.user?.username}`} className="w-4 h-4 rounded-full border border-blue-500 bg-zinc-800 shrink-0" />
                  </div>
                </div>

                {/* Shifting TikTok PvP Bar */}
                <div className="h-2.5 bg-black/70 backdrop-blur-md rounded-full border border-white/15 overflow-hidden flex shadow-xl">
                  <div 
                    style={{ width: `${(activeBattle.points1 || 0) + (activeBattle.points2 || 0) > 0 ? ((activeBattle.points1 || 0) / ((activeBattle.points1 || 0) + (activeBattle.points2 || 0))) * 100 : 50}%` }}
                    className="h-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 transition-all duration-500"
                  />
                  <div 
                    style={{ width: `${(activeBattle.points1 || 0) + (activeBattle.points2 || 0) > 0 ? ((activeBattle.points2 || 0) / ((activeBattle.points1 || 0) + (activeBattle.points2 || 0))) * 100 : 50}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Split Screen Video Grid (Top/Bottom on Mobile, Side by Side on LG) */}
              <div className="w-full h-full grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-1 bg-black p-1">
                {/* Streamer 1 Video Canvas */}
                <div className="relative w-full h-full bg-[#0a0a0f] overflow-hidden flex items-center justify-center border border-pink-500/20 rounded-2xl">
                  {livekitToken ? (
                    <LiveKitRoom token={livekitToken} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} connect={true} video={false} audio={true} className="w-full h-full">
                      <RoomAudioRenderer />
                      <LiveKitPlayer fallbackVideoSrc="/uploads/1779484645064-rwef26.mp4" videoRef={videoRef} streamerName={activeBattle.stream1?.user?.username || streamerName} />
                    </LiveKitRoom>
                  ) : (
                    <video ref={videoRef} autoPlay playsInline muted loop src="/uploads/1779484645064-rwef26.mp4" className="w-full h-full object-cover" />
                  )}
                  {/* Left Streamer Tag & Dedicated Like/Gift buttons */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-pink-500/40 text-[9px] font-black text-pink-400 flex items-center gap-1 shadow-md">
                      <img src={activeBattle.stream1?.user?.avatar} className="w-3 h-3 rounded-full border border-pink-500" />
                      <span>@{activeBattle.stream1?.user?.username}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleLikePlayer(1)}
                        className="px-2 py-1 bg-pink-600 hover:bg-pink-500 text-white rounded-full text-[9px] font-black flex items-center gap-1 shadow-lg active:scale-90 transition-transform"
                      >
                        <Heart className="w-3 h-3 fill-white" /> Like
                      </button>
                      <button 
                        onClick={() => { setSelectedGiftTarget(1); setShowGiftModal(true); }}
                        className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-[9px] font-black flex items-center gap-1 shadow-lg active:scale-90 transition-transform"
                      >
                        <Gift className="w-3 h-3 fill-white" /> Regalo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Streamer 2 Video Canvas */}
                <div className="relative w-full h-full bg-[#0a0a0f] overflow-hidden flex items-center justify-center border border-blue-500/20 rounded-2xl">
                  <img src={activeBattle.stream2?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBattle.stream2?.user?.username}`} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-center p-2">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-400 p-0.5 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-1">
                      <img src={activeBattle.stream2?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBattle.stream2?.user?.username}`} className="w-full h-full rounded-full object-cover bg-zinc-800" />
                    </div>
                    <span className="text-xs font-black text-white">@{activeBattle.stream2?.user?.username}</span>
                    <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Oponente en Vivo</span>
                  </div>
                  {/* Right Streamer Tag & Dedicated Like/Gift buttons */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-blue-500/40 text-[9px] font-black text-blue-400 flex items-center gap-1 shadow-md">
                      <img src={activeBattle.stream2?.user?.avatar} className="w-3 h-3 rounded-full border border-blue-500" />
                      <span>@{activeBattle.stream2?.user?.username}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleLikePlayer(2)}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-[9px] font-black flex items-center gap-1 shadow-lg active:scale-90 transition-transform"
                      >
                        <Heart className="w-3 h-3 fill-white" /> Like
                      </button>
                      <button 
                        onClick={() => { setSelectedGiftTarget(2); setShowGiftModal(true); }}
                        className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-[9px] font-black flex items-center gap-1 shadow-lg active:scale-90 transition-transform"
                      >
                        <Gift className="w-3 h-3 fill-white" /> Regalo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : isStreamActive ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              {livekitToken ? (
                <LiveKitRoom
                  token={livekitToken}
                  serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                  connect={true}
                  video={false}
                  audio={true}
                  className="w-full h-full"
                >
                  <RoomAudioRenderer />
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
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
              alt="Stream Offline" 
              className="w-full h-auto aspect-video object-cover" 
            />
          )}

          {/* Floating Gifts Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {floatingGifts.map((gift) => (
              <div
                key={gift.id}
                style={{ left: `${gift.x}%` }}
                className="absolute bottom-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/30 text-white font-bold text-xs animate-float-gift shadow-lg"
              >
                <img src={gift.img} className="w-6 h-6 animate-bounce" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-pink-400">@{gift.sender}</span>
                  <span className="text-[9px]">envió {gift.name}</span>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes floatGift {
              0% {
                transform: translateY(0) scale(0.8);
                opacity: 0;
              }
              10% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
              }
              90% {
                opacity: 1;
                transform: translateY(-200px) scale(1);
              }
              100% {
                transform: translateY(-300px) scale(0.8);
                opacity: 0;
              }
            }
            .animate-float-gift {
              animation: floatGift 4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            }
          `}</style>
      </div>

      {/* Top Gradient for readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      
      {/* Bottom Gradient for Chat */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* Top Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 pt-[max(14px,env(safe-area-inset-top,14px))] px-4 pb-3 z-30 flex justify-between items-start bg-gradient-to-b from-black/90 via-black/40 to-transparent">
         <div className="flex flex-col gap-2">
           {/* Host Info */}
           <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full pr-1 p-1 gap-2 border border-white/10 shadow-lg">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${streamerName}`} className="w-8 h-8 rounded-full border border-pink-500 bg-zinc-800" />
             <div className="flex flex-col">
               <span className="text-xs font-bold leading-tight">{streamerName}</span>
               <div className="flex items-center gap-1 text-[10px] text-zinc-300">
                 <Heart 
                   onClick={async () => {
                     const res = await likeStreamAction(streamerName);
                     if (res.likes !== undefined) {
                       setDbLikes(res.likes);
                     }
                   }}
                   className="w-2.5 h-2.5 fill-pink-500 text-pink-500 cursor-pointer hover:scale-120 transition-transform" 
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
                 } text-[11px] font-bold px-3 py-1.5 rounded-full ml-1 transition-colors`}
               >
                 {isFollowing ? 'Siguiendo' : '+ Seguir'}
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

         <div className="flex items-center gap-2">
           <button 
             type="button"
             onClick={toggleOrientation}
             className={`p-2 rounded-full backdrop-blur-md border transition-all flex items-center gap-1 ${
               isLandscape 
                 ? 'bg-pink-600 border-pink-400 text-white shadow-lg' 
                 : 'bg-black/40 border-white/10 text-zinc-300 hover:bg-white/10'
             }`}
             title={isLandscape ? "Pantalla Vertical" : "Echar pantalla (Horizontal)"}
           >
             <Maximize2 className="w-4 h-4" />
             {isLandscape && <span className="text-[10px] font-bold pr-1">Vertical</span>}
           </button>

           {/* Top Donators small avatars */}
           <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg">
             <div className="flex -space-x-2">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=U1" className="w-7 h-7 rounded-full border border-black z-30" />
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=U2" className="w-7 h-7 rounded-full border border-black z-20" />
             </div>
             <div className="px-2 font-bold text-xs">{dbViewers}</div>
           </div>
           <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors">
             <X className="w-5 h-5" />
           </Link>
         </div>
      </div>

      {/* Chat Area - Hidden when screen is landscape ("echada") to avoid covering screen share */}
      {!isLandscape && (
        <div className="absolute bottom-[75px] left-3 right-14 z-20 flex flex-col justify-end pointer-events-none max-h-[220px] overflow-hidden">
          <div 
            className="flex flex-col gap-1.5 overflow-y-auto pr-2 pb-2 max-h-full pointer-events-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Welcome Message */}
            <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-lg px-2.5 py-0.5 text-[9px] font-bold w-fit shadow-md backdrop-blur-sm">
              ¡Bienvenido a LiveX! Protegemos a la comunidad.
            </div>
            
            {dbChatMessages.map(msg => (
              <div key={msg.id} className="flex gap-1.5 items-center text-xs drop-shadow-md bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 w-fit max-w-[90%]">
                <img src={msg.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user?.username}`} className="w-5 h-5 rounded-full border border-white/10 bg-zinc-800 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-zinc-400 text-[9px] font-bold truncate">@{msg.user?.username}</span>
                    {msg.user?.username === streamerName && <span className="text-[7px] bg-purple-600 px-1 py-0.2 rounded uppercase font-black text-white">STREAMER</span>}
                  </div>
                  <p className="font-medium text-white text-[11px] leading-tight break-words">{msg.content}</p>
                </div>
              </div>
            ))}
            
            <div className="flex items-center gap-1.5 text-xs drop-shadow-md bg-black/45 backdrop-blur-md px-2.5 py-0.5 rounded-xl border border-white/10 w-fit">
               <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center shrink-0">
                 <User className="w-2.5 h-2.5 text-white" />
               </div>
               <span className="text-pink-400 text-[9px] font-bold">Elí reyes <span className="text-white font-medium">se unió</span></span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Input Area - Hidden when screen is landscape */}
      {!isLandscape && (
        <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 h-[70px] px-4 flex items-center gap-3 z-30">
          <div className="flex-1 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center px-4">
            <input 
              type="text" 
              placeholder="Escribe algo..." 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs text-white placeholder-zinc-400"
            />
            {inputMessage.trim() !== '' && (
              <button 
                type="submit" 
                className="ml-2 text-pink-500 hover:text-pink-400 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
          
          {/* Quick Action Buttons */}
          <button 
            type="button" 
            onClick={async () => {
              const res = await likeStreamAction(streamerName);
              if (res.likes !== undefined) {
                setDbLikes(res.likes);
              }
            }}
            className="w-10 h-10 flex flex-col items-center justify-center hover:scale-110 active:scale-90 transition-transform"
          >
             <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
               <Heart className="w-4 h-4 fill-white text-white" />
             </div>
          </button>
          
          <button 
            type="button" 
            onClick={() => setShowGiftModal(true)}
            className="w-10 h-10 flex flex-col items-center justify-center hover:scale-110 transition-transform"
          >
             <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
               <Gift className="w-4 h-4 fill-white text-white" />
             </div>
          </button>
          
          <button 
            type="button"
            onClick={toggleOrientation}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
            title="Echar pantalla (Horizontal)"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </form>
      )}

      {/* Mobile Gifts Slider Sheet */}
      {showGiftModal && (
        <div className="absolute inset-0 bg-black/50 z-40 flex flex-col justify-end" onClick={() => setShowGiftModal(false)}>
          <div 
            className="bg-[#0b0b14] rounded-t-3xl border-t border-white/10 p-6 flex flex-col gap-4 animate-slide-up max-h-[50%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="font-black text-sm text-pink-400">Enviar Regalos 🎁</span>
              <span className="text-[10px] text-zinc-400 font-bold">Saldo: {walletBalance} Monedas</span>
            </div>

            {/* Target Streamer Selector in Battle Mode */}
            {activeBattle && (
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedGiftTarget(1)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedGiftTarget === 1 ? 'bg-pink-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
                >
                  <img src={activeBattle.stream1?.user?.avatar} className="w-4 h-4 rounded-full border border-pink-500" />
                  <span className="truncate">@{activeBattle.stream1?.user?.username}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGiftTarget(2)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedGiftTarget === 2 ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'}`}
                >
                  <img src={activeBattle.stream2?.user?.avatar} className="w-4 h-4 rounded-full border border-blue-500" />
                  <span className="truncate">@{activeBattle.stream2?.user?.username}</span>
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-5 gap-3 py-2 overflow-y-auto">
              {[
                { id: 'rose', name: 'Rosa', price: 1, img: 'https://api.dicebear.com/7.x/icons/svg?seed=Rose' },
                { id: 'white_rose', name: 'Rosa blanca', price: 5, img: 'https://api.dicebear.com/7.x/icons/svg?seed=WhiteRose' },
                { id: 'gg', name: 'GG', price: 10, img: 'https://api.dicebear.com/7.x/icons/svg?seed=GG' },
                { id: 'retro_controller', name: 'Control Retro', price: 100, img: 'https://api.dicebear.com/7.x/icons/svg?seed=Controller' },
                { id: 'adore', name: 'Te adoro', price: 500, img: 'https://api.dicebear.com/7.x/icons/svg?seed=Adore' },
              ].map((gift, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (activeBattle) {
                      handleSendGiftToPlayer(gift, selectedGiftTarget);
                    } else {
                      handleSendGift(gift);
                    }
                    setShowGiftModal(false);
                  }}
                  className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition-all group shrink-0"
                >
                  <img src={gift.img} className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black text-zinc-300 truncate w-full text-center">{gift.name}</span>
                  <span className="text-[8px] text-yellow-500 font-black">{gift.price} C</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>

    </div>
  );
}
