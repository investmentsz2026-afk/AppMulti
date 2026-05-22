'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Play, Search, Bell, Menu, Users, Trophy, 
  Gamepad2, Compass, Star, ChevronRight, 
  Heart, Share2, Plus, Home, User, Radio, Coins
} from 'lucide-react';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#05050a]/90 backdrop-blur-xl border-b border-white/5 h-16 md:h-20 flex items-center justify-between px-4 md:px-12">
    <div className="flex items-center gap-3 md:gap-10">
      <button className="md:hidden text-zinc-400 hover:text-white">
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Play className="text-white fill-white w-3 h-3 md:w-6 md:h-6" />
        </div>
        <span className="text-xl md:text-2xl font-black tracking-tighter text-white">LiveX</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-zinc-400">
        <Link href="/" className="text-white border-b-2 border-pink-500 pb-1">Inicio</Link>
        <Link href="/live" className="hover:text-white transition-colors">En vivo</Link>
        <Link href="/battles" className="hover:text-white transition-colors">Batallas</Link>
        <Link href="/streamers" className="hover:text-white transition-colors">Streamers</Link>
        <Link href="/explore" className="hover:text-white transition-colors">Explorar</Link>
        <Link href="/tournaments" className="hover:text-white transition-colors">Torneos</Link>
        <Link href="/ranking" className="hover:text-white transition-colors">Ranking</Link>
      </div>
    </div>

    <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
      {/* Mobile Right Icons */}
      <div className="flex md:hidden items-center gap-3">
        <Search className="w-5 h-5 text-zinc-300" />
        <div className="relative">
          <Bell className="w-5 h-5 text-zinc-300" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center">3</span>
        </div>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center relative w-full max-w-xs">
        <Search className="absolute left-4 w-4 h-4 text-zinc-500" />
        <input 
          type="text" 
          placeholder="Buscar streamers..." 
          className="w-full bg-zinc-900/50 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>
      
      <div className="hidden md:flex items-center gap-2 md:gap-3">
        <Link href="/login" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors px-4">
          Iniciar sesión
        </Link>
        <Link href="/register" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/20 whitespace-nowrap">
          Registrarse
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-20 md:pt-32 pb-4 md:pb-12 px-4 md:px-12 max-w-[1600px] mx-auto flex flex-col justify-center">
    
    <div className="flex flex-row items-center w-full mb-6 md:mb-12">
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[50%] pr-2 sm:pr-6 md:pr-12 relative z-10"
      >
        <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[6px] sm:text-[8px] md:text-[10px] font-black tracking-widest text-pink-500 uppercase mb-2 md:mb-6">
          PLATAFORMA #1 DE STREAMING
        </span>
        <h1 className="text-[26px] sm:text-[36px] md:text-6xl lg:text-[80px] leading-[1.05] font-black tracking-tight mb-2 md:mb-6 text-white">
          Donde nacen <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">las estrellas</span>
        </h1>
        <p className="text-[9px] sm:text-xs md:text-lg text-zinc-300 mb-4 md:mb-8 leading-relaxed max-w-[95%]">
          Transmite, compite y gana. <br className="hidden sm:block" /> Únete a millones de creadores y espectadores en vivo.
        </p>
        
        <div className="flex flex-col gap-2 md:gap-4 max-w-[140px] sm:max-w-[180px] md:max-w-[280px]">
          <Link href="/register" className="px-4 py-2 md:px-10 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] sm:text-xs md:text-lg font-black rounded-lg md:rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-pink-500/20 flex items-center justify-center gap-1.5 text-center">
            Comenzar ahora ⚡
          </Link>
          <Link href="/login" className="px-4 py-2 md:px-10 md:py-4 bg-[#05050a] border border-white/10 text-white text-[9px] sm:text-xs md:text-lg font-black rounded-lg md:rounded-2xl hover:bg-zinc-900 transition-colors flex items-center justify-center">
            Iniciar sesión
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-[50%] h-[240px] sm:h-[360px] md:h-[500px] lg:h-[650px] relative rounded-[16px] md:rounded-[40px] overflow-hidden group shadow-2xl shadow-purple-500/10"
      >
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
          alt="Featured Stream"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-40" />
      </motion.div>

    </div>

    {/* Stats Box */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#05050a]/80 border border-white/5 rounded-xl md:rounded-[32px] p-3 sm:p-4 md:p-8 backdrop-blur-xl w-full"
    >
      <div className="flex items-center justify-between w-full">
        {[
          { label: 'Usuarios activos', val: '2.5M+', icon: Users, color: 'text-purple-500' },
          { label: 'En vivo ahora', val: '15K+', icon: Radio, color: 'text-purple-400' },
          { label: 'Batallas hoy', val: '500K+', icon: Trophy, color: 'text-purple-500' },
          { label: 'Premios entregados', val: '$2.5M+', icon: Coins, color: 'text-purple-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex items-center gap-1 md:gap-3">
               <Icon className={`w-3.5 h-3.5 md:w-8 md:h-8 ${stat.color} shrink-0`} />
               <div className="text-left flex flex-col">
                 <span className="text-[10px] sm:text-xs md:text-[28px] font-black text-white leading-none mb-0.5 md:mb-1">{stat.val}</span>
                 <span className="text-[4px] sm:text-[6px] md:text-[10px] uppercase font-bold text-zinc-500 tracking-wider leading-none">{stat.label}</span>
               </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  </section>
);

const StreamCard = ({ name, title, viewers, category, avatar }: any) => (
  <div className="group cursor-pointer w-[22vw] sm:w-[30%] md:w-[22%] lg:w-[18%] shrink-0 snap-start">
    <div className="relative aspect-[2/3] md:aspect-video rounded-[16px] md:rounded-[24px] overflow-hidden border border-white/5 shadow-lg mb-2 md:mb-4">
      <img 
        src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&u=${name}`} 
        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
        alt={title}
      />
      <div className="absolute top-1.5 left-1.5 md:top-4 md:left-4 flex gap-1 md:gap-2">
         <div className="px-1 py-0.5 md:px-2 md:py-0.5 bg-red-600 text-[5px] md:text-[8px] font-black rounded uppercase">EN VIVO</div>
         <div className="px-1 py-0.5 md:px-2 md:py-0.5 bg-black/50 backdrop-blur-md text-[5px] md:text-[8px] font-black rounded flex items-center gap-0.5 md:gap-1">
           <Users className="w-1.5 h-1.5 md:w-2.5 md:h-2.5" /> {viewers}
         </div>
      </div>
    </div>
    <div className="flex items-center gap-1.5 md:gap-3">
      <img src={avatar} className="w-5 h-5 md:w-10 md:h-10 rounded-lg md:rounded-2xl bg-zinc-800" alt={name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-0.5 md:gap-1.5">
          <h4 className="text-[8px] md:text-sm font-black text-white truncate">{name}</h4>
          <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-blue-500 rounded-full hidden md:flex items-center justify-center shrink-0">
             <ChevronRight className="w-1 md:w-2 md:h-2 text-white" />
          </div>
        </div>
        <p className="text-[6px] md:text-[11px] text-zinc-500 font-bold truncate mt-0.5">{title}</p>
      </div>
    </div>
  </div>
);

const LiveNow = () => (
  <section className="pt-6 pb-2 md:py-16 px-0 md:px-12 max-w-[1600px] mx-auto">
    <div className="flex items-center justify-between mb-4 md:mb-10 px-6 md:px-0">
      <div className="flex items-center gap-2 md:gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">En vivo ahora</h2>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 rounded-full animate-pulse" />
      </div>
      <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest whitespace-nowrap">
        Ver todas <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    
    <div className="flex overflow-x-auto gap-4 md:gap-6 px-6 md:px-0 pb-6 snap-x snap-mandatory custom-scrollbar">
      <StreamCard 
        name="AndrésGG" viewers="1,234" title="Rankeds de noche 🌙" 
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
      />
      <StreamCard 
        name="SofiLive" viewers="987" title="Charlando con ustedes 💜" 
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=2"
      />
      <StreamCard 
        name="DiegoStream" viewers="2,105" title="Batalla épica 🔥" 
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=3"
      />
      <StreamCard 
        name="CamiLove" viewers="756" title="Just Chatting ✨" 
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=4"
      />
      <StreamCard 
        name="MartinCV" viewers="654" title="Juegos nuevos 🚀" 
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=5"
      />
    </div>
  </section>
);

const BattleCard = ({ team1, team2, pts1, pts2 }: any) => (
  <div className="relative aspect-[4/3] sm:aspect-[16/7] w-[42vw] sm:w-[45%] lg:w-[30%] shrink-0 snap-start rounded-[16px] md:rounded-[32px] overflow-hidden border border-white/5 group cursor-pointer">
     <img 
      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
      className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
      alt="Battle"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-transparent to-blue-900/60" />
    <div className="absolute inset-0 flex items-center justify-around p-1 md:p-6">
       <div className="text-center w-[35%]">
          <div className="text-[8px] md:text-sm font-black text-white mb-0.5 uppercase tracking-tighter truncate">{team1}</div>
          <div className="inline-block px-1 py-0.5 md:px-2 md:py-0.5 bg-red-600 text-[5px] md:text-[8px] font-black rounded uppercase">EN VIVO</div>
       </div>
       <div className="text-sm md:text-3xl font-black italic text-white/40">VS</div>
       <div className="text-center w-[35%]">
          <div className="text-[8px] md:text-sm font-black text-white mb-0.5 uppercase tracking-tighter truncate">{team2}</div>
          <div className="text-[5px] md:text-[8px] font-black text-zinc-400">Batalla épica 💎</div>
       </div>
    </div>
    <div className="absolute bottom-1 md:bottom-4 left-0 right-0 flex justify-center">
       <div className="px-1.5 py-0.5 md:px-3 md:py-1 bg-black/60 backdrop-blur-md rounded-full flex items-center gap-0.5 md:gap-1.5 border border-white/10">
         <Users className="w-2 h-2 md:w-3 md:h-3 text-zinc-400" />
         <span className="text-[6px] md:text-[10px] font-black text-white">3,456</span>
       </div>
    </div>
  </div>
);

const Battles = () => (
  <section className="pt-2 pb-6 md:py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
    <div className="flex items-center justify-between mb-4 md:mb-10">
      <div className="flex items-center gap-2 md:gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">Batallas destacadas</h2>
        <div className="w-5 h-5 md:w-8 md:h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
           <Trophy className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
        </div>
      </div>
      <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest whitespace-nowrap">
        Ver todas <span className="hidden sm:inline">las batallas</span> <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    
    <div className="flex overflow-x-auto gap-3 md:gap-6 px-6 md:px-0 pb-6 snap-x snap-mandatory custom-scrollbar">
      <BattleCard team1="Team Alpha" team2="Team Omega" />
      <BattleCard team1="KingStars" team2="NightRaid" />
      <BattleCard team1="Los Leones" team2="Tigres FC" />
      <BattleCard team1="Ninja Clan" team2="Samurai" />
      <BattleCard team1="Dragones" team2="Fenix" />
    </div>
  </section>
);

const MobileNav = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-2xl border-t border-white/5 px-6 py-4 flex items-center justify-between">
    <button className="flex flex-col items-center gap-1 text-purple-500">
      <Home className="w-6 h-6" />
      <span className="text-[10px] font-bold">Inicio</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-zinc-500">
      <Play className="w-6 h-6" />
      <span className="text-[10px] font-bold">En vivo</span>
    </button>
    <div className="w-14 h-14 -mt-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#0a0a0f]">
       <Plus className="w-8 h-8 text-white" />
    </div>
    <button className="flex flex-col items-center gap-1 text-zinc-500">
      <Trophy className="w-6 h-6" />
      <span className="text-[10px] font-bold">Torneos</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-zinc-500">
      <User className="w-6 h-6" />
      <span className="text-[10px] font-bold">Perfil</span>
    </button>
  </div>
);

export default function LandingClient() {
  return (
    <main className="min-h-screen bg-background selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <div className="pb-32">
        <Hero />
        <LiveNow />
        <Battles />
      </div>
      <MobileNav />
    </main>
  );
}
