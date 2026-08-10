'use client';

import React, { useEffect, useState } from 'react';
import { getRechargeRequestsAction, approveRechargeRequestAction, rejectRechargeRequestAction } from '@/app/actions/admin';
import { Wallet, MessageCircle, Check, X, RefreshCw, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AdminRecargasPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await getRechargeRequestsAction();
      setRequests(res);
    } catch (err) {
      console.error(err);
      toast.error('Error al cargar solicitudes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas aprobar esta recarga y acreditar las monedas al usuario?')) return;
    setProcessingId(id);
    try {
      const res = await approveRechargeRequestAction(id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('¡Recarga aprobada y acreditada con éxito!');
        loadRequests();
      }
    } catch (err) {
      toast.error('Error al procesar la aprobación.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas rechazar esta solicitud de recarga?')) return;
    setProcessingId(id);
    try {
      const res = await rejectRechargeRequestAction(id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Solicitud rechazada con éxito.');
        loadRequests();
      }
    } catch (err) {
      toast.error('Error al procesar el rechazo.');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Wallet className="w-12 h-12 text-purple-500 animate-pulse" />
        <span className="text-zinc-400 font-bold text-sm">Cargando solicitudes de recarga...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Wallet className="w-7 h-7 text-purple-500" /> Solicitudes de Recarga de Monedas
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Administra las recargas solicitadas por los usuarios. Escríbeles para coordinar el pago o acredita las monedas una vez verificado.
          </p>
        </div>
        <button 
          onClick={loadRequests} 
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all text-zinc-400 hover:text-white"
          title="Actualizar lista"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Requests table container */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
          <span className="text-sm font-black text-white uppercase tracking-wider">Solicitudes Recibidas</span>
        </div>

        <div className="overflow-x-auto">
          {requests && requests.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 text-xs font-black uppercase tracking-wider">
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Monedas Solicitadas</th>
                  <th className="px-6 py-4">Precio Total</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-semibold">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">
                      <div className="flex items-center gap-2">
                        <img 
                          src={req.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.user.username}`} 
                          className="w-7 h-7 rounded-full bg-zinc-800 border border-white/15" 
                        />
                        <span>@{req.user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-black text-white">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-black text-[8px] font-black">L</div>
                        {req.coins.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-yellow-500 font-black">
                      ${req.priceAmount.toFixed(2)} USD
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">
                      {new Date(req.createdAt).toLocaleDateString()} {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      {req.status === 'PENDING' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          Pendiente
                        </span>
                      )}
                      {req.status === 'COMPLETED' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Acreditado
                        </span>
                      )}
                      {req.status === 'REJECTED' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-500/10 text-red-400 border border-red-500/20">
                          Rechazado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Chat button */}
                        <button
                          onClick={() => router.push(`/mensajes?to=${req.user.username}`)}
                          className="p-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-400 hover:text-white rounded-xl transition-all flex items-center gap-1.5 text-xs cursor-pointer font-bold"
                          title="Ir a chat con usuario"
                        >
                          <MessageCircle className="w-4 h-4" /> Chatear
                        </button>

                        {/* Approval actions if PENDING */}
                        {req.status === 'PENDING' && (
                          <>
                            <button
                              disabled={processingId !== null}
                              onClick={() => handleApprove(req.id)}
                              className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md shadow-emerald-500/10"
                              title="Aprobar y Acreditar monedas"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              disabled={processingId !== null}
                              onClick={() => handleReject(req.id)}
                              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md shadow-red-500/10"
                              title="Rechazar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-2">
              <Wallet className="w-10 h-10 opacity-30 text-zinc-400" />
              <span>No hay solicitudes de recarga registradas.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
