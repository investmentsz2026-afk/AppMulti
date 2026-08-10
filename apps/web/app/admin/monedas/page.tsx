'use client';

import React, { useEffect, useState } from 'react';
import { getPlatformRevenueAction } from '@/app/actions/admin';
import { Coins, ArrowUpRight, TrendingUp, History, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminMonedasPage() {
  const [data, setData] = useState<{
    totalRevenue: number;
    transactionsCount: number;
    transactions: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPlatformRevenueAction();
        setData(res);
      } catch (err) {
        console.error('Error loading revenue data:', err);
        toast.error('No se pudieron cargar los datos de comisiones.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Coins className="w-12 h-12 text-pink-500 animate-spin" />
        <span className="text-zinc-400 font-bold text-sm">Cargando ingresos de la plataforma...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <Coins className="w-7 h-7 text-pink-500" /> Ingresos por Comisiones (Regalos)
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Historial y balances del 30% de comisión recolectado por el envío de regalos.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total revenue */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black text-zinc-400 uppercase tracking-wider">Total Comisiones Acumuladas</p>
              <h3 className="text-3xl font-black text-white mt-2 flex items-center gap-2">
                <span className="text-yellow-500 font-extrabold">C</span> {(data?.totalRevenue ?? 0).toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
              <Coins className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <TrendingUp className="w-4 h-4" /> 30% de cada regalo enviado en la plataforma
          </div>
        </div>

        {/* Total transaction count */}
        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black text-zinc-400 uppercase tracking-wider">Regalos Enviados (Transacciones)</p>
              <h3 className="text-3xl font-black text-white mt-2">
                {data?.transactionsCount ?? 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
            <History className="w-4 h-4" /> Transacciones registradas en vivo y batallas
          </div>
        </div>

      </div>

      {/* Transaction Table */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
          <span className="text-sm font-black text-white uppercase tracking-wider">Registro de Ingresos</span>
        </div>

        <div className="overflow-x-auto">
          {data?.transactions && data.transactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 text-xs font-black uppercase tracking-wider">
                  <th className="px-6 py-4">Usuario Emisor</th>
                  <th className="px-6 py-4">Creador Receptor</th>
                  <th className="px-6 py-4">Regalo</th>
                  <th className="px-6 py-4">Corte Plataforma (30%)</th>
                  <th className="px-6 py-4">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-semibold">
                {data.transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-black">
                          {tx.senderName[0]?.toUpperCase()}
                        </div>
                        <span>@{tx.senderName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-black">
                          {tx.receiverName[0]?.toUpperCase()}
                        </div>
                        <span>@{tx.receiverName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        {tx.giftName}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-yellow-500">
                      + C {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">
                      {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-2">
              <Coins className="w-10 h-10 opacity-30 text-zinc-400" />
              <span>Aún no hay transacciones de regalos registradas.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
