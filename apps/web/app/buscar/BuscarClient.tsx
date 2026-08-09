'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, Compass, Play, User, Search, ArrowLeft, Heart, 
  MessageSquare, Film, Image, X, Swords, Trophy, MessageCircle, BadgeCheck,
  ChevronUp, ChevronDown, Trash2
} from 'lucide-react';
import { searchPostsAction } from '@/app/actions/posts';
import { getPostComments, createComment, deleteComment, toggleLikePost } from '@/app/actions/social';

export default function BuscarClient({ user, initialQuery }: { user: any; initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'Todo' | 'Videos' | 'Fotos'>('Todo');

  // Comments state
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showCommentsMobile, setShowCommentsMobile] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Likes state
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({});

  useEffect(() => {
    async function performSearch() {
      if (!initialQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchPostsAction(initialQuery);
        setResults(data);
      } catch (err) {
        console.error('Error performing search:', err);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/buscar?q=${encodeURIComponent(query)}`);
  };

  const filteredResults = results.filter(item => {
    if (activeTab === 'Todo') return true;
    if (activeTab === 'Videos' && item.type === 'video') return true;
    if (activeTab === 'Fotos' && item.type === 'photo') return true;
    return false;
  });

  // Load comments when index changes
  useEffect(() => {
    if (activeMediaIndex === null) {
      setComments([]);
      setShowCommentsMobile(false);
      return;
    }
    const post = filteredResults[activeMediaIndex];
    if (!post) return;

    async function loadComments() {
      setCommentsLoading(true);
      try {
        const res = await getPostComments(post.id);
        if (Array.isArray(res)) {
          setComments(res);
        }
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setCommentsLoading(false);
      }
    }
    loadComments();
  }, [activeMediaIndex]);

  const handleLike = async (postId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    const item = filteredResults.find(p => p.id === postId);
    if (!item) return;

    const current = likesState[postId] || {
      count: item.likesCount || 0,
      liked: false
    };

    const newLiked = !current.liked;
    const newCount = newLiked ? current.count + 1 : Math.max(0, current.count - 1);

    setLikesState(prev => ({
      ...prev,
      [postId]: { count: newCount, liked: newLiked }
    }));

    try {
      await toggleLikePost(postId);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || activeMediaIndex === null) return;
    const post = filteredResults[activeMediaIndex];
    if (!post) return;

    const text = newCommentText;
    setNewCommentText('');

    try {
      const res = await createComment(post.id, text);
      if (res.success && res.comment) {
        setComments(prev => [res.comment, ...prev]);
        // Also update comment count in results locally
        setResults(prev => prev.map(r => r.id === post.id ? { ...r, commentsCount: (r.commentsCount || 0) + 1 } : r));
      }
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (activeMediaIndex === null) return;
    const post = filteredResults[activeMediaIndex];
    if (!post) return;

    try {
      const res = await deleteComment(commentId);
      if (res.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        setResults(prev => prev.map(r => r.id === post.id ? { ...r, commentsCount: Math.max(0, (r.commentsCount || 0) - 1) } : r));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleNext = () => {
    if (filteredResults.length === 0) return;
    setActiveMediaIndex(prev => prev === null ? 0 : (prev === filteredResults.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (filteredResults.length === 0) return;
    setActiveMediaIndex(prev => prev === null ? 0 : (prev === 0 ? filteredResults.length - 1 : prev - 1));
  };

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white overflow-hidden">
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-[260px] border-r border-white/5 bg-[#0a0a0f] flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Play className="text-white fill-white w-4 h-4" />
          </div>
          <span className="text-xl font-black tracking-tighter">LiveX</span>
        </Link>

        <nav className="flex flex-col gap-1 mb-8">
          <Link href="/dashboard?tab=inicio" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Home className="w-5 h-5" /> Inicio
          </Link>
          <Link href="/dashboard?tab=parati" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Para ti
          </Link>
          <Link href="/dashboard?tab=siguiendo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <User className="w-5 h-5" /> Siguiendo
          </Link>
          <Link href="/en-vivo" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Play className="w-5 h-5" /> Gaming
          </Link>
          <Link href="/explorar" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Compass className="w-5 h-5" /> Explorar
          </Link>
          <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Swords className="w-5 h-5" /> Batallas
          </Link>
          <Link href="/torneos" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Trophy className="w-5 h-5" /> Torneos
          </Link>
        </nav>

        <div className="mt-auto pl-2 border-t border-white/5 pt-4">
          <Link href={`/u/${user.username}`} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full border border-white/10" alt="" />
            <div className="text-xs">
              <div className="font-bold text-white">@{user.username}</div>
              <div className="text-zinc-500">Mi Perfil</div>
            </div>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* HEADER / SEARCH BAR */}
        <header className="h-[70px] border-b border-white/5 px-4 md:px-6 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full lg:hidden text-zinc-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar videos por título (ej: raptor)..." 
                className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-purple-500/50 text-white placeholder:text-zinc-500"
              />
            </form>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full border border-white/10" alt="" />
            <span className="text-xs font-bold text-zinc-300">@{user.username}</span>
          </div>
        </header>

        {/* SEARCH FILTER TABS */}
        <div className="flex gap-2 border-b border-white/5 bg-[#05050a] px-4 md:px-6 py-3 shrink-0 overflow-x-auto scrollbar-none z-10">
          {(['Todo', 'Videos', 'Fotos'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SCROLLABLE RESULTS GRID */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-24 lg:pb-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-white/5 rounded-2xl border border-white/5" />
              ))}
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-zinc-600 mb-4 border border-white/5">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Sin resultados</h3>
              <p className="text-xs text-zinc-500 max-w-xs">No encontramos publicaciones que coincidan con tu búsqueda. ¡Prueba buscando otra palabra!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredResults.map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveMediaIndex(index)}
                  className="bg-[#0c0c14] border border-white/5 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:border-purple-500/20 transition-all flex flex-col group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-black shrink-0">
                    {item.type === 'video' ? (
                      <video src={item.url} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" muted playsInline />
                    ) : (
                      <img src={item.url} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" alt="" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[7px] font-black rounded uppercase tracking-wider flex items-center gap-0.5">
                        {item.type === 'video' ? <Film className="w-2.5 h-2.5" /> : <Image className="w-2.5 h-2.5" />}
                        {item.type === 'video' ? 'CLIP' : 'PHOTO'}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2 text-[9px] font-bold text-white z-10 pointer-events-none">
                      <div className="flex items-center gap-0.5">
                        <Heart className="w-3 h-3 fill-pink-500 text-pink-500 shrink-0" />
                        <span>{likesState[item.id]?.count ?? item.likesCount}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <MessageCircle className="w-3 h-3 fill-purple-500 text-purple-500 shrink-0" />
                        <span>{item.commentsCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between gap-1.5 leading-tight">
                    <p className="text-xs font-semibold text-zinc-100 line-clamp-2">{item.title}</p>
                    <div className="flex items-center gap-1.5 mt-auto">
                      <img src={item.avatar} className="w-5 h-5 rounded-full border border-white/20 bg-zinc-800 object-cover" alt="" />
                      <span className="text-[10px] font-black text-zinc-400 truncate flex items-center gap-0.5">
                        @{item.username} <BadgeCheck className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION (Mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[65px] bg-[#05050a]/95 backdrop-blur-lg border-t border-white/5 flex items-center justify-around z-30 px-2">
          <Link href="/dashboard?tab=inicio" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Inicio</span>
          </Link>
          <Link href="/en-vivo" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
            <Play className="w-6 h-6" />
            <span className="text-[10px] font-bold">Gaming</span>
          </Link>
          <Link href="/buscar" className="flex flex-col items-center gap-1 text-pink-500">
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-bold">Buscar</span>
          </Link>
          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href={`/u/${user.username}`} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Perfil</span>
          </Link>
        </div>
      </main>

      {/* OVERLAY TIKTOK-STYLE PLAYBACK POPUP */}
      {activeMediaIndex !== null && filteredResults[activeMediaIndex] && (() => {
        const item = filteredResults[activeMediaIndex];
        const isLiked = likesState[item.id]?.liked ?? false;
        const currentLikes = likesState[item.id]?.count ?? item.likesCount;

        return (
          <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-in fade-in duration-200">
            {/* Desktop Close button outside container */}
            <button 
              onClick={() => setActiveMediaIndex(null)} 
              className="absolute top-6 left-6 p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors z-50 text-white hidden lg:flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop side navigation arrows */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 hidden lg:flex">
              <button onClick={handlePrev} className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white">
                <ChevronUp className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white">
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>

            {/* MAIN PLAYBACK WINDOW CONTAINER */}
            <div className="relative w-full h-full lg:max-w-[850px] lg:h-[85vh] lg:rounded-3xl lg:border lg:border-white/10 lg:shadow-2xl flex flex-col lg:flex-row overflow-hidden bg-black">
              
              {/* Media Content Area */}
              <div className="relative flex-1 h-full bg-black flex items-center justify-center">
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-contain" controls autoPlay loop playsInline />
                ) : (
                  <img src={item.url} className="w-full h-full object-contain" alt="" />
                )}

                {/* Mobile top overlay buttons */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-40 lg:hidden">
                  <button onClick={() => setActiveMediaIndex(null)} className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition-colors text-white">
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    <button onClick={handlePrev} className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition-colors text-white">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button onClick={handleNext} className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition-colors text-white">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* MOBILE INFO OVERLAY (Bottom-left, exactly matches Para ti!) */}
                <div className="absolute left-4 bottom-4 right-16 z-20 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-xl lg:hidden text-left pointer-events-none">
                  <div className="flex items-center gap-2 mb-1.5 pointer-events-auto">
                    <Link href={`/u/${item.username}`} className="flex items-center gap-1.5 group/auth">
                      <img src={item.avatar} className="w-6 h-6 rounded-full border border-white/30 object-cover" alt="" />
                      <span className="font-extrabold text-xs text-white">@{item.username}</span>
                      <BadgeCheck className="text-blue-400 w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-[11px] text-zinc-100 font-medium mb-1 line-clamp-3">
                    {item.title}
                  </p>
                </div>

                {/* MOBILE RIGHT SIDE ACTION ICONS (Aligned vertically, exactly matches Para ti!) */}
                <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4.5 z-30 lg:hidden">
                  {/* Creator Avatar Link */}
                  <Link href={`/u/${item.username}`} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-zinc-900 shadow-md">
                    <img src={item.avatar} className="w-full h-full object-cover" alt="" />
                  </Link>

                  {/* Like Button */}
                  <div className="flex flex-col items-center gap-0.5">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg"
                    >
                      <Heart className={`w-5.5 h-5.5 transition-colors ${isLiked ? 'text-pink-500 fill-pink-500' : 'text-white'}`} />
                    </button>
                    <span className="text-[10px] font-black text-white shadow-md">{currentLikes}</span>
                  </div>

                  {/* Comment Button */}
                  <div className="flex flex-col items-center gap-0.5">
                    <button 
                      onClick={() => setShowCommentsMobile(true)}
                      className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg"
                    >
                      <MessageSquare className="w-5.5 h-5.5 text-white" />
                    </button>
                    <span className="text-[10px] font-black text-white shadow-md">{comments.length}</span>
                  </div>
                </div>
              </div>

              {/* DESKTOP DETAILS COLUMN (Hidden on mobile) */}
              <div className="hidden lg:flex w-[320px] shrink-0 h-full flex-col bg-[#0c0c14] border-l border-white/10 p-5">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <img src={item.avatar} className="w-9 h-9 rounded-full border border-pink-500 bg-zinc-800 object-cover" alt="" />
                  <div className="text-left">
                    <h4 className="text-xs font-black text-white flex items-center gap-0.5">
                      @{item.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                    </h4>
                    <span className="text-[10px] text-zinc-500 font-bold">Publicación</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4 custom-scrollbar text-left">
                  <p className="text-xs text-zinc-200 font-medium mb-3 leading-relaxed">{item.title}</p>
                  
                  {/* Desktop comments list */}
                  <div className="border-t border-white/5 pt-4 mt-4">
                    <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Comentarios ({comments.length})</h5>
                    {commentsLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : comments.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {comments.map((comment: any) => (
                          <div key={comment.id} className="flex gap-2 items-start text-xs text-left">
                            <img src={comment.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} className="w-6 h-6 rounded-full object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                              <span className="font-extrabold text-white text-[10px]">@{comment.user.username}</span>
                              <p className="text-zinc-300 text-[10px] break-words">{comment.content}</p>
                            </div>
                            {user && (user.id === comment.userId || user.id === item.userId) && (
                              <button onClick={() => handleDeleteComment(comment.id)} className="text-zinc-500 hover:text-red-500 p-0.5 shrink-0 transition-colors">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-zinc-600 font-bold py-4">No hay comentarios en este post.</p>
                    )}
                  </div>
                </div>

                {/* Desktop interaction buttons & post comment form */}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-around text-zinc-400">
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => handleLike(item.id)}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-pink-500 transition-colors border border-white/5"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500' : ''}`} />
                      </button>
                      <span className="text-[10px] font-bold">{currentLikes}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400 border border-white/5">
                        <MessageSquare className="w-5 h-5 fill-purple-400/20" />
                      </div>
                      <span className="text-[10px] font-bold">{comments.length}</span>
                    </div>
                  </div>

                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input 
                      type="text" 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Escribe un comentario..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500 text-white placeholder:text-zinc-600"
                    />
                    <button type="submit" className="px-3 py-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold rounded-xl text-xs shrink-0">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* MOBILE SLIDING COMMENTS BOTTOM SHEET (Slides up half way, exactly matches TikTok!) */}
            {showCommentsMobile && (
              <>
                <div 
                  className="fixed inset-0 bg-black/60 z-[110] transition-opacity animate-in fade-in duration-200"
                  onClick={() => setShowCommentsMobile(false)}
                />
                <div className="fixed bottom-0 left-0 right-0 h-[60%] bg-[#0c0c14]/98 border-t border-white/10 rounded-t-3xl z-[120] flex flex-col overflow-hidden transition-transform duration-300 translate-y-0 text-left">
                  {/* Drawer Header */}
                  <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                      Comentarios ({comments.length})
                    </span>
                    <button onClick={() => setShowCommentsMobile(false)} className="text-zinc-500 hover:text-white transition-colors p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
                    {commentsLoading ? (
                      <div className="flex flex-col items-center justify-center p-6 gap-2">
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] text-zinc-500 font-bold">Cargando comentarios...</span>
                      </div>
                    ) : comments.length > 0 ? (
                      comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-2 items-start text-xs text-left">
                          <img src={comment.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} className="w-6 h-6 rounded-full object-cover bg-zinc-800" alt="" />
                          <div className="flex-1 min-w-0">
                            <span className="font-extrabold text-white text-[10px]">@{comment.user.username}</span>
                            <p className="text-zinc-300 text-[10px] break-words">{comment.content}</p>
                          </div>
                          {user && (user.id === comment.userId || user.id === item.userId) && (
                            <button onClick={() => handleDeleteComment(comment.id)} className="text-zinc-500 hover:text-red-500 p-0.5 shrink-0 transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-zinc-500 font-bold text-center py-10">No hay comentarios. ¡Sé el primero en comentar!</p>
                    )}
                  </div>

                  {/* Comment Input Footer */}
                  <form onSubmit={handleAddComment} className="p-3 border-t border-white/5 bg-[#0a0a0f] flex gap-2">
                    <input 
                      type="text" 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Escribe un comentario..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-purple-500 text-white placeholder:text-zinc-600"
                    />
                    <button type="submit" className="px-3 py-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold rounded-xl text-xs shrink-0">
                      Enviar
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        );
      })()}
    </div>
  );
}
