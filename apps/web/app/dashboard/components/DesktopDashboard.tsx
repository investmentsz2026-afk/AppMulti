'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye, Coins
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';
import { getUpcomingStreamers, getOngoingBattles, getTopDonators, getUserWalletBalance } from '@/app/actions/battle';
import { getUnreadNotificationsCount } from '@/app/actions/social';

export default function DesktopDashboard({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const router = useRouter();
  const { isLive, streamTitle, viewers } = useLiveStore();

  const [liveStreamers, setLiveStreamers] = useState<any[]>([]);
  const [activeBattles, setActiveBattles] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [realCoins, setRealCoins] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    async function loadRealData() {
      try {
        const streamers = await getUpcomingStreamers();
        setLiveStreamers(streamers);

        const battles = await getOngoingBattles();
        setActiveBattles(battles);

        const donators = await getTopDonators();
        setTopUsers(donators);

        const coins = await getUserWalletBalance();
        setRealCoins(coins);

        const count = await getUnreadNotificationsCount();
        setUnreadNotifications(count);
      } catch (err) {
        console.error('Error loading desktop dashboard data:', err);
      }
    }
    loadRealData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white">
      {/* Left Sidebar */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </div>

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
            <Home className="w-5 h-5" /> Para ti
          </button>
          <button 
            onClick={() => setTab('siguiendo')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'siguiendo' ? 'bg-white/5 text-purple-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <Home className="w-5 h-5" /> Siguiendo
          </button>
          <button 
            onClick={() => useCreatorStore.getState().open()}
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
          >
            <Plus className="w-5 h-5" /> Crear
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
          <Link href="/torneos" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Trophy className="w-5 h-5" /> Torneos
          </Link>
        </nav>

        <nav className="flex flex-col gap-1 mb-8">
          <Link href="/mensajes" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Mensajes</div>
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href="/notificaciones" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notificaciones</div>
            {unreadNotifications > 0 && (
              <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadNotifications}</span>
            )}
          </Link>
          <Link href={`/u/${user.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <User className="w-5 h-5" /> Perfil
          </Link>
          <Link href="/wallet" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Wallet className="w-5 h-5" /> Wallet
          </Link>
        </nav>

        <button 
          onClick={() => useCreatorStore.getState().open()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-8"
        >
          <Plus className="w-5 h-5" /> Crear
        </button>

        <div className="bg-[#12152b] rounded-xl p-4 mb-4 border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-zinc-400">Monedas</span>
             <ChevronRight className="w-4 h-4 text-zinc-500" />
           </div>
           <div className="flex items-center gap-2 mb-3">
             <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                <span className="text-[10px] font-black text-black">L</span>
             </div>
             <span className="font-black text-lg">{realCoins.toLocaleString()}</span>
           </div>
           <button className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
        </div>

        <div className="bg-[#12152b] rounded-xl p-4 mb-8 border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-zinc-400">Nivel 24</span>
             <span className="text-[10px] font-black text-purple-400">75%</span>
           </div>
           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
             <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%]" />
           </div>
           <span className="text-[9px] text-zinc-500 font-medium">Siguiente nivel: 2,150 XP</span>
        </div>

        <div className="mt-auto bg-gradient-to-br from-purple-900/40 to-[#0a0a0f] rounded-xl p-4 border border-purple-500/20 text-center relative overflow-hidden">
           <Gift className="w-12 h-12 text-purple-500/20 absolute -right-2 -bottom-2" />
           <h4 className="text-sm font-black text-white mb-1">Gana más con LiveX</h4>
           <p className="text-[10px] text-zinc-400 mb-3 leading-tight">Invita a tus amigos y gana recompensas exclusivas.</p>
           <button className="w-full bg-white/10 hover:bg-white/20 text-xs font-bold py-2 rounded-lg transition-colors border border-white/5">Invitar amigos</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
           <form 
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                if (q.trim()) router.push(`/buscar?q=${encodeURIComponent(q)}`);
              }}
              className="w-full max-w-md relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                name="q"
                type="text" 
                placeholder="Buscar streamers, batallas, torneos..." 
                className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-purple-500/50 transition-all text-white placeholder:text-zinc-600"
              />
           </form>

           <div className="flex items-center gap-6">
             <button className="text-zinc-400 hover:text-yellow-400 transition-colors">
               <Crown className="w-5 h-5" />
             </button>
             <button className="text-zinc-400 hover:text-white transition-colors relative">
               <Bell className="w-5 h-5" />
               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#0a0a0f]" />
             </button>
             <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer">
               <img src={user.avatar} className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" alt={user.username} />
               <div>
                 <div className="text-sm font-bold flex items-center gap-1">
                   {user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                 </div>
                 <div className="text-[10px] text-zinc-500 font-medium">Nivel 24</div>
               </div>
               <button onClick={handleLogout} className="ml-2 text-zinc-600 hover:text-red-400 transition-colors" title="Cerrar sesión">
                 <LogOut className="w-4 h-4" />
               </button>
             </div>
           </div>
        </header>

        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 flex gap-8">
           {/* Center Feed */}
           <div className="flex-1 flex flex-col gap-8 min-w-0">
              
              {/* Featured Hero Stream */}
              {liveStreamers.length > 0 ? (
                <Link href={`/live/${liveStreamers[0].username}`} className="relative block rounded-[32px] overflow-hidden aspect-video group cursor-pointer border border-white/5">
                  <img 
                    src={liveStreamers[0].avatar || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={liveStreamers[0].username} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-[#05050a]/40" />
                  
                  {/* Top Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                     <div className="flex gap-2">
                       <div className="px-2 py-1 bg-red-600 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> EN VIVO
                       </div>
                     </div>
                  </div>

                  {/* Bottom Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                     <div>
                       <div className="flex items-center gap-3 mb-2">
                         <img src={liveStreamers[0].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${liveStreamers[0].username}`} className="w-12 h-12 rounded-full border-2 border-pink-500 bg-zinc-800" />
                         <div>
                           <h3 className="text-2xl font-black flex items-center gap-2">
                             @{liveStreamers[0].username} <BadgeCheck className="w-5 h-5 text-blue-400" />
                           </h3>
                           <p className="text-sm text-zinc-300 font-medium">{liveStreamers[0].stream?.title || 'Transmitiendo en vivo'}</p>
                         </div>
                       </div>
                       <div className="flex gap-2">
                         <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/5">{liveStreamers[0].stream?.category || 'Gaming'}</span>
                       </div>
                     </div>
                     
                     <div className="flex gap-3">
                       <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-black rounded-xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/20">
                         Ver Stream
                       </button>
                     </div>
                  </div>
                </Link>
              ) : (
                <div className="relative rounded-[32px] overflow-hidden aspect-[21/9] md:aspect-video group border border-white/5 bg-gradient-to-r from-purple-900/40 via-[#0a0a14] to-pink-900/40 flex flex-col justify-center p-8 sm:p-12">
                  <div className="absolute inset-0 bg-[#070712]/40 backdrop-blur-[2px] pointer-events-none" />
                  <div className="relative z-10 max-w-md">
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black rounded-full uppercase tracking-wider">¡Únete a la Arena!</span>
                    <h2 className="text-2xl sm:text-4xl font-black mt-3 mb-2 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-tight">
                      Sé el primero en transmitir hoy
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 font-medium mb-6 leading-relaxed">
                      Comparte tus jugadas en Free Fire, interactúa con la comunidad y gana diamantes LiveX de tus espectadores.
                    </p>
                    <div className="flex items-center gap-4">
                      <Link href="/transmitir" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-500/20 uppercase tracking-wider">
                        Transmitir en Vivo 🔴
                      </Link>
                      <button onClick={() => useCreatorStore.getState().open('room')} className="px-6 py-3 bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 text-xs font-black rounded-xl transition-all uppercase tracking-wider">
                        Crear Sala PvP ⚔️
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* En vivo ahora */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black">En vivo ahora</h3>
                  <button className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLive && user && (
                    <Link href={`/live/${user.username}`} className="group cursor-pointer block border-2 border-purple-500 rounded-3xl p-2 bg-[#1c0933]/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:border-pink-500 transition-all">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-pulse" />
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="px-1.5 py-0.5 bg-pink-600 text-[8px] font-black rounded uppercase shadow-[0_0_10px_rgba(236,72,153,0.5)]">Tu Vivo</span>
                          <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-[8px] font-black rounded flex items-center gap-1 border border-white/10">
                            <Eye className="w-2.5 h-2.5 text-pink-400" /> {viewers}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-pink-500 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold truncate flex items-center gap-1 text-pink-300">
                            {user.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" />
                          </h4>
                          <p className="text-[10px] text-white font-bold truncate mb-1">{streamTitle || 'Transmitiendo en Vivo'}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
                            <Coins className="w-3 h-3 text-yellow-500" />
                            {realCoins.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {liveStreamers.map((stream, i) => (
                    <Link href={`/live/${stream.username}`} key={stream.id} className="group cursor-pointer block">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-white/5">
                        <img src={stream.avatar || `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="px-1.5 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase">En vivo</span>
                          <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md text-[8px] font-black rounded flex items-center gap-1 border border-white/10">
                            <Eye className="w-2.5 h-2.5" /> {Math.floor(Math.random() * 200 + 10)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <img src={stream.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${stream.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold truncate flex items-center gap-1">
                            {stream.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" />
                          </h4>
                          <p className="text-[10px] text-zinc-400 truncate mb-1">{stream.stream?.title || 'Gaming'}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {liveStreamers.length === 0 && (
                    <div className="col-span-4 text-center text-xs text-zinc-500 py-10 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      No hay transmisiones en vivo disponibles ahora.
                    </div>
                  )}
                </div>
              </div>

              {/* Batallas destacadas */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black">Batallas destacadas</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeBattles.length === 0 ? (
                    <div className="col-span-2 text-center text-xs text-zinc-500 py-10 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      No hay batallas PvP activas en este momento.
                    </div>
                  ) : (
                    activeBattles.map(battle => (
                      <div key={battle.id} className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-white/5 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-transparent to-blue-900/60" />
                        <div className="absolute inset-0 flex items-center justify-around p-4">
                           <div className="text-center w-[35%]">
                              <div className="text-xs lg:text-sm font-black text-white mb-1 uppercase tracking-tighter truncate">@{battle.stream1?.user?.username}</div>
                           </div>
                           <div className="text-2xl lg:text-4xl font-black italic text-white/40">VS</div>
                           <div className="text-center w-[35%]">
                              <div className="text-xs lg:text-sm font-black text-white mb-1 uppercase tracking-tighter truncate">@{battle.stream2?.user?.username}</div>
                           </div>
                        </div>
                        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
                           <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400">
                             <User className="w-4 h-4" /> En vivo
                           </div>
                           <Link href="/batallas" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold transition-colors">
                             Ver batalla
                           </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="w-[320px] flex flex-col gap-6 shrink-0">
               
              {/* Top Donadores */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black">Top donadores</h3>
                  <button className="text-[10px] font-bold text-purple-400 hover:text-purple-300">Ver ranking →</button>
                </div>
                <div className="flex flex-col gap-4">
                  {topUsers.length === 0 ? (
                    <div className="text-center text-xs text-zinc-500 italic py-2">Sin donadores registrados.</div>
                  ) : (
                    topUsers.map((d, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-black w-3 text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-600' : 'text-zinc-500'}`}>
                            {i + 1}
                          </span>
                          <img src={d.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.name}`} className="w-8 h-8 rounded-full bg-zinc-800" />
                          <span className="text-sm font-bold flex items-center gap-1">
                            @{d.name} {d.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                          <Coins className="w-3.5 h-3.5 text-yellow-500" />
                          {d.coins.toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Eventos Próximos */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black">Eventos próximos</h3>
                  <button className="text-[10px] font-bold text-purple-400 hover:text-purple-300">Ver todos</button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-600 to-red-600 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold mb-0.5">Torneo de Streamers</h4>
                      <p className="text-[10px] text-zinc-400 mb-1">25 de Mayo, 2024</p>
                      <button className="text-[10px] text-purple-400 font-bold hover:underline">Participar</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
                      <Sword className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold mb-0.5">Batalla de Leyendas</h4>
                      <p className="text-[10px] text-zinc-400 mb-1">30 de Mayo, 2024</p>
                      <button className="text-[10px] text-purple-400 font-bold hover:underline">Participar</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actividad Reciente */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-5 flex-1">
                <h3 className="font-black mb-5">Actividad reciente</h3>
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10" />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AlexM" className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-zinc-800 shrink-0" />
                    <div className="text-xs pt-1">
                      <p><span className="font-bold text-purple-400">AlexM</span> te envió León 🦁</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">hace 2 min</p>
                    </div>
                    <span className="ml-auto text-xs font-black text-yellow-400 pt-1">x10</span>
                  </div>

                  <div className="flex items-start gap-3 relative z-10">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CamiLove" className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-zinc-800 shrink-0" />
                    <div className="text-xs pt-1">
                      <p><span className="font-bold text-purple-400">CamiLove</span> te envió Corona 👑</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">hace 5 min</p>
                    </div>
                    <span className="ml-auto text-xs font-black text-yellow-400 pt-1">x1</span>
                  </div>

                  <div className="flex items-start gap-3 relative z-10">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoStream" className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-zinc-800 shrink-0" />
                    <div className="text-xs pt-1">
                      <p><span className="font-bold text-purple-400">DiegoStream</span> comenzó a seguirte</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">hace 10 min</p>
                    </div>
                    <button className="ml-auto px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-[10px] font-bold transition-colors">Seguir</button>
                  </div>
                </div>
              </div>

           </div>
        </div>

        {/* Floating Chat Button */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform z-50">
          <MessageSquare className="w-6 h-6 text-white" />
        </button>

      </main>
    </div>
  );
}
