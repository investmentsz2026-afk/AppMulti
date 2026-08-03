'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, Bell, User, Wallet,
  Plus, Search, Crown, LogOut, ChevronRight, BadgeCheck, Heart, MessageCircle, 
  UserPlus, Share2, Check, CheckSquare, ArrowLeft, MoreHorizontal, Inbox
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import { useLiveStore } from '@/store/useLiveStore';
import { 
  getNotifications, 
  markNotificationRead, 
  markAllNotificationsRead 
} from '@/app/actions/social';
import { toast } from 'react-hot-toast';

interface NotificationItem {
  id: string;
  userId: string;
  type: 'NEW_FOLLOWER' | 'STREAM_STARTED' | 'GIFT_RECEIVED' | 'BATTLE_INVITE' | 'SYSTEM';
  content: string;
  isRead: boolean;
  link: string | null;
  createdAt: Date;
}

export default function NotificacionesClient({ user }: { user: any }) {
  const router = useRouter();
  const { isLive } = useLiveStore();
  
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'LIKES' | 'COMMENTS' | 'FOLLOWERS'>('ALL');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      // Map timestamps properly
      const mapped = (data || []).map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt)
      }));
      setNotifications(mapped);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      toast.error('No se pudieron cargar las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    const loadingToast = toast.loading('Marcando como leídas...');
    try {
      const res = await markAllNotificationsRead();
      if (res.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        toast.success('Todas las notificaciones marcadas como leídas');
      } else {
        toast.error('Error al actualizar notificaciones');
      }
    } catch (err) {
      toast.error('Error al procesar la solicitud');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleNotificationClick = async (n: NotificationItem) => {
    if (!n.isRead) {
      // Optimistic update
      setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, isRead: true } : item));
      await markNotificationRead(n.id);
    }
    if (n.link) {
      router.push(n.link);
    }
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'hace un momento';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} d`;
  };

  // Filter logic
  const filteredNotifications = notifications.filter(n => {
    const parts = n.content.split('|');
    const isRich = parts.length === 3;
    const actionText = (isRich ? (parts[2] || '') : n.content).toLowerCase();

    if (filter === 'FOLLOWERS') {
      return n.type === 'NEW_FOLLOWER' || actionText.includes('seguir') || actionText.includes('seguidor');
    }
    if (filter === 'LIKES') {
      return actionText.includes('gusta') || actionText.includes('like') || actionText.includes('reaccion');
    }
    if (filter === 'COMMENTS') {
      return actionText.includes('comento') || actionText.includes('comentó') || actionText.includes('escribio') || actionText.includes('comentario');
    }
    return true;
  });

  const getNotificationIcon = (content: string, type: string) => {
    const actionText = content.toLowerCase();
    if (type === 'NEW_FOLLOWER' || actionText.includes('seguir')) {
      return (
        <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <UserPlus className="w-4 h-4" />
        </div>
      );
    }
    if (actionText.includes('gusta') || actionText.includes('like')) {
      return (
        <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
          <Heart className="w-4 h-4 fill-pink-500/10" />
        </div>
      );
    }
    if (actionText.includes('comento') || actionText.includes('comentó')) {
      return (
        <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <MessageCircle className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
        <Bell className="w-4 h-4" />
      </div>
    );
  };

  const renderNotificationRow = (n: NotificationItem) => {
    const parts = n.content.split('|');
    const isRich = parts.length === 3;

    let senderUsername = '';
    let senderAvatar = '';
    let messageText = n.content;

    if (isRich) {
      senderUsername = parts[0] || '';
      senderAvatar = parts[1] || '';
      messageText = parts[2] || '';
    }

    return (
      <div 
        key={n.id}
        onClick={() => handleNotificationClick(n)}
        className={`flex items-start justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
          n.isRead 
            ? 'bg-[#0a0a0f]/40 border-white/5 hover:bg-white/5' 
            : 'bg-gradient-to-r from-purple-950/10 to-pink-950/10 border-purple-500/20 hover:border-purple-500/40 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Avatar / Icon */}
          <div className="relative shrink-0">
            {isRich ? (
              <img 
                src={senderAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${senderUsername}`}
                className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800"
                alt={senderUsername}
              />
            ) : (
              getNotificationIcon(n.content, n.type)
            )}
            {!n.isRead && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#05050a]" />
            )}
          </div>

          {/* Details */}
          <div className="text-xs min-w-0">
            <p className="text-zinc-200 leading-normal">
              {isRich ? (
                <>
                  <span className="font-black text-white mr-1 hover:underline">@{senderUsername}</span>
                  <span className="text-zinc-300">{messageText}</span>
                </>
              ) : (
                <span className="text-zinc-200 font-medium">{messageText}</span>
              )}
            </p>
            <span className="text-[10px] text-zinc-500 font-bold block mt-1">{timeAgo(n.createdAt)}</span>
          </div>
        </div>

        {/* Action Type Mini Indicator */}
        <div className="ml-4 shrink-0">
          {n.type === 'NEW_FOLLOWER' && <UserPlus className="w-3.5 h-3.5 text-blue-400/60" />}
          {n.content.includes('gusta') && <Heart className="w-3.5 h-3.5 text-pink-500/60" />}
          {n.content.includes('comento') && <MessageCircle className="w-3.5 h-3.5 text-purple-400/60" />}
          {n.type === 'BATTLE_INVITE' && <Sword className="w-3.5 h-3.5 text-rose-500/60" />}
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <div className="flex-1 flex flex-col h-full bg-[#05050a] min-w-0">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <Bell className="w-6 h-6 text-pink-500" /> Notificaciones
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold hidden sm:block mt-0.5">Mantente al tanto de la actividad de tus publicaciones y comunidad</p>
          </div>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold rounded-xl text-zinc-300 hover:text-white transition-all active:scale-[0.98]"
          >
            <CheckSquare className="w-3.5 h-3.5" /> Marcar todas leídas
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="px-4 sm:px-6 py-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 bg-[#08080f]/40">
        {[
          { id: 'ALL', label: 'Todas' },
          { id: 'LIKES', label: 'Me gusta' },
          { id: 'COMMENTS', label: 'Comentarios' },
          { id: 'FOLLOWERS', label: 'Seguidores' }
        ].map(pill => (
          <button
            key={pill.id}
            onClick={() => setFilter(pill.id as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
              filter === pill.id
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="font-black text-sm text-zinc-400">Sin notificaciones</h3>
            <p className="text-[11px] text-zinc-500 max-w-xs mt-1">Aquí verás los likes, comentarios y seguidores que reciba tu contenido.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-w-3xl">
            {filteredNotifications.map(renderNotificationRow)}
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white">
        {renderContent()}

        {/* Mobile Bottom Navigation Bar */}
        <div className="h-[70px] bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Inicio</span>
          </Link>
          <Link href="/dashboard?tab=parati" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Play className="w-6 h-6" />
            <span className="text-[10px] font-bold">Gaming</span>
          </Link>
          <button 
            onClick={() => useCreatorStore.getState().open()}
            className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a]"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href="/notificaciones" className="flex flex-col items-center gap-1 text-pink-500">
            <Bell className="w-6 h-6" />
            <span className="text-[10px] font-bold">Notis</span>
          </Link>
        </div>
      </div>
    );
  }

  // Desktop layout with Sidebar
  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
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
          </Link>
          <Link href="/notificaciones" className="flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <div className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notificaciones</div>
          </Link>
          <Link href={`/u/${user?.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
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

        <div className="mt-auto flex items-center gap-2 px-2 py-3 border-t border-white/5">
          <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user?.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button 
            onClick={() => {
              logoutUser();
              router.push('/login');
            }} 
            className="text-zinc-600 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      {renderContent()}

    </div>
  );
}
