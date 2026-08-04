'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Shield, ShieldAlert, BadgeCheck, CheckCircle2, XCircle, 
  Coins, Sparkles, UserMinus, UserCheck, ChevronDown, RefreshCw, Plus, ArrowLeft, Bell 
} from 'lucide-react';
import { 
  getUsersAction, 
  toggleUserStatusAction, 
  updateUserRoleAction, 
  addUserCoinsAction,
  toggleUserPostRestrictionAction,
  toggleUserChatRestrictionAction,
  sendSystemNotificationAction
} from '@/app/actions/admin';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  
  // Wallet Adjust Dialog
  const [showCoinsModal, setShowCoinsModal] = useState<string | null>(null);
  const [coinsAmount, setCoinsAmount] = useState('100');
  const [coinsAction, setCoinsAction] = useState<'ADD' | 'SUBTRACT'>('ADD');

  // Warning Notification Dialog
  const [showWarningModal, setShowWarningModal] = useState<string | null>(null);
  const [warningTitle, setWarningTitle] = useState('Infracción de Reglas');
  const [warningMessage, setWarningMessage] = useState('Estás infringiendo las reglas de la comunidad. Si sigues así, tu cuenta será suspendida.');

  const handleSendWarning = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showWarningModal) return;

    setUpdatingUserId(showWarningModal);
    try {
      const res = await sendSystemNotificationAction(showWarningModal, warningTitle, warningMessage);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Advertencia enviada exitosamente.');
        setShowWarningModal(null);
        setWarningTitle('Infracción de Reglas');
        setWarningMessage('Estás infringiendo las reglas de la comunidad. Si sigues así, tu cuenta será suspendida.');
      }
    } catch (err) {
      toast.error('Error al enviar la advertencia.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const loadUsers = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await getUsersAction();
      setUsers(data);
    } catch (err: any) {
      toast.error('Error al cargar la lista de usuarios: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(true);
  }, []);

  const handleTogglePostRestriction = async (userId: string) => {
    setUpdatingUserId(userId);
    try {
      const res = await toggleUserPostRestrictionAction(userId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.canPost ? 'Publicación permitida.' : 'Publicación restringida.');
        loadUsers();
      }
    } catch (err) {
      toast.error('Error al actualizar restricción de posts.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleToggleChatRestriction = async (userId: string) => {
    setUpdatingUserId(userId);
    try {
      const res = await toggleUserChatRestrictionAction(userId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.canChat ? 'Chat privado permitido.' : 'Chat privado restringido.');
        loadUsers();
      }
    } catch (err) {
      toast.error('Error al actualizar restricción de chat.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    setUpdatingUserId(userId);
    try {
      const res = await toggleUserStatusAction(userId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(
          res.statusActive 
            ? 'Usuario activado con éxito.' 
            : 'Usuario desactivado con éxito.'
        );
        loadUsers();
      }
    } catch (err) {
      toast.error('Error al cambiar el estado.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleChangeRole = async (userId: string, newRole: 'USER' | 'STREAMER' | 'ADMIN' | 'MODERATOR') => {
    setUpdatingUserId(userId);
    try {
      const res = await updateUserRoleAction(userId, newRole);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Rol cambiado a ${newRole} con éxito.`);
        loadUsers();
      }
    } catch (err) {
      toast.error('Error al cambiar el rol.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleAdjustCoins = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showCoinsModal) return;

    const parsedAmount = parseInt(coinsAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Por favor escribe un número válido de monedas.');
      return;
    }

    const finalAmount = coinsAction === 'ADD' ? parsedAmount : -parsedAmount;
    setUpdatingUserId(showCoinsModal);
    
    try {
      const res = await addUserCoinsAction(showCoinsModal, finalAmount);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(
          coinsAction === 'ADD' 
            ? `Se acreditaron ${parsedAmount} monedas.` 
            : `Se restaron ${parsedAmount} monedas.`
        );
        setShowCoinsModal(null);
        setCoinsAmount('100');
        loadUsers();
      }
    } catch (err) {
      toast.error('Error al ajustar el saldo.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/admin" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-wider mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Estadísticas
          </Link>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-500" /> Administración de Usuarios
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Activa, desactiva, cambia roles y administra los saldos de la plataforma.</p>
        </div>

        <button 
          onClick={() => loadUsers()}
          className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-xs font-bold rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Recargar Lista
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex bg-zinc-900 border border-white/5 p-4 rounded-2xl items-center gap-3">
        <Search className="w-5 h-5 text-zinc-500 shrink-0 ml-1" />
        <input 
          type="text"
          placeholder="Buscar por nombre de usuario o correo electrónico..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-zinc-500 font-semibold"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-xs text-zinc-500 hover:text-white uppercase font-black tracking-wider"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Users Grid/List Table */}
      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-purple-500/25 border-t-purple-500 animate-spin" />
            <span className="text-xs text-zinc-400 font-bold tracking-widest animate-pulse uppercase">Cargando Usuarios...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-zinc-700 mx-auto mb-3 animate-pulse" />
            <h4 className="text-sm font-bold text-zinc-400">Ningún usuario coincide</h4>
            <p className="text-xs text-zinc-600 mt-1">Intenta buscar por otro nombre o limpia el filtro.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-zinc-950/30 text-[10px] uppercase font-black tracking-widest text-zinc-500">
                  <th className="px-6 py-4.5">Usuario / Correo</th>
                  <th className="px-6 py-4.5">Fecha Registro</th>
                  <th className="px-6 py-4.5">Rol de Sistema</th>
                  <th className="px-6 py-4.5">Monedas 💎</th>
                  <th className="px-6 py-4.5">Restricciones</th>
                  <th className="px-6 py-4.5">Estado Cuenta</th>
                  <th className="px-6 py-4.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => {
                  const isDeactivated = user.statusActive === false;

                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-white/[0.02] transition-colors ${
                        isDeactivated ? 'opacity-60 bg-red-950/[0.03]' : ''
                      }`}
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                            className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800 shrink-0" 
                            alt="" 
                          />
                          <div className="min-w-0">
                            <span className="text-sm font-black text-white flex items-center gap-1.5 truncate">
                              {user.username} 
                              {user.role === 'ADMIN' && <Shield className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/10" />}
                              {user.role === 'STREAMER' && <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />}
                            </span>
                            <span className="text-xs text-zinc-500 truncate block mt-0.5">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Reg Date */}
                      <td className="px-6 py-4 text-xs text-zinc-400 font-bold">
                        {new Date(user.createdAt).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>

                      {/* Role selection */}
                      <td className="px-6 py-4">
                        <select
                          disabled={updatingUserId === user.id}
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as any)}
                          className="bg-zinc-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold text-white outline-none cursor-pointer focus:border-purple-500 transition-colors"
                        >
                          <option value="USER" className="bg-zinc-950 text-white">USER</option>
                          <option value="STREAMER" className="bg-zinc-950 text-white">STREAMER</option>
                          <option value="MODERATOR" className="bg-zinc-950 text-white">MODERATOR</option>
                          <option value="ADMIN" className="bg-zinc-950 text-white">ADMIN</option>
                        </select>
                      </td>

                      {/* Coins balance */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-yellow-500">
                            {user.wallet?.balance?.toLocaleString() || 0}
                          </span>
                          <button 
                            onClick={() => {
                              setCoinsAction('ADD');
                              setShowCoinsModal(user.id);
                            }}
                            className="p-1 rounded bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 transition-colors"
                            title="Ajustar Monedas"
                          >
                            <Coins className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Restrictions checkboxes */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 text-[10px] font-black uppercase tracking-wider">
                          <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white transition-colors">
                            <input 
                              type="checkbox"
                              checked={user.canPost === false}
                              disabled={updatingUserId === user.id}
                              onChange={() => handleTogglePostRestriction(user.id)}
                              className="accent-purple-500 rounded border-white/10 bg-zinc-950 w-3.5 h-3.5 cursor-pointer"
                            />
                            <span>Bloquear Postear</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white transition-colors">
                            <input 
                              type="checkbox"
                              checked={user.canChat === false}
                              disabled={updatingUserId === user.id}
                              onChange={() => handleToggleChatRestriction(user.id)}
                              className="accent-purple-500 rounded border-white/10 bg-zinc-950 w-3.5 h-3.5 cursor-pointer"
                            />
                            <span>Bloquear Chat</span>
                          </label>
                        </div>
                      </td>

                      {/* statusActive Badge */}
                      <td className="px-6 py-4">
                        {isDeactivated ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600/10 border border-red-500/20 text-red-500 uppercase tracking-wide">
                            <XCircle className="w-3 h-3" /> Desactivado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-green-600/10 border border-green-500/20 text-green-400 uppercase tracking-wide">
                            <CheckCircle2 className="w-3 h-3" /> Activo
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            type="button"
                            disabled={updatingUserId === user.id}
                            onClick={() => setShowWarningModal(user.id)}
                            className="px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98] flex items-center gap-1"
                          >
                            <Bell className="w-3 h-3 text-yellow-500" /> Advertir
                          </button>
                          <button
                            type="button"
                            disabled={updatingUserId === user.id}
                            onClick={() => handleToggleStatus(user.id, user.statusActive)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98] ${
                              isDeactivated
                                ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/15'
                                : 'bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20'
                            }`}
                          >
                            {isDeactivated ? 'Activar' : 'Desactivar'}
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* COINS ADJUSTMENT MODAL */}
      {showCoinsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity p-4">
          <div className="absolute inset-0" onClick={() => setShowCoinsModal(null)} />
          
          <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.2)] z-10 animate-in zoom-in-95">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
            
            <form onSubmit={handleAdjustCoins} className="p-6 flex flex-col gap-4">
              <h3 className="text-base font-black text-white flex items-center gap-1.5">
                <Coins className="w-5 h-5 text-yellow-500" /> Ajustar Saldo de Monedas
              </h3>
              
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setCoinsAction('ADD')}
                  className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all border ${
                    coinsAction === 'ADD' 
                      ? 'bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/15' 
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  Acreditar
                </button>
                <button
                  type="button"
                  onClick={() => setCoinsAction('SUBTRACT')}
                  className={`flex-1 py-2 text-xs font-black uppercase rounded-xl transition-all border ${
                    coinsAction === 'SUBTRACT' 
                      ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/15' 
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  Restar
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cantidad de Monedas</label>
                <input 
                  type="number"
                  min="1"
                  required
                  value={coinsAmount}
                  onChange={(e) => setCoinsAmount(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-black outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCoinsModal(null)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updatingUserId !== null}
                  className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WARNING NOTIFICATION MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity p-4">
          <div className="absolute inset-0" onClick={() => setShowWarningModal(null)} />
          
          <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.25)] z-10 animate-in zoom-in-95">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
            
            <form onSubmit={handleSendWarning} className="p-6 flex flex-col gap-4">
              <h3 className="text-base font-black text-white flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Enviar Advertencia a Usuario
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Asunto / Tipo de Regla</label>
                <select
                  value={warningTitle}
                  onChange={(e) => {
                    setWarningTitle(e.target.value);
                    if (e.target.value === 'Infracción de Reglas') {
                      setWarningMessage('Estás infringiendo las reglas de la comunidad. Si sigues así, tu cuenta será bloqueada.');
                    } else if (e.target.value === 'Comportamiento Inadecuado') {
                      setWarningMessage('Hemos recibido reportes sobre tu comportamiento hostil. Evita agresiones o tu cuenta será suspendida.');
                    } else if (e.target.value === 'Fraude en Apuestas PvP') {
                      setWarningMessage('Se detectó un reporte de fraude o screenshot alterada en tu sala PvP. Respeta las reglas de wagers.');
                    }
                  }}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-bold outline-none focus:border-red-500 transition-colors"
                >
                  <option value="Infracción de Reglas" className="bg-zinc-950 text-white">Infracción de Reglas Generales</option>
                  <option value="Comportamiento Inadecuado" className="bg-zinc-950 text-white">Comportamiento Inadecuado / Acoso</option>
                  <option value="Fraude en Apuestas PvP" className="bg-zinc-950 text-white">Fraude en Apuestas PvP (Wagers)</option>
                  <option value="Advertencia Personalizada" className="bg-zinc-950 text-white">Mensaje Personalizado</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Mensaje de Advertencia</label>
                <textarea 
                  required
                  rows={4}
                  value={warningMessage}
                  onChange={(e) => setWarningMessage(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-medium outline-none focus:border-red-500 transition-colors resize-none leading-relaxed"
                  placeholder="Escribe la advertencia detallada..."
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowWarningModal(null)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updatingUserId !== null}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-red-600/20"
                >
                  Enviar Alerta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
