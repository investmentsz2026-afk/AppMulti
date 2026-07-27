'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Play, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Swords, Award, ShieldCheck, X } from 'lucide-react';
import { getGameRoomsAction, approveRoomWinnerAction } from '@/app/actions/gameroom';
import { toast } from 'react-hot-toast';

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
        <Icon className="w-6 h-6 text-zinc-400" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div className="text-zinc-500 text-sm font-medium mb-1">{title}</div>
    <div className="text-3xl font-bold">{value}</div>
  </div>
);

export default function AdminPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState<string | null>(null);

  const loadRooms = async () => {
    const res = await getGameRoomsAction();
    setRooms(res);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleApprove = async (roomId: string) => {
    setIsApproving(roomId);
    try {
      const res = await approveRoomWinnerAction(roomId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('¡Victoria aprobada y premio acreditado con éxito!');
        loadRooms();
      }
    } catch (err) {
      console.error(err);
      toast.error('Error del servidor.');
    }
    setIsApproving(null);
  };

  const pendingRooms = rooms.filter(r => r.status === 'FINISHED' && r.winScreenshot);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1.2M" change="12%" trend="up" icon={Users} />
        <StatCard title="Active Streams" value="12,450" change="5%" trend="up" icon={Play} />
        <StatCard title="Daily Wagers" value={`${rooms.length * 100} pts`} change="15%" trend="up" icon={Swords} />
        <StatCard title="Server Load" value="24%" change="2%" trend="down" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
           <h3 className="text-xl font-bold mb-6">Recent Reports</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                         <Activity className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                         <div className="text-sm font-bold">Harassment Report</div>
                         <div className="text-[10px] text-zinc-500">Reported by @user_{i} • 5m ago</div>
                      </div>
                   </div>
                   <button className="px-4 py-1.5 bg-zinc-800 text-xs font-bold rounded-lg hover:bg-zinc-700 transition-colors">
                      Review
                   </button>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
           <h3 className="text-xl font-bold mb-6">Top Streamers</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                         <Play className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                         <div className="text-sm font-bold">@streamer_{i}</div>
                         <div className="text-[10px] text-zinc-500">{10000 / i} concurrent viewers</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-sm font-bold text-primary">${5000 / i}</div>
                      <div className="text-[10px] text-zinc-500">today</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* REVISIONES DE SALAS PVP */}
      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
        <h3 className="text-xl font-black uppercase tracking-wider mb-6 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-yellow-500" /> Revisiones de Salas PvP (Wager Rooms)
        </h3>

        {pendingRooms.length === 0 ? (
          <div className="text-center py-10 bg-zinc-800/20 border border-dashed border-white/5 rounded-2xl">
            <Swords className="w-12 h-12 text-zinc-700 mx-auto mb-3 animate-pulse" />
            <h4 className="text-sm font-bold text-zinc-400">Sin revisiones pendientes</h4>
            <p className="text-xs text-zinc-600 mt-1">No hay reclamos de victoria ni capturas por validar en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingRooms.map(room => {
              const reporterName = room.winnerId === room.creatorId ? room.creator.username : room.opponent?.username;

              return (
                <div key={room.id} className="bg-zinc-800/50 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] bg-yellow-500/10 text-yellow-500 font-bold px-2 py-0.5 rounded uppercase">
                        {room.game}
                      </span>
                      <h4 className="text-sm font-black text-white mt-1.5">{room.title}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Apuesta: <span className="font-bold text-yellow-500">{room.wager} monedas</span> (Pozo: {room.wager * 2})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-zinc-500 uppercase block font-bold">Victoria Reportada</span>
                      <span className="text-xs text-purple-400 font-black">@{reporterName}</span>
                    </div>
                  </div>

                  {/* Screenshot Preview */}
                  <div 
                    onClick={() => setSelectedScreenshot(room.winScreenshot)}
                    className="relative rounded-xl overflow-hidden border border-white/5 h-40 bg-black cursor-zoom-in group"
                  >
                    <img src={room.winScreenshot} className="w-full h-full object-cover group-hover:scale-105 transition-all" alt="Proof" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] bg-black/80 text-white font-black uppercase px-2.5 py-1 rounded-full tracking-wider">Ampliar</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 mt-1">
                    <button 
                      type="button"
                      disabled={isApproving === room.id}
                      onClick={() => handleApprove(room.id)}
                      className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {isApproving === room.id ? (
                        <>Procesando...</>
                      ) : (
                        <>
                          <Award className="w-4 h-4" /> Aprobar y Pagar {room.wager * 2} monedas
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SCREENSHOT FULLSCREEN DIALOG */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedScreenshot(null)} />
          <div className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center z-10 animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedScreenshot(null)}
              className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={selectedScreenshot} className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10" alt="Full screen preview" />
          </div>
        </div>
      )}

    </div>
  );
}
