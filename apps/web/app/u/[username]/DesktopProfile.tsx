'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home, Play, Compass, Sword, Trophy, MessageSquare, Bell, User, Wallet,
  Plus, Search, Crown, LogOut, ChevronRight, BadgeCheck, Eye, Gift, Film,
  Share2, Heart, Edit3, Grid, List, Shield, Check, MessageCircle, AlertCircle, Trash2,
  Settings, Smartphone, Sparkles, X, QrCode, Lock, Image as ImageIcon, Smile
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import { updateProfile } from '@/app/actions/profile';
import { toggleFollowUser, getProfileStats, getTabPosts, checkFollowStatus, toggleLikePost, getPostComments, createComment, toggleLikeComment, deleteComment } from '@/app/actions/social';
import { useRouter } from 'next/navigation';

// TikTok Custom SVG Icon
function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2.02 3.73 2.37v3.91c-1.39-.02-2.77-.4-3.99-1.12-.62-.37-1.18-.84-1.66-1.38v5.82c.04 1.52-.32 3.03-1.04 4.35-.72 1.33-1.8 2.42-3.1 3.15-1.31.74-2.81 1.13-4.33 1.11-1.52-.01-3.02-.43-4.32-1.2-1.28-.76-2.31-1.88-2.98-3.21C-.3 16.71-.46 15.19-.2 13.68c.26-1.5.94-2.91 1.96-4.04 1.02-1.14 2.37-1.92 3.86-2.26v4.06c-.84.23-1.6.72-2.18 1.4-.58.68-.9 1.55-.92 2.45-.02.91.24 1.8.76 2.53.51.74 1.26 1.28 2.11 1.53.86.25 1.77.19 2.59-.16.82-.35 1.5-1.0 1.94-1.81.44-.82.61-1.75.5-2.68v-14.8c.01-.02.01-.03.01-.05z" />
    </svg>
  );
}

// Instagram Custom SVG Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="24" height="24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// YouTube Custom SVG Icon
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Facebook Custom SVG Icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  );
}

