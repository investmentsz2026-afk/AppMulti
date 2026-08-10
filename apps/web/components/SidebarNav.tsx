'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Bell, User, Wallet } from 'lucide-react';
import { useBadgeCounts } from '@/hooks/useBadgeCounts';

export default function SidebarNav({ username }: { username: string }) {
  const pathname = usePathname();
  const { unreadNotifications, unreadMessages } = useBadgeCounts();

  const isMessagesActive = pathname === '/mensajes';
  const isNotificationsActive = pathname === '/notificaciones';
  const isProfileActive = pathname === `/u/${username}`;
  const isWalletActive = pathname === '/wallet';

  return (
    <nav className="flex flex-col gap-1 mb-8">
      <Link 
        href="/mensajes" 
        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium ${
          isMessagesActive 
            ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <MessageSquare className={`w-5 h-5 ${isMessagesActive ? 'text-pink-400' : ''}`} /> 
          <span>Mensajes</span>
        </div>
        {unreadMessages > 0 && (
          <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadMessages}</span>
        )}
      </Link>

      <Link 
        href="/notificaciones" 
        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors font-medium ${
          isNotificationsActive 
            ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Bell className={`w-5 h-5 ${isNotificationsActive ? 'text-pink-400' : ''}`} /> 
          <span>Notificaciones</span>
        </div>
        {unreadNotifications > 0 && (
          <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadNotifications}</span>
        )}
      </Link>

      <Link 
        href={`/u/${username}`} 
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium ${
          isProfileActive 
            ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <User className={`w-5 h-5 ${isProfileActive ? 'text-pink-400' : ''}`} /> 
        <span>Perfil</span>
      </Link>

      <Link 
        href="/wallet" 
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium ${
          isWalletActive 
            ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Wallet className={`w-5 h-5 ${isWalletActive ? 'text-pink-400' : ''}`} /> 
        <span>Wallet</span>
      </Link>
    </nav>
  );
}
