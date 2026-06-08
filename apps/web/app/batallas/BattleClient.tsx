'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Swords, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, Gift, Eye,
  Sparkles, Flame, Send, X, Coins, Sparkle, Clock, Award
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useCreatorStore } from '@/store/useCreatorStore';
import {
  getLiveStreamers,
  getOngoingBattles,
  getUpcomingStreamers,
  getBattleHistory,
  createBattleInvite,
  respondToBattleInvite,
  getPendingInvite,
  updateBattlePoints,
  checkAndUpdateBattleStatus,
  getBattleDetails,
  sendBattleChatMessage,
  getUserWalletBalance,
  addWalletCoins,
  checkUserIsLive
} from '@/app/actions/battle';

interface GiftType {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  color: string;
}

const AVAILABLE_GIFTS: GiftType[] = [
  { id: 'rose', name: 'Rosa', emoji: '🌹', cost: 5, color: 'from-red-500 to-pink-500' },
  { id: 'heart', name: 'Corazón', emoji: '❤️', cost: 50, color: 'from-pink-500 to-rose-500' },
  { id: 'diamond', name: 'Diamante', emoji: '💎', cost: 200, color: 'from-blue-400 to-indigo-500' },
  { id: 'crown', name: 'Corona', emoji: '👑', cost: 1000, color: 'from-yellow-400 to-amber-500' },
  { id: 'rocket', name: 'Cohete', emoji: '🚀', cost: 5000, color: 'from-purple-500 to-indigo-600' },
  { id: 'lion', name: 'León', emoji: '🦁', cost: 10000, color: 'from-orange-400 to-red-600 font-bold' },
];

