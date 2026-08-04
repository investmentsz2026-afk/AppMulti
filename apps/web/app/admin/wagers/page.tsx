'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sword, Trophy, Play, CheckCircle2, AlertCircle, Eye, 
  Image as ImageIcon, RefreshCw, Coins, ArrowLeft, User, DollarSign 
} from 'lucide-react';
import { getAdminBattlesAndWagersAction, adminFinishStreamBattleAction } from '@/app/actions/admin';
import { approveRoomWinnerAction } from '@/app/actions/gameroom';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminWagersPage() {
  const [activeTab, setActiveTab] = useState<'battles' | 'pvp'>('battles');
  const [battles, setBattles] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // StreamBattle finish state
  const [showBattleModal, setShowBattleModal] = useState<any | null>(null);
  const [battleWinnerId, setBattleWinnerId] = useState('');
  const [battlePrize, setBattlePrize] = useState('500');
  const [submittingBattle, setSubmittingBattle] = useState(false);

  // PvP Screen preview modal
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);
  const [submittingPvpApproval, setSubmittingPvpApproval] = useState<string | null>(null);
  const [detailRoomModal, setDetailRoomModal] = useState<any | null>(null);

  const handleApprovePvPWithWinner = async (roomId: string, winnerId: string) => {
    setSubmittingPvpApproval(roomId);
    try {
      const res = await approveRoomWinnerAction(roomId, winnerId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('¡Ganador premiado con éxito!');
        setDetailRoomModal(null);
        loadData();
      }
    } catch (err: any) {
      toast.error('Error al premiar PvP: ' + err.message);
    } finally {
      setSubmittingPvpApproval(null);
    }
  };

  const loadData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getAdminBattlesAndWagersAction();
      setBattles(data.battles || []);
      setRooms(data.rooms || []);
    } catch (err: any) {
      toast.error('Error al cargar datos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  const handleFinishBattle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showBattleModal || !battleWinnerId) return;

    setSubmittingBattle(true);
    try {
      const res = await adminFinishStreamBattleAction(
        showBattleModal.id, 
        battleWinnerId, 
        parseInt(battlePrize) || 0
      );
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Batalla finalizada y ganador premiado con éxito.');
        setShowBattleModal(null);
        setBattleWinnerId('');
        loadData();
      }
    } catch (err: any) {
      toast.error('Error al procesar la batalla: ' + err.message);
    } finally {
      setSubmittingBattle(false);
    }
  };

  const handleApprovePvP = async (roomId: string) => {
    setSubmittingPvpApproval(roomId);
    try {
      const res = await approveRoomWinnerAction(roomId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('¡Victoria aprobada y monedas transferidas al ganador!');
        loadData();
      }
    } catch (err: any) {
      toast.error('Error al aprobar PvP: ' + err.message);
    } finally {
      setSubmittingPvpApproval(null);
    }
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
            <Sword className="w-6 h-6 text-purple-500" /> Moderación de Batallas y PvP (Wagers)
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Monitorea transmisiones en directo, audita capturas de victorias y otorga premios de monedas.</p>
        </div>

        <button 
          onClick={() => loadData()}
          className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-xs font-bold rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Recargar Lista
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/5 gap-2">
        <button
          onClick={() => setActiveTab('battles')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'battles' 
              ? 'border-purple-500 text-purple-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" /> Batallas en Vivo ({battles.length})
        </button>
        <button
          onClick={() => setActiveTab('pvp')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'pvp' 
              ? 'border-purple-500 text-purple-400' 
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Sword className="w-4 h-4" /> Salas de PvP / Wagers ({rooms.length})
        </button>
      </div>

      {/* Content Panels */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-purple-500/25 border-t-purple-500 animate-spin" />
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider animate-pulse">Cargando salas y batallas...</span>
        </div>
      ) : activeTab === 'battles' ? (
        
        /* BATTLES TAB PANEL */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {battles.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-zinc-900 border border-white/5 rounded-3xl">
              <Trophy className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-zinc-400">Sin batallas de stream</h4>
              <p className="text-xs text-zinc-600 mt-1">No hay batallas creadas o registradas en la base de datos.</p>
            </div>
          ) : (
            battles.map((b) => {
              const isOngoing = b.status === 'ONGOING';
              const isFinished = b.status === 'FINISHED';
              
              return (
                <div key={b.id} className="bg-zinc-900 border border-white/5 rounded-3xl p-5 flex flex-col gap-4 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    isOngoing ? 'bg-purple-500 animate-pulse' : isFinished ? 'bg-green-500' : 'bg-zinc-700'
                  }`} />

                  {/* Status header */}
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                    <span className="text-zinc-500">ID: {b.id.substring(0, 8)}</span>
                    {isOngoing ? (
                      <span className="text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/25 flex items-center gap-1 animate-pulse">
                        <Play className="w-3 h-3 fill-purple-400" /> En Vivo
                      </span>
                    ) : isFinished ? (
                      <span className="text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/25 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Finalizado
                      </span>
                    ) : (
                      <span className="text-zinc-500 bg-zinc-800 px-2.5 py-0.5 rounded-full">Pendiente</span>
                    )}
                  </div>

                  {/* Streamers Comparison card */}
                  <div className="bg-black/35 rounded-2xl p-4 flex items-center justify-between border border-white/5 gap-2">
                    {/* Streamer 1 */}
                    <div className="flex flex-col items-center gap-1.5 text-center min-w-0 flex-1">
                      <img 
                        src={b.stream1.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${b.stream1.user.username}`} 
                        className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 shrink-0" 
                        alt="" 
                      />
                      <span className="text-xs font-black text-white truncate w-full">@{b.stream1.user.username}</span>
                      <span className="text-[10px] text-purple-400 font-black">{b.points1} pts</span>
                    </div>

                    <span className="text-xs font-black text-zinc-600">VS</span>

                    {/* Streamer 2 */}
                    <div className="flex flex-col items-center gap-1.5 text-center min-w-0 flex-1">
                      <img 
                        src={b.stream2.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${b.stream2.user.username}`} 
                        className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 shrink-0" 
                        alt="" 
                      />
                      <span className="text-xs font-black text-white truncate w-full">@{b.stream2.user.username}</span>
                      <span className="text-[10px] text-purple-400 font-black">{b.points2} pts</span>
                    </div>
                  </div>

                  {/* Winner Display if finished */}
                  {isFinished && b.winnerId && (
                    <div className="text-xs font-bold text-zinc-500 text-center bg-green-500/5 border border-green-500/10 p-2.5 rounded-xl flex items-center justify-center gap-1">
                      Ganador: <span className="text-green-400 font-black flex items-center gap-1">
                        @{b.winnerId === b.stream1.user.id ? b.stream1.user.username : b.stream2.user.username}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  {isOngoing && (
                    <button
                      onClick={() => {
                        setShowBattleModal(b);
                        setBattleWinnerId(b.stream1.user.id);
                      }}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-purple-500/10 active:scale-[0.98]"
                    >
                      Elegir Ganador y Premiar
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        
        /* PVP GAME ROOMS TAB PANEL */
        <div className="space-y-4">
          {rooms.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900 border border-white/5 rounded-3xl">
              <Sword className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-zinc-400">Sin salas PvP registradas</h4>
              <p className="text-xs text-zinc-600 mt-1">No hay salas de apuestas PvP activas o terminadas.</p>
            </div>
          ) : (
            rooms.map((room) => {
              const isFinished = room.status === 'FINISHED';
              const isApproved = room.status === 'APPROVED';
              const isPlaying = room.status === 'PLAYING';
              
              // Find winner username
              const winnerUser = room.winnerId === room.creator.id ? room.creator : room.opponent;

              return (
                <div key={room.id} className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full w-1 ${
                    isApproved ? 'bg-green-500' : isFinished ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />

                  {/* User Info Column */}
                  <div className="flex items-center gap-4 min-w-0 md:w-1/3">
                    <div className="flex items-center -space-x-4">
                      <img 
                        src={room.creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${room.creator.username}`} 
                        className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 shrink-0" 
                        alt="" 
                      />
                      {room.opponent && (
                        <img 
                          src={room.opponent.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${room.opponent.username}`} 
                          className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 shrink-0" 
                          alt="" 
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-white truncate leading-snug">{room.title}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5 font-bold">
                        @{room.creator.username} vs {room.opponent ? `@${room.opponent.username}` : 'Esperando oponente...'}
                      </p>
                    </div>
                  </div>

                  {/* Coins & Code detail column */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-zinc-400">
                    <div>
                      <div className="text-[9px] font-black uppercase text-zinc-500 tracking-wider">Apuesta PvP</div>
                      <div className="text-sm font-black text-yellow-500 flex items-center gap-1 mt-0.5">
                        <Coins className="w-4 h-4" /> {room.wager.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-zinc-500 tracking-wider">Premio Total</div>
                      <div className="text-sm font-black text-green-400 flex items-center gap-1 mt-0.5">
                        <Coins className="w-4 h-4" /> {(room.wager * 2).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-zinc-500 tracking-wider">Código de Sala</div>
                      <div className="text-white mt-1 select-all font-mono text-[11px] bg-black/35 px-2 py-0.5 rounded border border-white/5 w-fit">
                        {room.roomCode}
                      </div>
                    </div>
                  </div>

                  {/* Screenshot & Action column */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => setDetailRoomModal(room)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/10 cursor-pointer animate-fade-in"
                    >
                      <Eye className="w-3.5 h-3.5" /> Ver Detalles de Sala
                    </button>

                    {isApproved && winnerUser && (
                      <span className="px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-green-600/10 border border-green-500/20 text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pagado a @{winnerUser.username}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* STREAM BATTLE FINISH MODAL */}
      {showBattleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity p-4">
          <div className="absolute inset-0" onClick={() => setShowBattleModal(null)} />
          
          <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.25)] z-10 animate-in zoom-in-95 animate-out zoom-out-95">
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
            
            <form onSubmit={handleFinishBattle} className="p-6 flex flex-col gap-4">
              <h3 className="text-base font-black text-white flex items-center gap-1.5">
                <Trophy className="w-5 h-5 text-purple-500" /> Finalizar Batalla de Stream
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Seleccionar Ganador</label>
                <select
                  value={battleWinnerId}
                  onChange={(e) => setBattleWinnerId(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-bold outline-none focus:border-purple-500 transition-colors"
                >
                  <option value={showBattleModal.stream1.user.id}>@{showBattleModal.stream1.user.username} ({showBattleModal.points1} pts)</option>
                  <option value={showBattleModal.stream2.user.id}>@{showBattleModal.stream2.user.username} ({showBattleModal.points2} pts)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Premio Adicional (Monedas)</label>
                <input 
                  type="number"
                  min="0"
                  required
                  value={battlePrize}
                  onChange={(e) => setBattlePrize(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-black outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowBattleModal(null)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingBattle}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-purple-600/20"
                >
                  {submittingBattle ? 'Procesando...' : 'Finalizar y Premiar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCREENSHOT PREVIEW MODAL */}
      {previewScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity p-4">
          <div className="absolute inset-0" onClick={() => setPreviewScreenshot(null)} />
          
          <div className="relative max-w-3xl w-full bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400">Captura de Victoria PvP</span>
              <button 
                onClick={() => setPreviewScreenshot(null)}
                className="text-xs text-zinc-500 hover:text-white font-black uppercase tracking-widest"
              >
                Cerrar
              </button>
            </div>
            <div className="p-6 flex justify-center items-center bg-black/60 min-h-[300px]">
              <img 
                src={previewScreenshot} 
                className="max-h-[70vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl" 
                alt="Win Proof" 
              />
            </div>
          </div>
        </div>
      )}

      {/* DETAIL ROOM MODAL */}
      {detailRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity p-4 animate-fade-in">
          <div className="absolute inset-0" onClick={() => setDetailRoomModal(null)} />
          
          <div className="relative max-w-lg w-full bg-zinc-950 border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Detalles de Sala PvP</span>
                <h3 className="text-sm font-black text-white mt-0.5">{detailRoomModal.title}</h3>
              </div>
              <button 
                onClick={() => setDetailRoomModal(null)}
                className="text-xs text-zinc-500 hover:text-white font-black uppercase tracking-widest cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-400">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
                  <span className="text-[9px] text-zinc-500 block uppercase font-black">Apuesta PvP</span>
                  <span className="text-sm font-black text-yellow-500 flex items-center justify-center gap-1 mt-1">
                    <Coins className="w-4 h-4" /> {detailRoomModal.wager.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
                  <span className="text-[9px] text-zinc-500 block uppercase font-black">Premio Total</span>
                  <span className="text-sm font-black text-green-400 flex items-center justify-center gap-1 mt-1">
                    <Coins className="w-4 h-4" /> {(detailRoomModal.wager * 2).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Credentials */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-bold uppercase">ID de la Sala</span>
                  <span className="font-black text-white select-all font-mono">{detailRoomModal.roomCode}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-bold uppercase">Contraseña</span>
                  <span className="font-black text-yellow-500 select-all font-mono">{detailRoomModal.roomPassword}</span>
                </div>
              </div>

              {/* VS Players comparison */}
              <div className="flex items-center justify-center gap-6 bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="flex flex-col items-center gap-1">
                  <img src={detailRoomModal.creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detailRoomModal.creator.username}`} className="w-12 h-12 rounded-full border border-purple-500 bg-zinc-800" alt="" />
                  <span className="text-xs font-bold text-white">@{detailRoomModal.creator.username}</span>
                  <span className="text-[9px] text-zinc-500 font-medium">Creador</span>
                </div>
                <div className="text-md font-black text-pink-500 italic">VS</div>
                <div className="flex flex-col items-center gap-1">
                  {detailRoomModal.opponent ? (
                    <>
                      <img src={detailRoomModal.opponent.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${detailRoomModal.opponent.username}`} className="w-12 h-12 rounded-full border border-pink-500 bg-zinc-800" alt="" />
                      <span className="text-xs font-bold text-white">@{detailRoomModal.opponent.username}</span>
                      <span className="text-[9px] text-zinc-500 font-medium">Rival</span>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-700 bg-zinc-950 flex items-center justify-center text-zinc-600 font-bold">?</div>
                      <span className="text-xs font-bold text-zinc-500">Esperando...</span>
                    </>
                  )}
                </div>
              </div>

              {/* Uploaded Screenshot Win Proof */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-2">Captura de Victoria subida</h4>
                {detailRoomModal.winScreenshot ? (
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-black flex justify-center p-2">
                    <img src={detailRoomModal.winScreenshot} className="max-h-60 object-contain rounded-lg" alt="Proof" />
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/5 border border-dashed border-white/5 rounded-2xl text-xs text-zinc-500 font-bold">
                    Aún no se ha subido ninguna captura de pantalla.
                  </div>
                )}
              </div>

              {/* Winner selection buttons */}
              {detailRoomModal.status !== 'APPROVED' && (
                <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400 text-center">Seleccionar Ganador del PvP para Premiar</h4>
                  
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => handleApprovePvPWithWinner(detailRoomModal.id, detailRoomModal.creatorId)}
                      disabled={submittingPvpApproval === detailRoomModal.id}
                      className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer uppercase tracking-wider text-center"
                    >
                      Premiar Creador
                    </button>
                    {detailRoomModal.opponentId && (
                      <button
                        onClick={() => handleApprovePvPWithWinner(detailRoomModal.id, detailRoomModal.opponentId)}
                        disabled={submittingPvpApproval === detailRoomModal.id}
                        className="flex-1 py-3 bg-pink-600 hover:bg-pink-500 text-white text-xs font-black rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer uppercase tracking-wider text-center"
                      >
                        Premiar Rival
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