export default function DesktopProfile({ sessionUser, targetUser, isOwnProfile }: { sessionUser: any, targetUser: any, isOwnProfile: boolean }) {
  const [activeTab, setActiveTab] = useState('Videos');
  const [activeFilter, setActiveFilter] = useState('Más recientes');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  const router = useRouter();
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);


  const handleLikePostInModal = async (postId: string) => {
    if (!sessionUser) {
      router.push('/login');
      return;
    }
    setTabPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newLiked = !p.isLiked;
        return {
          ...p,
          isLiked: newLiked,
          likesCount: newLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
    try {
      const res = await toggleLikePost(postId);
      if (res.error) {
        setTabPosts(prev => prev.map(p => {
          if (p.id === postId) {
            const newLiked = !p.isLiked;
            return {
              ...p,
              isLiked: newLiked,
              likesCount: newLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
            };
          }
          return p;
        }));
      } else if (res.success) {
        setTabPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              isLiked: res.liked,
              likesCount: res.count
            };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Error liking post in modal:', err);
    }
  };

  // Real stats & follow states
  const [stats, setStats] = useState({ followers: 0, following: 0, likes: 0 });
  const [isFollowingTargetUser, setIsFollowingTargetUser] = useState(false);

  // Real tab posts states
  const [tabPosts, setTabPosts] = useState<any[]>([]);
  const [tabLoading, setTabLoading] = useState(true);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Fetch comments when modal is open and showComments is active
  useEffect(() => {
    if (activeMediaIndex === null || !showComments) return;
    const post = tabPosts[activeMediaIndex];
    if (!post) return;

    async function fetchComments() {
      setCommentsLoading(true);
      try {
        const data = await getPostComments(post.id);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [activeMediaIndex, showComments, tabPosts]);

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMediaIndex === null) return;
    const post = tabPosts[activeMediaIndex];
    if (!post || !newCommentText.trim()) return;

    try {
      const res = await createComment(post.id, newCommentText);
      if (res.error) {
        triggerToast(res.error);
      } else if (res.success && res.comment) {
        setComments(prev => [res.comment, ...prev]);
        setNewCommentText('');
        // Update commentsCount in the current post
        setTabPosts(prev => prev.map(p => {
          if (p.id === post.id) {
            return { ...p, commentsCount: (p.commentsCount || 0) + 1 };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  const handleToggleLikeComment = async (commentId: string) => {
    // Optimistic update
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        const newLiked = !c.isLiked;
        return {
          ...c,
          isLiked: newLiked,
          likesCount: newLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
        };
      }
      return c;
    }));

    try {
      const res = await toggleLikeComment(commentId);
      if (res.error) {
        // Rollback
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            const newLiked = !c.isLiked;
            return {
              ...c,
              isLiked: newLiked,
              likesCount: newLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
            };
          }
          return c;
        }));
        triggerToast(res.error);
      } else if (res.success) {
        // Settle with server value
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            return { ...c, isLiked: res.liked, likesCount: res.count };
          }
          return c;
        }));
      }
    } catch (err) {
      console.error('Error toggling comment like:', err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este comentario?')) return;
    try {
      const res = await deleteComment(commentId);
      if (res.error) {
        triggerToast(res.error);
      } else if (res.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        triggerToast('Comentario eliminado');
        if (activeMediaIndex !== null) {
          const post = tabPosts[activeMediaIndex];
          setTabPosts(prev => prev.map(p => {
            if (p.id === post.id) {
              return { ...p, commentsCount: Math.max(0, (p.commentsCount || 0) - 1) };
            }
            return p;
          }));
        }
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };


  // Load stats
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getProfileStats(targetUser.username);
        setStats(res);
      } catch (err) {
        console.error('Error loading stats:', err);
      }
    }
    loadStats();
  }, [targetUser.username]);

  // Load follow status
  useEffect(() => {
    async function loadFollowStatus() {
      if (isOwnProfile || !sessionUser) return;
      try {
        const res = await checkFollowStatus(targetUser.id);
        setIsFollowingTargetUser(res.following);
      } catch (err) {
        console.error('Error checking follow status:', err);
      }
    }
    loadFollowStatus();
  }, [targetUser.id, isOwnProfile, sessionUser]);

  // Load tab posts
  useEffect(() => {
    async function loadTabPosts() {
      setTabLoading(true);
      try {
        const posts = await getTabPosts(targetUser.username, activeTab, sessionUser?.id);
        setTabPosts(posts);
      } catch (err) {
        console.error('Error loading tab posts:', err);
      } finally {
        setTabLoading(false);
      }
    }
    loadTabPosts();
  }, [activeTab, targetUser.username, sessionUser?.id]);

  const handleProfileFollowToggle = async () => {
    if (!sessionUser) {
      router.push('/login');
      return;
    }
    const prevStatus = isFollowingTargetUser;
    setIsFollowingTargetUser(!prevStatus);
    setStats(prev => ({
      ...prev,
      followers: !prevStatus ? prev.followers + 1 : Math.max(0, prev.followers - 1)
    }));
    try {
      const res = await toggleFollowUser(targetUser.id);
      if (res.error) {
        setIsFollowingTargetUser(prevStatus);
        setStats(prev => ({
          ...prev,
          followers: prevStatus ? prev.followers + 1 : Math.max(0, prev.followers - 1)
        }));
        triggerToast(res.error);
      } else if (res.success) {
        setIsFollowingTargetUser(res.following ?? !prevStatus);
      }
    } catch (err) {
      setIsFollowingTargetUser(prevStatus);
      setStats(prev => ({
        ...prev,
        followers: prevStatus ? prev.followers + 1 : Math.max(0, prev.followers - 1)
      }));
    }
  };

  const formatStat = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  
  // Settings & Adjustment Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState('perfil'); // perfil | monedas | apk | cuenta | redes
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Recharge coins state
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Profile fields state
  const [profileName, setProfileName] = useState(targetUser.username || '');
  const [profileBio, setProfileBio] = useState(targetUser.bio || '');
  const [profileEmail, setProfileEmail] = useState(targetUser.email || '');

  // Social links state
  const [tiktokActive, setTiktokActive] = useState(targetUser.tiktokActive || false);
  const [tiktokUrl, setTiktokUrl] = useState(targetUser.tiktokUrl || '');
  const [instagramActive, setInstagramActive] = useState(targetUser.instagramActive || false);
  const [instagramUrl, setInstagramUrl] = useState(targetUser.instagramUrl || '');
  const [youtubeActive, setYoutubeActive] = useState(targetUser.youtubeActive || false);
  const [youtubeUrl, setYoutubeUrl] = useState(targetUser.youtubeUrl || '');
  const [facebookActive, setFacebookActive] = useState(targetUser.facebookActive || false);
  const [facebookUrl, setFacebookUrl] = useState(targetUser.facebookUrl || '');

  // Avatar and Cover live preview / state
  const [avatarUrl, setAvatarUrl] = useState(targetUser.avatar || '');
  const [coverUrl, setCoverUrl] = useState(targetUser.cover || '');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Guardando cambios... ⏳');
    try {
      const res = await updateProfile({
        username: profileName,
        bio: profileBio,
      });
      if (res.error) {
        triggerToast(`Error: ${res.error}`);
      } else {
        triggerToast('¡Perfil actualizado con éxito! ✨');
        if (profileName !== targetUser.username) {
          window.location.href = `/u/${profileName}`;
        } else {
          setTimeout(() => setIsSettingsOpen(false), 800);
        }
      }
    } catch (err) {
      triggerToast('Error al guardar el perfil.');
    }
  };

  const handleSaveSocialLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Guardando enlaces... ⏳');
    try {
      const res = await updateProfile({
        tiktokActive,
        tiktokUrl,
        instagramActive,
        instagramUrl,
        youtubeActive,
        youtubeUrl,
        facebookActive,
        facebookUrl,
      });
      if (res.error) {
        triggerToast(`Error: ${res.error}`);
      } else {
        triggerToast('¡Enlaces de redes sociales guardados con éxito! ✨');
        setTimeout(() => setIsSettingsOpen(false), 800);
      }
    } catch (err) {
      triggerToast('Error al guardar redes sociales.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      triggerToast('La imagen supera el límite de 5MB. Escoge una más pequeña.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      if (type === 'avatar') {
        setAvatarUrl(base64String);
      } else {
        setCoverUrl(base64String);
      }
      triggerToast('Subiendo imagen... ⏳');
      try {
        const res = await updateProfile({ [type]: base64String });
        if (res.error) {
          triggerToast(`Error al subir la imagen: ${res.error}`);
        } else {
          triggerToast('¡Imagen actualizada con éxito! ✨');
        }
      } catch (err) {
        console.error(err);
        triggerToast('Error de conexión al subir la imagen.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBuyCoins = (packName: string) => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      triggerToast(`¡Compra exitosa! Se añadieron las monedas de tu paquete ${packName} 🪙`);
      setSelectedPack(null);
    }, 1500);
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('¡Enlace de perfil copiado al portapapeles! 🔗');
  };

  const creator = {
    name: profileName,
    username: targetUser.username,
    verified: true,
    avatar: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${targetUser.username}`,
    banner: coverUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
    followers: '1.2M',
    following: '248',
    likes: '3.6M',
    bio: profileBio,
    businessEmail: profileEmail,
    level: 24,
    levelName: 'Stream Queen',
    xpProgress: 75,
  };

  const tabs = isOwnProfile 
    ? ['Videos', 'Shorts', 'Fotos', 'Streams', 'Guardados', 'Me gusta']
    : ['Videos', 'Shorts', 'Fotos', 'Streams', 'Me gusta'];
  const filters = ['Más recientes', 'Populares', 'Más antiguos'];

  const staticGridItems = [
    { id: 1, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400', views: '1.2M', title: 'Así fue mi primera vez en torneo internacional 🏆💜', pinned: true },
    { id: 2, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=1', views: '840K', title: 'Pov: Cuando ganas la partida épica 🔥😎', pinned: true },
    { id: 3, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400&u=2', views: '2.3M', title: 'Probando el nuevo set up ✨ ¿Qué les parece?', pinned: true },
    { id: 4, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=400&u=3', views: '1.1M', title: 'Noche de chill y charlas con ustedes 💜', pinned: true },
    { id: 5, img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=400', views: '560K', title: 'Explorando lugares increíbles en directo 🌲' },
    { id: 6, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&u=4', views: '950K', title: 'Ustedes hacen todo esto posible 💜' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white relative">
      {/* Left Sidebar (Perfectly matching other pages!) */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard?tab=inicio" className="flex items-center gap-3 mb-8 px-2">
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
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </Link>
          <Link href="/notificaciones" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notificaciones</div>
            <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
          </Link>
          <Link href={`/u/${sessionUser.username}`} className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <User className="w-5 h-5 text-pink-400" /> Perfil
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
           <button onClick={() => { setSettingsActiveTab('monedas'); setIsSettingsOpen(true); }} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
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
          <img src={sessionUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionUser.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{sessionUser.username} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0" /></div>
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
            <input type="text" placeholder="Buscar streamers, batallas, torneos..." className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-500/50 text-white placeholder:text-zinc-600" />
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
              <img src={sessionUser.avatar} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-1">{sessionUser.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● En línea</div>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/10">Transmitir en vivo</button>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          
          {/* Banner and Profile Header Section */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0c0c14] border border-white/5 mb-6">
            {/* Banner Cover */}
            <div className="h-[200px] relative w-full overflow-hidden">
              <img src={creator.banner} className="w-full h-full object-cover opacity-60" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-black/30" />
              {isOwnProfile ? (
                <>
                  <label className="absolute top-4 left-4 z-20 bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> Cambiar portada
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, 'cover')} 
                    />
                  </label>
                  <div className="absolute top-4 right-4 flex items-center gap-2.5 z-20">
                    {/* Button Group (Exactly as the third reference image!) */}
                    <button onClick={() => { setSettingsActiveTab('perfil'); setIsSettingsOpen(true); }} className="bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md">
                      <Edit3 className="w-3.5 h-3.5" /> Editar perfil
                    </button>
                    <button onClick={() => triggerToast('¡Función de promoción activada! 🚀')} className="bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md">
                      Promocionar publicación
                    </button>
                    <button onClick={() => { setSettingsActiveTab('cuenta'); setIsSettingsOpen(true); }} className="w-9 h-9 rounded-full bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button onClick={handleCopyProfileLink} className="w-9 h-9 rounded-full bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="absolute top-4 right-4 flex items-center gap-2.5 z-20">
                  <button 
                    onClick={handleProfileFollowToggle} 
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md ${
                      isFollowingTargetUser 
                        ? 'bg-zinc-800 hover:bg-zinc-700 border border-white/10' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 shadow-pink-500/20'
                    }`}
                  >
                    {isFollowingTargetUser ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" /> Siguiendo
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Seguir
                      </>
                    )}
                  </button>
                  <Link 
                    href={`/mensajes?to=${targetUser.username}`} 
                    className="bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 text-white cursor-pointer shadow-md hover:scale-105"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Mensaje
                  </Link>
                  <button onClick={handleCopyProfileLink} className="w-9 h-9 rounded-full bg-[#12152b]/90 hover:bg-[#1f2444] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Avatar & Profile Details Overlay */}
            <div className="px-8 pb-8 pt-4 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              {/* Profile Avatar, Identity, Stats */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20 md:-mt-16 relative z-10">
                {/* Large Avatar */}
                <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0 group/avatar">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0c0c14] relative">
                    <img src={creator.avatar} className="w-full h-full object-cover" alt="" />
                    {isOwnProfile && (
                      <label htmlFor="avatar-file-input" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer z-10">
                        <Edit3 className="w-6 h-6 text-white" />
                      </label>
                    )}
                  </div>
                  {isOwnProfile && (
                    <input 
                      id="avatar-file-input" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(e, 'avatar')} 
                    />
                  )}
                  {/* Status dot */}
                  <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#0c0c14]" />
                </div>

                {/* Profile Identity Details */}
                <div className="text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-2.5 mb-1.5">
                    <h1 className="text-2xl font-black flex items-center gap-1.5 text-white">
                      {creator.name} 
                      <BadgeCheck className="w-6 h-6 text-blue-400 fill-transparent shrink-0" />
                      <div className="w-5 h-5 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center border border-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.3)] shrink-0">
                        <Trophy className="w-3 h-3 text-black fill-black" />
                      </div>
                    </h1>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2.5 text-xs text-zinc-400 mb-3.5">
                    <span className="font-semibold text-zinc-300">@{creator.username}</span>
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-[10px] font-bold rounded-full">Creadora</span>
                    <span className="text-green-400 font-semibold">En línea</span>
                  </div>

                  {/* Followers Stats */}
                  <div className="flex justify-center md:justify-start items-center gap-6">
                    <div>
                      <span className="font-black text-lg text-white block leading-none">{formatStat(stats.followers)}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Seguidores</span>
                    </div>
                    <div className="border-l border-white/5 h-8" />
                    <div>
                      <span className="font-black text-lg text-white block leading-none">{formatStat(stats.following)}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Siguiendo</span>
                    </div>
                    <div className="border-l border-white/5 h-8" />
                    <div>
                      <span className="font-black text-lg text-white block leading-none">{formatStat(stats.likes)}</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Me gusta</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* XP Level System MMORPG Card */}
              <div className="bg-[#171333]/80 border border-purple-500/30 rounded-2xl p-4 w-full md:w-[260px] backdrop-blur-md shadow-[0_0_20px_rgba(147,51,234,0.1)] shrink-0">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white leading-tight">Nivel {creator.level}</h3>
                    <p className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">{creator.levelName}</p>
                  </div>
                </div>
                {/* XP Progress Bar */}
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold mb-1.5">
                  <span>{creator.xpProgress}% para nivel {creator.level + 1}</span>
                  <span className="text-purple-400">{creator.xpProgress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-pink-500 rounded-full" style={{ width: `${creator.xpProgress}%` }} />
                </div>
              </div>

            </div>

            {/* Biography & Social Media */}
            <div className="px-8 pb-6 border-t border-white/5 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-xl text-center md:text-left">
                <p className="text-xs leading-relaxed text-zinc-300 mb-1.5">{creator.bio}</p>
                <div className="text-[11px] text-zinc-500 font-medium">Business: <span className="text-purple-400">{creator.businessEmail}</span></div>
              </div>
              
              {/* Linked Accounts & Icons Section */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* 4th Reference Image Capsule Pill (Linked Devices/Acounts) */}
                <div className="bg-[#12152b] border border-white/5 rounded-full px-3 py-1.5 flex items-center gap-2.5 shadow-lg">
                  <TiktokIcon className="w-4 h-4 text-white" />
                  <Smartphone className="w-4 h-4 text-zinc-400" />
                  <div className="w-px h-4 bg-white/10" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center text-[10px] font-black text-black border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)] relative">
                    <span>J</span>
                    <span className="absolute -top-1 -right-1">👑</span>
                  </div>
                </div>

                {/* Social networks icons */}
                <div className="flex items-center gap-2.5">
                  {tiktokActive && tiktokUrl && (
                    <a 
                      href={tiktokUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer"
                      title="TikTok"
                    >
                      <TiktokIcon className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {instagramActive && instagramUrl && (
                    <a 
                      href={instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {youtubeActive && youtubeUrl && (
                    <a 
                      href={youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer"
                      title="YouTube"
                    >
                      <YoutubeIcon className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {facebookActive && facebookUrl && (
                    <a 
                      href={facebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer"
                      title="Facebook"
                    >
                      <FacebookIcon className="w-4.5 h-4.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-white/5 mb-6 flex items-center justify-between">
            <div className="flex gap-8">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[15px] font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filters and Layout Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${activeFilter === filter ? 'bg-[#1f173d] text-purple-300 border-purple-500/30' : 'bg-white/5 text-zinc-400 border-transparent hover:bg-white/10'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/5">
              <button onClick={() => setViewType('grid')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewType === 'grid' ? 'bg-[#18112d] text-purple-400 border border-purple-500/30' : 'text-zinc-500 hover:text-white'}`}>
                <Grid className="w-4.5 h-4.5" />
              </button>
              <button onClick={() => setViewType('list')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewType === 'list' ? 'bg-[#18112d] text-purple-400 border border-purple-500/30' : 'text-zinc-500 hover:text-white'}`}>
                <List className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Media Grid Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {tabLoading ? (
              // Beautiful neon skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-3">
                  <div className="aspect-[3/4] bg-white/5 rounded-2xl border border-white/5 shadow-md" />
                  <div className="h-4 bg-white/10 rounded w-3/4 mx-1" />
                </div>
              ))
            ) : tabPosts.length > 0 ? (
              tabPosts.map((post: any, index: number) => (
                <div key={post.id} className="group cursor-pointer block" onClick={() => setActiveMediaIndex(index)}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-purple-500/30 transition-all shadow-md">
                    {post.isStream ? (
                      <>
                        <img src={post.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 bg-red-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                            ● DIRECTO
                          </span>
                        </div>
                      </>
                    ) : post.type === 'VIDEO' ? (
                      <video src={post.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted playsInline />
                    ) : (
                      <img src={post.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Stats overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-[10px] font-bold text-white z-10 pointer-events-none">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 shrink-0" />
                        <span>{formatStat(post.likesCount || 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 fill-purple-500 text-purple-500 shrink-0" />
                        <span>{formatStat(post.commentsCount || 0)}</span>
                      </div>
                    </div>

                    {/* Private badge */}
                    {post.isPrivate && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-pink-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                          <Lock className="w-3 h-3" /> Privado
                        </span>
                      </div>
                    )}

                    {/* Type badge (if not stream) */}
                    {!post.isStream && (
                      <div className="absolute top-3 right-3">
                        {post.type === 'VIDEO' ? (
                          <span className="px-2 py-0.5 bg-purple-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                            <Film className="w-3 h-3" /> Video
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-blue-600/80 backdrop-blur-sm text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-md">
                            <ImageIcon className="w-3 h-3" /> Foto
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <h4 className="text-[13px] font-bold text-zinc-100 group-hover:text-purple-400 line-clamp-2 transition-colors px-1 leading-snug">{post.title}</h4>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-dashed border-white/5 rounded-3xl bg-[#0a0a0f]/50">
                <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto mb-2.5" />
                <p className="text-sm font-bold text-zinc-400">No hay contenido en esta pestaña</p>
                <p className="text-xs text-zinc-600 mt-1">El creador no ha subido publicaciones de este tipo todavía.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center items-center py-6">
            <button className="px-8 py-3 bg-[#0a0a0f] hover:bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 tracking-wider">
              Cargar más
            </button>
          </div>

        </div>
      </main>

      {/* Adjustments & Settings Modal (PC View) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300">
          <div className="bg-[#0b0b12] border border-purple-500/20 w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.25)] flex h-[500px]">
            
            {/* Modal Sidebar */}
            <div className="w-[200px] bg-[#07070b] p-6 border-r border-white/5 flex flex-col justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Ajustes</span>
                <button onClick={() => setSettingsActiveTab('perfil')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'perfil' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Editar Perfil
                </button>
                <button onClick={() => setSettingsActiveTab('redes')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'redes' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Redes Sociales
                </button>
                <button onClick={() => setSettingsActiveTab('monedas')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'monedas' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Recargar Monedas
                </button>
                <button onClick={() => setSettingsActiveTab('apk')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'apk' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Obtener APK Móvil
                </button>
                <button onClick={() => setSettingsActiveTab('cuenta')} className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition-colors ${settingsActiveTab === 'cuenta' ? 'bg-[#18112d] text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}>
                  Privacidad & Cuenta
                </button>
              </div>

              <button onClick={() => logoutUser()} className="w-full py-2.5 bg-red-950/20 hover:bg-red-900/40 border border-red-500/20 rounded-xl text-xs font-bold text-red-400 flex items-center justify-center gap-2 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                
                {/* EDIT PROFILE TAB */}
                {settingsActiveTab === 'perfil' && (
                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1">Editar Perfil de Creador</h2>
                      <p className="text-xs text-zinc-400">Actualiza tu información pública de perfil en LiveX.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase">Nombre de Perfil</label>
                      <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white" required />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase">Biografía</label>
                      <textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white resize-none" required />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase">Correo de Negocios</label>
                      <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white" required />
                    </div>

                    <button type="submit" className="mt-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-[1.01] transition-all shadow-lg shadow-pink-500/20">
                      Guardar Cambios
                    </button>
                  </form>
                )}

                {/* SOCIAL LINKS TAB */}
                {settingsActiveTab === 'redes' && (
                  <form onSubmit={handleSaveSocialLinks} className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1">Configurar Redes Sociales</h2>
                      <p className="text-xs text-zinc-400">Activa y añade las URLs de tus redes sociales para mostrarlas en tu perfil.</p>
                    </div>

                    {/* TikTok Link */}
                    <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <TiktokIcon className="w-5 h-5 text-white" />
                          <span className="text-xs font-bold text-white">TikTok</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={tiktokActive} 
                            onChange={(e) => setTiktokActive(e.target.checked)} 
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                        </label>
                      </div>
                      {tiktokActive && (
                        <input 
                          type="url" 
                          placeholder="https://tiktok.com/@tu_usuario" 
                          value={tiktokUrl} 
                          onChange={(e) => setTiktokUrl(e.target.value)} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 text-white"
                          required
                        />
                      )}
                    </div>

                    {/* Instagram Link */}
                    <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <InstagramIcon className="w-5 h-5 text-pink-500" />
                          <span className="text-xs font-bold text-white">Instagram</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={instagramActive} 
                            onChange={(e) => setInstagramActive(e.target.checked)} 
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                        </label>
                      </div>
                      {instagramActive && (
                        <input 
                          type="url" 
                          placeholder="https://instagram.com/tu_usuario" 
                          value={instagramUrl} 
                          onChange={(e) => setInstagramUrl(e.target.value)} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 text-white"
                          required
                        />
                      )}
                    </div>

                    {/* YouTube Link */}
                    <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <YoutubeIcon className="w-5 h-5 text-red-500" />
                          <span className="text-xs font-bold text-white">YouTube</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={youtubeActive} 
                            onChange={(e) => setYoutubeActive(e.target.checked)} 
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                        </label>
                      </div>
                      {youtubeActive && (
                        <input 
                          type="url" 
                          placeholder="https://youtube.com/@tu_canal" 
                          value={youtubeUrl} 
                          onChange={(e) => setYoutubeUrl(e.target.value)} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 text-white"
                          required
                        />
                      )}
                    </div>

                    {/* Facebook Link */}
                    <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FacebookIcon className="w-5 h-5 text-blue-500" />
                          <span className="text-xs font-bold text-white">Facebook</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={facebookActive} 
                            onChange={(e) => setFacebookActive(e.target.checked)} 
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                        </label>
                      </div>
                      {facebookActive && (
                        <input 
                          type="url" 
                          placeholder="https://facebook.com/tu_perfil" 
                          value={facebookUrl} 
                          onChange={(e) => setFacebookUrl(e.target.value)} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 text-white"
                          required
                        />
                      )}
                    </div>

                    <button type="submit" className="mt-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-[1.01] transition-all shadow-lg shadow-pink-500/20">
                      Guardar Redes Sociales
                    </button>
                  </form>
                )}

                {/* RECHARGE COINS (TIK TOK STYLE) */}
                {settingsActiveTab === 'monedas' && (
                  <div className="flex flex-col gap-5 h-full justify-between">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1 flex items-center gap-1.5">Recargar Monedas <Sparkles className="w-4 h-4 text-yellow-400" /></h2>
                      <p className="text-xs text-zinc-400">Obtén monedas para apoyar a tus creadores favoritos con regalos de neón.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-2">
                      {[
                        { coins: 100, price: '0.99', popular: false },
                        { coins: 500, price: '4.99', popular: false },
                        { coins: 1200, price: '9.99', popular: true },
                        { coins: 3500, price: '29.99', popular: false },
                        { coins: 6500, price: '49.99', popular: false },
                        { coins: 14000, price: '99.99', popular: true },
                      ].map((pack) => (
                        <div
                          key={pack.coins}
                          onClick={() => setSelectedPack(pack.coins)}
                          className={`relative border rounded-2xl p-4 flex flex-col items-center justify-between cursor-pointer transition-all ${
                            selectedPack === pack.coins
                              ? 'bg-[#1e143d] border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                          }`}
                        >
                          {pack.popular && (
                            <span className="absolute -top-2 px-2 py-0.5 bg-pink-500 text-[8px] font-black rounded-full uppercase tracking-wider shadow">
                              Popular
                            </span>
                          )}
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)] mb-2">
                            <span className="text-[10px] font-black text-black">L</span>
                          </div>
                          <span className="text-sm font-black block">{pack.coins.toLocaleString()}</span>
                          <span className="text-[10px] text-purple-300 font-bold mt-1">${pack.price} USD</span>
                        </div>
                      ))}
                    </div>

                    {selectedPack ? (
                      <button
                        onClick={() => handleBuyCoins(selectedPack.toLocaleString())}
                        disabled={isPurchasing}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-[1.01] transition-all shadow-lg shadow-pink-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isPurchasing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Procesando pago...
                          </>
                        ) : (
                          `Comprar ${selectedPack.toLocaleString()} Monedas`
                        )}
                      </button>
                    ) : (
                      <div className="w-full py-3 text-center border border-dashed border-white/10 rounded-xl text-xs text-zinc-500">
                        Selecciona un paquete para proceder con la compra
                      </div>
                    )}
                  </div>
                )}

                {/* GET MOBILE APK WITH QR CODE */}
                {settingsActiveTab === 'apk' && (
                  <div className="flex flex-col gap-6 items-center text-center">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1 flex items-center justify-center gap-2">LiveX en tu Bolsillo <Smartphone className="w-5 h-5 text-purple-400" /></h2>
                      <p className="text-xs text-zinc-400 max-w-md mx-auto">Descarga nuestra APK oficial y disfruta la experiencia móvil fluida con notificaciones instantáneas.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 my-3 bg-[#07070b]/60 p-6 rounded-2xl border border-white/5">
                      {/* Neon QR Code Mockup */}
                      <div className="p-4 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <div className="w-28 h-28 bg-[#05050a] rounded-xl flex items-center justify-center text-white">
                          <QrCode className="w-20 h-20 text-purple-400" />
                        </div>
                      </div>

                      <div className="text-left max-w-xs">
                        <h4 className="text-sm font-black text-white mb-1.5">Instrucciones Rápidas</h4>
                        <ol className="text-[11px] text-zinc-400 list-decimal pl-4 flex flex-col gap-1">
                          <li>Escanea el código QR con tu celular.</li>
                          <li>Descarga el archivo APK directamente.</li>
                          <li>Permite fuentes desconocidas al instalar.</li>
                          <li>¡Disfruta de la mejor app de streaming!</li>
                        </ol>
                      </div>
                    </div>

                    <button onClick={() => triggerToast('¡Descarga de APK iniciada! 🚀')} className="px-8 py-3 bg-[#12152b] hover:bg-purple-950/20 border border-purple-500/30 text-purple-300 text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Descargar APK para Android Directamente
                    </button>
                  </div>
                )}

                {/* PRIVACY & ACCOUNT DETAILS */}
                {settingsActiveTab === 'cuenta' && (
                  <div className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-lg font-black text-white mb-1">Configuración de Cuenta & Privacidad</h2>
                      <p className="text-xs text-zinc-400">Protege tu cuenta y administra tus vinculaciones sociales.</p>
                    </div>

                    <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <span className="text-xs font-bold text-white block">Cuenta Verificada</span>
                          <span className="text-[10px] text-zinc-500">Insignia azul activa en tu perfil de creadora.</span>
                        </div>
                        <BadgeCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <span className="text-xs font-bold text-white block">Transmisiones en alta definición</span>
                          <span className="text-[10px] text-zinc-500">Permitir streaming en Full HD 1080p 60 FPS.</span>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">Activo</span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between items-center py-1">
                        <div>
                          <span className="text-xs font-bold text-white block">Visibilidad de perfil</span>
                          <span className="text-[10px] text-zinc-500">Perfil público visible en buscador de explorar.</span>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">Público</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e0c1f] border border-purple-500/50 text-white rounded-2xl px-5 py-3 shadow-[0_0_30px_rgba(168,85,247,0.35)] flex items-center gap-3 transition-all animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Fullscreen TikTok-like Media Player Modal */}
      {activeMediaIndex !== null && tabPosts[activeMediaIndex] && (() => {
        const post = tabPosts[activeMediaIndex];
        
        const handlePrev = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setActiveMediaIndex(prev => {
            if (prev === null) return null;
            return prev === 0 ? tabPosts.length - 1 : prev - 1;
          });
        };

        const handleNext = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setActiveMediaIndex(prev => {
            if (prev === null) return null;
            return prev === tabPosts.length - 1 ? 0 : prev + 1;
          });
        };

        return (
          <div className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveMediaIndex(null)} />

            {/* Viewport-fixed Close Button */}
            <button 
              type="button"
              onClick={() => setActiveMediaIndex(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all z-50 border border-white/10 shadow-lg backdrop-blur-md"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Left Arrow */}
            {tabPosts.length > 1 && (
              <button 
                type="button"
                onClick={handlePrev}
                className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 active:scale-90 text-white flex items-center justify-center transition-all z-30 border border-white/5 hover:border-white/20 shadow-md backdrop-blur-sm"
                title="Anterior"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
            )}

            {/* Navigation Right Arrow */}
            {tabPosts.length > 1 && (
              <button 
                type="button"
                onClick={handleNext}
                className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 active:scale-90 text-white flex items-center justify-center transition-all z-30 border border-white/5 hover:border-white/20 shadow-md backdrop-blur-sm"
                title="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Main Immersive Phone-style Player Container */}
            <div className={`relative bg-[#09090e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 pointer-events-auto transition-all duration-300 ${showComments ? 'max-w-[800px] w-full h-[80vh] md:h-[85vh]' : 'max-w-[420px] w-full h-[80vh] md:h-[85vh]'}`}>
              
              {/* Left Player Pane */}
              <div className={`relative h-full flex flex-col bg-black transition-all duration-300 ${showComments ? 'w-full md:w-[420px] shrink-0' : 'w-full'}`}>
                {/* Media Content */}
                <div className="w-full h-full flex items-center justify-center bg-black">
                  {post.type === 'VIDEO' ? (
                    <video 
                      key={post.id}
                      src={post.url} 
                      className="w-full h-full object-contain" 
                      controls 
                      autoPlay 
                      loop 
                      playsInline
                    />
                  ) : (
                    <img 
                      src={post.url} 
                      className="w-full h-full object-contain" 
                      alt={post.title} 
                    />
                  )}
                </div>

                {/* Top gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Creator Info & Like Actions Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3.5 z-20">
                  {/* Creator Identity Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={targetUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${targetUser.username}`} 
                        className="w-10 h-10 rounded-full border border-white/15 bg-zinc-800 shrink-0" 
                        alt="" 
                      />
                      <div className="text-left">
                        <div className="text-sm font-bold flex items-center gap-1">
                          {targetUser.username}
                          <BadgeCheck className="w-4 h-4 text-blue-400 fill-transparent shrink-0" />
                        </div>
                        <span className="text-[10px] text-zinc-400">Post de {activeTab}</span>
                      </div>
                    </div>

                    {/* Follow status inside player */}
                    {!isOwnProfile && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProfileFollowToggle();
                        }}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shadow-md ${
                          isFollowingTargetUser 
                            ? 'bg-white/10 text-white border border-white/10' 
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105'
                        }`}
                      >
                        {isFollowingTargetUser ? 'Siguiendo' : 'Seguir'}
                      </button>
                    )}
                  </div>

                  {/* Title and Description */}
                  <p className="text-xs text-zinc-200 text-left line-clamp-2 leading-relaxed font-medium">
                    {post.title}
                  </p>

                  {/* Interaction icons bar */}
                  <div className="flex items-center gap-4 border-t border-white/10 pt-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikePostInModal(post.id);
                      }}
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-pink-500 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span className="text-xs font-bold">{formatStat(post.likesCount || 0)}</span>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowComments(!showComments);
                      }}
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-purple-400 transition-colors"
                    >
                      <MessageCircle className={`w-5 h-5 ${showComments ? 'fill-purple-500 text-purple-500' : ''}`} />
                      <span className="text-xs font-bold">{formatStat(post.commentsCount || 0)}</span>
                    </button>

                    <div className="text-[10px] text-zinc-500 font-bold ml-auto uppercase tracking-wider">
                      {new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Comments Pane */}
              {showComments && (
                <div className="w-full md:w-[380px] shrink-0 border-t md:border-t-0 md:border-l border-white/10 flex flex-col bg-[#0b0b12] h-full overflow-hidden">
                  {/* Comments Header */}
                  <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                      Comentarios ({comments.length})
                    </span>
                    <button 
                      onClick={() => setShowComments(false)}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
                    {commentsLoading ? (
                      <div className="flex flex-col items-center justify-center p-8 gap-2">
                        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] text-zinc-500 font-bold">Cargando comentarios...</span>
                      </div>
                    ) : comments.length > 0 ? (
                      comments.map((comment: any) => {
                        const isCommentOwn = sessionUser && sessionUser.id === comment.userId;
                        const isPostOwn = sessionUser && sessionUser.id === post.userId;
                        const canDelete = isCommentOwn || isPostOwn;
                        return (
                          <div key={comment.id} className="flex gap-2.5 items-start text-xs group/item">
                            <Link href={`/u/${comment.user.username}`}>
                              <img 
                                src={comment.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} 
                                className="w-7 h-7 rounded-full border border-white/10 bg-zinc-800 shrink-0 hover:border-purple-500 transition-colors cursor-pointer" 
                                alt="" 
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <Link href={`/u/${comment.user.username}`}>
                                  <span className="font-extrabold text-white text-[11px] hover:text-purple-400 transition-colors cursor-pointer">@{comment.user.username}</span>
                                </Link>
                                <span className="text-[8px] text-zinc-600 font-medium">
                                  {new Date(comment.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                              <p className="text-zinc-300 break-words pr-2 leading-relaxed text-[11px]">{comment.content}</p>
                            </div>

                            {/* Actions on comment */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleLikeComment(comment.id);
                                }}
                                className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-pink-500 transition-colors"
                              >
                                <Heart className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                                <span className="text-[10px]">{comment.likesCount}</span>
                              </button>
                              {canDelete && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteComment(comment.id);
                                  }}
                                  className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                  title="Eliminar comentario"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center gap-1.5 mt-8">
                        <MessageCircle className="w-8 h-8 text-zinc-700 animate-pulse" />
                        <h4 className="text-[11px] font-bold text-zinc-500">Sin comentarios todavía</h4>
                        <p className="text-[9px] text-zinc-600 max-w-[150px]">¡Sé el primero en comentar esta publicación!</p>
                      </div>
                    )}
                  </div>

                  {/* Write Comment Form */}
                  <form onSubmit={handleCreateComment} className="p-3 border-t border-white/5 bg-[#07070b] shrink-0">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 h-10 focus-within:border-purple-500 transition-colors gap-2">
                      <Smile className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                      <input 
                        type="text" 
                        placeholder="Añadir comentario..." 
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 text-xs text-white placeholder-zinc-500 font-medium w-full min-w-0"
                        maxLength={300}
                      />
                      <button 
                        type="submit" 
                        disabled={!newCommentText.trim()}
                        className="text-xs font-black text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-40 shrink-0"
                      >
                        Publicar
                      </button>
                    </div>

                    {/* Emoji Quick Picker List */}
                    <div className="flex items-center gap-2 mt-2 overflow-x-auto py-1 px-1 max-w-full custom-scrollbar">
                      {['❤️', '🔥', '👏', '🙌', '😂', '😍', '😮', '🎉', '💡', '🎮', '⭐️'].map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewCommentText(prev => prev + emoji);
                          }}
                          className="text-sm hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        );
      })()}

    </div>
  );
}
