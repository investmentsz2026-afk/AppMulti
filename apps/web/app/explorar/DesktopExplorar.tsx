'use client';
import React from 'react';
import Link from 'next/link';
import {
  Home, Play, Compass, Sword, Trophy, MessageSquare, Bell, User, Wallet,
  Plus, Search, Crown, LogOut, ChevronRight, BadgeCheck, Eye, Gift,
  Gamepad2, Mic2, Radio, Monitor, Heart, Flame, Film, Coffee, Headphones
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';

const streams = [
  { name: 'AndrésGG', viewers: '2,345', title: 'Batalla épica contra DiegoStream', cat: 'Call of Duty: Warzone', tags: ['Español','Multijugador'], img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
  { name: 'SofiLive', viewers: '1,782', title: 'Charlando con ustedes', cat: 'Just Chatting', tags: ['Español','Charlas'], img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
  { name: 'MartinCV', viewers: '1,245', title: 'Jugando torneos con subs!', cat: 'Fortnite', tags: ['Español','Competitivo'], img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400' },
  { name: 'CamiLove', viewers: '987', title: 'Cantando en vivo 🎤', cat: 'Música', tags: ['Español','Música'], img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400' },
  { name: 'AlexM', viewers: '875', title: 'Road to Radiant', cat: 'Valorant', tags: ['Gaming'], img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=5' },
  { name: 'ElKomanche', viewers: '654', title: 'Reaccionando a videos', cat: 'Just Chatting', tags: ['IRL'], img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&u=6' },
  { name: 'NickyPlay', viewers: '512', title: 'Viernes de chill ✨', cat: 'IRL', tags: ['Lifestyle'], img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400&u=7' },
  { name: 'Zeta', viewers: '388', title: 'Probando juegos nuevos', cat: 'Gaming', tags: ['Gaming'], img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400&u=8' },
];

const categories = [
  { name: 'Todo', icon: Flame, viewers: '2.3M+', active: true },
  { name: 'Gaming', icon: Gamepad2, viewers: '8.7K' },
  { name: 'IRL', icon: Radio, viewers: '1.4K+' },
  { name: 'Música', icon: Mic2, viewers: '6.1K+' },
  { name: 'Esports', icon: Trophy, viewers: '9.3K' },
  { name: 'Just Chatting', icon: Coffee, viewers: '1.7K+' },
  { name: 'Podcasts', icon: Headphones, viewers: '1.3K' },
  { name: 'Tecnología', icon: Monitor, viewers: '890' },
];

const topStreamers = [
  { name: 'AndrésGG', coins: '80.4K', verified: true },
  { name: 'SofiLive', coins: '98.7K', verified: true },
  { name: 'DiegoStream', coins: '76.5K', verified: true },
  { name: 'CamiLove', coins: '64.2K', verified: true },
  { name: 'MartinCV', coins: '52.1K', verified: true },
];

const topDonors = [
  { name: 'AlexM', coins: '125,430', verified: true },
  { name: 'ChrisGaming', coins: '98,760', verified: false },
  { name: 'ValenLG', coins: '76,540', verified: true },
  { name: 'Andreina01', coins: '64,230', verified: false },
  { name: 'SoyMau', coins: '52,180', verified: true },
];

const trendingStreams = [
  { title: 'Batalla épica Andrés vs Diego', cat: 'Call of Duty: Warzone', viewers: '2,345' },
  { title: 'Torneo de Streamers LiveX', cat: 'Apex Legends', viewers: '1,876' },
  { title: 'Show musical en vivo', cat: 'Música', viewers: '1,245' },
  { title: 'Nuevas skins en Fortnite', cat: 'Fortnite', viewers: '987' },
];

export default function DesktopExplorar({ user }: { user: any }) {
  const [activeCat, setActiveCat] = React.useState('Todo');
  const { isLive, streamTitle, viewers, streamCategory } = useLiveStore();

  const userStream = isLive && user ? {
    name: user.username,
    viewers: viewers > 1000 ? `${(viewers / 1000).toFixed(1)}K` : String(viewers),
    title: streamTitle || '¡Transmisión en Vivo de LiveX! 🎮',
    cat: streamCategory || 'Gaming',
    tags: ['Español', 'TuVivo'],
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400',
    isOwn: true
  } : null;

  const activeStreams = userStream ? [userStream, ...streams] : streams;

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white">
      {/* Left Sidebar (Perfectly matching other pages!) */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </Link>

        <nav className="flex flex-col gap-1 mb-8">
          <Link 
            href="/dashboard?tab=inicio"
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-left"
          >
            <Home className="w-5 h-5" /> Inicio
          </Link>
          <Link 
            href="/dashboard?tab=parati"
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-left"
          >
            <Play className="w-5 h-5" /> Para ti
          </Link>
          <Link 
            href="/dashboard?tab=siguiendo"
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-left"
          >
            <User className="w-5 h-5" /> Siguiendo
          </Link>
          <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Gaming
          </Link>
          <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <Compass className="w-5 h-5 text-pink-400" /> Explorar
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
            <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
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

        {/* Monedas Card */}
        <div className="bg-[#12152b] rounded-xl p-4 mb-4 border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-zinc-400">Monedas</span>
             <ChevronRight className="w-4 h-4 text-zinc-500" />
           </div>
           <div className="flex items-center gap-2 mb-3">
             <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                <span className="text-[10px] font-black text-black">L</span>
             </div>
             <span className="font-black text-lg">12,450</span>
           </div>
           <button className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
        </div>

        {/* XP Progress Card */}
        <div className="bg-[#12152b] rounded-xl p-4 mb-8 border border-white/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-zinc-400">Nivel 24</span>
             <span className="text-[10px] font-black text-purple-400">75%</span>
           </div>
           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
             <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%]" />
           </div>
        </div>

        <div className="mt-auto flex items-center gap-2 px-2 py-3 border-t border-white/5">
          <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/5 px-6 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          <div className="w-full max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input type="text" placeholder="Buscar streamers, juegos, categorías..." className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50 text-white placeholder:text-zinc-600" />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Ctrl K</kbd>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-yellow-400"><Crown className="w-4.5 h-4.5" /></button>
            <button className="text-zinc-400 hover:text-white relative"><Bell className="w-4.5 h-4.5" /><span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" /></button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"><span className="text-[7px] font-black text-black">L</span></div>
                <span className="text-xs font-bold text-yellow-400">12.5K</span>
              </div>
              <img src={user.avatar} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs"><div className="font-bold">{user.username} <BadgeCheck className="w-3 h-3 text-blue-400 inline" /></div><div className="text-[10px] text-green-400">● En línea</div></div>
            </div>
            <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold hover:scale-105 transition-transform">Transmitir en vivo</button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex gap-6 p-6">
          {/* Center Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Hero Battle Section */}
            <div className="relative rounded-2xl overflow-hidden min-h-[320px] border border-white/5 group">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1400" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-black/60 to-pink-900/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-pink-600/80 text-[10px] font-bold rounded-full backdrop-blur-md">🔥 Tendencia #1 en LiveX</span>
                <span className="px-2 py-0.5 bg-red-600 text-[10px] font-black rounded flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Live</span>
                <span className="px-2 py-0.5 bg-black/40 text-[10px] font-bold rounded backdrop-blur-md">⏱ 00:34:21</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div className="max-w-md">
                  <h2 className="text-3xl font-black mb-2 leading-tight">La batalla más épica <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">del momento</span></h2>
                  <p className="text-sm text-zinc-300 mb-4">AndrésGG vs DiegoStream en una batalla legendaria por el primer lugar del ranking.</p>
                  <div className="flex gap-3">
                    <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/20">Ver batalla en vivo</button>
                    <button className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">Más información</button>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex -space-x-2">
                      {['AndrésGG','DiegoStream','CamiLove'].map(n => <img key={n} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`} className="w-6 h-6 rounded-full border-2 border-[#05050a] bg-zinc-800" />)}
                    </div>
                    <span className="text-xs text-zinc-400"><Eye className="w-3 h-3 inline mr-1" />2,345 espectadores</span>
                  </div>
                </div>
                <div className="text-8xl font-black italic text-white/10 select-none">VS</div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 flex gap-3 overflow-x-auto custom-scrollbar pb-2">
                {categories.map(cat => {
                  const IconComponent = cat.icon;
                  const isActive = activeCat === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCat(cat.name)}
                      className={`flex items-center gap-3.5 px-4.5 py-2.5 rounded-2xl text-left transition-all border shrink-0 ${
                        isActive
                          ? 'bg-[#18112d] text-purple-200 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
                          : 'bg-[#0f0f15] text-zinc-400 border-white/5 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-zinc-400'}`} />
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[13px] font-bold text-white">{cat.name}</span>
                        <span className="text-[10px] text-zinc-500 font-medium">👁 {cat.viewers}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 shrink-0 shadow-lg cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* En vivo ahora */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black flex items-center gap-2">En vivo ahora <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /></h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {activeStreams.map((s: any, i: number) => (
                  <Link href={`/live/${s.name}`} key={i} className={`group cursor-pointer block ${s.isOwn ? 'border-2 border-purple-500 rounded-2xl p-2 bg-[#1c0933]/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : ''}`}>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-2 border border-white/5 group-hover:border-purple-500/30 transition-all">
                      <img src={s.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="px-1.5 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase flex items-center gap-1"><span className="w-1 h-1 bg-white rounded-full animate-pulse" />EN VIVO</span>
                        <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md text-[8px] font-black rounded flex items-center gap-1 border border-white/10"><Eye className="w-2.5 h-2.5" /> {s.viewers}</span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                        <img src={s.isOwn && user?.avatar ? user.avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} className="w-7 h-7 rounded-full border border-white/20 bg-zinc-800" alt="" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold truncate flex items-center gap-1">{s.name} <BadgeCheck className="w-2.5 h-2.5 text-blue-400 shrink-0" /></h4>
                          <p className="text-[9px] text-zinc-400 truncate">{s.title}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 truncate px-1">{s.cat}</p>
                    <div className="flex gap-1 px-1 mt-1">{s.tags.map((t: string) => <span key={t} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-zinc-400 border border-white/5">{t}</span>)}</div>
                  </Link>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2">
              Cargar más transmisiones <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="w-[280px] flex flex-col gap-5 shrink-0">
            {/* Top Streamers */}
            <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-sm">Top streamers</h3><button className="text-[10px] text-purple-400 font-bold">Ver todos</button></div>
              {topStreamers.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black w-4 text-center ${i===0?'text-yellow-400':i===1?'text-gray-300':i===2?'text-amber-600':'text-zinc-600'}`}>{i+1}</span>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} className="w-7 h-7 rounded-full bg-zinc-800" />
                    <span className="text-xs font-bold flex items-center gap-1">{s.name} {s.verified && <BadgeCheck className="w-3 h-3 text-blue-400" />}</span>
                  </div>
                  <span className="text-[10px] font-bold text-pink-400">👁 {s.coins}</span>
                </div>
              ))}
            </div>

            {/* Trending Streams */}
            <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-sm">Streams tendencias</h3><button className="text-[10px] text-purple-400 font-bold">Ver todos</button></div>
              {trendingStreams.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <img src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=80&u=${i}`} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold truncate">{s.title}</h4>
                    <p className="text-[9px] text-zinc-500">{s.cat} · 👁 {s.viewers}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Donors */}
            <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-sm">Top donadores</h3><button className="text-[10px] text-purple-400 font-bold">Ver todos</button></div>
              {topDonors.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black w-4 text-center ${i===0?'text-yellow-400':i===1?'text-gray-300':i===2?'text-amber-600':'text-zinc-600'}`}>{i+1}</span>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${d.name}`} className="w-7 h-7 rounded-full bg-zinc-800" />
                    <span className="text-xs font-bold flex items-center gap-1">{d.name} {d.verified && <BadgeCheck className="w-3 h-3 text-blue-400" />}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center"><span className="text-[6px] text-black font-black">L</span></div>
                    <span className="text-[10px] font-bold text-yellow-400">{d.coins}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-2xl p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 blur-3xl rounded-full" />
              <h4 className="text-sm font-black mb-1 relative z-10">¡Crea tu comunidad!</h4>
              <p className="text-[10px] text-zinc-400 mb-3 relative z-10">Transmite en vivo y conecta con millones de personas.</p>
              <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xs font-bold hover:scale-[1.02] transition-transform relative z-10">Transmitir ahora</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
