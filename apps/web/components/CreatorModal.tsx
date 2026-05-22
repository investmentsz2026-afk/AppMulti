'use client';

import React, { useState, useRef } from 'react';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useRouter } from 'next/navigation';
import { 
  X, Play, Swords, Sword, Coins, Image, Upload, 
  CheckCircle2, Loader2, Sparkles, ChevronRight, Laptop, Gamepad2, Lock, Globe
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createPost } from '@/app/actions/posts';

type ActiveTab = 'menu' | 'upload' | 'room' | 'coins';

export default function CreatorModal() {
  const { isOpen, close, activeTab: storeActiveTab } = useCreatorStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(storeActiveTab);
    }
  }, [isOpen, storeActiveTab]);

  // Subir video state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crear sala state
  const [selectedGame, setSelectedGame] = useState('Free Fire');
  const [roomName, setRoomName] = useState('Sala PvP de LiveX');
  const [roomMode, setRoomMode] = useState('1v1');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);

  // Recargar monedas state
  const [selectedPack, setSelectedPack] = useState<{ id: number; coins: number; price: string } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBack = () => {
    setActiveTab('menu');
    resetStates();
  };

  const resetStates = () => {
    setVideoFile(null);
    setVideoTitle('');
    setUploadProgress(0);
    setIsUploading(false);
    setUploadSuccess(false);
    setPrivacy('public');

    setSelectedGame('Free Fire');
    setRoomName('Sala PvP de LiveX');
    setRoomMode('1v1');
    setIsCreatingRoom(false);
    setRoomCreated(false);

    setSelectedPack(null);
    setIsProcessingPayment(false);
    setPaymentSuccess(false);
  };

  const handleClose = () => {
    close();
    resetStates();
    setActiveTab('menu');
  };

  // 1. Upload real de archivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  const startUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle) {
      toast.error('Por favor escribe un título.');
      return;
    }
    if (!videoFile) {
      toast.error('Por favor selecciona un archivo.');
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress while uploading
    let prog = 0;
    const interval = setInterval(() => {
      prog = Math.min(prog + 8, 90);
      setUploadProgress(prog);
    }, 300);

    try {
      const formData = new FormData();
      formData.append('title', videoTitle);
      formData.append('file', videoFile);
      formData.append('privacy', privacy);

      const result = await createPost(formData);

      clearInterval(interval);
      setUploadProgress(100);

      if (result.error) {
        toast.error(result.error);
        setIsUploading(false);
        setUploadProgress(0);
        return;
      }

      setIsUploading(false);
      setUploadSuccess(true);
      toast.success('¡Publicación subida con éxito! 🎉');
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
      toast.error('Error al subir el archivo. Inténtalo de nuevo.');
    }
  };

  // 2. Simulación de creación de sala
  const startRoomCreationSim = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingRoom(true);
    setTimeout(() => {
      setIsCreatingRoom(false);
      setRoomCreated(true);
      toast.success(`¡Sala de ${selectedGame} creada! 🎮`);
    }, 1500);
  };

  // 3. Simulación de recarga de monedas
  const startPaymentSim = (pack: { id: number; coins: number; price: string }) => {
    setSelectedPack(pack);
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      toast.success(`¡Recargaste ${pack.coins} Monedas! 💎`);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity">
      <div className="absolute inset-0" onClick={handleClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0c0b18]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] transform transition-transform animate-in zoom-in-95 duration-200">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-600/30 rounded-full blur-3xl" />

        {/* Modal Header */}
        <div className="relative z-10 px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#090812]/90">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Creator Hub</span>
            <h3 className="text-lg font-black text-white flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" /> LiveX Creator Studio
            </h3>
          </div>
          <button 
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-6 min-h-[320px]">
          
          {/* TAB 1: MENU PRINCIPAL */}
          {activeTab === 'menu' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              
              <p className="text-sm text-zinc-400 font-medium mb-2">Selecciona una opción para comenzar a crear o recargar:</p>

              {/* 1. Transmitir en vivo */}
              <button 
                onClick={() => {
                  close();
                  router.push('/transmitir');
                }}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 hover:border-pink-500/50 hover:scale-[1.01] transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Play className="w-5 h-5 fill-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Transmitir en vivo</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Prende tu cámara e inicia un livestream en tiempo real</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>

              {/* 2. Subir video o imagen */}
              <button 
                onClick={() => setActiveTab('upload')}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:scale-[1.01] transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Subir un video o imagen</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Sube clips de tus jugadas o setups a tu feed</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>

              {/* 3. Batallas PvP */}
              <button 
                onClick={() => {
                  close();
                  router.push('/batallas');
                }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:scale-[1.01] transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                    <Swords className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Batallas PvP</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Reta a otros streamers a duelos en vivo y gana votos</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>

              {/* 4. Crear sala */}
              <button 
                onClick={() => setActiveTab('room')}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:scale-[1.01] transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                    <Sword className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Crear sala</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Configura una sala competitiva privada de videojuegos</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>

              {/* 5. Recargar monedas */}
              <button 
                onClick={() => setActiveTab('coins')}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 hover:border-yellow-500/50 hover:scale-[1.01] transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <Coins className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Recargar monedas</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Compra monedas LiveX para enviar regalos exclusivos</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>

            </div>
          )}

          {/* TAB 2: SUBIR VIDEO / IMAGEN */}
          {activeTab === 'upload' && (
            <div className="animate-in slide-in-from-right-5 duration-200">
              <button onClick={handleBack} className="text-xs font-bold text-zinc-400 hover:text-white mb-4">&larr; Volver al menú</button>
              
              {!uploadSuccess ? (
                <form onSubmit={startUpload} className="flex flex-col gap-4">
                  <h4 className="text-md font-bold text-white">Subir Video o Imagen</h4>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* File Selector Box */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/40 hover:bg-white/10 transition-all p-4 text-center ${
                      videoFile ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/10 bg-white/5'
                    }`}
                  >
                    {videoFile ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-purple-400 mb-2" />
                        <span className="text-xs font-bold text-white truncate max-w-full px-2">{videoFile.name}</span>
                        <span className="text-[10px] text-zinc-400 mt-1">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB · Clic para cambiar</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                        <span className="text-xs font-bold text-zinc-300">Haz clic para seleccionar archivo</span>
                        <span className="text-[10px] text-zinc-500 mt-1">Soporta MP4, MOV, JPG, PNG, WEBP (máx 150MB)</span>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1">Título de la publicación</label>
                    <input 
                      type="text" 
                      placeholder="Escribe un título llamativo..." 
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Privacy Selector */}
                  <div>
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1.5">Visibilidad</label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setPrivacy('public')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                          privacy === 'public' 
                            ? 'border-purple-500 bg-purple-500/10 text-white' 
                            : 'border-white/5 bg-white/5 text-zinc-400'
                        }`}
                      >
                        <Globe className="w-4 h-4" /> Público
                      </button>
                      <button
                        type="button"
                        onClick={() => setPrivacy('private')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                          privacy === 'private' 
                            ? 'border-pink-500 bg-pink-500/10 text-white' 
                            : 'border-white/5 bg-white/5 text-zinc-400'
                        }`}
                      >
                        <Lock className="w-4 h-4" /> Privado
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1.5">
                      {privacy === 'public' 
                        ? 'Todos los usuarios podrán ver esta publicación en Para ti y tu perfil.' 
                        : 'Solo tú podrás ver esta publicación en tu perfil.'}
                    </p>
                  </div>

                  {isUploading ? (
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo archivo...
                        </span>
                        <span className="text-xs font-black">{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    </div>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full mt-2 py-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                      Publicar ahora
                    </button>
                  )}
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-1">¡Publicación exitosa!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-6">Tu archivo se ha procesado correctamente y ya está disponible en tu perfil y en el feed público.</p>
                  <button 
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/5 transition-colors"
                  >
                    Hacer otra publicación
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CREAR SALA */}
          {activeTab === 'room' && (
            <div className="animate-in slide-in-from-right-5 duration-200">
              <button onClick={handleBack} className="text-xs font-bold text-zinc-400 hover:text-white mb-4">&larr; Volver al menú</button>

              {!roomCreated ? (
                <form onSubmit={startRoomCreationSim} className="flex flex-col gap-4">
                  <h4 className="text-md font-bold text-white">Configurar Sala PvP</h4>

                  <div>
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1.5">Seleccionar Videojuego</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Free Fire', icon: Gamepad2 },
                        { name: 'Valorant', icon: Laptop }
                      ].map(g => (
                        <button
                          key={g.name}
                          type="button"
                          onClick={() => setSelectedGame(g.name)}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${selectedGame === g.name ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-white/5 bg-white/5 text-zinc-400'}`}
                        >
                          <g.icon className="w-4 h-4" /> {g.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1">Nombre de la Sala</label>
                    <input 
                      type="text" 
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1.5">Modo de Combate</label>
                    <div className="flex gap-2">
                      {['1v1', '2v2', '4v4 (Escuadras)'].map(mode => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setRoomMode(mode)}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${roomMode === mode ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-white/5 bg-white/5 text-zinc-400'}`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isCreatingRoom ? (
                    <button 
                      disabled
                      className="w-full mt-2 py-3 bg-purple-600/50 rounded-xl font-bold flex items-center justify-center gap-2 cursor-wait"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-white" /> Creando servidor privado...
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full mt-2 py-3 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl text-black font-black hover:scale-[1.02] active:scale-95 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                    >
                      Crear Sala Ahora
                    </button>
                  )}
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-500 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-1">¡Sala Privada Creada!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-6">ID de Sala: <span className="font-mono text-white font-bold bg-white/5 px-2 py-1 rounded">LX-98242</span>. Compártelo con tu rival e invitados.</p>
                  <button 
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/5 transition-colors"
                  >
                    Crear otra sala
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RECARGAR MONEDAS */}
          {activeTab === 'coins' && (
            <div className="animate-in slide-in-from-right-5 duration-200">
              <button onClick={handleBack} className="text-xs font-bold text-zinc-400 hover:text-white mb-4">&larr; Volver al menú</button>

              {!paymentSuccess ? (
                <div className="flex flex-col gap-4">
                  <h4 className="text-md font-bold text-white">Adquirir Monedas LiveX</h4>
                  
                  {isProcessingPayment ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center bg-[#090812] border border-white/5 rounded-2xl">
                      <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-4" />
                      <span className="text-xs font-bold text-zinc-300">Procesando pago con tarjeta...</span>
                      <span className="text-[10px] text-zinc-500 mt-1">Conexión encriptada SSL</span>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 1, coins: 500, price: '$4.99' },
                          { id: 2, coins: 1200, price: '$9.99' },
                          { id: 3, coins: 2500, price: '$19.99' },
                          { id: 4, coins: 6500, price: '$49.99' }
                        ].map(pack => (
                          <button
                            key={pack.id}
                            onClick={() => startPaymentSim(pack)}
                            className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-yellow-500/40 hover:bg-white/10 transition-all hover:scale-[1.02]"
                          >
                            <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mb-1 text-yellow-500">
                              <Coins className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-sm font-black text-white">{pack.coins} 💎</span>
                            <span className="text-[10px] text-zinc-400 font-bold mt-1">{pack.price} USD</span>
                          </button>
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-500 text-center block mt-2">La recarga se aplica al saldo de tu monedero de manera inmediata.</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-500 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-1">¡Recarga Completada!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-6">Hemos acreditado <span className="text-yellow-500 font-bold">{selectedPack?.coins} monedas</span> a tu cuenta. ¡Ya puedes apoyar a tus streamers favoritos!</p>
                  <button 
                    onClick={handleBack}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/5 transition-colors"
                  >
                    Volver a comprar
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
