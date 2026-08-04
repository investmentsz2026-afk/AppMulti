'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLiveStore } from '@/store/useLiveStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, Camera, Settings, Play, Video, VideoOff, 
  MessageSquare, Heart, Eye, Users, Shield, Award, 
  Gamepad2, Music, Sparkles, Swords, Send, X, Mic, MicOff, RefreshCw, Laptop
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { updateStreamStatus, keepStreamAliveAction, getStreamChatMessages, sendStreamChatMessage } from '@/app/actions/stream';
import { checkUserActiveWagerStatusAction } from '@/app/actions/gameroom';

interface HeartAnimation {
  id: number;
  x: number;
  color: string;
  rotate: number;
}

export default function TransmitirClient({ user }: { user: any }) {
  const router = useRouter();
  const { isLive, streamTitle, streamCategory, viewers, likes, comments, startLive, stopLive, addLike, addComment, setComments, setViewers } = useLiveStore();
  
  const [hasMounted, setHasMounted] = useState(false);
  const [pvpStatus, setPvpStatus] = useState<{
    isWaiting: boolean;
    roomTitle: string;
    hasOpponent: boolean;
    playingRoomId: string | null;
    opponentName: string;
    opponentAvatar: string;
  } | null>(null);
  const [wagerUnblocked, setWagerUnblocked] = useState(false);

  useEffect(() => {
    async function checkPvp() {
      const res = await checkUserActiveWagerStatusAction();
      setPvpStatus(res);
    }
    checkPvp();
    const interval = setInterval(checkPvp, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    
    // Sync Zustand store across tabs on storage change
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'live-stream-storage') {
        useLiveStore.persist.rehydrate();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Send stream heartbeats while live to prevent stream from becoming stale
  useEffect(() => {
    if (!isLive) return;
    keepStreamAliveAction();
    const interval = setInterval(() => {
      keepStreamAliveAction();
    }, 25000);
    return () => {
      clearInterval(interval);
    };
  }, [isLive]);
  
  const searchParams = useSearchParams();
  const roomTitle = searchParams.get('roomTitle');
  const roomCategory = searchParams.get('roomCategory');
  const autoShareScreen = searchParams.get('shareScreen') === 'true';

  // Setup view state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gaming');
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Auto fill title/category from room creation query parameters
  useEffect(() => {
    if (roomTitle) setTitle(decodeURIComponent(roomTitle));
    if (roomCategory) setCategory(decodeURIComponent(roomCategory));
  }, [roomTitle, roomCategory]);

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      setScreenStream(null);
      screenStreamRef.current = null;
      setIsScreenSharing(false);
    } else {
      // Check if creator has a waiting PvP game room
      const pvpCheck = await checkUserActiveWagerStatusAction();
      if (pvpCheck.isWaiting) {
        toast.error(`Esperando oponente en tu sala PvP "${pvpCheck.roomTitle}". No puedes compartir pantalla hasta que alguien se una.`);
        return;
      }

      if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        toast.error('Compartir pantalla solo es compatible con computadoras (PC/Laptop). En celulares se utiliza la cámara.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        const screenTrack = stream.getVideoTracks()[0];
        if (!screenTrack) {
          toast.error('No se detectó ningún track de video de pantalla.');
          return;
        }
        
        screenTrack.onended = () => {
          setScreenStream(null);
          screenStreamRef.current = null;
          setIsScreenSharing(false);
        };

        setScreenStream(stream);
        screenStreamRef.current = stream;
        setIsScreenSharing(true);
        toast.success('Compartiendo pantalla.');
      } catch (err) {
        console.error('Error al compartir pantalla:', err);
        toast.error('No se pudo compartir la pantalla. Verifica los permisos de tu navegador o sistema.');
      }
    }
  };

  // Auto screen-share on mount if query parameter is set
  useEffect(() => {
    if (autoShareScreen && cameraStream && !isScreenSharing) {
      toggleScreenShare();
    }
  }, [autoShareScreen, cameraStream]);
  
  // Floating hearts
  const [floatingHearts, setFloatingHearts] = useState<HeartAnimation[]>([]);
  const heartIdCounter = useRef(0);
  
  // Chat input
  const [chatInput, setChatInput] = useState('');
  
  // Refs
  const previewCameraVideoRef = useRef<HTMLVideoElement>(null);
  const previewScreenVideoRef = useRef<HTMLVideoElement>(null);
  const liveCameraVideoRef = useRef<HTMLVideoElement>(null);
  const liveScreenVideoRef = useRef<HTMLVideoElement>(null);
  const desktopChatEndRef = useRef<HTMLDivElement>(null);
  const mobileChatEndRef = useRef<HTMLDivElement>(null);
  
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  
  // Auto-scroll chat comments
  useEffect(() => {
    if (desktopChatEndRef.current) {
      desktopChatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileChatEndRef.current) {
      mobileChatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);
  
  // Intervals
  const simulationInterval = useRef<NodeJS.Timeout | null>(null);

  // Categories list
  const CATEGORIES = [
    { name: 'Gaming', icon: Gamepad2, color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
    { name: 'Just Chatting', icon: MessageSquare, color: 'text-pink-400 border-pink-500/20 bg-pink-500/5' },
    { name: 'Música', icon: Music, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
    { name: 'Batallas PvP', icon: Swords, color: 'text-rose-400 border-rose-500/20 bg-rose-500/5' }
  ];
  // 1. Get available camera devices & request initial permissions
  useEffect(() => {
    async function initCamera() {
      if (typeof window === 'undefined') return;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('El acceso a la cámara/micrófono requiere una conexión segura (HTTPS) o no está soportado en este navegador.');
        return;
      }

      let stream: MediaStream | null = null;

      try {
        // Try getting both video and audio
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraActive(true);
        setMicActive(true);
      } catch (error) {
        console.warn('No se pudo obtener cámara y micrófono a la vez. Intentando solo cámara...', error);
        try {
          // Fallback 1: Video only
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setCameraActive(true);
          setMicActive(false);
          toast.success('Cámara iniciada (sin audio/micrófono).');
        } catch (videoError) {
          console.warn('No se pudo obtener la cámara. Intentando solo micrófono...', videoError);
          try {
            // Fallback 2: Audio only
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setCameraActive(false);
            setMicActive(true);
            toast.success('Micrófono iniciado (sin cámara/video).');
          } catch (audioError) {
            console.error('Todos los accesos a media fallaron:', audioError);
          }
        }
      }

      if (stream) {
        setCameraStream(stream);
        cameraStreamRef.current = stream;

        try {
          // List video output devices
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter(device => device.kind === 'videoinput');
          setVideoDevices(videoInputs);
          if (videoInputs.length > 0 && videoInputs[0]) {
            setSelectedDeviceId(videoInputs[0].deviceId);
          }
        } catch (devicesError) {
          console.warn('Error al enumerar dispositivos:', devicesError);
        }
      } else {
        toast.error('No se pudo acceder a la cámara ni al micrófono. Por favor concede permisos.');
      }
    }

    initCamera();

    return () => {
      // Clean up track streams on unmount if setup screen is closed
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1.5. Synchronize streams with the active video elements
  useEffect(() => {
    const bindStream = (videoRef: React.RefObject<HTMLVideoElement | null>, stream: MediaStream | null) => {
      if (videoRef.current) {
        if (videoRef.current.srcObject !== stream) {
          videoRef.current.srcObject = stream;
        }
        if (stream) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    if (!isLive) {
      bindStream(previewCameraVideoRef, cameraStream);
      bindStream(previewScreenVideoRef, screenStream);
    } else {
      bindStream(liveCameraVideoRef, cameraStream);
      bindStream(liveScreenVideoRef, screenStream);
    }
  }, [isLive, cameraStream, screenStream, cameraActive, isScreenSharing]);

  // 2. Handle switching cameras
  const handleDeviceChange = async (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
        audio: micActive
      });
      setCameraStream(stream);
      cameraStreamRef.current = stream;
    } catch (e) {
      console.warn('Failed to switch camera with audio, trying video only:', e);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } }
        });
        setCameraStream(stream);
        cameraStreamRef.current = stream;
        setMicActive(false);
      } catch (videoErr) {
        toast.error('Error al cambiar de cámara');
      }
    }
  };

  const refreshDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(device => device.kind === 'videoinput');
      setVideoDevices(videoInputs);
      if (videoInputs.length > 0) {
        const exists = videoInputs.some(device => device.deviceId === selectedDeviceId);
        if (!exists && videoInputs[0]) {
          const firstDeviceId = videoInputs[0].deviceId;
          setSelectedDeviceId(firstDeviceId);
          await handleDeviceChange(firstDeviceId);
        }
      }
      toast.success('Lista de cámaras actualizada.');
    } catch (err) {
      console.error('Error al enumerar dispositivos:', err);
      toast.error('No se pudieron detectar los dispositivos de cámara.');
    }
  };

  // 3. Toggle camera stream
  // 3. Toggle camera stream
  const toggleCamera = () => {
    if (cameraStream) {
      const videoTrack = cameraStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraActive(videoTrack.enabled);
      }
    }
  };

  // 4. Toggle microphone
  const toggleMic = () => {
    if (cameraStream) {
      const audioTrack = cameraStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
      }
    }
  };

  // 5. Start live streaming
  const handleStartLive = async () => {
    if (!title.trim()) {
      toast.error('Por favor escribe un título para tu transmisión.');
      return;
    }
    
    // Check if creator has a waiting PvP game room
    const pvpCheck = await checkUserActiveWagerStatusAction();
    if (pvpCheck.isWaiting) {
      toast.error(`Esperando oponente en tu sala PvP "${pvpCheck.roomTitle}". No puedes iniciar transmisión hasta que alguien se una.`);
      return;
    }
    
    const loadingToast = toast.loading('Iniciando transmisión...');
    const res = await updateStreamStatus(true, title, category);
    
    if (res?.error) {
      toast.dismiss(loadingToast);
      toast.error(res.error);
      return;
    }
    
    toast.dismiss(loadingToast);
    startLive(title, category);
    toast.success('¡Estás en vivo ahora! 🔴');
  };

  // 6. Stop live streaming
  const handleStopLive = async () => {
    const loadingToast = toast.loading('Finalizando transmisión...');
    await updateStreamStatus(false);
    toast.dismiss(loadingToast);
    
    setFloatingHearts([]);
    stopLive();
    
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    setCameraStream(null);
    setScreenStream(null);
    cameraStreamRef.current = null;
    screenStreamRef.current = null;
    setIsScreenSharing(false);
    setCameraActive(true);
    setMicActive(true);
    toast.success('Transmisión finalizada.');
    
    // Re-initialize setup preview
    setTimeout(async () => {
      if (typeof window === 'undefined') return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setCameraActive(true);
        setMicActive(true);
      } catch (err) {
        console.warn('Failed to re-request both. Trying video only...', err);
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setCameraActive(true);
          setMicActive(false);
        } catch (vErr) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setCameraActive(false);
            setMicActive(true);
          } catch (aErr) {}
        }
      }

      if (stream) {
        setCameraStream(stream);
        cameraStreamRef.current = stream;
      }
    }, 500);
  };

  // 7. Polling Real database Live comments
  useEffect(() => {
    if (!isLive || !user?.username) return;

    const fetchRealChat = async () => {
      try {
        const msgs = await getStreamChatMessages(user.username);
        const formatted = msgs.map((m: any) => ({
          id: m.id,
          user: m.user.username,
          text: m.content,
          badge: m.user.username === user.username ? 'Creador' : undefined,
          color: m.user.username === user.username ? 'text-red-400' : 'text-purple-400'
        }));
        setComments(formatted);
      } catch (err) {
        console.error('Error polling stream messages:', err);
      }
    };

    fetchRealChat();
    const interval = setInterval(fetchRealChat, 3000);
    return () => clearInterval(interval);
  }, [isLive, user?.username]);

  // 8. Trigger floating hearts animations
  const triggerFloatingHeart = () => {
    addLike();
    triggerFloatingHeartSim();
  };

  const triggerFloatingHeartSim = () => {
    const id = heartIdCounter.current++;
    const x = Math.floor(Math.random() * 80) + 10; // Percentage offset
    const colors = ['#a855f7', '#ec4899', '#f43f5e', '#eab308', '#06b6d4', '#10b981'];
    const color = colors[Math.floor(Math.random() * colors.length)] || '#ec4899';
    const rotate = Math.floor(Math.random() * 40) - 20; // Random rotation between -20 and 20deg
    
    setFloatingHearts(prev => [...prev, { id, x, color, rotate }]);
    
    // Clear heart after animation finishes
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 2000);
  };

  // 9. Send Chat message manually as streamer
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = chatInput.trim();
    if (!content || !user?.username) return;

    setChatInput('');
    try {
      await sendStreamChatMessage(user.username, content);
      const msgs = await getStreamChatMessages(user.username);
      const formatted = msgs.map((m: any) => ({
        id: m.id,
        user: m.user.username,
        text: m.content,
        badge: m.user.username === user.username ? 'Creador' : undefined,
        color: m.user.username === user.username ? 'text-red-400' : 'text-purple-400'
      }));
      setComments(formatted);
    } catch (err) {
      console.error('Error sending chat message:', err);
    }
  };

  if (!hasMounted) {
    return (
      <div className="flex h-screen w-full bg-[#05050a] text-white items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
          <span className="text-zinc-400 font-bold text-sm tracking-wider animate-pulse">Cargando LiveX Studio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white overflow-hidden font-sans">
      
      {/* -------------------- SETUP PRE-LIVE VIEW -------------------- */}
      {!isLive ? (
        pvpStatus && (pvpStatus.isWaiting || pvpStatus.hasOpponent) && !wagerUnblocked ? (
          <div key="wager-wait-view" className="flex-1 flex flex-col items-center justify-center p-8 bg-[#05050a] text-white">
            <div className="max-w-md w-full bg-[#0b0a12]/90 border border-purple-500/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center flex flex-col items-center gap-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />
              
              <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Swords className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-pink-500 block mb-1">Sala PvP Apostada</span>
                <h2 className="text-xl font-black text-white">{pvpStatus.roomTitle || 'Tu Sala PvP'}</h2>
                <p className="text-xs text-zinc-400 mt-2">
                  {pvpStatus.isWaiting 
                    ? "Esperando a que un oponente se una a tu sala PvP para poder iniciar la transmisión..."
                    : "¡Tu oponente se ha unido a la sala PvP!"}
                </p>
              </div>

              {/* Profiles comparison */}
              <div className="flex items-center justify-center gap-8 my-4 w-full">
                {/* Creator */}
                <div className="flex flex-col items-center gap-2">
                  <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-16 h-16 rounded-full border-2 border-purple-500 bg-zinc-800" alt="" />
                  <span className="text-xs font-bold text-zinc-300">@{user.username}</span>
                  <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-[8px] font-black text-purple-400 rounded uppercase">Creador</span>
                </div>

                <div className="text-xl font-black text-pink-500 italic">VS</div>

                {/* Opponent */}
                {pvpStatus.hasOpponent ? (
                  <div className="flex flex-col items-center gap-2 animate-bounce">
                    <img src={pvpStatus.opponentAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${pvpStatus.opponentName}`} className="w-16 h-16 rounded-full border-2 border-pink-500 bg-zinc-800" alt="" />
                    <span className="text-xs font-bold text-zinc-300">@{pvpStatus.opponentName}</span>
                    <span className="px-2 py-0.5 bg-pink-500/20 border border-pink-500/30 text-[8px] font-black text-pink-400 rounded uppercase">Rival</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700 bg-zinc-950 flex items-center justify-center text-zinc-600">
                      <Users className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-xs font-bold text-zinc-500">Esperando...</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {pvpStatus.hasOpponent ? (
                <button
                  onClick={() => setWagerUnblocked(true)}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black rounded-2xl shadow-xl shadow-pink-500/20 transition-all uppercase tracking-wider scale-105 active:scale-95 cursor-pointer"
                >
                  Ir a transmitir / compartir pantalla
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-bold">
                  <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-pink-500 animate-spin" />
                  Buscando retador en la plataforma...
                </div>
              )}

              <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-bold mt-2">
                Cancelar y Salir al Inicio
              </Link>
            </div>
          </div>
        ) : (
          <div key="setup-view" className="flex-1 flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
          
          {/* Left panel: Camera Preview & controls */}
          <div className="flex-none lg:flex-1 flex flex-col p-4 sm:p-8 relative bg-black justify-center items-center">
            
            {/* Header / Back Link */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20">
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Volver a Inicio
              </Link>
            </div>

            {/* Camera/Screen Preview Area */}
            <div className="relative w-full max-w-[90%] sm:max-w-md lg:max-w-xl aspect-video lg:aspect-[9/16] max-h-[30vh] sm:max-h-[40vh] lg:max-h-[80vh] rounded-2xl lg:rounded-[32px] overflow-hidden border border-white/10 bg-[#09090e] shadow-2xl flex items-center justify-center">
              
              <div className={`w-full h-full grid ${cameraActive && isScreenSharing ? 'grid-rows-2 lg:grid-cols-1 lg:grid-rows-2' : 'grid-cols-1'} bg-black`}>
                {/* Camera preview */}
                {cameraActive && (
                  <div className="relative w-full h-full bg-[#09090e] overflow-hidden flex items-center justify-center border border-white/5">
                    <video 
                      ref={previewCameraVideoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                    <div className="absolute top-2 left-2 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-zinc-300">
                      CÁMARA
                    </div>
                  </div>
                )}

                {/* Screen preview */}
                {isScreenSharing && (
                  <div className="relative w-full h-full bg-[#050508] overflow-hidden flex items-center justify-center border border-white/5">
                    <video 
                      ref={previewScreenVideoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-zinc-300">
                      PANTALLA
                    </div>
                  </div>
                )}

                {/* Black overlay if both disabled */}
                {!cameraActive && !isScreenSharing && (
                  <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center z-10 gap-3">
                    <VideoOff className="w-16 h-16 text-zinc-600 animate-pulse" />
                    <span className="text-sm font-bold text-zinc-400">Sin video ni pantalla</span>
                  </div>
                )}
              </div>

              {/* Watermark/Live Tag */}
              <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Vista Previa
              </div>

              {/* Bottom stream setup inputs overlay on Mobile */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-3 justify-center">
                <button 
                  onClick={toggleCamera} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${cameraActive ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-red-600/20 border-red-500/40 text-red-500'}`}
                  title={cameraActive ? 'Apagar cámara' : 'Encender cámara'}
                >
                  {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button 
                  onClick={toggleScreenShare} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isScreenSharing ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                  title={isScreenSharing ? 'Detener compartir pantalla' : 'Compartir pantalla'}
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button 
                  onClick={toggleMic} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${micActive ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-red-600/20 border-red-500/40 text-red-500'}`}
                  title={micActive ? 'Apagar micrófono' : 'Encender micrófono'}
                >
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
              </div>

            </div>
          </div>

          {/* Right panel: Stream Configuration Form */}
          <div className="w-full lg:w-[420px] bg-[#0a0a0f] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col p-5 sm:p-8 justify-between flex-none lg:overflow-y-auto custom-scrollbar">
            
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">LiveX Studio</span>
                <h2 className="text-2xl font-black text-white mt-1">Configurar Emisión</h2>
                <p className="text-xs text-zinc-400 mt-1">Prepara los detalles de tu en vivo antes de transmitir</p>
              </div>

              {/* Title input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Título del en vivo</label>
                <input 
                  type="text" 
                  placeholder="¡Jugando salas con la comunidad! 🎮🔥" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-600 font-bold"
                />
              </div>

              {/* Category selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Seleccionar Categoría</label>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setCategory(cat.name)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all group ${isSelected ? 'border-purple-500 bg-purple-500/10 text-purple-400 scale-[1.02]' : 'border-white/5 bg-white/5 text-zinc-400 hover:border-white/10'}`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-purple-400' : 'text-zinc-400 group-hover:text-white'}`} />
                        <span className="text-[11px] font-bold">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Camera selection dropdown */}
              {videoDevices.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Dispositivo de cámara</label>
                    <button 
                      onClick={refreshDevices}
                      type="button"
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Refrescar lista de cámaras"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white">
                    <Camera className="w-4 h-4 text-zinc-400 shrink-0" />
                    <select 
                      value={selectedDeviceId}
                      onChange={(e) => handleDeviceChange(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-xs font-bold text-white cursor-pointer"
                    >
                      {videoDevices.map((device, i) => (
                        <option key={device.deviceId} value={device.deviceId} className="bg-[#0a0a0f] text-white text-xs">
                          {device.label || `Cámara ${i + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="mt-8 lg:mt-0 flex flex-col gap-4">
              <button 
                onClick={handleStartLive}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider animate-pulse"
              >
                <Play className="w-4 h-4 fill-white" /> Iniciar Transmisión en Vivo
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-bold">
                <Shield className="w-3.5 h-3.5" /> Cumple con las normas de comunidad de LiveX.
              </div>
            </div>

          </div>
        </div>
      )
    ) : (
        
        // -------------------- ACTIVE STREAMING VIEW (Live) --------------------
        <div key="live-view" className="flex-1 flex flex-col lg:flex-row h-full relative bg-black">
          
          {/* Main broadcast video canvas */}
          <div className="absolute inset-0 lg:relative lg:flex-1 w-full h-full lg:h-auto flex items-center justify-center bg-black overflow-hidden group z-0 lg:z-10">
            
            <div className={`w-full h-full grid ${cameraActive && isScreenSharing ? 'grid-rows-2 lg:grid-cols-1 lg:grid-rows-2' : 'grid-cols-1'} bg-black`}>
              {/* Camera view */}
              {cameraActive && (
                <div className="relative w-full h-full bg-[#09090e] overflow-hidden flex items-center justify-center border border-white/5">
                  <video 
                    ref={liveCameraVideoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  <div className="absolute top-2 left-2 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-zinc-300">
                    CÁMARA
                  </div>
                </div>
              )}

              {/* Screen share view */}
              {isScreenSharing && (
                <div className="relative w-full h-full bg-[#050508] overflow-hidden flex items-center justify-center border border-white/5">
                  <video 
                    ref={liveScreenVideoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-zinc-300">
                    PANTALLA COMPARTIDA
                  </div>
                </div>
              )}

              {/* Black overlay if both disabled */}
              {!cameraActive && !isScreenSharing && (
                <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center z-10 gap-3">
                  <VideoOff className="w-16 h-16 text-zinc-700 animate-pulse" />
                  <span className="text-md font-black text-zinc-400">Transmisión de Video Apagada</span>
                </div>
              )}
            </div>

            {/* Live Stats floating overlays inside the stream area */}
            <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
              
              {/* Host Streamer Info */}
              <div className="flex flex-col gap-1.5 max-w-[60%] sm:max-w-none">
                <div className="flex items-center bg-black/45 backdrop-blur-md rounded-full pr-3 sm:pr-4 p-1 gap-2 sm:gap-3 border border-white/10 shadow-lg">
                  <img src={user.avatar} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-pink-500 bg-zinc-800" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-xs font-black leading-tight flex items-center gap-1.5 truncate">
                      {user.username} <Shield className="w-2.5 h-2.5 sm:w-3 h-3 text-blue-400 shrink-0" />
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-zinc-300 font-bold flex items-center gap-0.5 truncate">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 h-3 text-yellow-400 animate-pulse shrink-0" /> {streamCategory}
                    </span>
                  </div>
                </div>

                {/* Badge indicator */}
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-red-600 text-[8px] sm:text-[9px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <span className="w-1 h-1 bg-white rounded-full animate-ping" /> LIVE
                  </span>
                  <span className="px-2 py-0.5 bg-black/45 backdrop-blur-md text-[8px] sm:text-[9px] font-black rounded flex items-center gap-1 border border-white/10 shadow-lg">
                    <Eye className="w-3 h-3 sm:w-3.5 h-3.5 text-zinc-300 animate-pulse" /> {viewers}
                  </span>
                </div>
              </div>

              {/* End live button on top right */}
              <button 
                onClick={handleStopLive}
                className="p-2 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-full flex items-center gap-1.5 shadow-lg border border-red-500/20 active:scale-95 transition-transform"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Finalizar En Vivo</span>
              </button>
            </div>

            {/* floating hearts display */}
            <div className="absolute bottom-6 right-4 sm:right-6 w-32 h-64 z-20 pointer-events-none overflow-hidden flex flex-col justify-end items-center">
              {floatingHearts.map((heart) => (
                <div 
                  key={heart.id} 
                  className="absolute bottom-0 animate-float-heart"
                  style={{
                    left: `${heart.x}%`,
                    color: heart.color,
                    '--rotate-deg': `${heart.rotate}deg`
                  } as React.CSSProperties}
                >
                  <Heart className="w-7 h-7 fill-current" />
                </div>
              ))}
            </div>

            {/* Quick overlay controls (Toggle Cam, Toggle Mic, Send Heart) */}
            <div className="absolute bottom-6 right-4 sm:right-6 z-20 flex flex-col gap-2.5 items-center">
              
              {/* Like / Heart Trigger */}
              <button 
                onClick={triggerFloatingHeart}
                className="w-11 h-11 sm:w-12 sm:h-12 bg-pink-500 hover:bg-pink-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-500/40 active:scale-90 transition-transform group"
              >
                <Heart className="w-5.5 h-5.5 sm:w-6 sm:h-6 fill-white group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                onClick={toggleCamera}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${cameraActive ? 'bg-black/60 border-white/10 text-white hover:bg-black/80' : 'bg-red-600/30 border-red-500/40 text-red-500'}`}
              >
                {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button 
                onClick={toggleScreenShare}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${isScreenSharing ? 'bg-purple-600 border-purple-500 text-white' : 'bg-black/60 border-white/10 text-white hover:bg-black/80'}`}
                title={isScreenSharing ? 'Detener compartir pantalla' : 'Compartir pantalla'}
              >
                <Laptop className="w-4.5 h-4.5" />
              </button>

              <button 
                onClick={toggleMic}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${micActive ? 'bg-black/60 border-white/10 text-white hover:bg-black/80' : 'bg-red-600/30 border-red-500/40 text-red-500'}`}
              >
                {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <div className="bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-lg border border-white/10 text-[8px] sm:text-[9px] font-black text-pink-400 shadow-md mt-1">
                ❤️ {likes.toLocaleString()}
              </div>

            </div>

            {/* Mobile View Title Card Overlay */}
            <div className="absolute bottom-[calc(22vh+96px)] left-4 right-20 z-20 lg:hidden">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">
                <Award className="w-3 h-3" /> En vivo de {user.username}
              </span>
              <h4 className="text-xs font-bold text-white mt-0.5 leading-tight line-clamp-2 bg-black/35 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5 inline-block">
                {streamTitle}
              </h4>
            </div>

            {/* Mobile Chat comments overlay */}
            <div className="absolute bottom-20 left-4 right-20 max-h-[22vh] overflow-y-auto flex flex-col gap-2 z-20 no-scrollbar pointer-events-none lg:hidden">
              {comments.map((msg) => (
                <div key={msg.id} className="flex gap-2 items-start text-xs animate-in fade-in slide-in-from-bottom-2 duration-200 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/5 w-fit max-w-[90%] pointer-events-auto">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} className="w-6 h-6 rounded-full bg-zinc-800 shrink-0 border border-white/10" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-0.5">
                      {msg.badge && (
                        <span className="text-[7px] px-1 bg-purple-600 text-white rounded font-black uppercase tracking-wider">
                          {msg.badge}
                        </span>
                      )}
                      <span className="text-zinc-300 text-[10px] font-bold">{msg.user}</span>
                    </div>
                    <p className="text-white text-[11px] leading-snug">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={mobileChatEndRef} />
            </div>

            {/* Mobile Chat message input form */}
            <form onSubmit={handleSendChat} className="absolute bottom-6 left-4 z-20 lg:hidden flex gap-2 w-[calc(100%-96px)] max-w-[280px]">
              <div className="flex-1 flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 h-11 focus-within:border-purple-500 transition-colors">
                <input 
                  type="text" 
                  placeholder="Envía un mensaje..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-xs text-white placeholder-zinc-400"
                />
              </div>
              <button 
                type="submit"
                className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>

          </div>

          {/* Right panel: Live Stream Chat (Twitch style layout) */}
          <div className="hidden lg:flex w-full lg:w-[360px] bg-[#0c0b18] border-t lg:border-t-0 lg:border-l border-white/5 flex-col justify-between shrink-0 lg:h-full z-20">
            
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#090812]">
              <span className="font-black text-sm uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" /> Chat de Transmisión
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">
                <Users className="w-3.5 h-3.5" /> {viewers}
              </div>
            </div>

            {/* Chat comments messages scroll */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
              
              <div className="bg-white/5 text-zinc-400 border border-white/5 rounded-2xl p-3 text-xs font-semibold text-center mb-2 leading-relaxed">
                ¡Bienvenido a tu stream! Interactúa con tu comunidad y cumple con las normas.
              </div>

              {comments.map((msg) => (
                <div key={msg.id} className="flex gap-2.5 items-start text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} className="w-7 h-7 rounded-full bg-zinc-800 shrink-0 mt-0.5 border border-white/10" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {msg.badge && (
                        <span className="text-[8px] px-1 py-0.2 bg-purple-600 text-white rounded font-black uppercase tracking-wider">
                          {msg.badge}
                        </span>
                      )}
                      <span className="text-zinc-400 text-xs font-bold">{msg.user}</span>
                    </div>
                    <p className="text-white text-[13px] leading-snug">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={desktopChatEndRef} />
            </div>

            {/* Chat message input form */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-white/5 bg-[#090812] flex gap-2">
              <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-full px-4 h-11 focus-within:border-purple-500 transition-colors">
                <input 
                  type="text" 
                  placeholder="Envía un mensaje al chat..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder-zinc-500"
                />
              </div>
              <button 
                type="submit"
                className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>

          </div>

          {/* Styled animation keyframes for floating hearts */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes floatHeart {
              0% {
                transform: translateY(0) scale(0.6);
                opacity: 1;
              }
              100% {
                transform: translateY(-400px) scale(1.4) rotate(var(--rotate-deg, 20deg));
                opacity: 0;
              }
            }
            .animate-float-heart {
              animation: floatHeart 2s ease-out forwards;
            }
          ` }} />
        </div>
      )}
    </div>
  );
}
