'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, User, Search, RefreshCw, Send, CheckCircle2, 
  HelpCircle, Clock, AlertTriangle, ArrowLeft 
} from 'lucide-react';
import { getAdminReportsAndTicketsAction, respondToTicketAction } from '@/app/actions/admin';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminReportsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Replying state
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  const loadData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getAdminReportsAndTicketsAction();
      setItems(data);
    } catch (err: any) {
      toast.error('Error al cargar reportes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  const handleSendReply = async (e: React.FormEvent, ticketId: string, userId: string) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setSubmittingReply(true);
    try {
      const res = await respondToTicketAction(ticketId, userId, replyMessage);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Respuesta enviada y notificada al usuario exitosamente.');
        setReplyMessage('');
        setActiveReplyId(null);
        loadData();
      }
    } catch (err) {
      toast.error('Error al enviar la respuesta.');
    } finally {
      setSubmittingReply(false);
    }
  };

  const filteredItems = items.filter(item => {
    const isSupport = item.reason.startsWith('[SOPORTE]');
    const typeLabel = isSupport ? 'soporte ayuda solicitud' : 'reporte denuncia';
    return (
      item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.details && item.details.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.reporter.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      typeLabel.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-wider mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Estadísticas
          </Link>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-purple-500 animate-pulse" /> Centro de Reportes y Solicitudes
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Lee reportes de usuarios y responde a solicitudes de soporte, apelaciones y ayuda.</p>
        </div>

        <button 
          onClick={() => loadData()}
          className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-xs font-bold rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Recargar Reportes
        </button>
      </div>

      {/* Search Input */}
      <div className="flex bg-zinc-900 border border-white/5 p-4 rounded-2xl items-center gap-3">
        <Search className="w-5 h-5 text-zinc-500 shrink-0 ml-1" />
        <input 
          type="text"
          placeholder="Buscar por asunto, detalles, usuario, o tipo (soporte / reporte)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-zinc-500 font-semibold"
        />
      </div>

      {/* List Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-purple-500/25 border-t-purple-500 animate-spin" />
            <span className="text-xs text-zinc-400 font-bold tracking-widest animate-pulse uppercase">Cargando Reportes...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900 border border-white/5 rounded-3xl">
            <ShieldAlert className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-zinc-400">Sin registros activos</h4>
            <p className="text-xs text-zinc-600 mt-1">No hay reportes de moderación ni solicitudes de soporte en este momento.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSupport = item.reason.startsWith('[SOPORTE]');
            const displayTitle = isSupport ? item.reason.replace('[SOPORTE]', '').trim() : item.reason;
            const isPending = item.status === 'PENDING';

            return (
              <div 
                key={item.id} 
                className={`bg-zinc-900 border border-white/5 p-6 rounded-3xl transition-all relative overflow-hidden flex flex-col gap-4 ${
                  !isPending ? 'opacity-70' : ''
                }`}
              >
                {/* Header Indicator Border */}
                <div className={`absolute top-0 left-0 w-full h-1 ${
                  isSupport ? 'bg-blue-500' : 'bg-red-500'
                }`} />

                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.reporter.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.reporter.username}`} 
                      className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 shrink-0" 
                      alt="" 
                    />
                    <div>
                      <div className="text-xs font-bold text-zinc-400">
                        De: <span className="text-white font-black">@{item.reporter.username}</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 font-bold block mt-0.5">
                        Enviado el {new Date(item.createdAt).toLocaleString([], { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Badge Type */}
                    {isSupport ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wider">
                        <HelpCircle className="w-3 h-3" /> Soporte / Ayuda
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black bg-red-500/10 border border-red-500/20 text-red-400 uppercase tracking-wider">
                        <AlertTriangle className="w-3 h-3" /> Reporte / Denuncia
                      </span>
                    )}

                    {/* Badge Status */}
                    {isPending ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 uppercase tracking-wider">
                        Pendiente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black bg-green-500/10 border border-green-500/20 text-green-400 uppercase tracking-wider">
                        Resuelto
                      </span>
                    )}
                  </div>
                </div>

                {/* Content area */}
                <div>
                  <h3 className="text-sm font-black text-white">{displayTitle}</h3>
                  {item.details && (
                    <p className="text-xs text-zinc-300 mt-2 bg-black/35 p-3 rounded-2xl border border-white/5 leading-relaxed font-semibold">
                      {item.details}
                    </p>
                  )}
                  
                  {!isSupport && item.reported && (
                    <div className="text-xs font-bold text-zinc-500 mt-3 flex items-center gap-1">
                      Denunciado: <span className="text-red-400 font-black">@{item.reported.username}</span>
                    </div>
                  )}
                </div>

                {/* Respond / Actions Form */}
                {isSupport && isPending && (
                  <div className="mt-2 border-t border-white/5 pt-4">
                    {activeReplyId !== item.id ? (
                      <button
                        onClick={() => {
                          setActiveReplyId(item.id);
                          setReplyMessage('');
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all"
                      >
                        Responder al Usuario
                      </button>
                    ) : (
                      <form onSubmit={(e) => handleSendReply(e, item.id, item.reporterId)} className="flex flex-col gap-3">
                        <textarea
                          required
                          rows={3}
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder={`Escribe tu respuesta a @${item.reporter.username}...`}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed font-semibold"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => setActiveReplyId(null)}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black text-xs uppercase tracking-wider rounded-xl transition-all"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={submittingReply}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" /> Enviar y Resolver
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
