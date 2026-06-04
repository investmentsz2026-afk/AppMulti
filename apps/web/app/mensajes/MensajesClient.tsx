'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  BadgeCheck, Send, ArrowLeft, Sparkles, X, Heart
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import { 
  getConversations, 
  getDirectMessages, 
  sendDirectMessage, 
  getUserByUsername 
} from '@/app/actions/social';
import { toast } from 'react-hot-toast';

export default function MensajesClient({ sessionUser }: { sessionUser: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toUsername = searchParams.get('to');

  const [conversations, setConversations] = useState<any[]>([]);
  const [activePartner, setActivePartner] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [searching, setSearching] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations list
  const loadConversationsList = async (showLoading = false) => {
    if (showLoading) setLoadingChats(true);
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error(err);
    } finally {
      if (showLoading) setLoadingChats(false);
    }
  };

  // Initial load and deep linking
  useEffect(() => {
    async function init() {
      await loadConversationsList(true);

      if (toUsername) {
        try {
          const target = await getUserByUsername(toUsername);
          if (target) {
            setActivePartner(target);
            // Fetch messages for this user immediately
            const dms = await getDirectMessages(target.id);
            setMessages(dms);
          } else {
            toast.error(`Usuario @${toUsername} no encontrado`);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    init();
  }, [toUsername]);

  // Fetch messages when activePartner changes
  useEffect(() => {
    if (!activePartner) {
      setMessages([]);
      return;
    }

    async function loadDMs() {
      try {
        const dms = await getDirectMessages(activePartner.id);
        setMessages(dms);
      } catch (err) {
        console.error(err);
      }
    }
    loadDMs();
    loadConversationsList(); // refresh sidebar to mark read
  }, [activePartner]);

  // Polling for new messages and updated conversation list
  useEffect(() => {
    // Clear any previous interval
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(async () => {
      // 1. Refresh conversations list
      try {
        const data = await getConversations();
        setConversations(data);
      } catch (err) {
        console.error(err);
      }

      // 2. If activePartner is selected, refresh DMs
      if (activePartner) {
        try {
          const dms = await getDirectMessages(activePartner.id);
          // Only update state if message counts or contents changed to prevent infinite re-renders or jumping scroll
          if (dms.length !== messages.length || (dms.length > 0 && dms[dms.length - 1]?.id !== messages[messages.length - 1]?.id)) {
            setMessages(dms);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }, 3000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [activePartner, messages.length]);

  // Handle searching for user to start new chat
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchResults(null);
    try {
      const target = await getUserByUsername(searchQuery.trim());
      if (target) {
        setSearchResults(target);
      } else {
        toast.error('Usuario no encontrado');
      }
    } catch (err) {
      toast.error('Error al buscar usuario');
    } finally {
      setSearching(false);
    }
  };

  // Start chat with user
  const handleStartChat = (user: any) => {
    setActivePartner(user);
    setSearchQuery('');
    setSearchResults(null);
    
    // Add to conversations list locally if not present
    const exists = conversations.some(c => c.user.id === user.id);
    if (!exists) {
      setConversations(prev => [
        {
          user,
          lastMessage: 'Iniciar conversación...',
          createdAt: new Date(),
          isRead: true
        },
        ...prev
      ]);
    }
  };

  // Send Direct Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activePartner || sending) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setSending(true);

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempMsg = {
      id: tempId,
      senderId: sessionUser.id,
      receiverId: activePartner.id,
      content: messageText,
      createdAt: new Date(),
      sender: { id: sessionUser.id, username: sessionUser.username, avatar: sessionUser.avatar },
      receiver: activePartner
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const res = await sendDirectMessage(activePartner.id, messageText);
      if (res.error) {
        toast.error(res.error);
        // Rollback optimistic message
        setMessages(prev => prev.filter(m => m.id !== tempId));
      } else if (res.message) {
        // Swap temp message with real database message
        setMessages(prev => prev.map(m => m.id === tempId ? res.message : m));
        // Refresh conversations list to update sidebar immediately
        loadConversationsList();
      }
    } catch (err) {
      toast.error('Error al enviar mensaje');
      setMessages(prev => prev.filter(m => m.id !== tempId));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white relative">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
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
          <Link href="/mensajes" className="flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5 text-pink-400" /> Mensajes</div>
          </Link>
          <Link href="/notificaciones" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notificaciones</div>
            <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
          </Link>
          <Link href={`/u/${sessionUser.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
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
          <img src={sessionUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionUser.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{sessionUser.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · 75% XP</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* 2. MESSAGES CORE INTERFACE */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Chats Sidebar */}
        <section className="w-80 border-r border-white/5 flex flex-col bg-[#08080d]">
          {/* Search bar to find users */}
          <div className="p-4 border-b border-white/5 bg-[#09090e]">
            <h2 className="text-base font-black mb-3">Mensajes Privados</h2>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus-within:border-purple-500/50 transition-colors">
                <Search className="w-4 h-4 text-zinc-500 shrink-0 mr-1.5" />
                <input 
                  type="text" 
                  placeholder="Buscar usuario..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-white placeholder-zinc-600"
                />
              </div>
              <button 
                type="submit" 
                disabled={searching}
                className="px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-55"
              >
                Buscar
              </button>
            </form>

            {/* Search results popover */}
            {searchResults && (
              <div className="mt-3 bg-[#11111a] border border-purple-500/30 p-3 rounded-xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <img src={searchResults.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchResults.username}`} className="w-8 h-8 rounded-full border border-white/10 bg-zinc-800" alt="" />
                  <span className="text-xs font-bold">@{searchResults.username}</span>
                </div>
                <button 
                  onClick={() => handleStartChat(searchResults)}
                  className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:scale-[1.02] transition-all"
                >
                  Chatear
                </button>
              </div>
            )}
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
            {loadingChats ? (
              <div className="flex flex-col items-center justify-center p-8 gap-2">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-zinc-500 font-bold">Cargando chats...</span>
              </div>
            ) : conversations.length > 0 ? (
              conversations.map((conv) => {
                const isSelected = activePartner?.id === conv.user.id;
                return (
                  <button
                    key={conv.user.id}
                    onClick={() => setActivePartner(conv.user)}
                    className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all text-left relative ${
                      isSelected 
                        ? 'bg-purple-600/10 border border-purple-500/30' 
                        : 'border border-transparent hover:bg-white/5'
                    }`}
                  >
                    <img 
                      src={conv.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.user.username}`} 
                      className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800" 
                      alt="" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black truncate">{conv.user.username}</span>
                        <span className="text-[9px] text-zinc-600 font-medium">
                          {new Date(conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate leading-tight ${!conv.isRead && !isSelected ? 'text-white font-extrabold' : 'text-zinc-500'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!conv.isRead && !isSelected && (
                      <span className="absolute right-3 bottom-3 w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center gap-2 mt-8">
                <MessageSquare className="w-10 h-10 text-zinc-700 animate-pulse" />
                <h4 className="text-xs font-bold text-zinc-500">No hay chats activos</h4>
                <p className="text-[10px] text-zinc-600 max-w-[200px]">Busca un usuario arriba para iniciar una conversación privada.</p>
              </div>
            )}
          </div>
        </section>

        {/* Chat window panel */}
        <section className="flex-1 flex flex-col bg-[#050508]">
          {activePartner ? (
            <>
              {/* Active Chat Header */}
              <div className="h-[55px] shrink-0 border-b border-white/5 px-6 flex items-center justify-between bg-[#0a0a0f]/40 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-3">
                  <img src={activePartner.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activePartner.username}`} className="w-8 h-8 rounded-full border border-white/10 bg-zinc-800" alt="" />
                  <div>
                    <h3 className="text-xs font-black flex items-center gap-1">
                      {activePartner.username}
                      <BadgeCheck className="w-3.5 h-3.5 text-blue-400 fill-transparent shrink-0" />
                    </h3>
                    <span className="text-[9px] text-green-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> En línea
                    </span>
                  </div>
                </div>

                <Link 
                  href={`/u/${activePartner.username}`}
                  className="px-3 py-1.5 bg-white/5 border border-white/15 hover:bg-white/10 text-[10px] font-bold rounded-xl transition-all"
                >
                  Ver Perfil
                </Link>
              </div>

              {/* Message bubbles log container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4">
                <div className="text-center my-2">
                  <span className="text-[9px] bg-white/5 border border-white/10 text-zinc-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    🔒 Chat cifrado de extremo a extremo
                  </span>
                </div>

                {messages.map((msg) => {
                  const isOwn = msg.senderId === sessionUser.id;
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex gap-2.5 max-w-[70%] animate-in fade-in duration-200 ${
                        isOwn ? 'self-end flex-row-reverse' : 'self-start'
                      }`}
                    >
                      <img 
                        src={msg.sender.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender.username}`} 
                        className="w-7 h-7 rounded-full border border-white/10 bg-zinc-800 shrink-0 mt-0.5" 
                        alt="" 
                      />
                      <div className="flex flex-col">
                        <div className={`rounded-2xl px-4 py-2.5 text-xs shadow-md leading-relaxed ${
                          isOwn 
                            ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-none border border-purple-500/25 shadow-purple-500/5' 
                            : 'bg-white/5 text-zinc-200 border border-white/5 rounded-tl-none'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <span className={`text-[8px] text-zinc-600 font-medium mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Send Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#09090e] flex gap-2 relative z-10">
                <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-full px-4 h-11 focus-within:border-purple-500 transition-colors">
                  <input 
                    type="text" 
                    placeholder="Escribe un mensaje privado..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-xs text-white placeholder-zinc-500 font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shrink-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h2 className="text-base font-black">Bandeja de Entrada de LiveX</h2>
              <p className="text-xs text-zinc-500 max-w-sm">Selecciona una conversación del menú lateral o busca un usuario por su nombre de usuario para iniciar un chat privado seguro.</p>
            </div>
          )}
        </section>

      </main>

    </div>
  );
}
