'use client';

import React from 'react';
import Link from 'next/link';
import { Video, BarChart2, DollarSign, Settings, LogOut, LayoutDashboard, Radio, Bell, Search, Plus, Home, User, Play } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';

export default function StreamerLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    await logoutUser();
  };

  const streamerMenu = [
    { icon: LayoutDashboard, label: 'Overview', href: '/streamer' },
    { icon: Radio, label: 'Go Live', href: '/streamer/live' },
    { icon: BarChart2, label: 'Analytics', href: '/streamer/analytics' },
    { icon: DollarSign, label: 'Earnings', href: '/streamer/earnings' },
  ];

  return (
    <div className="flex h-screen bg-[#05050a] overflow-hidden text-zinc-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-white/5 flex-col p-8 bg-[#0a0a14]/50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <Video className="text-white fill-white w-6 h-6" />
          </div>
          <span className="font-black text-2xl tracking-tighter">LiveX <span className="text-red-500 text-[10px] block">STUDIO</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {streamerMenu.map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-all text-zinc-400 hover:text-white group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
          
          <div className="pt-8 border-t border-white/5 mt-8 space-y-2">
            <Link 
              href="/dashboard"
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-all text-zinc-400 hover:text-white group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Viewer Mode</span>
            </Link>
            <Link 
              href="/streamer/settings"
              className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-all text-zinc-400 hover:text-white group"
            >
              <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Studio Settings</span>
            </Link>
          </div>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-red-500/10 text-red-400 transition-all mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-12 bg-[#05050a]/50 backdrop-blur-md">
          <div className="flex items-center gap-4 lg:hidden">
             <Video className="w-6 h-6 text-red-500" />
             <span className="font-black text-xl tracking-tighter">LiveX</span>
          </div>

          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-red-500/20">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Offline
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black rounded-xl text-sm shadow-lg shadow-red-500/20 hover:scale-105 transition-transform">
               <Radio className="w-4 h-4" /> Go Live
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-white/5 p-0.5">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'Streamer'}`} 
                 className="w-full h-full rounded-[14px] bg-zinc-900" 
                 alt="Profile"
               />
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 lg:pb-12">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a14]/90 backdrop-blur-2xl border-t border-white/5 px-8 py-4 flex items-center justify-between">
           <button className="flex flex-col items-center gap-1 text-red-500">
             <LayoutDashboard className="w-6 h-6" />
             <span className="text-[10px] font-black">Studio</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-zinc-500">
             <Radio className="w-6 h-6" />
             <span className="text-[10px] font-black">Go Live</span>
           </button>
           <div className="w-14 h-14 -mt-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 border-4 border-[#05050a]">
              <Plus className="w-8 h-8 text-white" />
           </div>
           <button className="flex flex-col items-center gap-1 text-zinc-500">
             <BarChart2 className="w-6 h-6" />
             <span className="text-[10px] font-black">Stats</span>
           </button>
           <button className="flex flex-col items-center gap-1 text-zinc-500">
             <User className="w-6 h-6" />
             <span className="text-[10px] font-black">Profile</span>
           </button>
        </div>
      </main>
    </div>
  );
}
