'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Sparkles, Shield, ChevronUp, ChevronDown, Calendar, Star, Film, Image, Video, Smile, X, Trash2
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import { getFollowingFeedData, toggleLikePost, getPostComments, createComment, toggleLikeComment, deleteComment } from '@/app/actions/social';
import SidebarNav from '@/components/SidebarNav';
import { useRouter } from 'next/navigation';
import { getUserWalletBalanceAction } from '@/app/actions/stream';

export default function DesktopFollowing({ user, setTab, tab }: { user: any, setTab: (t: 'inicio'|'parati'|'siguiendo') => void, tab: string }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [activeSort, setActiveSort] = useState('Más recientes');

  const [followingCount, setFollowingCount] = useState(0);
  const [liveStreamers, setLiveStreamers] = useState<any[]>([]);
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);

  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Fetch comments when modal is open and showComments is active
  useEffect(() => {
    if (activeMediaIndex === null || !showComments) return;
    const post = feedItems[activeMediaIndex];
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
  }, [activeMediaIndex, showComments, feedItems]);

  const handleLikePostInModal = async (postId: string) => {
    setFeedItems(prev => prev.map(p => {
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
        // Rollback
        setFeedItems(prev => prev.map(p => {
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
        setFeedItems(prev => prev.map(p => {
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

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMediaIndex === null) return;
    const post = feedItems[activeMediaIndex];
    if (!post || !newCommentText.trim()) return;

    try {
      const res = await createComment(post.id, newCommentText);
      if (res.error) {
        alert(res.error);
      } else if (res.success && res.comment) {
        setComments(prev => [res.comment, ...prev]);
        setNewCommentText('');
        // Update commentsCount in the current post
        setFeedItems(prev => prev.map(p => {
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
      } else if (res.success) {
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
        alert(res.error);
      } else if (res.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        if (activeMediaIndex !== null) {
          const post = feedItems[activeMediaIndex];
          setFeedItems(prev => prev.map(p => {
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

  const formatStat = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  useEffect(() => {
    async function loadBalance() {
      const bal = await getUserWalletBalanceAction();
      setWalletBalance(bal);
    }
    loadBalance();
  }, []);

  useEffect(() => {
    async function loadFollowingData() {
      try {
        const data = await getFollowingFeedData();
        setFollowingCount(data.followingCount);
        setLiveStreamers(data.liveStreamers);
        setFeedItems(data.feedItems);
      } catch (err) {
        console.error('Error loading following data:', err);
      }
    }
    loadFollowingData();
  }, []);

  return (
    <>
    <div className="flex h-screen w-full bg-[#05050a] text-white">
      
      {/* Left Sidebar */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </Link>

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
            <Play className="w-5 h-5" /> Para ti
          </button>
          <button 
            onClick={() => setTab('siguiendo')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium w-full text-left ${tab === 'siguiendo' ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            <User className="w-5 h-5" /> Siguiendo
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

        <SidebarNav username={user.username} />

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
             <span className="font-black text-lg">{walletBalance.toLocaleString()}</span>
           </div>
           <button onClick={() => router.push(`/u/${user.username}?settings=monedas`)} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
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
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          {/* Custom Pill Buttons side-by-side (As in reference image!) */}
          <div className="flex bg-white/5 border border-white/5 rounded-full p-1 backdrop-blur-md">
            <button 
              onClick={() => setTab('parati')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${tab === 'parati' ? 'text-white bg-white/10 shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              Para ti
            </button>
            <button 
              onClick={() => setTab('siguiendo')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${tab === 'siguiendo' ? 'text-white bg-white/10 shadow' : 'text-zinc-400 hover:text-white'}`}
            >
              Siguiendo
            </button>
          </div>

          {/* Search bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
              if (q.trim()) router.push(`/buscar?q=${encodeURIComponent(q)}`);
            }}
            className="w-96 relative hidden md:block"
          >
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              name="q"
              type="text" 
              placeholder="Buscar streams, creadores, videos..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-yellow-400"><Crown className="w-4.5 h-4.5" /></button>
            <button className="text-zinc-400 hover:text-white relative"><Bell className="w-4.5 h-4.5" /><span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" /></button>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-1 truncate max-w-[80px]">{user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● En línea</div>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/10">Transmitir en vivo</button>
          </div>
        </header>

        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          
          {/* Main Title of Page */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-black text-white tracking-wide">Siguiendo</h1>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-black rounded-lg">
              {followingCount}
            </span>
          </div>

          {/* Carrusel Horizontal En Vivo Ahora */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" /> En vivo ahora
              </h2>
              <button className="text-xs font-bold text-purple-400 hover:text-purple-300">Ver todo</button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
              {liveStreamers.map(streamer => (
                <Link 
                  href={`/live/${streamer.name}`}
                  key={streamer.id} 
                  className="w-[180px] shrink-0 snap-start bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] cursor-pointer block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={streamer.preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    
                    {/* Live label top left */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase tracking-wider shadow">
                        EN VIVO
                      </span>
                    </div>

                    {/* View Count top right */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-1.5 py-0.5 bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-bold rounded">
                        ▷ {streamer.views}
                      </span>
                    </div>

                    {/* Overlapping circle avatar bottom center */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 p-0.5 rounded-full bg-[#05050a] border border-white/10 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                      <img src={streamer.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-purple-500" alt="" />
                    </div>
                  </div>

                  {/* Name and category info */}
                  <div className="pt-7 pb-3.5 px-3 text-center">
                    <h4 className="text-xs font-bold text-white flex items-center justify-center gap-1 truncate group-hover:text-purple-400 transition-colors">
                      {streamer.name} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline shrink-0" />
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-semibold truncate mt-0.5">{streamer.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tabs Filters and Sort Dropdown */}
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mb-6">
            <div className="flex gap-2">
              {['Todo', 'Videos', 'Shorts', 'Lives', 'Fotos', 'Clips'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${
                    activeFilter === filter 
                      ? 'bg-[#1e143d] text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]' 
                      : 'bg-white/5 text-zinc-400 border-transparent hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-bold">Ordenar por:</span>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold border border-white/5 flex items-center gap-1.5 text-zinc-300">
                {activeSort} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mixed Feed Media Grid (EXCLUSIVELY Followed content!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {feedItems
              .filter(item => {
                if (activeFilter === 'Todo') return true;
                if (activeFilter === 'Videos' && (item.type === 'video' || item.type === 'short')) return true;
                if (activeFilter === 'Shorts' && item.type === 'short') return true;
                if (activeFilter === 'Lives' && item.type === 'live') return true;
                if (activeFilter === 'Fotos' && item.type === 'photo') return true;
                if (activeFilter === 'Clips' && item.type === 'video') return true;
                return false;
              })
              .map(item => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    if (item.type === 'live') {
                      router.push(`/live/${item.name}`);
                    } else {
                      const feedIdx = feedItems.findIndex(x => x.id === item.id);
                      if (feedIdx !== -1) setActiveMediaIndex(feedIdx);
                    }
                  }}
                  className="group cursor-pointer block"
                >
                  {/* Visual Preview Card */}
                  <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden mb-3 border ${
                    item.type === 'live' 
                      ? 'border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.1)] group-hover:border-purple-500' 
                      : 'border-white/5 group-hover:border-white/10'
                  } transition-all`}>
                    
                    {item.type === 'video' || item.type === 'short' ? (
                      <video src={item.img} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" muted playsInline />
                    ) : (
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" alt="" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Badge Indicator Top Left */}
                    {item.type === 'live' ? (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 bg-red-600 text-[9px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-lg">
                          ● EN VIVO
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1">
                          {item.type === 'video' ? '🎬 CLIP' : item.type === 'short' ? '⚡ SHORT' : '📷 FOTO'}
                        </span>
                      </div>
                    )}

                    {/* Top Right Duration or View count */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold rounded-lg">
                        {item.type === 'live' ? `▷ ${item.views}` : item.duration}
                      </span>
                    </div>

                    {/* Bottom overlapping info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                      <img src={item.avatar} className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0" alt="" />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-white block leading-none flex items-center gap-0.5 truncate">
                          {item.name} <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0 inline" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-[13px] font-bold text-zinc-100 group-hover:text-purple-400 transition-colors line-clamp-2 px-1 leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center items-center py-10">
            <button className="px-8 py-3 bg-[#0a0a0f] hover:bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-all">
              Cargar más
            </button>
          </div>

        </div>
      </main>

    </div>

      {/* FULLSCREEN MEDIA PLAYER MODAL */}
      {activeMediaIndex !== null && feedItems[activeMediaIndex] && (() => {
        const post = feedItems[activeMediaIndex];
        
        const handlePrev = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          // Find previous item that is not a live stream
          let idx = activeMediaIndex - 1;
          while (idx >= 0) {
            if (feedItems[idx].type !== 'live') {
              setActiveMediaIndex(idx);
              return;
            }
            idx--;
          }
        };

        const handleNext = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          // Find next item that is not a live stream
          let idx = activeMediaIndex + 1;
          while (idx < feedItems.length) {
            if (feedItems[idx].type !== 'live') {
              setActiveMediaIndex(idx);
              return;
            }
            idx++;
          }
        };

        const hasPrev = feedItems.slice(0, activeMediaIndex).some(x => x.type !== 'live');
        const hasNext = feedItems.slice(activeMediaIndex + 1).some(x => x.type !== 'live');

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity">
            {/* Backdrop click closes modal */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveMediaIndex(null)} />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl h-[85vh] bg-[#07070a] border border-white/10 rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(168,85,247,0.15)] z-10">
              
              {/* Close Button top right */}
              <button 
                onClick={() => setActiveMediaIndex(null)}
                className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 transition-transform active:scale-90 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Navigation Arrows */}
              {hasPrev && (
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 hover:border-purple-500 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                >
                  <ChevronUp className="w-6 h-6 rotate-[-90deg]" />
                </button>
              )}
              {hasNext && (
                <button 
                  onClick={handleNext}
                  className="absolute right-4 md:right-[396px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 hover:border-purple-500 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                >
                  <ChevronDown className="w-6 h-6 rotate-[-90deg]" />
                </button>
              )}

              {/* Left Pane: Media Player */}
              <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden h-full group/media">
                {post.type === 'video' || post.type === 'short' ? (
                  <video 
                    src={post.mediaUrl} 
                    className="max-h-full max-w-full object-contain" 
                    controls 
                    autoPlay 
                    loop 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={post.mediaUrl} 
                    className="max-h-full max-w-full object-contain" 
                    alt={post.title} 
                  />
                )}
                
                {/* Title overlay at the bottom of media */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img src={post.avatar} className="w-8 h-8 rounded-full border border-white/10 object-cover" alt="" />
                    <span className="font-extrabold text-xs text-white">@{post.name}</span>
                  </div>
                  <p className="text-xs text-zinc-200 font-semibold line-clamp-2 max-w-2xl">{post.title}</p>
                </div>
              </div>

              {/* Right Pane: Comments & Details */}
              {showComments && (
                <div className="w-full md:w-[380px] shrink-0 border-t md:border-t-0 md:border-l border-white/10 flex flex-col bg-[#0b0b12] h-full overflow-hidden">
                  
                  {/* Creator Info / Actions bar */}
                  <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <img src={post.avatar} className="w-9 h-9 rounded-full border border-white/10 object-cover" alt="" />
                      <div className="text-left">
                        <span className="text-xs font-black text-white block leading-none">@{post.name}</span>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">Seguido</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleLikePostInModal(post.id)}
                        className="flex items-center gap-1 text-zinc-300 hover:text-pink-500 transition-colors cursor-pointer"
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                        <span className="text-xs font-bold">{formatStat(post.likesCount || 0)}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-zinc-300 cursor-pointer">
                        <MessageCircle className="w-5 h-5 text-purple-400" />
                        <span className="text-xs font-bold">{formatStat(post.commentsCount || 0)}</span>
                      </button>
                    </div>
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
                        const isOwnComment = user && user.id === comment.userId;
                        const isOwnPost = user && user.id === post.userId;
                        const canDelete = isOwnComment || isOwnPost;
                        return (
                          <div key={comment.id} className="flex gap-2 items-start text-xs group/item text-left">
                            <Link href={`/u/${comment.user.username}`}>
                              <img 
                                src={comment.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} 
                                className="w-8 h-8 rounded-full border border-white/10 bg-zinc-800 shrink-0 hover:border-purple-500 transition-colors cursor-pointer" 
                                alt="" 
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <Link href={`/u/${comment.user.username}`}>
                                  <span className="font-extrabold text-white text-[11px] hover:text-purple-400 transition-colors cursor-pointer">@{comment.user.username}</span>
                                </Link>
                                <span className="text-[8px] text-zinc-500 font-medium">
                                  {new Date(comment.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                              <p className="text-zinc-300 break-words pr-2 leading-relaxed text-[11px]">{comment.content}</p>
                            </div>

                            {/* Actions on comment */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={() => handleToggleLikeComment(comment.id)}
                                className="text-zinc-500 hover:text-pink-500 transition-colors p-0.5 active:scale-90 cursor-pointer"
                              >
                                <Heart className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                              </button>
                              
                              {canDelete && (
                                <button 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-zinc-500 hover:text-red-500 transition-colors p-0.5 opacity-0 group-hover/item:opacity-100 active:scale-90 cursor-pointer"
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
                      <div className="flex flex-col items-center justify-center p-8 text-center gap-1.5">
                        <MessageSquare className="w-8 h-8 text-zinc-600" />
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
                        className="text-xs font-black text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-40 shrink-0 cursor-pointer"
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
                          className="text-sm hover:scale-125 transition-transform cursor-pointer"
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
    </>
  );
}