export default function BattleClient({ user }: { user: any }) {
  // Wallet & User Status
  const [userCoins, setUserCoins] = useState(0);
  const [userIsLive, setUserIsLive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'envivo' | 'proximas' | 'historial'>('envivo');

  // Database-backed Listings
  const [ongoingBattles, setOngoingBattles] = useState<any[]>([]);
  const [upcomingStreamers, setUpcomingStreamers] = useState<any[]>([]);
  const [battleHistory, setBattleHistory] = useState<any[]>([]);

  // Challenge and Creator invite modal states
  const [challengeableStreamers, setChallengeableStreamers] = useState<any[]>([]);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  // Active sintonized battle states
  const [activeBattleId, setActiveBattleId] = useState<string | null>(null);
  const [activeBattle, setActiveBattle] = useState<any | null>(null);
  const [activeBattleMessages, setActiveBattleMessages] = useState<any[]>([]);
  const [selectedStreamer, setSelectedStreamer] = useState<'left' | 'right'>('left');
  const [userComment, setUserComment] = useState('');

  // Local scores for instant (optimistic UI) feedback
  const [localLeftPoints, setLocalLeftPoints] = useState(0);
  const [localRightPoints, setLocalRightPoints] = useState(0);
  const [isPointsFlashing, setIsPointsFlashing] = useState<'left' | 'right' | null>(null);

  // Clock Countdown State
  const [battleTimer, setBattleTimer] = useState(0);

  // Flying hearts/gifts animation overlay
  const [flyingGifts, setFlyingGifts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [isGiftPopupOpen, setIsGiftPopupOpen] = useState(false);

  // Pending incoming challenge modal
  const [incomingInvite, setIncomingInvite] = useState<any | null>(null);

  // Winner overlay state
  const [winnerInfo, setWinnerInfo] = useState<any | null>(null);

  // Chat scroll anchor refs
  const leftChatRef = useRef<HTMLDivElement>(null);
  const rightChatRef = useRef<HTMLDivElement>(null);

  // Tap-tap Ref accumulation (throttled points batching)
  const tapsLeftRef = useRef(0);
  const tapsRightRef = useRef(0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 1. Initial configuration and data load on mount
  useEffect(() => {
    async function loadData() {
      try {
        const coins = await getUserWalletBalance();
        setUserCoins(coins);

        const live = await checkUserIsLive();
        setUserIsLive(live);

        const ongoing = await getOngoingBattles();
        setOngoingBattles(ongoing);

        const upcoming = await getUpcomingStreamers();
        setUpcomingStreamers(upcoming);

        const history = await getBattleHistory();
        setBattleHistory(history);

        // Auto reconnect current user to their ongoing battle if they are streaming
        const myOngoing = ongoing.find(
          b => b.stream1.userId === user.id || b.stream2.userId === user.id
        );
        if (myOngoing) {
          setActiveBattleId(myOngoing.id);
        }
      } catch (err) {
        console.error('Error initialization data:', err);
      }
    }
    loadData();
  }, [user.id]);

  // 2. Database polling loop (every 3 seconds) for real-time syncing
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Poll user wallet balance and live status
        const coins = await getUserWalletBalance();
        setUserCoins(coins);

        const live = await checkUserIsLive();
        setUserIsLive(live);

        // Poll current tab contents
        if (activeTab === 'envivo') {
          const ongoing = await getOngoingBattles();
          setOngoingBattles(ongoing);
        } else if (activeTab === 'proximas') {
          const upcoming = await getUpcomingStreamers();
          setUpcomingStreamers(upcoming);
        } else if (activeTab === 'historial') {
          const history = await getBattleHistory();
          setBattleHistory(history);
        }

        // Poll incoming challenges if not currently playing/viewing an ongoing battle
        if (!activeBattleId) {
          const invite = await getPendingInvite();
          setIncomingInvite(invite);
        }

        // Poll sintonized battle details
        if (activeBattleId) {
          const details = await getBattleDetails(activeBattleId);
          if (details) {
            const { battle, messages } = details;
            setActiveBattle(battle);
            setActiveBattleMessages(messages);

            // Sync scores (ensure local optimistic UI isn't overwritten with smaller points)
            setLocalLeftPoints(prev => Math.max(prev, battle.points1));
            setLocalRightPoints(prev => Math.max(prev, battle.points2));

            // Set countdown
            if (battle.status === 'ONGOING' && battle.endTime) {
              const remaining = Math.max(0, Math.floor((new Date(battle.endTime).getTime() - Date.now()) / 1000));
              setBattleTimer(remaining);

              // If timer ends, run status checker to transition ONGOING -> FINISHED
              if (remaining === 0) {
                const checkRes = await checkAndUpdateBattleStatus(battle.id);
                if (checkRes.success && checkRes.battle) {
                  const updatedBattle = checkRes.battle as any;
                  setActiveBattle(updatedBattle);

                  let winnerName = 'Empate';
                  let winnerAvatar = '';
                  if (updatedBattle.winnerId) {
                    if (updatedBattle.winnerId === updatedBattle.stream1.userId) {
                      winnerName = updatedBattle.stream1.user.username;
                      winnerAvatar = updatedBattle.stream1.user.avatar || '';
                    } else if (updatedBattle.winnerId === updatedBattle.stream2.userId) {
                      winnerName = updatedBattle.stream2.user.username;
                      winnerAvatar = updatedBattle.stream2.user.avatar || '';
                    }
                  }
                  setWinnerInfo({ winnerName, winnerAvatar, points1: updatedBattle.points1, points2: updatedBattle.points2 });
                }
              }
            } else if (battle.status === 'PENDING') {
              setBattleTimer(120);
            } else if (battle.status === 'CANCELLED') {
              triggerToast('La invitación de batalla fue rechazada o cancelada.');
              setActiveBattleId(null);
              setActiveBattle(null);
            } else if (battle.status === 'FINISHED') {
              setBattleTimer(0);
              if (!winnerInfo) {
                let winnerName = 'Empate';
                let winnerAvatar = '';
                if (battle.winnerId) {
                  if (battle.winnerId === battle.stream1.userId) {
                    winnerName = battle.stream1.user.username;
                    winnerAvatar = battle.stream1.user.avatar || '';
                  } else if (battle.winnerId === battle.stream2.userId) {
                    winnerName = battle.stream2.user.username;
                    winnerAvatar = battle.stream2.user.avatar || '';
                  }
                }
                setWinnerInfo({ winnerName, winnerAvatar, points1: battle.points1, points2: battle.points2 });
              }
            }
          } else {
            // Battle not found in DB
            setActiveBattleId(null);
            setActiveBattle(null);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeBattleId, activeTab, winnerInfo]);

  // Smooth local countdown interval (every second)
  useEffect(() => {
    if (activeBattleId && activeBattle?.status === 'ONGOING' && battleTimer > 0) {
      const timer = setInterval(() => {
        setBattleTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeBattleId, activeBattle?.status, battleTimer]);

  // Auto-scroll chats when new comments arrive
  useEffect(() => {
    if (leftChatRef.current) {
      leftChatRef.current.scrollTop = leftChatRef.current.scrollHeight;
    }
  }, [activeBattleMessages]);

  useEffect(() => {
    if (rightChatRef.current) {
      rightChatRef.current.scrollTop = rightChatRef.current.scrollHeight;
    }
  }, [activeBattleMessages]);

  // 3. Batched tap-tap point synchronization every 2.5 seconds
  useEffect(() => {
    if (!activeBattleId || !activeBattle || activeBattle.status !== 'ONGOING') return;

    const syncInterval = setInterval(async () => {
      if (tapsLeftRef.current > 0) {
        const points = tapsLeftRef.current;
        tapsLeftRef.current = 0;
        await updateBattlePoints(activeBattleId, 1, points, false);
      }
      if (tapsRightRef.current > 0) {
        const points = tapsRightRef.current;
        tapsRightRef.current = 0;
        await updateBattlePoints(activeBattleId, 2, points, false);
      }
    }, 2500);

    return () => clearInterval(syncInterval);
  }, [activeBattleId, activeBattle]);

  // Format countdown clock minutes & seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 4. Handle tap-tap on screen area
  const handleScreenTap = (streamerSide: 'left' | 'right') => {
    if (!activeBattle || activeBattle.status !== 'ONGOING') return;

    // Local optimistic update
    if (streamerSide === 'left') {
      setLocalLeftPoints(prev => prev + 1);
      tapsLeftRef.current += 1;
      setIsPointsFlashing('left');
    } else {
      setLocalRightPoints(prev => prev + 1);
      tapsRightRef.current += 1;
      setIsPointsFlashing('right');
    }
    setTimeout(() => setIsPointsFlashing(null), 500);

    // Spawn floating heart
    const newFlyingHeart = {
      id: Date.now() + Math.random(),
      emoji: '❤️',
      x: Math.floor(Math.random() * 120) - 60,
      y: Math.floor(Math.random() * 120) - 60
    };
    setFlyingGifts(prev => [...prev, newFlyingHeart]);
    setTimeout(() => {
      setFlyingGifts(prev => prev.filter(g => g.id !== newFlyingHeart.id));
    }, 2000);
  };

  // 5. Send Gifts modal handler
  const handleSendGift = async (gift: GiftType) => {
    if (!activeBattleId || !activeBattle) return;

    if (userCoins < gift.cost) {
      triggerToast('❌ Monedas insuficientes. ¡Compra o recarga monedas en tu wallet!');
      return;
    }

    const playerNum = selectedStreamer === 'left' ? 1 : 2;

    // Optimistic deductions
    setUserCoins(prev => prev - gift.cost);
    if (playerNum === 1) {
      setLocalLeftPoints(prev => prev + gift.cost);
      setIsPointsFlashing('left');
    } else {
      setLocalRightPoints(prev => prev + gift.cost);
      setIsPointsFlashing('right');
    }
    setTimeout(() => setIsPointsFlashing(null), 600);

    // Gift animation
    const newFlyingGift = {
      id: Date.now() + Math.random(),
      emoji: gift.emoji,
      x: Math.floor(Math.random() * 100) - 50,
      y: Math.floor(Math.random() * 100) - 50
    };
    setFlyingGifts(prev => [...prev, newFlyingGift]);
    setTimeout(() => {
      setFlyingGifts(prev => prev.filter(g => g.id !== newFlyingGift.id));
    }, 2000);

    // Update database points, wallet deduction & chat injection
    const res = await updateBattlePoints(activeBattleId, playerNum, gift.cost, true, gift.id);

    if (res.error) {
      triggerToast(`❌ Error: ${res.error}`);
      // Revert optimistic modifications
      setUserCoins(prev => prev + gift.cost);
      if (playerNum === 1) {
        setLocalLeftPoints(prev => prev - gift.cost);
      } else {
        setLocalRightPoints(prev => prev - gift.cost);
      }
    } else if (res.success && res.battle) {
      setActiveBattle(res.battle);
      setLocalLeftPoints(res.battle.points1);
      setLocalRightPoints(res.battle.points2);

      // Re-fetch correct wallet coins
      const balance = await getUserWalletBalance();
      setUserCoins(balance);

      triggerToast(`🎁 ¡Regalo ${gift.name} enviado con éxito!`);
      setIsGiftPopupOpen(false);
    }
  };

  // 6. Send user comment to specific streamer's chat logs
  const handleSendCustomMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim() || !activeBattle) return;

    const streamId = selectedStreamer === 'left' ? activeBattle.stream1Id : activeBattle.stream2Id;
    const content = userComment.trim();
    setUserComment('');

    const res = await sendBattleChatMessage(streamId, content);
    if (res.error) {
      triggerToast(`❌ Error: ${res.error}`);
    } else {
      // Optimistic layout display
      const newMsg = {
        id: Date.now(),
        type: 'chat' as const,
        user: 'Tú',
        text: content,
        time: 'ahora',
        color: 'text-pink-400',
        streamId: streamId
      };
      setActiveBattleMessages(prev => [...prev, newMsg]);
      triggerToast('¡Comentario enviado! 💬');
    }
  };

  // 7. Wallet Recharge simulation using database updates
  const handleRechargeCoins = async (amount: number) => {
    const res = await addWalletCoins(amount);
    if (res.error) {
      triggerToast(`❌ Error: ${res.error}`);
    } else if (res.success && res.balance !== undefined) {
      setUserCoins(res.balance);
      triggerToast(`💎 ¡Recarga de +${amount} monedas completada en base de datos!`);
    }
  };

  // 8. Open Challenge / Create Battle Invite dialog
  const handleCreateBattleClick = async () => {
    const live = await checkUserIsLive();
    if (!live) {
      // Stream is inactive. Prompt them to stream.
      setUserIsLive(false);
      setIsChallengeModalOpen(true);
      return;
    }

    setIsSendingInvite(true);
    const streamers = await getLiveStreamers();
    setChallengeableStreamers(streamers);
    setIsChallengeModalOpen(true);
    setIsSendingInvite(false);
  };

  // 9. Send invite challenge challenge
  const handleSendChallenge = async (opponentStreamId: string, username: string) => {
    setIsSendingInvite(true);
    const res = await createBattleInvite(opponentStreamId);
    setIsSendingInvite(false);

    if (res.error) {
      triggerToast(`❌ Error: ${res.error}`);
    } else if (res.success && res.battleId) {
      setActiveBattleId(res.battleId);
      setIsChallengeModalOpen(false);
      triggerToast(`⚔️ Desafío enviado a @${username}. Esperando confirmación.`);
    }
  };

  // 10. Accept or reject pending challenge invite
  const handleInviteDecision = async (accept: boolean) => {
    if (!incomingInvite) return;
    
    const inviteId = incomingInvite.id;
    const oppUsername = incomingInvite.stream1.user.username;
    
    setIncomingInvite(null);
    const res = await respondToBattleInvite(inviteId, accept);

    if (res.error) {
      triggerToast(`❌ Error: ${res.error}`);
    } else if (res.success) {
      if (accept) {
        setActiveBattleId(inviteId);
        triggerToast(`⚔️ ¡Comienza el combate contra @${oppUsername}!`);
      } else {
        triggerToast(`Rechazaste la invitación de batalla de @${oppUsername}`);
      }
    }
  };

  // Cancel a pending sent invite
  const handleCancelPendingChallenge = async () => {
    if (!activeBattleId) return;
    await respondToBattleInvite(activeBattleId, false);
    setActiveBattleId(null);
    setActiveBattle(null);
    triggerToast('Desafío cancelado.');
  };

  // Split Chat messages based on stream assignment
  const leftChat = activeBattleMessages.filter(m => activeBattle && m.streamId === activeBattle.stream1Id);
  const rightChat = activeBattleMessages.filter(m => activeBattle && m.streamId === activeBattle.stream2Id);

  // VS Point bar percentage calculation
  const totalBattlePoints = localLeftPoints + localRightPoints;
  const leftPercent = totalBattlePoints > 0 ? (localLeftPoints / totalBattlePoints) * 100 : 50;

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white relative overflow-hidden font-sans">
      
      {/* ----------------- LEFT SIDEBAR ----------------- */}
      <aside className="hidden lg:flex w-[260px] border-r border-white/5 bg-[#0a0a0f] flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar">
        <Link href="/dashboard?tab=inicio" className="flex items-center gap-3 mb-8 px-2">
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
          <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-xl transition-colors font-bold">
            <Swords className="w-5 h-5 text-pink-400" /> Batallas
          </Link>
          <Link href="/torneos" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Trophy className="w-5 h-5" /> Torneos
          </Link>
        </nav>

        <nav className="flex flex-col gap-1 mb-8">
          <Link href="/mensajes" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><MessageSquare className="w-5 h-5" /> Mensajes</div>
          </Link>
          <Link href="/notificaciones" className="flex items-center justify-between px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <div className="flex items-center gap-3"><Bell className="w-5 h-5" /> Notificaciones</div>
          </Link>
          <Link href={`/u/${user.username}`} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <User className="w-5 h-5" /> Perfil
          </Link>
        </nav>

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
             <span className="font-black text-lg">{userCoins.toLocaleString()}</span>
           </div>
           <button onClick={() => handleRechargeCoins(500)} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300">Comprar monedas</button>
        </div>

        {/* Rewards / Levels progress bar */}
        <div className="bg-[#12152b]/50 border border-white/5 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">Progreso</span>
            <span className="text-[10px] font-black text-pink-400">Nivel 24</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[75%]" />
          </div>
          <span className="text-[9px] text-zinc-500 font-bold">75% para Nivel 25</span>
        </div>

        <div className="mt-auto flex items-center gap-2 px-2 py-3 border-t border-white/5">
          <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /></div>
            <div className="text-[10px] text-zinc-500">Nivel 24 · XP al día</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors shrink-0"><LogOut className="w-3.5 h-3.5" /></button>
        </div>
      </aside>

      {/* ----------------- MAIN ARENA PANEL ----------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* HEADER */}
        <header className="h-16 border-b border-white/5 px-4 lg:px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
               <Play className="text-white fill-white w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black tracking-tighter">LiveX</span>
          </div>
          
          <div className="flex items-center gap-4 text-[13px] sm:text-[14px] font-bold overflow-x-auto scrollbar-none py-1 pr-2 shrink-0 max-w-[65%] lg:hidden">
            <Link href="/dashboard?tab=siguiendo" className="transition-all shrink-0 text-zinc-500">Siguiendo</Link>
            <Link href="/dashboard?tab=parati" className="transition-all shrink-0 text-zinc-500">Para ti</Link>
            <Link href="/batallas" className="text-white border-b-2 border-pink-500 pb-0.5 flex items-center gap-0.5 shrink-0 font-black">
              Batallas <Swords className="w-3.5 h-3.5 text-pink-500" />
            </Link>
            <Link href="/explorar" className="text-zinc-500 hover:text-white flex items-center gap-0.5 shrink-0">Explorar</Link>
          </div>

          <div className="w-72 lg:w-96 relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar streamers, batallas, retos..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1.5 hidden sm:flex items-center gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)] shrink-0 cursor-pointer animate-pulse" onClick={() => handleRechargeCoins(500)}>
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-white/10 hidden sm:flex">
              <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-1">{user.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● En línea</div>
              </div>
            </div>
          </div>
        </header>

        {/* FEED / CONTENT ARENA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 lg:p-6 pb-24">
          
          {/* TAB SYSTEM AND TITLE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                Batallas en vivo
              </h2>
              <p className="text-xs text-zinc-500 font-bold mt-0.5">Apoya a tus creadores preferidos en tiempo real (Base de datos Neon)</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="bg-white/5 border border-white/5 rounded-xl p-0.5 flex gap-1">
                <button 
                  onClick={() => { setActiveTab('envivo'); setActiveBattleId(null); setActiveBattle(null); setWinnerInfo(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'envivo' && !activeBattleId ? 'bg-[#181330] text-pink-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}
                >
                  En vivo
                </button>
                <button 
                  onClick={() => { setActiveTab('proximas'); setActiveBattleId(null); setActiveBattle(null); setWinnerInfo(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'proximas' ? 'bg-[#181330] text-pink-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}
                >
                  Próximas
                </button>
                <button 
                  onClick={() => { setActiveTab('historial'); setActiveBattleId(null); setActiveBattle(null); setWinnerInfo(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'historial' ? 'bg-[#181330] text-pink-400 border border-purple-500/20' : 'text-zinc-400 hover:text-white'}`}
                >
                  Historial
                </button>
              </div>

              <button 
                onClick={handleCreateBattleClick} 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/10 shrink-0"
              >
                Crear batalla
              </button>
            </div>
          </div>

          {/* ----------------- ACTIVE BATTLE TUNED-IN VIEW (Split Screen PvP) ----------------- */}
          {activeBattleId && activeBattle ? (
            <div className="flex flex-col gap-6">
              
              {/* BACK / QUIT BUTTON */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => { setActiveBattleId(null); setActiveBattle(null); setWinnerInfo(null); }}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-bold flex items-center gap-2"
                >
                  ← Salir de la arena
                </button>
                {activeBattle.status === 'PENDING' && (
                  <button 
                    onClick={handleCancelPendingChallenge}
                    className="px-4 py-2 rounded-xl bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 text-red-500 transition-colors text-xs font-bold"
                  >
                    Cancelar desafío
                  </button>
                )}
              </div>

              {/* PENDING CHALLENGE DISPLAY */}
              {activeBattle.status === 'PENDING' ? (
                <div className="bg-[#0b0a12] border border-white/5 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-6 min-h-[350px]">
                  <div className="relative">
                    <div className="w-24 h-24 bg-pink-500/10 blur-xl rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <Swords className="w-16 h-16 text-pink-500 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider">Esperando al contrincante...</h3>
                  <p className="text-zinc-400 text-xs max-w-md">
                    Has enviado un desafío a <span className="text-pink-400 font-bold">@{activeBattle.stream2?.user?.username}</span>.
                    La batalla de 2 minutos comenzará automáticamente cuando el oponente acepte la invitación.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-semibold animate-pulse">
                    <Clock className="w-3.5 h-3.5" /> Esperando respuesta en tiempo real...
                  </div>
                </div>
              ) : (
                /* ONGOING OR FINISHED BATTLE ARENA */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* ARENA CONTAINER */}
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-[#0b0a12] border border-white/5 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
                      
                      <div className="absolute top-0 left-0 w-48 h-48 bg-pink-500/5 blur-3xl rounded-full pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

                      {/* Arena Header: Timer */}
                      <div className="flex items-center justify-between mb-4 z-10 relative">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-pink-600 text-white text-[9px] font-black rounded uppercase tracking-wider">Batalla PvP</span>
                          <span className="text-[10px] text-zinc-500 font-bold">2 minutos</span>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 flex items-center gap-1.5 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                          <span className="text-xs font-black tracking-widest">{formatTime(battleTimer)}</span>
                        </div>
                      </div>

                      {/* SPLIT SCREEN VISUAL AREA */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 mb-6">
                        
                        {/* Stream 1 (Left Player) */}
                        <div 
                          onClick={() => handleScreenTap('left')}
                          className={`rounded-2xl overflow-hidden relative group border transition-all duration-300 cursor-pointer select-none bg-zinc-950 ${selectedStreamer === 'left' ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.2)]' : 'border-white/5 hover:border-white/20'}`}
                        >
                          <div className="w-full h-[220px] sm:h-[300px] flex items-center justify-center relative p-6">
                            <img 
                              src={activeBattle.stream1?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBattle.stream1?.user?.username}`} 
                              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-500 shadow-2xl relative z-10" 
                              alt="" 
                            />
                            {/* Live video mock placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-purple-950/20 to-black/85" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none font-black text-6xl">LIVE</div>
                          </div>
                          
                          <span className="absolute top-3 left-3 px-2 py-0.5 bg-pink-600 text-white text-[9px] font-black rounded-md flex items-center gap-1 shadow-lg">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Desafiante
                          </span>
                          
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1 truncate">
                                @{activeBattle.stream1?.user?.username} <BadgeCheck className="w-3.5 h-3.5 text-pink-400" />
                              </div>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-bold bg-black/60 px-2.5 py-1 rounded-lg">
                              {localLeftPoints.toLocaleString()} pts
                            </span>
                          </div>
                        </div>

                        {/* Stream 2 (Right Player) */}
                        <div 
                          onClick={() => handleScreenTap('right')}
                          className={`rounded-2xl overflow-hidden relative group border transition-all duration-300 cursor-pointer select-none bg-zinc-950 ${selectedStreamer === 'right' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-white/5 hover:border-white/20'}`}
                        >
                          <div className="w-full h-[220px] sm:h-[300px] flex items-center justify-center relative p-6">
                            <img 
                              src={activeBattle.stream2?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBattle.stream2?.user?.username}`} 
                              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-cyan-500 shadow-2xl relative z-10" 
                              alt="" 
                            />
                            {/* Live video mock placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-cyan-950/20 to-black/85" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none font-black text-6xl">LIVE</div>
                          </div>

                          <span className="absolute top-3 left-3 px-2 py-0.5 bg-cyan-600 text-white text-[9px] font-black rounded-md flex items-center gap-1 shadow-lg">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> Oponente
                          </span>

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1 truncate">
                                @{activeBattle.stream2?.user?.username} <BadgeCheck className="w-3.5 h-3.5 text-cyan-400" />
                              </div>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-bold bg-black/60 px-2.5 py-1 rounded-lg">
                              {localRightPoints.toLocaleString()} pts
                            </span>
                          </div>
                        </div>

                        {/* Mid VS Badge overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0b0a12] border-2 border-purple-500 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse hidden sm:flex pointer-events-none">
                          <Swords className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>

                      {/* POINT RATIO PROGRESS BAR */}
                      <div className="mb-6 relative z-10">
                        <div className="flex items-center justify-between mb-2 text-xs font-bold">
                          <span className={isPointsFlashing === 'left' ? 'text-pink-400 scale-105 transition-transform' : 'text-pink-500'}>
                            {localLeftPoints.toLocaleString()} pts
                          </span>
                          <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">TAP PANTALLAS PARA CORAZONES</span>
                          <span className={isPointsFlashing === 'right' ? 'text-cyan-400 scale-105 transition-transform' : 'text-cyan-500'}>
                            {localRightPoints.toLocaleString()} pts
                          </span>
                        </div>

                        {/* Scoring bar slider */}
                        <div className="w-full h-4 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-white/5 flex relative shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 rounded-l-full transition-all duration-500"
                            style={{ width: `${leftPercent}%` }}
                          />
                          <div className="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,1)]" style={{ left: `${leftPercent}%` }} />
                          <div 
                            className="h-full bg-gradient-to-l from-indigo-600 via-cyan-500 to-cyan-400 rounded-r-full transition-all duration-500"
                            style={{ width: `${100 - leftPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* SUPPORT SELECTOR AND GIFT BUTTON */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-4 relative z-10">
                        <div className="flex items-center bg-white/5 border border-white/5 p-0.5 rounded-xl">
                          <button 
                            onClick={() => setSelectedStreamer('left')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedStreamer === 'left' ? 'bg-pink-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                          >
                            Apoyar @{activeBattle.stream1?.user?.username}
                          </button>
                          <button 
                            onClick={() => setSelectedStreamer('right')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${selectedStreamer === 'right' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                          >
                            Apoyar @{activeBattle.stream2?.user?.username}
                          </button>
                        </div>

                        <button 
                          onClick={() => setIsGiftPopupOpen(true)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 animate-pulse"
                        >
                          <Gift className="w-4 h-4" /> Enviar regalo
                        </button>
                      </div>

                      {/* FLOATING GIFTS OVERLAY */}
                      <div className="absolute inset-0 pointer-events-none z-30">
                        {flyingGifts.map(gift => (
                          <div 
                            key={gift.id} 
                            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-5xl animate-float-heart pointer-events-none select-none"
                            style={{ 
                              left: `${50 + gift.x / 4}%`,
                              '--rotate-deg': `${gift.y}deg`
                            } as React.CSSProperties}
                          >
                            {gift.emoji}
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* DOUBLE CHAT COLUMN VIEW */}
                  <div className="flex flex-col gap-4">
                    
                    {/* Left & Right Separate Chats container */}
                    <div className="grid grid-cols-1 gap-4 flex-1 min-h-[380px]">
                      
                      {/* Left Streamer Chat Container */}
                      <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-4 flex flex-col h-[200px] relative overflow-hidden">
                        <span className="text-[10px] font-black uppercase tracking-wider text-pink-400 mb-2 block border-b border-white/5 pb-1">
                          Chat @{activeBattle.stream1?.user?.username}
                        </span>
                        
                        <div ref={leftChatRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2.5 pr-1">
                          {leftChat.length === 0 ? (
                            <div className="text-[10px] text-zinc-600 italic text-center my-auto">Sin mensajes en este stream</div>
                          ) : (
                            leftChat.map(msg => (
                              <div key={msg.id} className={`text-[10px] p-2 rounded-xl border ${msg.type === 'gift' ? 'bg-gradient-to-r from-purple-950/20 to-pink-950/20 border-purple-500/10' : 'bg-white/5 border-transparent'}`}>
                                <span className="font-bold text-zinc-300 mr-1.5">{msg.user}:</span>
                                {msg.type === 'gift' ? (
                                  <span className="text-yellow-400 font-bold">envió {msg.giftName} {msg.giftEmoji}</span>
                                ) : (
                                  <span className="text-zinc-400">{msg.text}</span>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Right Streamer Chat Container */}
                      <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-4 flex flex-col h-[200px] relative overflow-hidden">
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 mb-2 block border-b border-white/5 pb-1">
                          Chat @{activeBattle.stream2?.user?.username}
                        </span>

                        <div ref={rightChatRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2.5 pr-1">
                          {rightChat.length === 0 ? (
                            <div className="text-[10px] text-zinc-600 italic text-center my-auto">Sin mensajes en este stream</div>
                          ) : (
                            rightChat.map(msg => (
                              <div key={msg.id} className={`text-[10px] p-2 rounded-xl border ${msg.type === 'gift' ? 'bg-gradient-to-r from-purple-950/20 to-pink-950/20 border-purple-500/10' : 'bg-white/5 border-transparent'}`}>
                                <span className="font-bold text-zinc-300 mr-1.5">{msg.user}:</span>
                                {msg.type === 'gift' ? (
                                  <span className="text-yellow-400 font-bold">envió {msg.giftName} {msg.giftEmoji}</span>
                                ) : (
                                  <span className="text-zinc-400">{msg.text}</span>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Chat Text Input Form (linked to supported stream selection) */}
                    <form onSubmit={handleSendCustomMessage} className="bg-[#0b0a12]/90 border border-white/5 rounded-2xl p-2.5 flex gap-2">
                      <input 
                        type="text" 
                        placeholder={`Comentar en el chat de @${selectedStreamer === 'left' ? activeBattle.stream1?.user?.username : activeBattle.stream2?.user?.username}...`} 
                        value={userComment}
                        onChange={e => setUserComment(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-purple-500/50 text-white placeholder-zinc-600"
                      />
                      <button 
                        type="submit" 
                        className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center shrink-0 transition-all shadow-lg shadow-purple-500/20"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>

                  </div>

                </div>
              )}
            </div>
          ) : (
            /* ----------------- STANDBY LISTINGS DASHBOARD (Not sintonized) ----------------- */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* COLUMN 1 & 2: LISTINGS ACCORDING TO TABS */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* 1. EN VIVO TAB */}
                {activeTab === 'envivo' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-500">
                      <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" /> Batallas en curso
                    </div>

                    {ongoingBattles.length === 0 ? (
                      <div className="bg-[#0b0a12]/50 border border-white/5 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
                        <Swords className="w-12 h-12 text-zinc-600" />
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">No hay batallas activas</h4>
                        <p className="text-xs text-zinc-500 max-w-sm">No hay batallas 1vs1 jugándose en este momento. ¡Si estás transmitiendo en vivo, puedes crear una ahora mismo!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ongoingBattles.map(battle => (
                          <div 
                            key={battle.id}
                            className="bg-[#0b0a12]/75 border border-white/5 rounded-2xl p-4 shadow-md hover:border-pink-500/20 transition-all group"
                          >
                            <div className="flex items-center justify-between mb-3.5">
                              <span className="px-2 py-0.5 bg-red-600/10 text-red-500 text-[8px] font-black rounded border border-red-500/20">EN VIVO</span>
                              <span className="text-[9px] text-zinc-500 font-semibold">1vs1</span>
                            </div>

                            <div className="flex items-center justify-between gap-4 mb-4">
                              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                                <img src={battle.stream1?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${battle.stream1?.user?.username}`} className="w-12 h-12 rounded-full object-cover border-2 border-pink-500" alt="" />
                                <span className="text-[10px] font-black truncate w-full text-center">@{battle.stream1?.user?.username}</span>
                                <span className="text-[9px] text-zinc-500">{battle.points1} pts</span>
                              </div>

                              <div className="w-8 h-8 rounded-full bg-zinc-950 border border-purple-500/20 flex items-center justify-center shrink-0">
                                <span className="text-[9px] font-black text-purple-400">VS</span>
                              </div>

                              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                                <img src={battle.stream2?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${battle.stream2?.user?.username}`} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" alt="" />
                                <span className="text-[10px] font-black truncate w-full text-center">@{battle.stream2?.user?.username}</span>
                                <span className="text-[9px] text-zinc-500">{battle.points2} pts</span>
                              </div>
                            </div>

                            <button 
                              onClick={() => { setActiveBattleId(battle.id); setWinnerInfo(null); }}
                              className="w-full py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 hover:from-purple-600/40 hover:to-pink-600/40 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                            >
                              Sintonizar batalla
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PROXIMAS TAB (Creators live waiting for opposition) */}
                {activeTab === 'proximas' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-500">
                      <Sparkles className="w-4 h-4 text-purple-400" /> Creadores listos para batallar
                    </div>

                    {upcomingStreamers.length === 0 ? (
                      <div className="bg-[#0b0a12]/50 border border-white/5 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
                        <Play className="w-12 h-12 text-zinc-600 animate-pulse" />
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">No hay creadores en directo</h4>
                        <p className="text-xs text-zinc-500 max-w-sm">No se detectan transmisiones individuales en este momento. Transmite ahora para aparecer aquí.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingStreamers.map(streamer => (
                          <div 
                            key={streamer.id}
                            className="bg-[#0b0a12]/75 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-purple-500/20 transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative shrink-0">
                                <img src={streamer.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${streamer.username}`} className="w-12 h-12 rounded-full object-cover border border-purple-500" alt="" />
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0b0a12]" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                                  @{streamer.username} <BadgeCheck className="w-3 h-3 text-purple-400" />
                                </h4>
                                <p className="text-[10px] text-zinc-400 truncate mt-0.5">{streamer.stream?.title || 'En vivo'}</p>
                                <span className="text-[8px] bg-purple-500/10 text-purple-400 font-bold px-1.5 py-0.5 rounded uppercase mt-1 inline-block">
                                  {streamer.stream?.category || 'Gaming'}
                                </span>
                              </div>
                            </div>

                            {/* Challenge Button if current user is live and streamer is not themselves */}
                            {userIsLive && streamer.id !== user.id ? (
                              <button 
                                onClick={() => handleSendChallenge(streamer.stream.id, streamer.username)}
                                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-[10px] font-black uppercase tracking-wider rounded-lg hover:scale-105 transition-transform shrink-0"
                              >
                                Desafiar
                              </button>
                            ) : (
                              <Link 
                                href={`/live/${streamer.username}`}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase rounded-lg hover:bg-white/10 transition-colors shrink-0"
                              >
                                Ver stream
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. HISTORIAL TAB (Finished PvP battles) */}
                {activeTab === 'historial' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-500">
                      <Trophy className="w-4 h-4 text-yellow-500 animate-pulse" /> Historial de Triunfos
                    </div>

                    {battleHistory.length === 0 ? (
                      <div className="bg-[#0b0a12]/50 border border-white/5 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
                        <Trophy className="w-12 h-12 text-zinc-700" />
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">Historial vacío</h4>
                        <p className="text-xs text-zinc-500 max-w-sm">No se registran batallas PvP completadas en el sistema aún.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {battleHistory.map(b => (
                          <div 
                            key={b.id}
                            className="bg-[#0b0a12]/80 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-4 justify-center sm:justify-start">
                              <div className="flex items-center gap-2">
                                <img src={b.stream1?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${b.stream1?.user?.username}`} className="w-8 h-8 rounded-full object-cover" alt="" />
                                <span className="text-xs font-bold">@{b.stream1?.user?.username}</span>
                              </div>
                              <span className="text-zinc-600 text-xs">vs</span>
                              <div className="flex items-center gap-2">
                                <img src={b.stream2?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${b.stream2?.user?.username}`} className="w-8 h-8 rounded-full object-cover" alt="" />
                                <span className="text-xs font-bold">@{b.stream2?.user?.username}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                              <div className="flex flex-col text-center sm:text-right">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase">Resultado</span>
                                <span className="text-[11px] text-zinc-300 font-black">
                                  {b.points1} pts - {b.points2} pts
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl">
                                <Trophy className="w-3.5 h-3.5 shrink-0" />
                                <span className="text-[10px] font-black uppercase tracking-wider">
                                  Ganador: {b.winnerName}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* COLUMN 3: GLOBAL SIDEBAR RULES & REGULATION */}
              <div className="flex flex-col gap-6">
                
                {/* Rules card */}
                <div className="bg-[#0b0a12]/90 border border-white/5 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                      <Sparkle className="w-4 h-4 text-purple-400 animate-pulse" /> Reglas de Batallas
                    </h3>

                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-200">Elige a tu oponente</span> en el panel "Próximas" o invita enviando un desafío directo.</p>
                      </div>
                      <div className="flex gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-200">Suma puntos con regalos</span>. Sintoniza la batalla y envía rosas o leones para aumentar la barra.</p>
                      </div>
                      <div className="flex gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed"><span className="font-bold text-zinc-200">2 Minutos de Duración</span>. Al expirar el tiempo, el sistema declara al ganador y otorga el triunfo.</p>
                      </div>
                    </div>
                  </div>

                  <span className="text-[9px] text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider cursor-pointer border-t border-white/5 pt-3 block mt-4" onClick={() => triggerToast('⭐ Reglamento completo cargado.')}>Ver reglamento completo</span>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-[#1b122e]/60 to-[#0c0817]/95 border border-purple-500/20 rounded-3xl p-5 shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-1.5 block">Novedades</span>
                    <h4 className="text-sm font-black text-white mb-2 leading-relaxed">¿Cómo empezar a batallar?</h4>
                    <p className="text-[10px] text-zinc-400">Si eres creador de contenido y deseas participar, ingresa a la pestaña Transmitir, enciende tu directo de prueba, y estarás listo para recibir o enviar desafíos PvP.</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link href="/transmitir" className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-[10px] font-black shadow-lg">Transmitir ahora</Link>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* ----------------- MOBILE BOTTOM NAVIGATION BAR ----------------- */}
        <div className="h-[70px] shrink-0 bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5 lg:hidden">
          <Link href="/dashboard?tab=inicio" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Inicio</span>
          </Link>
          <Link href="/en-vivo" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <Play className="w-6 h-6" />
            <span className="text-[10px] font-bold">Gaming</span>
          </Link>
          <div className="relative -top-4">
            <button className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] hover:scale-105 transition-transform" onClick={handleCreateBattleClick}>
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors relative">
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href={`/u/${user.username}`} className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Perfil</span>
          </Link>
        </div>

      </main>

      {/* ----------------- CHALLENGE MODAL (CREAR BATALLA) ----------------- */}
      {isChallengeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0b0a12] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsChallengeModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!userIsLive ? (
              <div className="text-center py-4 flex flex-col items-center gap-4">
                <Play className="w-12 h-12 text-red-500 animate-pulse" />
                <h3 className="text-lg font-black uppercase tracking-wider">No estás transmitiendo</h3>
                <p className="text-xs text-zinc-400">
                  Para poder crear una batalla o recibir invitaciones PvP reales de otros contrincantes, primero debes encender tu transmisión en vivo.
                </p>
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => setIsChallengeModalOpen(false)}
                    className="px-4 py-2 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5"
                  >
                    Cerrar
                  </button>
                  <Link 
                    href="/transmitir"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl hover:scale-105 transition-transform"
                  >
                    Ir a Transmitir Studio
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider mb-2">Desafiar Streamers</h3>
                <p className="text-xs text-zinc-400 mb-4">Selecciona un creador que esté actualmente transmitiendo en vivo para enviarle una solicitud de batalla PvP.</p>

                {isSendingInvite ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <div className="w-8 h-8 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                    <span className="text-xs text-zinc-500 font-bold">Procesando solicitud...</span>
                  </div>
                ) : challengeableStreamers.length === 0 ? (
                  <div className="text-center py-8 text-xs text-zinc-500 italic">
                    No hay otros streamers en vivo libres para batallas en este momento.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
                    {challengeableStreamers.map(streamer => (
                      <div 
                        key={streamer.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={streamer.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${streamer.username}`} className="w-9 h-9 rounded-full object-cover shrink-0" alt="" />
                          <span className="text-xs font-bold truncate">@{streamer.username}</span>
                        </div>
                        <button 
                          onClick={() => handleSendChallenge(streamer.stream.id, streamer.username)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase tracking-wider rounded-lg"
                        >
                          Enviar reto
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- INCOMING INVITE POPUP NOTIFICATION ----------------- */}
      {incomingInvite && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0b0a12] border-2 border-pink-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-200">
            <div className="relative">
              <div className="w-20 h-20 bg-pink-500/10 blur-xl rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <Swords className="w-14 h-14 text-pink-500 animate-pulse" />
            </div>

            <h3 className="text-lg font-black uppercase tracking-wider">¡Desafío Recibido!</h3>
            <p className="text-xs text-zinc-400">
              <span className="text-white font-black">@{incomingInvite.stream1?.user?.username}</span> te ha desafiado a una batalla PvP de 2 minutos en vivo.
            </p>

            <div className="flex gap-4 w-full justify-center mt-2">
              <button 
                onClick={() => handleInviteDecision(false)}
                className="flex-1 py-3 border border-white/10 rounded-2xl text-xs font-bold text-zinc-400 hover:bg-white/5 active:scale-95 transition-all"
              >
                Rechazar
              </button>
              <button 
                onClick={() => handleInviteDecision(true)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-500/20"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- INTERACTIVE GIFT SELECT MODAL POPUP (TikTok Style) ----------------- */}
      {isGiftPopupOpen && activeBattle && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0b0a12] border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setIsGiftPopupOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-1">Apoyar Streamer</h4>
            <h3 className="text-base font-black text-white mb-4">
              Enviar regalo a <span className={selectedStreamer === 'left' ? 'text-pink-500' : 'text-cyan-400'}>
                @{selectedStreamer === 'left' ? activeBattle.stream1?.user?.username : activeBattle.stream2?.user?.username}
              </span>
            </h3>

            {/* Gifts grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {AVAILABLE_GIFTS.map(gift => (
                <button 
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/50 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">{gift.emoji}</span>
                  <span className="text-[10px] font-bold text-zinc-200 mb-1">{gift.name}</span>
                  <div className="flex items-center gap-0.5 text-[9px] text-yellow-500 font-bold">
                    <span>{gift.cost}</span>
                    <span>L</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Current wallet status */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-bold text-zinc-300">Monedas:</span>
                <span className="text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => handleRechargeCoins(500)}
                className="text-[10px] font-bold text-purple-400 uppercase tracking-wider hover:text-purple-300"
              >
                Recargar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- WINNER CELEBRATION OVERLAY ----------------- */}
      {winnerInfo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-sm bg-gradient-to-br from-[#1c1435] to-[#0c0817] border-2 border-yellow-500/40 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6 relative overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Ambient glowing winner background */}
            <div className="absolute -top-12 w-48 h-48 bg-yellow-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full" />

            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce">
                <Crown className="w-10 h-10 text-yellow-500 fill-yellow-500" />
              </div>
              <img 
                src={winnerInfo.winnerAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${winnerInfo.winnerName}`} 
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500 shadow-2xl" 
                alt="" 
              />
            </div>

            <div>
              <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest block mb-1">¡FIN DE LA BATALLA!</span>
              <h3 className="text-xl font-black text-white leading-tight">
                {winnerInfo.winnerName === 'Empate' ? '¡Empate absoluto!' : `🏆 ¡@${winnerInfo.winnerName} es el Ganador!`}
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Puntaje Final: <span className="text-pink-400 font-bold">{winnerInfo.points1} pts</span> vs <span className="text-cyan-400 font-bold">{winnerInfo.points2} pts</span>
              </p>
            </div>

            <button 
              onClick={() => { setWinnerInfo(null); setActiveBattleId(null); setActiveBattle(null); }}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-yellow-500/20"
            >
              Salir de la arena
            </button>
          </div>
        </div>
      )}

      {/* ----------------- TOAST BANNER NOTIFICATION ----------------- */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#161230] border border-purple-500/30 px-6 py-3 rounded-full text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Styled animation keyframes for floating hearts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 1;
          }
          100% {
            transform: translateY(-350px) scale(1.4) rotate(var(--rotate-deg, 20deg));
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation: floatHeart 2s ease-out forwards;
        }
      ` }} />

    </div>
  );
}
