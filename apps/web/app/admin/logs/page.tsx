'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, Search, MessageSquare, ArrowLeft, ArrowRight, 
  Calendar, ShieldAlert, User, Eye, RefreshCw, Clock 
} from 'lucide-react';
import { getUsersAction, getAllDMsAction, getUserConversationAction } from '@/app/actions/admin';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface SearchableUserSelectProps {
  label: string;
  users: any[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchableUserSelect = ({ label, users, selectedValue, onChange, placeholder }: SearchableUserSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedUser = users.find(u => u.id === selectedValue);

  const filtered = users.filter(u => 
    u.username.toLowerCase().includes(query.toLowerCase()) || 
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1.5 relative" ref={containerRef}>
      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>
      
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={isOpen ? query : (selectedUser ? `@${selectedUser.username}` : '')}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setQuery('');
            setIsOpen(true);
          }}
          className="w-full bg-white text-black placeholder-zinc-500 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-purple-500 transition-colors"
        />
        {selectedValue && !isOpen && (
          <button 
            type="button"
            onClick={() => {
              onChange('');
              setQuery('');
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black font-black text-[10px] uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-[105%] left-0 w-full bg-white border border-zinc-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar p-1">
          {filtered.length === 0 ? (
            <div className="p-3 text-xs text-zinc-500 text-center font-bold">No se encontraron usuarios</div>
          ) : (
            filtered.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => {
                  onChange(u.id);
                  setIsOpen(false);
                  setQuery('');
                }}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
                  selectedValue === u.id 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <img src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`} className="w-6 h-6 rounded-full border border-zinc-200 shrink-0 bg-zinc-100" alt="" />
                <div className="min-w-0">
                  <div className="text-zinc-900 truncate">@{u.username}</div>
                  <div className="text-[10px] text-zinc-500 truncate font-semibold">{u.email}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default function AdminLogsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [dms, setDms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Interactive Auditing State
  const [selectedSenderId, setSelectedSenderId] = useState('');
  const [selectedReceiverId, setSelectedReceiverId] = useState('');
  const [auditConversation, setAuditConversation] = useState<any[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const loadLogs = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const dbUsers = await getUsersAction();
      setUsers(dbUsers);

      const dbDms = await getAllDMsAction();
      setDms(dbDms);
    } catch (err: any) {
      toast.error('Error al cargar logs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs(true);
  }, []);

  // Fetch audit conversation when users are selected
  useEffect(() => {
    async function fetchConversation() {
      if (!selectedSenderId || !selectedReceiverId) {
        setAuditConversation([]);
        return;
      }
      if (selectedSenderId === selectedReceiverId) {
        toast.error('Selecciona dos usuarios distintos para auditar su chat.');
        setAuditConversation([]);
        return;
      }
      setLoadingAudit(true);
      try {
        const history = await getUserConversationAction(selectedSenderId, selectedReceiverId);
        setAuditConversation(history);
      } catch (err: any) {
        toast.error('Error al cargar historial de chat: ' + err.message);
      } finally {
        setLoadingAudit(false);
      }
    }
    fetchConversation();
  }, [selectedSenderId, selectedReceiverId]);

  const filteredDms = dms.filter(dm => 
    dm.sender.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dm.receiver.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dm.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAuditClick = (senderId: string, receiverId: string) => {
    setSelectedSenderId(senderId);
    setSelectedReceiverId(receiverId);
    // Scroll smoothly to audit section
    document.getElementById('audit-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-wider mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Estadísticas
          </Link>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-500" /> Auditoría de Mensajes y Chats (Logs)
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Supervisa en tiempo real las conversaciones y mensajes privados enviados entre usuarios.</p>
        </div>

        <button 
          onClick={() => loadLogs()}
          className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-xs font-bold rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Recargar Logs
        </button>
      </div>

      {/* Grid Layout: Left Panel Chat Inspector, Right Panel Recent Snippets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER PANEL: INTERACTIVE CHAT INSPECTOR */}
        <div id="audit-section" className="xl:col-span-2 bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-pink-500 animate-pulse" /> Inspector Interactivo de Chats
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5 font-bold">Selecciona a dos usuarios de la plataforma para ver todo su historial de mensajería privada.</p>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SearchableUserSelect 
              label="Usuario A (Remitente)" 
              users={users} 
              selectedValue={selectedSenderId} 
              onChange={setSelectedSenderId}
              placeholder="Escribe para buscar Usuario A..."
            />
            <SearchableUserSelect 
              label="Usuario B (Receptor)" 
              users={users} 
              selectedValue={selectedReceiverId} 
              onChange={setSelectedReceiverId}
              placeholder="Escribe para buscar Usuario B..."
            />
          </div>

          {/* Conversation Screen */}
          <div className="flex-1 min-h-[400px] max-h-[500px] bg-black/40 border border-white/5 rounded-2xl overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
            {loadingAudit ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 py-20">
                <div className="w-8 h-8 rounded-full border-4 border-purple-500/25 border-t-purple-500 animate-spin" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Cargando chat...</span>
              </div>
            ) : (!selectedSenderId || !selectedReceiverId) ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800/40 flex items-center justify-center text-zinc-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400">Ningún chat seleccionado</h4>
                  <p className="text-[10px] text-zinc-600 max-w-[280px] mx-auto mt-1">Elige los usuarios arriba o pulsa "Auditar" en los logs recientes de la derecha.</p>
                </div>
              </div>
            ) : auditConversation.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-3">
                <MessageSquare className="w-10 h-10 text-zinc-700 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-500">Sin mensajes registrados</h4>
                  <p className="text-[10px] text-zinc-600 max-w-[240px] mx-auto mt-1">No hay mensajes directos enviados entre estos dos usuarios.</p>
                </div>
              </div>
            ) : (
              auditConversation.map((msg) => {
                const isUser1Sender = msg.senderId === selectedSenderId;
                
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      isUser1Sender ? 'self-start items-start' : 'self-end items-end'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <img 
                        src={msg.sender.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender.username}`} 
                        className="w-4 h-4 rounded-full border border-white/5 bg-zinc-800" 
                        alt="" 
                      />
                      <span className="text-[9px] text-zinc-500 font-bold">@{msg.sender.username}</span>
                    </div>

                    <div 
                      className={`p-3 rounded-2xl text-xs font-medium leading-relaxed break-all ${
                        isUser1Sender 
                          ? 'bg-zinc-800/90 text-zinc-100 rounded-tl-none' 
                          : 'bg-purple-600 text-white rounded-tr-none'
                      }`}
                    >
                      {msg.content}
                      {msg.mediaUrl && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-white/5 max-h-40 max-w-full">
                          {msg.mediaType?.startsWith('video') ? (
                            <video src={msg.mediaUrl} controls className="max-h-40" />
                          ) : (
                            <img src={msg.mediaUrl} className="max-h-40 object-cover" alt="" />
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] text-zinc-600 mt-1 font-semibold">
                      {new Date(msg.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANEL: RECENT LOGS SNIPPETS */}
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col gap-5 shadow-xl max-h-[640px]">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Logs de Mensajes Recientes
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5 font-bold">Últimos 100 mensajes enviados en la plataforma.</p>
          </div>

          {/* Log search input */}
          <div className="flex bg-zinc-950 border border-white/10 px-3 py-2 rounded-xl items-center gap-2">
            <Search className="w-4 h-4 text-zinc-500 shrink-0" />
            <input 
              type="text"
              placeholder="Buscar remitente, receptor o texto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs text-white placeholder-zinc-600 font-semibold"
            />
          </div>

          {/* Logs List Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1">
            {loading ? (
              <div className="text-center py-10 text-xs text-zinc-600 font-black uppercase tracking-wider animate-pulse">Cargando logs...</div>
            ) : filteredDms.length === 0 ? (
              <div className="text-center py-10 text-xs text-zinc-600 font-bold">Sin logs de chats registrados.</div>
            ) : (
              filteredDms.map((dm) => (
                <div 
                  key={dm.id}
                  className="bg-zinc-850/40 hover:bg-zinc-800/40 border border-white/5 rounded-2xl p-3 flex flex-col gap-2 transition-all"
                >
                  <div className="flex items-center justify-between gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-white">@{dm.sender.username}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />
                      <span className="text-white">@{dm.receiver.username}</span>
                    </div>
                    <span className="text-[8px] shrink-0 font-medium text-zinc-600">
                      {new Date(dm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-300 font-medium truncate leading-tight">
                    {dm.content || '[Archivo adjunto]'}
                  </p>

                  <button
                    onClick={() => handleAuditClick(dm.senderId, dm.receiverId)}
                    className="self-end inline-flex items-center gap-1 text-[9px] bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:text-white hover:bg-purple-600 font-black uppercase tracking-wider px-2 py-1 rounded transition-all"
                  >
                    <Eye className="w-3 h-3" /> Auditar Chat
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
