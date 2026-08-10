'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Home, Play, Compass, Sword, Trophy, MessageSquare, 
  Bell, User, Wallet, Plus, Search, Crown, LogOut, 
  ChevronRight, BadgeCheck, Heart, MessageCircle, Share2, Gift, Eye,
  Sparkles, Shield, ChevronUp, ChevronDown, Flame, Swords, Star, Send, X, Coins, Clock, List, CreditCard
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useCreatorStore } from '@/store/useCreatorStore';
import { getUserWalletBalance, addWalletCoins } from '@/app/actions/battle';
import {
  createTournamentAction,
  getTournamentsAction,
  joinTournamentAction,
  startTournamentAction,
  finishTournamentAction,
  submitTournamentWinAction,
  approveTournamentWinnerAction
} from '@/app/actions/tournament';

interface CoinPackage {
  id: number;
  coins: number;
  bonus: number;
  price: number;
  popular?: boolean;
}

export default function TorneosClient({ user }: { user: any }) {
  const router = useRouter();

  // User details & coins
  const [userCoins, setUserCoins] = useState(0);
  
  // Real Database Tournaments list
  const [tournaments, setTournaments] = useState<any[]>([]);

  // Category and tab selectors
  const [activeCategory, setActiveCategory] = useState('Free Fire');
  const [activeRankingTab, setActiveRankingTab] = useState<'jugadores' | 'equipos' | 'donadores'>('jugadores');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'vivo' | 'proximos' | 'destacados' | 'mis'>('vivo');

  // Form states for creating a tournament
  const [createTitle, setCreateTitle] = useState('');
  const [createGame, setCreateGame] = useState('Free Fire');
  const [createFormat, setCreateFormat] = useState('BO3'); // "BO3" | "BO3_2V2" | "BR"
  const [createPrize, setCreatePrize] = useState(1000);
  const [createEntryFee, setCreateEntryFee] = useState(0);
  const [createMaxTeams, setCreateMaxTeams] = useState(2); // Locks to 2 for BO3, 4 for BO3_2V2
  const [createRoomCode, setCreateRoomCode] = useState('');
  const [createRoomPassword, setCreateRoomPassword] = useState('');

  // Form states for joining a tournament (Free Fire credentials)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joiningTournament, setJoiningTournament] = useState<any | null>(null);
  const [joinFreeFireId, setJoinFreeFireId] = useState('');
  const [joinFreeFireName, setJoinFreeFireName] = useState('');

  // Form states for submitting Proof of Win screenshots
  const [winScreenshot, setWinScreenshot] = useState('');
  const [winPreview, setWinPreview] = useState('');
  const [match2Screenshot, setMatch2Screenshot] = useState('');
  const [match2Preview, setMatch2Preview] = useState('');
  const [match3Screenshot, setMatch3Screenshot] = useState('');
  const [match3Preview, setMatch3Preview] = useState('');
  const [profileScreenshot, setProfileScreenshot] = useState('');
  const [profilePreview, setProfilePreview] = useState('');
  const [isSubmittingWin, setIsSubmittingWin] = useState(false);

  // Real money coin store modal states
  const [showCoinStoreModal, setShowCoinStoreModal] = useState(false);
  const [selectedCoinPackage, setSelectedCoinPackage] = useState<CoinPackage | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'paypal' | 'card' | 'google' | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Payment Form Inputs
  const [paypalEmail, setPaypalEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [googleCode, setGoogleCode] = useState('');

  // Live countdown timer state (Copa Live X Free Fire)
  const [countdown, setCountdown] = useState({ hrs: 2, mins: 45, secs: 30 });

  // Esports Brackets Arena Modal
  const [activeArenaTournament, setActiveArenaTournament] = useState<any | null>(null);
  const [selectedPredictionTeam, setSelectedPredictionTeam] = useState<string | null>(null);
  const [flyingReactionEmojis, setFlyingReactionEmojis] = useState<{ id: number; char: string; x: number; y: number }[]>([]);
  const [arenaChatMessages, setArenaChatMessages] = useState([
    { id: 1, user: 'SofiLive', text: '¡VAMOS COBRA! 🐍🔥', time: '16:02' },
    { id: 2, user: 'AndrésGG', text: 'Gran tiro de Diego, espectacular la zona', time: '16:02' },
    { id: 3, user: 'GamerX', text: 'Esa granada definió la ronda, increíble', time: '16:03' },
    { id: 4, user: 'DiegoStream', text: '¡Seguimos de pie gente! Apoyen con regalos! 💎', time: '16:03' }
  ]);
  const [newArenaMessage, setNewArenaMessage] = useState('');
  const arenaChatEndRef = useRef<HTMLDivElement>(null);

  // Initial data loading on mount
  useEffect(() => {
    async function init() {
      try {
        const coins = await getUserWalletBalance();
        setUserCoins(coins);

        const list = await getTournamentsAction();
        setTournaments(list);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    }
    init();
  }, []);

  // Polling data every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const coins = await getUserWalletBalance();
        setUserCoins(coins);

        const list = await getTournamentsAction();
        setTournaments(list);

        // Keep active arena tournament synced
        if (activeArenaTournament) {
          const updated = list.find(t => t.id === activeArenaTournament.id);
          if (updated) {
            setActiveArenaTournament(updated);
          }
        }
      } catch (err) {
        console.error('Polling tournaments error:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeArenaTournament]);

  // Ticking countdown clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hrs > 0) {
          return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        } else {
          return { hrs: 2, mins: 45, secs: 30 }; // resets
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll arena chat
  useEffect(() => {
    if (arenaChatEndRef.current) {
      arenaChatEndRef.current.scrollTop = arenaChatEndRef.current.scrollHeight;
    }
  }, [arenaChatMessages]);

  const handleLogout = async () => {
    await logoutUser();
  };

  // Static list of categories
  const categories = [
    { name: 'Free Fire', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300' },
    { name: 'Valorant', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300' },
    { name: 'Fortnite', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' },
    { name: 'Call of Duty', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300' },
    { name: 'EA FC 24', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300' },
    { name: 'League of Legends', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300' }
  ];

  // Real Money Coin packages list
  const coinPackages: CoinPackage[] = [
    { id: 1, coins: 100, bonus: 10, price: 0.99 },
    { id: 2, coins: 310, bonus: 40, price: 2.99 },
    { id: 3, coins: 520, bonus: 80, price: 4.99, popular: true },
    { id: 4, coins: 1060, bonus: 160, price: 9.99 },
    { id: 5, coins: 2180, bonus: 380, price: 19.99 },
    { id: 6, coins: 5600, bonus: 1000, price: 49.99 }
  ];

  // Helper actions to handle database updates
  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim()) return;

    let limit = Number(createMaxTeams);
    if (createFormat === 'BO3') limit = 2;
    else if (createFormat === 'BO3_2V2') limit = 4;

    const res = await createTournamentAction({
      title: createTitle,
      game: createGame,
      format: createFormat,
      prize: Number(createPrize),
      entryFee: Number(createEntryFee),
      maxTeams: limit,
      roomCode: createRoomCode || undefined,
      roomPassword: createRoomPassword || undefined
    });

    if (res.error) {
      alert(`❌ Error: ${res.error}`);
    } else {
      alert('🏆 ¡Torneo creado exitosamente! Te has inscrito automáticamente.');
      setShowCreateModal(false);
      // Reset form
      setCreateTitle('');
      setCreateEntryFee(0);
      setCreateRoomCode('');
      setCreateRoomPassword('');
      // Re-fetch list
      const list = await getTournamentsAction();
      setTournaments(list);
    }
  };

  const handleOpenJoinModal = (tournament: any) => {
    setJoiningTournament(tournament);
    setJoinFreeFireId('');
    setJoinFreeFireName('');
    setIsJoinModalOpen(true);
  };

  const handleJoinTournamentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joiningTournament) return;

    if (userCoins < joiningTournament.entryFee) {
      alert(`❌ Monedas insuficientes. Necesitas ${joiningTournament.entryFee} monedas.`);
      return;
    }

    const res = await joinTournamentAction({
      tournamentId: joiningTournament.id,
      freeFireId: joinFreeFireId,
      freeFireName: joinFreeFireName
    });

    if (res.error) {
      alert(`❌ Error: ${res.error}`);
    } else {
      alert('✅ ¡Inscripción completada con éxito!');
      setIsJoinModalOpen(false);
      setJoiningTournament(null);
      
      const list = await getTournamentsAction();
      setTournaments(list);
      const updated = list.find(t => t.id === joiningTournament.id);
      if (updated) setActiveArenaTournament(updated);
    }
  };

  const handleStartTournament = async (tournamentId: string) => {
    const res = await startTournamentAction(tournamentId);
    if (res.error) {
      alert(`❌ Error: ${res.error}`);
    } else {
      alert('🚀 ¡El torneo ha comenzado! La sala de juego ya está abierta.');
      const list = await getTournamentsAction();
      setTournaments(list);
      const updated = list.find(t => t.id === tournamentId);
      if (updated) setActiveArenaTournament(updated);
    }
  };

  const handleFinishTournament = async (tournamentId: string) => {
    const res = await finishTournamentAction(tournamentId);
    if (res.error) {
      alert(`❌ Error: ${res.error}`);
    } else {
      alert('🏆 ¡Torneo finalizado con éxito!');
      const list = await getTournamentsAction();
      setTournaments(list);
      const updated = list.find(t => t.id === tournamentId);
      if (updated) setActiveArenaTournament(updated);
    }
  };

  // Process Real Money Coin Payment Simulation
  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoinPackage || !selectedPaymentMethod) return;

    setIsProcessingPayment(true);
    
    // Simulate gateway delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const totalCoinsToAdd = selectedCoinPackage.coins + selectedCoinPackage.bonus;
    const res = await addWalletCoins(totalCoinsToAdd);
    
    setIsProcessingPayment(false);

    if (res.error) {
      alert(`❌ Error al procesar pago: ${res.error}`);
    } else if (res.success && res.balance !== undefined) {
      setUserCoins(res.balance);
      alert(`💎 ¡PAGO CONFIRMADO! Se han acreditado +${totalCoinsToAdd} monedas a tu cuenta.`);
      
      // Reset flow
      setSelectedCoinPackage(null);
      setSelectedPaymentMethod(null);
      setShowCoinStoreModal(false);
      setPaypalEmail('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setCardName('');
      setGoogleCode('');
    }
  };

  // Submit screenshots proof of win
  const handleSubmitWinProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArenaTournament) return;

    if (!winScreenshot.trim() || !profileScreenshot.trim()) {
      alert('❌ Debes ingresar al menos la captura de la partida 1 y de tu perfil.');
      return;
    }

    setIsSubmittingWin(true);
    const res = await submitTournamentWinAction({
      tournamentId: activeArenaTournament.id,
      winScreenshot,
      match2Screenshot: match2Screenshot || undefined,
      match3Screenshot: match3Screenshot || undefined,
      profileScreenshot
    });
    setIsSubmittingWin(false);

    if (res.error) {
      alert(`❌ Error: ${res.error}`);
    } else {
      alert('✅ ¡Comprobantes de victoria enviados exitosamente al creador del torneo!');
      setWinScreenshot('');
      setWinPreview('');
      setMatch2Screenshot('');
      setMatch2Preview('');
      setMatch3Screenshot('');
      setMatch3Preview('');
      setProfileScreenshot('');
      setProfilePreview('');
      
      const list = await getTournamentsAction();
      setTournaments(list);
      const updated = list.find(t => t.id === activeArenaTournament.id);
      if (updated) setActiveArenaTournament(updated);
    }
  };

  // Auto fill proof files with test screenshots for convenience
  const handleAutoFillProof = () => {
    const fakeWin = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600';
    const fakeProfile = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600';
    
    setWinScreenshot(fakeWin);
    setWinPreview(fakeWin);
    
    if (activeArenaTournament?.format === 'BO3' || activeArenaTournament?.format === 'BO3_2V2') {
      setMatch2Screenshot(fakeWin);
      setMatch2Preview(fakeWin);
      setMatch3Screenshot(fakeWin);
      setMatch3Preview(fakeWin);
    }

    setProfileScreenshot(fakeProfile);
    setProfilePreview(fakeProfile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'win' | 'match2' | 'match3' | 'profile') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (type === 'win') {
        setWinScreenshot(base64);
        setWinPreview(base64);
      } else if (type === 'match2') {
        setMatch2Screenshot(base64);
        setMatch2Preview(base64);
      } else if (type === 'match3') {
        setMatch3Screenshot(base64);
        setMatch3Preview(base64);
      } else {
        setProfileScreenshot(base64);
        setProfilePreview(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  // Creator approves the winner and pays out coins
  const handleApproveWinner = async (winnerUserId: string, winnerName: string) => {
    if (!activeArenaTournament) return;

    const confirmPay = window.confirm(`¿Estás seguro de que @${winnerName} ganó el torneo? Se le pagará el premio de $${activeArenaTournament.prize} monedas de forma automática.`);
    if (!confirmPay) return;

    const res = await approveTournamentWinnerAction({
      tournamentId: activeArenaTournament.id,
      winnerUserId
    });

    if (res.error) {
      alert(`❌ Error: ${res.error}`);
    } else {
      alert(`🏆 ¡Ganador aprobado! Se han transferido las monedas correspondientes.`);
      
      const list = await getTournamentsAction();
      setTournaments(list);
      const updated = list.find(t => t.id === activeArenaTournament.id);
      if (updated) setActiveArenaTournament(updated);
    }
  };

  const triggerGift = (giftEmoji: string, giftName: string, cost: number) => {
    if (userCoins < cost) {
      alert('¡Monedas insuficientes! Por favor recarga en tu Wallet 💎');
      return;
    }
    setUserCoins(prev => prev - cost);
    
    // Add to chat messages
    const newMsg = {
      id: Date.now(),
      user: 'Tú',
      text: `Envió un regalo: ${giftName} ${giftEmoji}`,
      time: 'Ahora'
    };
    setArenaChatMessages(prev => [...prev, newMsg]);

    // Flying animations
    for (let i = 0; i < 5; i++) {
      const newId = Date.now() + Math.random();
      setFlyingReactionEmojis(prev => [
        ...prev, 
        { 
          id: newId, 
          char: giftEmoji, 
          x: Math.random() * 200 - 100, 
          y: Math.random() * -100 - 50 
        }
      ]);
      setTimeout(() => {
        setFlyingReactionEmojis(prev => prev.filter(g => g.id !== newId));
      }, 2000);
    }
  };

  // Launching custom Free Fire lobby scheme
  const handleLaunchFreeFire = (roomCode?: string | null, roomPassword?: string | null) => {
    window.location.href = 'freefire://';
    
    alert(
      `Abriendo Free Fire en tu dispositivo...\n\n` +
      `Si la app no abre de forma automática, por favor abre el juego de forma manual.\n\n` +
      `Datos de ingreso a la Sala Custom:\n` +
      `ID de Sala: ${roomCode || 'No asignado'}\n` +
      `Contraseña: ${roomPassword || 'Sin contraseña'}\n\n` +
      `¡Suerte en la batalla! ⚔️🎮`
    );
  };

  // Database-backed computed filters
  const liveTournaments = tournaments.filter(t => t.status === 'ONGOING' && t.game === activeCategory);
  const upcomingTournaments = tournaments.filter(t => t.status === 'UPCOMING' && t.game === activeCategory);
  const myTournaments = tournaments.filter(t => t.participants.some((p: any) => p.userId === user.id));

  // Hero Tournament (displays active ongoing tournament or next upcoming)
  const heroTournament = liveTournaments[0] || upcomingTournaments[0] || tournaments[0];

  // Helper to check if current user is participant of the selected tournament
  const isCurrentUserParticipant = (tournament: any) => {
    return tournament?.participants?.some((p: any) => p.userId === user.id);
  };

  // Get current user registration details in selected tournament
  const currentUserParticipantDetails = (tournament: any) => {
    return tournament?.participants?.find((p: any) => p.userId === user.id);
  };

  // Winner participant in bracket
  const tournamentWinnerParticipant = (tournament: any) => {
    return tournament?.participants?.find((p: any) => p.isWinner);
  };

  return (
    <div className="flex h-screen w-full bg-[#05050a] text-white overflow-hidden font-sans">
      
      {/* ------------------- DESKTOP SIDEBAR ------------------- */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0a0a0f] flex flex-col p-4 shrink-0 overflow-y-auto custom-scrollbar hidden lg:flex">
        
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
          <Link href="/batallas" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
            <Swords className="w-5 h-5" /> Batallas
          </Link>
          <Link href="/torneos" className="flex items-center gap-3 px-3 py-2.5 text-white bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-500/20 rounded-xl transition-colors font-black shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Trophy className="w-5 h-5 text-purple-400" /> Torneos
          </Link>
        </nav>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-8 text-xs uppercase tracking-wider cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5" /> Crear Torneo
        </button>

        {/* Wallet info panel */}
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
          <button 
            onClick={() => router.push(`/u/${user?.username}?settings=monedas`)}
            className="text-[10px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors cursor-pointer"
          >
            Comprar monedas
          </button>
        </div>

         <div className="mt-auto flex items-center gap-2 px-2 py-3 border-t border-white/5">
          <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10" alt="" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold flex items-center gap-1 truncate">{user?.username} {user?.isVerified && <BadgeCheck className="w-3 h-3 text-blue-400 shrink-0 inline" />}</div>
            <div className="text-[10px] text-zinc-500">@{user?.username}</div>
          </div>
          <button onClick={() => logoutUser()} className="text-zinc-600 hover:text-red-400 transition-colors shrink-0"><LogOut className="w-3.5 h-3.5" /></button>
        </div>

      </aside>

      {/* ------------------- MAIN WRAPPER ------------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* ------------------- MOBILE HEADER ------------------- */}
        <div className="flex flex-col shrink-0 z-20 bg-[#05050a] border-b border-white/5 lg:hidden">
          <div className="h-[60px] px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/en-vivo" className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-black text-zinc-300 hover:text-white transition-all active:scale-95 shrink-0">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Gaming</span>
              </Link>
              <span className="w-[1px] h-4 bg-white/10 shrink-0" />
              <div className="flex items-center gap-1.5 shrink-0">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-black tracking-tight text-white">Torneos</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button className="text-zinc-400 hover:text-yellow-400 transition-colors shrink-0">
                <Crown className="w-4 h-4" />
              </button>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-[0_0_8px_rgba(234,179,8,0.1)] shrink-0 cursor-pointer" onClick={() => setShowCoinStoreModal(true)}>
                <Coins className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] font-black text-yellow-500">{(userCoins / 1000).toFixed(1)}K</span>
              </div>
              <button className="text-zinc-400 hover:text-white transition-colors shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 px-4 pb-2 pt-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'vivo', label: 'En vivo' },
              { id: 'proximos', label: 'Próximos' },
              { id: 'destacados', label: 'Destacados' },
              { id: 'mis', label: 'Mis torneos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMobileActiveTab(tab.id as any)}
                className={`text-[12px] font-black uppercase tracking-wider pb-1.5 transition-all shrink-0 border-b-2 ${
                  mobileActiveTab === tab.id
                    ? 'border-purple-600 text-white font-black'
                    : 'border-transparent text-zinc-500 font-bold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------- DESKTOP HEADER ------------------- */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between shrink-0 bg-[#0a0a0f]/80 backdrop-blur-md z-20 hidden lg:flex">
          
          <div className="w-72 lg:w-96 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar torneos, juegos, formatos..." 
              className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all text-white placeholder-zinc-500"
            />
          </div>

          <div className="flex items-center gap-4">
            
            <button className="text-zinc-400 hover:text-yellow-400 transition-colors">
              <Crown className="w-4.5 h-4.5" />
            </button>

            <button className="text-zinc-400 hover:text-white relative transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full" />
            </button>

            <div 
              onClick={() => setShowCoinStoreModal(true)}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)] shrink-0 cursor-pointer"
            >
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-black text-yellow-500">{userCoins.toLocaleString()}</span>
            </div>

            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all shadow-[0_4px_12px_rgba(236,72,153,0.2)] cursor-pointer"
            >
              + Crear torneo
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" alt="" />
              <div className="text-xs">
                <div className="font-bold flex items-center gap-0.5">{user?.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 inline" /></div>
                <div className="text-[10px] text-green-400">● Esports Competidor</div>
              </div>
            </div>

          </div>
        </header>

        {/* ------------------- SCROLLABLE CONTENT BODY ------------------- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 space-y-8 bg-[#05050a]">

          {/* 1. HERO + RANKINGS SECTION */}
          <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${
            mobileActiveTab === 'vivo' || mobileActiveTab === 'destacados' ? 'block xl:grid' : 'hidden xl:grid'
          }`}>
            
            {/* HERO DYNAMIC CARD */}
            {heroTournament ? (
              <div className={`xl:col-span-2 rounded-3xl overflow-hidden relative border border-white/5 shadow-2xl h-[340px] sm:h-[400px] ${
                mobileActiveTab === 'vivo' ? 'block' : 'hidden xl:block'
              }`}>
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050af2] via-[#05050a7c] to-black/30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <div className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-lg bg-purple-600`}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> 
                    {heroTournament.format === 'BO3' ? '1VS1 PVP (MEJOR DE 3)' : heroTournament.format === 'BO3_2V2' ? '2VS2 PVP (MEJOR DE 3)' : 'BATTLE ROYALE (MAPA BR)'}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-10">
                  <div className="space-y-2">
                    <span className="text-pink-500 text-xs font-black uppercase tracking-widest">{heroTournament.game} Match</span>
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md leading-tight">
                      {heroTournament.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-300">
                      <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-2.5 py-1 text-yellow-500">
                        <Coins className="w-4 h-4" />
                        <span>Premio: <strong className="font-black">${heroTournament.prize}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1">
                        <Coins className="w-4 h-4 text-pink-500" />
                        <span>Entrada: <strong className="text-white">{heroTournament.entryFee} L</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1">
                        <UsersIcon className="w-4 h-4 text-purple-400" />
                        <span>Inscritos: <strong className="text-white">{heroTournament.participants?.length || 0} / {heroTournament.maxTeams}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-stretch shrink-0 w-full sm:w-auto">
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex gap-4 text-center justify-center">
                      <div>
                        <div className="text-lg font-black text-white">{countdown.hrs.toString().padStart(2, '0')}</div>
                        <div className="text-[8px] font-bold text-zinc-400 uppercase">HORAS</div>
                      </div>
                      <div className="text-lg font-black text-zinc-500">:</div>
                      <div>
                        <div className="text-lg font-black text-white">{countdown.mins.toString().padStart(2, '0')}</div>
                        <div className="text-[8px] font-bold text-zinc-400 uppercase">MINS</div>
                      </div>
                      <div className="text-lg font-black text-zinc-500">:</div>
                      <div>
                        <div className="text-lg font-black text-white text-red-500">{countdown.secs.toString().padStart(2, '0')}</div>
                        <div className="text-[8px] font-bold text-zinc-400 uppercase">SEG</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveArenaTournament(heroTournament)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black py-3 px-6 rounded-2xl shadow-lg shadow-pink-500/25 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-center cursor-pointer"
                    >
                      <Trophy className="w-4 h-4" /> Ingresar a la Arena
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Hero Placeholder */
              <div className={`xl:col-span-2 rounded-3xl overflow-hidden relative border border-white/5 bg-[#0a0a0f] p-8 flex flex-col justify-center items-center text-center gap-4 h-[340px] sm:h-[400px] ${
                mobileActiveTab === 'vivo' ? 'block' : 'hidden xl:block'
              }`}>
                <Trophy className="w-16 h-16 text-purple-500 animate-pulse" />
                <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">¡Sé el primero en crear un torneo!</h1>
                <p className="text-xs text-zinc-400 max-w-sm">Organiza tu propia competencia de Free Fire, invita contrincantes y configura salas de juego en tiempo real.</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  + Organizar Torneo
                </button>
              </div>
            )}

            {/* RANKINGS SIDEBAR PANEL */}
            <div className={`bg-[#0a0a0f]/90 border border-white/5 rounded-3xl p-5 shadow-2xl flex flex-col relative overflow-hidden h-[340px] sm:h-[400px] ${
              mobileActiveTab === 'destacados' ? 'flex' : 'hidden xl:flex'
            }`}>
              <div className="absolute top-0 left-0 w-24 h-24 bg-purple-600/5 blur-2xl rounded-full" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Ranking Global</h3>
                <span className="text-[9px] text-pink-500 font-bold uppercase tracking-wider">LiveX Arena</span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-xl p-1 mb-4 text-center">
                {(['jugadores', 'equipos', 'donadores'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveRankingTab(tab)}
                    className={`py-1.5 text-[10px] font-black rounded-lg uppercase transition-all ${
                      activeRankingTab === tab 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Rankings List */}
              <div className="flex-1 overflow-y-auto scrollbar-none space-y-3">
                {activeRankingTab === 'jugadores' && [
                  { rank: 1, name: 'AndrésGG', pts: '125.4K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres' },
                  { rank: 2, name: 'DiegoStream', pts: '98.7K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego' },
                  { rank: 3, name: 'SofiLive', pts: '76.5K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofi' },
                  { rank: 4, name: 'MartinCV', pts: '64.2K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martin' },
                  { rank: 5, name: 'NickyPlay', pts: '52.1K pts', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nicky' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black w-4 text-center ${item.rank === 1 ? 'text-yellow-400' : item.rank === 2 ? 'text-zinc-300' : item.rank === 3 ? 'text-amber-600' : 'text-zinc-500'}`}>
                        {item.rank}
                      </span>
                      <img src={item.avatar} className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10" alt="" />
                      <span className="text-[11px] font-black">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-purple-400">{item.pts}</span>
                  </div>
                ))}

                {activeRankingTab === 'equipos' && [
                  { rank: 1, name: 'Cobra Team', pts: '12 victorias', avatar: '🐍' },
                  { rank: 2, name: 'Titans Esports', pts: '10 victorias', avatar: '⚡' },
                  { rank: 3, name: 'Phoenix Clan', pts: '9 victorias', avatar: '🔥' },
                  { rank: 4, name: 'Viper Squad', pts: '7 victorias', avatar: '🦂' },
                  { rank: 5, name: 'Ice Wolves', pts: '6 victorias', avatar: '🐺' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black w-4 text-center text-zinc-400">{item.rank}</span>
                      <span className="text-lg">{item.avatar}</span>
                      <span className="text-[11px] font-black">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-pink-400">{item.pts}</span>
                  </div>
                ))}

                {activeRankingTab === 'donadores' && [
                  { rank: 1, name: 'AlexM', pts: '12,450 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
                  { rank: 2, name: 'ValenLG', pts: '8,760 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valen' },
                  { rank: 3, name: 'CamiLove', pts: '6,540 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cami' },
                  { rank: 4, name: 'Zeta', pts: '5,420 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeta' },
                  { rank: 5, name: 'ElKomanche', pts: '4,210 💎', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Komanche' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black w-4 text-center text-zinc-400">{item.rank}</span>
                      <img src={item.avatar} className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10" alt="" />
                      <span className="text-[11px] font-black">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-yellow-500">{item.pts}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* 2. CATEGORIES SECTION */}
          <div className={`space-y-4 ${
            mobileActiveTab === 'destacados' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black uppercase tracking-widest text-zinc-200">Categorías</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-none py-1.5">
              {categories.map((cat) => {
                const count = tournaments.filter(t => t.game === cat.name).length;
                return (
                  <div 
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all shrink-0 cursor-pointer w-[180px] relative overflow-hidden group ${
                      activeCategory === cat.name 
                        ? 'bg-gradient-to-br from-purple-950/40 to-pink-950/40 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.15)] scale-[1.02]' 
                        : 'bg-[#0a0a0f] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <img src={cat.img} className="w-10 h-10 rounded-xl object-cover" alt="" />
                    <div className="text-xs relative z-10">
                      <div className="font-black text-white">{cat.name}</div>
                      <div className="text-[9px] text-zinc-500 font-bold">{count} torneos</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. DYNAMIC TORNEOS EN VIVO GRID */}
          <div className={`space-y-4 ${
            mobileActiveTab === 'vivo' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black uppercase tracking-widest text-zinc-200">Torneos en curso ({activeCategory})</h2>
            </div>

            {liveTournaments.length === 0 ? (
              <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-3xl p-10 text-center flex flex-col items-center gap-3">
                <Trophy className="w-12 h-12 text-zinc-700" />
                <span className="text-xs font-bold text-zinc-500">No hay torneos activos en curso para esta categoría</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {liveTournaments.map((tournament) => (
                  <div 
                    key={tournament.id}
                    onClick={() => setActiveArenaTournament(tournament)}
                    className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300 group cursor-pointer shadow-xl flex flex-col relative"
                  >
                    <div className="relative h-[150px] overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-red-600 text-[8px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> {tournament.format === 'BO3' ? 'PVP BO3' : tournament.format === 'BO3_2V2' ? '2VS2 BO3' : 'BATTLE ROYALE'}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-pink-500 mb-1">{tournament.game}</div>
                        <h4 className="text-xs font-black text-white leading-tight line-clamp-1 group-hover:text-pink-400 transition-colors">{tournament.title}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 font-bold">Por @{tournament.creator?.username}</p>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4 text-[10px]">
                        <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20 text-yellow-500 font-extrabold">
                          <Coins className="w-3.5 h-3.5" />
                          <span>${tournament.prize}</span>
                        </div>
                        <span className="text-zinc-400 font-bold flex items-center gap-1">
                          <UsersIcon className="w-3.5 h-3.5 text-zinc-500" /> {tournament.participants?.length || 0} / {tournament.maxTeams}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. PRÓXIMOS TORNEOS GRID */}
          <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6 ${
            mobileActiveTab === 'proximos' || mobileActiveTab === 'destacados' ? 'block xl:grid' : 'hidden xl:grid'
          }`}>

            <div className={`xl:col-span-2 space-y-4 ${
              mobileActiveTab === 'proximos' ? 'block' : 'hidden xl:block'
            }`}>
              <div className="flex justify-between items-center">
                <h2 className="text-base font-black uppercase tracking-widest text-zinc-200">Próximos torneos ({activeCategory})</h2>
              </div>

              {upcomingTournaments.length === 0 ? (
                <div className="bg-[#0a0a0f]/50 border border-white/5 rounded-3xl p-10 text-center flex flex-col items-center gap-3">
                  <Trophy className="w-12 h-12 text-zinc-700" />
                  <span className="text-xs font-bold text-zinc-500">No hay próximos torneos agendados</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingTournaments.map((tournament) => {
                    const isJoined = tournament.participants.some((p: any) => p.userId === user.id);
                    const isCreator = tournament.creatorId === user.id;

                    return (
                      <div key={tournament.id} className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-purple-500/25 transition-colors items-center">
                        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400" className="w-16 h-16 rounded-xl object-cover shrink-0" alt="" />
                        <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[8px] font-black bg-purple-600/20 border border-purple-500/30 text-purple-400 px-1.5 py-0.5 rounded uppercase">
                                ENTRADA: {tournament.entryFee} L
                              </span>
                              <span className="text-[8px] text-zinc-500 font-bold">{tournament.format === 'BO3' ? '1vs1 BO3' : tournament.format === 'BO3_2V2' ? '2vs2 BO3' : 'BR Bermuda'}</span>
                            </div>
                            <h4 className="text-xs font-black text-white truncate">{tournament.title}</h4>
                            <p className="text-[9px] text-zinc-500 truncate">Por @{tournament.creator?.username}</p>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/5 text-[10px]">
                            <span className="text-yellow-500 font-extrabold flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5" /> ${tournament.prize}
                            </span>
                            <span className="text-zinc-500 font-bold flex items-center gap-1">
                              <UsersIcon className="w-3.5 h-3.5 text-zinc-500" /> {tournament.participants?.length || 0} / {tournament.maxTeams}
                            </span>
                          </div>

                          <div className="mt-2.5 flex gap-2">
                            {isCreator && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartTournament(tournament.id);
                                }}
                                className="flex-1 py-1.5 bg-green-600 hover:bg-green-700 text-white font-black text-[9px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                              >
                                Iniciar Torneo
                              </button>
                            )}
                            {!isCreator && !isJoined && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenJoinModal(tournament);
                                }}
                                className="flex-1 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-[9px] uppercase tracking-wider rounded-lg transition-transform hover:scale-105 shadow-md shadow-pink-500/10 cursor-pointer"
                              >
                                Inscribirse
                              </button>
                            )}
                            {isJoined && !isCreator && (
                              <span className="flex-1 text-center py-1.5 bg-purple-600/10 border border-purple-500/20 text-purple-400 font-bold text-[9px] uppercase rounded-lg">
                                Inscrito
                              </span>
                            )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveArenaTournament(tournament);
                              }}
                              className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[9px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
                            >
                              Detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PREDICE Y GANA BANNER PANEL */}
            <div className={`bg-gradient-to-br from-[#1b122e] to-[#0d091a] border border-purple-500/20 rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group ${
              mobileActiveTab === 'destacados' ? 'flex' : 'hidden xl:flex'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
              
              <div className="space-y-2">
                <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">Predice y gana</span>
                <h3 className="text-base font-black text-white leading-tight">¿Quién ganará la Copa LiveX Free Fire?</h3>
                <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">Apoya a tu equipo favorito, acierta la predicción del torneo y duplica tus monedas 💎</p>
              </div>

              {/* Selector buttons */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <button 
                  onClick={() => setSelectedPredictionTeam('cobra')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedPredictionTeam === 'cobra' 
                      ? 'bg-purple-600/30 border-purple-500 text-white font-black scale-[1.02]' 
                      : 'bg-white/5 border-transparent hover:border-white/10 text-zinc-400 font-bold'
                  }`}
                >
                  <div className="text-lg mb-1">🐍</div>
                  <div className="text-[10px] uppercase">Team Cobra</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">X1.85 Retorno</div>
                </button>

                <button 
                  onClick={() => setSelectedPredictionTeam('titans')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedPredictionTeam === 'titans' 
                      ? 'bg-purple-600/30 border-purple-500 text-white font-black scale-[1.02]' 
                      : 'bg-white/5 border-transparent hover:border-white/10 text-zinc-400 font-bold'
                  }`}
                >
                  <div className="text-lg mb-1">⚡</div>
                  <div className="text-[10px] uppercase">Titans Esports</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">X2.10 Retorno</div>
                </button>
              </div>

              <button 
                onClick={() => {
                  if (!selectedPredictionTeam) {
                    alert('Por favor selecciona un equipo primero.');
                    return;
                  }
                  alert('¡Predicción colocada! 🔮 ¡Que gane el mejor!');
                  setSelectedPredictionTeam(null);
                }}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-black py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform uppercase tracking-wider text-center cursor-pointer"
              >
                Participar
              </button>

            </div>

          </div>

          {/* 5. MIS TORNEOS VIEW */}
          {mobileActiveTab === 'mis' && (
            <div className="flex flex-col gap-4 lg:hidden">
              {myTournaments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-[#0a0a0f] border border-white/5 rounded-3xl">
                  <div className="w-16 h-16 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <Trophy className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-base font-black text-white mb-2 uppercase tracking-wide">Mis Torneos</h3>
                  <p className="text-xs text-zinc-500 font-semibold max-w-xs mb-6">No estás inscrito en ningún torneo de esports actualmente. ¡Únete a un torneo activo o crea uno!</p>
                  <button 
                    onClick={() => setMobileActiveTab('vivo')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black px-6 py-3 rounded-xl shadow-lg shadow-pink-500/20 uppercase tracking-widest active:scale-95 transition-transform cursor-pointer"
                  >
                    Explorar en Vivo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {myTournaments.map(tournament => (
                    <div 
                      key={tournament.id}
                      onClick={() => setActiveArenaTournament(tournament)}
                      className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-4 flex justify-between items-center cursor-pointer"
                    >
                      <div>
                        <span className="text-[8px] bg-pink-500/10 text-pink-400 px-1.5 py-0.5 rounded font-black uppercase">{tournament.status}</span>
                        <h4 className="text-xs font-black text-white mt-1">{tournament.title}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{tournament.game} • {tournament.participants.length} participantes</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* ------------------- MOBILE BOTTOM NAVIGATION BAR ------------------- */}
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
            <button 
              onClick={() => setShowQuickActions(true)}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a] cursor-pointer"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>

          <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 relative">
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-bold">Mensajes</span>
          </Link>
          <Link href={`/u/${user?.username}`} className="flex flex-col items-center gap-1 text-zinc-500">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Perfil</span>
          </Link>
        </div>

      </main>

      {/* ----------------- MOBILE QUICK ACTIONS OVERLAY ----------------- */}
      {showQuickActions && (
        <div className="fixed inset-0 z-50 bg-[#05050ad9] backdrop-blur-xl flex flex-col justify-end p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowQuickActions(false)} />
          <div className="bg-[#0f0e1a]/95 border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 animate-in slide-in-from-bottom-10 duration-300 max-w-sm mx-auto w-full mb-4">
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Acceso Rápido</h4>
                <h3 className="text-base font-black text-white">LiveX Creator Studio</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowQuickActions(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => { setShowQuickActions(false); router.push('/transmitir'); }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mb-1.5 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Play className="w-5 h-5 fill-purple-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">En Vivo</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Transmitir ahora</span>
              </button>

              <button 
                onClick={() => { setShowQuickActions(false); useCreatorStore.getState().open('upload'); }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-pink-600/10 to-rose-600/10 border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-[1.02] text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400 mb-1.5 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  <Plus className="w-5 h-5 text-pink-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Publicar</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Subir video</span>
              </button>

              <button 
                onClick={() => { setShowQuickActions(false); router.push('/batallas'); }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-rose-600/10 to-red-600/10 border border-rose-500/20 hover:border-rose-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-400 mb-1.5 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <Swords className="w-5 h-5 text-rose-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Batallas PvP</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Duelos en vivo</span>
              </button>

              <button 
                onClick={() => { setShowQuickActions(false); setShowCreateModal(true); }}
                className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:scale-[1.02] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-400 mb-1.5 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-xs font-bold text-white mb-0.5">Crear Torneo</span>
                <span className="text-[9px] text-zinc-500 font-semibold">Competir hoy</span>
              </button>
            </div>

            <p className="text-[10px] text-zinc-500 text-center font-bold">LiveX Creator Hub © 2026</p>
          </div>
        </div>
      )}

      {/* ----------------- CREATE TORNEO MODAL ----------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          {/* Backdrop Overlay Dismiss */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowCreateModal(false)} />
          
          <div className="bg-[#0b0a12] border border-white/10 rounded-3xl max-w-lg w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" /> Organizar Nuevo Torneo
              </h3>
              <button 
                type="button" 
                onClick={() => setShowCreateModal(false)} 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer z-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTournament} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Nombre del Torneo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Copa LiveX Bermuda Custom" 
                  value={createTitle}
                  onChange={e => setCreateTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Juego / Categoría</label>
                  <select 
                    value={createGame}
                    onChange={e => setCreateGame(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Free Fire">Free Fire</option>
                    <option value="Valorant">Valorant</option>
                    <option value="Fortnite">Fortnite</option>
                    <option value="Call of Duty">Call of Duty</option>
                    <option value="League of Legends">League of Legends</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Formato de Juego</label>
                  <select 
                    value={createFormat}
                    onChange={e => {
                      const fmt = e.target.value;
                      setCreateFormat(fmt);
                      if (fmt === 'BO3') {
                        setCreateMaxTeams(2); // strictly locked to 2 players
                      } else if (fmt === 'BO3_2V2') {
                        setCreateMaxTeams(4); // strictly locked to 4 players (2vs2)
                      } else {
                        setCreateMaxTeams(20); // default BR start
                      }
                    }}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="BO3">1vs1 PvP (Mejor de 3)</option>
                    <option value="BO3_2V2">2vs2 PvP (Mejor de 3)</option>
                    <option value="BR">Battle Royale (Sala BR Bermuda)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Premio (Monedas)</label>
                  <input 
                    type="number" 
                    placeholder="Ej: 1000" 
                    value={createPrize}
                    onChange={e => setCreatePrize(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                    required 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Entrada (Coins)</label>
                  <input 
                    type="number" 
                    placeholder="Ej: 50" 
                    value={createEntryFee}
                    onChange={e => setCreateEntryFee(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Máx. Jugadores</label>
                  {createFormat === 'BO3' ? (
                    <input 
                      type="text" 
                      value="2 Jugadores (Fijo)" 
                      disabled
                      className="w-full bg-white/5 border border-white/5 text-zinc-500 rounded-xl px-3.5 py-2.5 text-xs"
                    />
                  ) : createFormat === 'BO3_2V2' ? (
                    <input 
                      type="text" 
                      value="4 Jugadores (2vs2 Fijo)" 
                      disabled
                      className="w-full bg-white/5 border border-white/5 text-zinc-500 rounded-xl px-3.5 py-2.5 text-xs"
                    />
                  ) : (
                    <select
                      value={createMaxTeams}
                      onChange={e => setCreateMaxTeams(Number(e.target.value))}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value={20}>20 Jugadores</option>
                      <option value={30}>30 Jugadores</option>
                      <option value={48}>48 Jugadores (Completo)</option>
                      <option value={100}>100 Jugadores</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">ID de Sala (Free Fire)</label>
                  <input 
                    type="text" 
                    placeholder="Ej: 874291" 
                    value={createRoomCode}
                    onChange={e => setCreateRoomCode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Contraseña de Sala</label>
                  <input 
                    type="text" 
                    placeholder="Ej: 9988" 
                    value={createRoomPassword}
                    onChange={e => setCreateRoomPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black py-3 rounded-xl mt-6 hover:scale-[1.01] transition-transform shadow-lg shadow-pink-500/20 cursor-pointer"
              >
                Crear Torneo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- JOIN TOURNAMENT FORM MODAL ----------------- */}
      {isJoinModalOpen && joiningTournament && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => { setIsJoinModalOpen(false); setJoiningTournament(null); }} />
          
          <div className="bg-[#0b0a12] border-2 border-purple-500/30 rounded-3xl max-w-sm w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 z-10">
            <button 
              type="button" 
              onClick={() => { setIsJoinModalOpen(false); setJoiningTournament(null); }} 
              className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-base font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sword className="w-5 h-5 text-purple-400 animate-pulse" /> Inscripción al Torneo
            </h3>
            <p className="text-xs text-zinc-400 mb-4">Ingresa las credenciales de tu cuenta de Free Fire para registrar tu participación.</p>

            {joiningTournament.entryFee > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-3.5 mb-4 text-xs">
                <div className="flex justify-between items-center text-yellow-500 font-extrabold mb-1">
                  <span>Costo de Inscripción:</span>
                  <span>{joiningTournament.entryFee} monedas</span>
                </div>
                <p className="text-[10px] text-zinc-400">Esta cantidad se deducirá automáticamente de tu billetera al confirmar.</p>
              </div>
            )}

            <form onSubmit={handleJoinTournamentSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">ID de Jugador (Free Fire ID)</label>
                <input 
                  type="text" 
                  placeholder="Ej: 541098327" 
                  value={joinFreeFireId}
                  onChange={e => setJoinFreeFireId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  required 
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 block mb-1">Nombre en el Juego (Free Fire Profile Name)</label>
                <input 
                  type="text" 
                  placeholder="Ej: CobraGamer_YT" 
                  value={joinFreeFireName}
                  onChange={e => setJoinFreeFireName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  required 
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => { setIsJoinModalOpen(false); setJoiningTournament(null); }}
                  className="flex-1 py-2.5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 text-zinc-400 cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-lg cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- ESPORTS BRACKETS ARENA MODAL ----------------- */}
      {activeArenaTournament && (
        <div className="fixed inset-0 z-50 bg-[#05050ad9] backdrop-blur-xl flex flex-col justify-center items-stretch p-4 lg:p-6 overflow-y-auto">
          <div className="absolute inset-0 cursor-pointer" onClick={() => { 
            setActiveArenaTournament(null); 
            setWinScreenshot(''); 
            setWinPreview('');
            setMatch2Screenshot('');
            setMatch2Preview('');
            setMatch3Screenshot('');
            setMatch3Preview('');
            setProfileScreenshot(''); 
            setProfilePreview('');
          }} />
          
          <div className="bg-[#0b0a12]/95 border border-white/10 rounded-3xl flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full shadow-2xl relative z-10">
            
            {/* Header */}
            <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 text-[8px] font-black rounded uppercase tracking-wider flex items-center gap-1 shadow-lg ${
                  activeArenaTournament.status === 'ONGOING' ? 'bg-red-600' : activeArenaTournament.status === 'FINISHED' ? 'bg-yellow-600' : 'bg-purple-600'
                }`}>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> {activeArenaTournament.status}
                </span>
                <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">{activeArenaTournament.title} • Arena de Torneos</h2>
              </div>
              <button 
                type="button"
                onClick={() => { 
                  setActiveArenaTournament(null); 
                  setWinScreenshot(''); 
                  setWinPreview('');
                  setMatch2Screenshot('');
                  setMatch2Preview('');
                  setMatch3Screenshot('');
                  setMatch3Preview('');
                  setProfileScreenshot(''); 
                  setProfilePreview('');
                }}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Split layout: left = stream + bracket, right = chat + prediction */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
              
              {/* Left column (stream + brackets) */}
              <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-6 space-y-6">
                
                {/* Rules description header */}
                <div className="bg-[#12152b] border border-white/5 p-4 rounded-2xl text-[10px] text-zinc-400 space-y-2">
                  <div className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-purple-400" /> REGLAS Y REQUISITOS DEL TORNEO</div>
                  {activeArenaTournament.format === 'BO3' ? (
                    <>
                      <p>1. Formato: **1vs1 PvP (Al mejor de 3 Partidas)**. Se juegan 3 salas customizadas.</p>
                      <p>2. Al finalizar, el ganador debe subir capturas de la partida 1, partida 2 y la partida 3 (en caso de desempate 1-1) junto a la captura de su perfil.</p>
                    </>
                  ) : activeArenaTournament.format === 'BO3_2V2' ? (
                    <>
                      <p>1. Formato: **2vs2 PvP (Al mejor de 3 Partidas)**. Se juegan 3 salas customizadas por parejas.</p>
                      <p>2. Ambos integrantes de la pareja ganadora se dividirán el premio del torneo a la mitad automáticamente tras la aprobación.</p>
                    </>
                  ) : (
                    <>
                      <p>1. Formato: **Battle Royale (Mapa BR Bermuda)**. Todos los jugadores ingresan al mismo lobby.</p>
                      <p>2. El jugador que obtenga el Booyah! o la mejor posición reporta su captura de victoria final y captura de perfil.</p>
                    </>
                  )}
                  <p>3. El creador confirmará y te otorgará el premio de **${activeArenaTournament.prize} monedas** de forma inmediata.</p>
                </div>

                {/* 1. Interactive PvP Battle Launcher / Room details */}
                {activeArenaTournament.status === 'ONGOING' ? (
                  <div className="flex flex-col gap-4">
                    
                    {/* Launch Room block (Visible to registered participants only) */}
                    {isCurrentUserParticipant(activeArenaTournament) ? (
                      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 border border-pink-500/30 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-1 text-center sm:text-left">
                          <div className="flex items-center gap-1.5 text-xs font-black uppercase text-pink-500 justify-center sm:justify-start">
                            <Flame className="w-4 h-4 text-pink-500 animate-pulse" /> ¡SALA LISTA PARA LA BATALLA!
                          </div>
                          <h4 className="text-sm font-black text-white">Ingresa a Free Fire e inicia tu partida</h4>
                          <p className="text-[10px] text-zinc-400 font-bold">
                            ID de Sala: <span className="text-white bg-white/5 px-2 py-0.5 rounded font-black border border-white/5">{activeArenaTournament.roomCode || 'Sala Automática'}</span>
                            {activeArenaTournament.roomPassword && (
                              <> | Contraseña: <span className="text-white bg-white/5 px-2 py-0.5 rounded font-black border border-white/5">{activeArenaTournament.roomPassword}</span></>
                            )}
                          </p>
                        </div>

                        <button 
                          onClick={() => handleLaunchFreeFire(activeArenaTournament.roomCode, activeArenaTournament.roomPassword)}
                          className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center gap-1.5 shadow-lg shadow-pink-500/20 w-full sm:w-auto justify-center cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" /> INGRESAR A FREE FIRE
                        </button>
                      </div>
                    ) : (
                      <div className="bg-zinc-950/60 border border-white/5 rounded-3xl p-5 text-center">
                        <span className="text-[9px] font-black text-zinc-500 uppercase block tracking-wider">Espectando Partida</span>
                        <h4 className="text-xs font-black text-white mt-1">El torneo se encuentra en curso pero no estás inscrito.</h4>
                      </div>
                    )}

                    {/* Submit Proof Form (Visible to registered participants who haven't completed submission) */}
                    {isCurrentUserParticipant(activeArenaTournament) && !currentUserParticipantDetails(activeArenaTournament)?.submittedWin && (
                      <div className="bg-[#0f0e18] border border-white/5 rounded-3xl p-5 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                            <Trophy className="w-4.5 h-4.5 text-yellow-500" /> ¿Ganaste la partida? Sube tus comprobantes de la Galería
                          </h4>
                          <button 
                            type="button" 
                            onClick={handleAutoFillProof} 
                            className="text-[9px] font-bold text-purple-400 hover:text-purple-300 uppercase cursor-pointer"
                          >
                            Generar Capturas de Prueba (Simulador)
                          </button>
                        </div>

                        <form onSubmit={handleSubmitWinProof} className="space-y-6">
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            
                            {/* File input for Win Screenshot / Match 1 */}
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-zinc-400 block">
                                {activeArenaTournament.format === 'BO3' || activeArenaTournament.format === 'BO3_2V2' ? 'Captura Partida 1 (Victoria/Derrota)' : 'Captura de Victoria (Booyah!)'}
                              </label>
                              <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-purple-500/40 transition-colors cursor-pointer relative min-h-[120px]">
                                {winPreview ? (
                                  <img src={winPreview} className="max-h-24 rounded-lg object-contain animate-in fade-in duration-300" alt="Preview" />
                                ) : (
                                  <div className="text-center space-y-1">
                                    <span className="text-xl">📸</span>
                                    <div className="text-[9px] font-bold text-zinc-400">Seleccionar Imagen 1</div>
                                    <div className="text-[7px] text-zinc-500 font-semibold">Galería / Archivos</div>
                                  </div>
                                )}
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileChange(e, 'win')} 
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                              </div>
                            </div>

                            {/* BO3 or BO3_2V2 extra match screenshots */}
                            {(activeArenaTournament.format === 'BO3' || activeArenaTournament.format === 'BO3_2V2') && (
                              <>
                                {/* Match 2 */}
                                <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase text-zinc-400 block">Captura Partida 2</label>
                                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-purple-500/40 transition-colors cursor-pointer relative min-h-[120px]">
                                    {match2Preview ? (
                                      <img src={match2Preview} className="max-h-24 rounded-lg object-contain animate-in fade-in duration-300" alt="Preview" />
                                    ) : (
                                      <div className="text-center space-y-1">
                                        <span className="text-xl">📸</span>
                                        <div className="text-[9px] font-bold text-zinc-400">Seleccionar Imagen 2</div>
                                        <div className="text-[7px] text-zinc-500 font-semibold">Galería / Archivos</div>
                                      </div>
                                    )}
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => handleFileChange(e, 'match2')} 
                                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                  </div>
                                </div>

                                {/* Match 3 */}
                                <div className="space-y-2">
                                  <label className="text-[9px] font-black uppercase text-zinc-400 block">Captura Partida 3 (Opcional Desempate)</label>
                                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-purple-500/40 transition-colors cursor-pointer relative min-h-[120px]">
                                    {match3Preview ? (
                                      <img src={match3Preview} className="max-h-24 rounded-lg object-contain animate-in fade-in duration-300" alt="Preview" />
                                    ) : (
                                      <div className="text-center space-y-1">
                                        <span className="text-xl">📸</span>
                                        <div className="text-[9px] font-bold text-zinc-400">Seleccionar Imagen 3</div>
                                        <div className="text-[7px] text-zinc-500 font-semibold">Galería / Archivos</div>
                                      </div>
                                    )}
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => handleFileChange(e, 'match3')} 
                                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            {/* File input for Profile Screenshot */}
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-zinc-400 block">Captura de Perfil (ID + Nombre)</label>
                              <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-4 bg-white/5 hover:border-purple-500/40 transition-colors cursor-pointer relative min-h-[120px]">
                                {profilePreview ? (
                                  <img src={profilePreview} className="max-h-24 rounded-lg object-contain animate-in fade-in duration-300" alt="Preview" />
                                ) : (
                                  <div className="text-center space-y-1">
                                    <span className="text-xl">👤</span>
                                    <div className="text-[9px] font-bold text-zinc-400">Seleccionar Perfil</div>
                                    <div className="text-[7px] text-zinc-500 font-semibold">Galería / Archivos</div>
                                  </div>
                                )}
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileChange(e, 'profile')} 
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                              </div>
                            </div>

                          </div>

                          <div className="flex justify-end gap-3">
                            {(winPreview || match2Preview || match3Preview || profilePreview) && (
                              <button 
                                type="button" 
                                onClick={() => {
                                  setWinScreenshot('');
                                  setWinPreview('');
                                  setMatch2Screenshot('');
                                  setMatch2Preview('');
                                  setMatch3Screenshot('');
                                  setMatch3Preview('');
                                  setProfileScreenshot('');
                                  setProfilePreview('');
                                }}
                                className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
                              >
                                Limpiar
                              </button>
                            )}
                            <button 
                              type="submit" 
                              disabled={isSubmittingWin}
                              className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform cursor-pointer"
                            >
                              {isSubmittingWin ? 'Procesando...' : 'Enviar Reporte de Victoria'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Submission status alert */}
                    {isCurrentUserParticipant(activeArenaTournament) && currentUserParticipantDetails(activeArenaTournament)?.submittedWin && !currentUserParticipantDetails(activeArenaTournament)?.isWinner && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-xs text-yellow-500 flex items-center gap-2">
                        <Clock className="w-5 h-5 animate-pulse shrink-0" />
                        <div>
                          <strong>¡Reporte Enviado!</strong> Tus capturas de pantalla están en revisión por el creador del torneo. Una vez aprobado, se te otorgará el premio automáticamente.
                        </div>
                      </div>
                    )}

                  </div>
                ) : activeArenaTournament.status === 'UPCOMING' ? (
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Torneo en Preparación</span>
                      <h4 className="text-sm font-black text-white mt-0.5">El creador del torneo aún no ha iniciado la competencia</h4>
                      <p className="text-[10px] text-zinc-400 mt-1">Inscríbete para asegurar tu cupo antes de que empiece.</p>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      {activeArenaTournament.creatorId === user.id ? (
                        <button 
                          onClick={() => handleStartTournament(activeArenaTournament.id)}
                          className="flex-1 sm:flex-initial px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer"
                        >
                          Iniciar Torneo
                        </button>
                      ) : activeArenaTournament.participants?.some((p: any) => p.userId === user.id) ? (
                        <span className="px-5 py-2.5 bg-purple-600/10 border border-purple-500/30 text-purple-400 font-black text-xs uppercase rounded-xl">
                          Inscrito en el Torneo
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleOpenJoinModal(activeArenaTournament)}
                          className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-transform hover:scale-105 shadow-lg shadow-pink-500/20 cursor-pointer"
                        >
                          Unirse al Torneo
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-950/60 border border-white/5 rounded-3xl p-5 text-center">
                    <Trophy className="w-10 h-10 text-yellow-500 mx-auto animate-bounce mb-2" />
                    <h4 className="text-sm font-black text-white uppercase tracking-wider font-extrabold">Torneo Finalizado</h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      La competencia ha concluido. Ganador(es) con el premio del torneo.
                    </p>
                  </div>
                )}

                {/* 2. Visual Brackets / Lobby Leaderboard view (Connected to real database participant names!) */}
                {activeArenaTournament.format === 'BO3' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Esports Bracket 1vs1 PvP (Mejor de 3)</h3>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-3xl p-6 overflow-x-auto scrollbar-none flex gap-8 items-center justify-around min-w-[500px]">
                      
                      {/* Left Player */}
                      <div className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/5 rounded-3xl w-48 shadow-lg relative group">
                        <span className="text-lg">🐍</span>
                        <span className="text-xs font-black text-white truncate max-w-[150px]">
                          {activeArenaTournament.participants?.[0]?.user?.username ? `@${activeArenaTournament.participants[0].user.username}` : 'Esperando jugador...'}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold">FF: {activeArenaTournament.participants?.[0]?.freeFireName || '-'}</span>
                        {activeArenaTournament.participants?.[0]?.isWinner && (
                          <span className="absolute top-2 right-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[8px] font-black px-1.5 py-0.5 rounded">GANADOR</span>
                        )}
                      </div>

                      {/* Versus connector */}
                      <div className="flex flex-col justify-center items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-lg">VS</div>
                        <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mt-1">SERIE 1V1 BO3</span>
                      </div>

                      {/* Right Player */}
                      <div className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/5 rounded-3xl w-48 shadow-lg relative group">
                        <span className="text-lg">🦂</span>
                        <span className="text-xs font-black text-white truncate max-w-[150px]">
                          {activeArenaTournament.participants?.[1]?.user?.username ? `@${activeArenaTournament.participants[1].user.username}` : 'Esperando contrincante...'}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold">FF: {activeArenaTournament.participants?.[1]?.freeFireName || '-'}</span>
                        {activeArenaTournament.participants?.[1]?.isWinner && (
                          <span className="absolute top-2 right-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[8px] font-black px-1.5 py-0.5 rounded">GANADOR</span>
                        )}
                      </div>

                    </div>
                  </div>
                ) : activeArenaTournament.format === 'BO3_2V2' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Esports Bracket 2vs2 PvP (Mejor de 3)</h3>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-3xl p-6 overflow-x-auto scrollbar-none flex gap-8 items-center justify-around min-w-[500px]">
                      
                      {/* Left Team (Team 1) */}
                      <div className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/5 rounded-3xl w-56 shadow-lg relative group">
                        <span className="text-lg">🐍</span>
                        <span className="text-xs font-black text-white text-center">
                          Equipo 1 (Cobra)
                        </span>
                        <div className="text-[10px] text-zinc-400 font-semibold space-y-1 text-center mt-1 w-full truncate">
                          <div className="truncate">{activeArenaTournament.participants?.[0] ? `@${activeArenaTournament.participants[0].user.username} (${activeArenaTournament.participants[0].freeFireName})` : 'Esperando jugador 1...'}</div>
                          <div className="truncate">{activeArenaTournament.participants?.[1] ? `@${activeArenaTournament.participants[1].user.username} (${activeArenaTournament.participants[1].freeFireName})` : 'Esperando jugador 2...'}</div>
                        </div>
                        {activeArenaTournament.participants?.[0]?.isWinner && (
                          <span className="absolute top-2 right-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[8px] font-black px-1.5 py-0.5 rounded">GANADORES</span>
                        )}
                      </div>

                      {/* Versus connector */}
                      <div className="flex flex-col justify-center items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-lg">VS</div>
                        <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mt-1">SERIE 2V2 BO3</span>
                      </div>

                      {/* Right Team (Team 2) */}
                      <div className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/5 rounded-3xl w-56 shadow-lg relative group">
                        <span className="text-lg">🦂</span>
                        <span className="text-xs font-black text-white text-center">
                          Equipo 2 (Scorpion)
                        </span>
                        <div className="text-[10px] text-zinc-400 font-semibold space-y-1 text-center mt-1 w-full truncate">
                          <div className="truncate">{activeArenaTournament.participants?.[2] ? `@${activeArenaTournament.participants[2].user.username} (${activeArenaTournament.participants[2].freeFireName})` : 'Esperando jugador 3...'}</div>
                          <div className="truncate">{activeArenaTournament.participants?.[3] ? `@${activeArenaTournament.participants[3].user.username} (${activeArenaTournament.participants[3].freeFireName})` : 'Esperando jugador 4...'}</div>
                        </div>
                        {activeArenaTournament.participants?.[2]?.isWinner && (
                          <span className="absolute top-2 right-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[8px] font-black px-1.5 py-0.5 rounded">GANADORES</span>
                        )}
                      </div>

                    </div>
                  </div>
                ) : (
                  /* Battle Royale Lobby view */
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <List className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Lobby de Participantes en Sala BR ({activeArenaTournament.participants?.length || 0} / {activeArenaTournament.maxTeams})</h3>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-3xl p-6 overflow-x-auto scrollbar-none flex flex-col gap-3">
                      {activeArenaTournament.participants?.length === 0 ? (
                        <div className="text-center py-6 text-xs text-zinc-500 italic">No hay jugadores inscritos en esta sala aún.</div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {activeArenaTournament.participants.map((p: any, idx: number) => (
                            <div key={p.id} className="bg-white/5 border border-white/5 p-3 rounded-2xl flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-zinc-500">#{idx+1}</span>
                                <img src={p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.username}`} className="w-8 h-8 rounded-full bg-zinc-800" alt="" />
                                <div>
                                  <div className="text-xs font-black text-white">@{p.user.username}</div>
                                  <div className="text-[9px] text-zinc-500 font-semibold">{p.freeFireName} • ID: {p.freeFireId}</div>
                                </div>
                              </div>
                              {p.isWinner && (
                                <span className="text-yellow-500 text-lg">🏆</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Creator Review win screenshots panel */}
                {activeArenaTournament.creatorId === user.id && activeArenaTournament.status === 'ONGOING' && (
                  <div className="border-t border-white/5 pt-4 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-yellow-500">REVISIÓN DE COMPROBANTES DE VICTORIA (CREADOR)</h3>
                    
                    {activeArenaTournament.participants?.filter((p: any) => p.submittedWin && !p.isWinner).length === 0 ? (
                      <div className="text-[10px] text-zinc-500 italic">No hay reportes de victorias pendientes para revisar en este momento.</div>
                    ) : (
                      <div className="space-y-4">
                        {activeArenaTournament.participants.filter((p: any) => p.submittedWin && !p.isWinner).map((p: any) => (
                          <div key={p.id} className="bg-[#181330] border border-purple-500/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-2">
                              <span className="text-[9px] bg-purple-600 text-white font-black px-1.5 py-0.5 rounded uppercase">REPORTÓ VICTORIA</span>
                              <div className="text-xs font-black text-white">@{p.user.username} ({p.freeFireName})</div>
                              <div className="text-[10px] text-zinc-400">ID de Jugador: {p.freeFireId}</div>
                              
                              {/* Clickable Screenshot links */}
                              <div className="flex flex-wrap gap-4 mt-2 text-[9px] font-bold">
                                {p.winScreenshot && (
                                  <a href={p.winScreenshot} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline bg-white/5 px-2.5 py-1 rounded border border-white/5">Ver Partida 1 🖼️</a>
                                )}
                                {p.match2Screenshot && (
                                  <a href={p.match2Screenshot} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline bg-white/5 px-2.5 py-1 rounded border border-white/5">Ver Partida 2 🖼️</a>
                                )}
                                {p.match3Screenshot && (
                                  <a href={p.match3Screenshot} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline bg-white/5 px-2.5 py-1 rounded border border-white/5">Ver Partida 3 🖼️</a>
                                )}
                                {p.profileScreenshot && (
                                  <a href={p.profileScreenshot} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline bg-white/5 px-2.5 py-1 rounded border border-white/5">Ver Perfil 🖼️</a>
                                )}
                              </div>
                            </div>

                            <button 
                              onClick={() => handleApproveWinner(p.userId, p.user.username)}
                              className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                              Aprobar Ganador y Pagar Premio
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Creator finishing tools */}
                {activeArenaTournament.status === 'ONGOING' && activeArenaTournament.creatorId === user.id && (
                  <div className="border-t border-white/5 pt-4 flex justify-end">
                    <button 
                      onClick={() => handleFinishTournament(activeArenaTournament.id)}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg cursor-pointer"
                    >
                      Cerrar Torneo (Sin ganador)
                    </button>
                  </div>
                )}

              </div>

              {/* Right column (chat + predictors + gift panels) */}
              <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col bg-[#07060d]/80 shrink-0">
                
                {/* Arena live comments */}
                <div className="flex-grow flex flex-col overflow-hidden p-4 h-[250px] lg:h-auto">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-400" /> Chat Arena Live
                  </h3>
                  
                  <div ref={arenaChatEndRef} className="flex-grow overflow-y-auto scrollbar-none space-y-3 pr-1 pb-4">
                    {arenaChatMessages.map(msg => (
                      <div key={msg.id} className="text-xs p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-pink-400 flex items-center gap-1">{msg.user}</span>
                          <span className="text-[8px] text-zinc-600">{msg.time}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newArenaMessage.trim()) return;
                      setArenaChatMessages(prev => [
                        ...prev, 
                        { id: Date.now(), user: user.username, text: newArenaMessage, time: 'Ahora' }
                      ]);
                      setNewArenaMessage('');
                    }}
                    className="flex gap-2 border-t border-white/5 pt-3 mt-auto shrink-0"
                  >
                    <input 
                      type="text" 
                      placeholder="Escribe un mensaje de apoyo..." 
                      value={newArenaMessage}
                      onChange={e => setNewArenaMessage(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500" 
                    />
                    <button type="submit" className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Arena Gifts panel */}
                <div className="border-t border-white/10 p-4 shrink-0 bg-black/40">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Enviar regalos arena</span>
                    <span className="text-[10px] font-black text-yellow-500 flex items-center gap-1"><Coins className="w-3.5 h-3.5" /> {userCoins.toLocaleString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { emoji: '🌹', name: 'Rosa', cost: 10 },
                      { emoji: '❤️', name: 'Corazón', cost: 50 },
                      { emoji: '👑', name: 'Corona', cost: 200 },
                      { emoji: '🦁', name: 'León', cost: 500 }
                    ].map(gift => (
                      <button 
                        key={gift.name} 
                        onClick={() => triggerGift(gift.emoji, gift.name, gift.cost)}
                        className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all text-center cursor-pointer"
                      >
                        <span className="text-xl mb-0.5">{gift.emoji}</span>
                        <span className="text-[8px] font-bold text-zinc-300 line-clamp-1">{gift.name}</span>
                        <span className="text-[8px] font-black text-yellow-500">{gift.cost}💎</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ----------------- REAL MONEY COIN STORE MODAL ----------------- */}
      {showCoinStoreModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => { setShowCoinStoreModal(false); setSelectedCoinPackage(null); setSelectedPaymentMethod(null); }} />
          
          <div className="bg-[#0b0a12] border-2 border-yellow-500/20 rounded-3xl max-w-2xl w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 z-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 blur-3xl rounded-full" />
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Coins className="w-5.5 h-5.5 text-yellow-500" /> TIENDA DE MONEDAS LIVEX (RECARGA MÓVIL)
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Tu saldo actual: {userCoins.toLocaleString()} monedas</p>
              </div>
              <button 
                type="button"
                onClick={() => { setShowCoinStoreModal(false); setSelectedCoinPackage(null); setSelectedPaymentMethod(null); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Select Coin Package */}
            {!selectedCoinPackage ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {coinPackages.map(pkg => (
                  <div 
                    key={pkg.id}
                    onClick={() => setSelectedCoinPackage(pkg)}
                    className={`bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-between hover:border-yellow-500/40 hover:scale-[1.02] transition-all cursor-pointer relative ${
                      pkg.popular ? 'border-purple-500/40 bg-purple-950/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : ''
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}

                    <span className="text-3xl mb-1">💎</span>
                    <div className="text-center">
                      <div className="text-sm font-black text-white">{pkg.coins} Monedas</div>
                      <div className="text-[9px] text-green-400 font-bold">+{pkg.bonus} de Regalo</div>
                    </div>

                    <div className="mt-4 w-full text-center py-2 bg-yellow-500 text-black font-black text-xs rounded-xl hover:bg-yellow-400 transition-colors shadow-md">
                      ${pkg.price} USD
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Step 2: Payment Gateways Selector */
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Paquete Seleccionado</span>
                    <h4 className="text-sm font-black text-white">{selectedCoinPackage.coins + selectedCoinPackage.bonus} Monedas (Recarga)</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-zinc-500 uppercase block tracking-widest">Precio total</span>
                    <span className="text-base font-black text-yellow-500">${selectedCoinPackage.price} USD</span>
                  </div>
                </div>

                {!selectedPaymentMethod ? (
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">Selecciona tu Método de Pago</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      {/* PayPal Button */}
                      <button 
                        type="button"
                        onClick={() => setSelectedPaymentMethod('paypal')}
                        className="flex flex-col items-center justify-center p-4 bg-[#003087]/10 hover:bg-[#003087]/20 border border-[#003087]/30 hover:border-[#0070ba] rounded-2xl transition-all cursor-pointer text-center gap-1.5"
                      >
                        <span className="text-xl">💳</span>
                        <span className="text-xs font-black text-[#0070ba]">PayPal Express</span>
                        <span className="text-[8px] text-zinc-500 font-semibold">Simulado instantáneo</span>
                      </button>

                      {/* Credit Card Button */}
                      <button 
                        type="button"
                        onClick={() => setSelectedPaymentMethod('card')}
                        className="flex flex-col items-center justify-center p-4 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 rounded-2xl transition-all cursor-pointer text-center gap-1.5"
                      >
                        <CreditCard className="w-6 h-6 text-purple-400" />
                        <span className="text-xs font-black text-white">Tarjeta de Crédito</span>
                        <span className="text-[8px] text-zinc-500 font-semibold">Visa, Mastercard</span>
                      </button>

                      {/* Google Play gift cards */}
                      <button 
                        type="button"
                        onClick={() => setSelectedPaymentMethod('google')}
                        className="flex flex-col items-center justify-center p-4 bg-[#34a853]/10 hover:bg-[#34a853]/20 border border-[#34a853]/30 hover:border-[#34a853] rounded-2xl transition-all cursor-pointer text-center gap-1.5"
                      >
                        <span className="text-xl">🎟️</span>
                        <span className="text-xs font-black text-[#34a853]">Tarjeta Google Play</span>
                        <span className="text-[8px] text-zinc-500 font-semibold">Canjear código PIN</span>
                      </button>

                    </div>

                    <button 
                      type="button"
                      onClick={() => setSelectedCoinPackage(null)}
                      className="mt-6 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase cursor-pointer"
                    >
                      ← Volver a Paquetes
                    </button>
                  </div>
                ) : (
                  /* Step 3: Specific Checkout forms */
                  <form onSubmit={handleProcessPayment} className="space-y-4">
                    
                    {/* PayPal Form */}
                    {selectedPaymentMethod === 'paypal' && (
                      <div className="space-y-3 p-4 bg-[#003087]/5 border border-[#003087]/20 rounded-2xl">
                        <div className="text-xs font-black text-[#0070ba] flex items-center gap-2">👤 Iniciar Sesión con PayPal</div>
                        <input 
                          type="email" 
                          placeholder="Correo electrónico de PayPal" 
                          value={paypalEmail}
                          onChange={e => setPaypalEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#0070ba]"
                          required
                        />
                        <input 
                          type="password" 
                          placeholder="Contraseña de PayPal" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#0070ba]"
                          required
                        />
                      </div>
                    )}

                    {/* Credit Card Form */}
                    {selectedPaymentMethod === 'card' && (
                      <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="text-xs font-black text-white flex items-center gap-2"><CreditCard className="w-4 h-4 text-purple-400" /> Tarjeta de Crédito / Débito</div>
                        <input 
                          type="text" 
                          placeholder="Número de Tarjeta (16 dígitos)" 
                          maxLength={16}
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                          required
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            placeholder="MM/AA" 
                            maxLength={5}
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 text-center"
                            required
                          />
                          <input 
                            type="password" 
                            placeholder="CVV" 
                            maxLength={3}
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500 text-center"
                            required
                          />
                          <input 
                            type="text" 
                            placeholder="Nombre Titular" 
                            value={cardName}
                            onChange={e => setCardName(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Google Play Gift Card Form */}
                    {selectedPaymentMethod === 'google' && (
                      <div className="space-y-3 p-4 bg-[#34a853]/5 border border-[#34a853]/20 rounded-2xl">
                        <div className="text-xs font-black text-[#34a853] flex items-center gap-2">🎟️ Canjear Código PIN de Google Play</div>
                        <input 
                          type="text" 
                          placeholder="Introduce el código de 16 caracteres de tu tarjeta" 
                          maxLength={16}
                          value={googleCode}
                          onChange={e => setGoogleCode(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#34a853]"
                          required
                        />
                      </div>
                    )}

                    {/* Buttons actions */}
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="button"
                        onClick={() => setSelectedPaymentMethod(null)}
                        className="flex-1 py-3 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:bg-white/5 cursor-pointer"
                      >
                        Atrás
                      </button>
                      <button 
                        type="submit"
                        disabled={isProcessingPayment}
                        className="flex-1 py-3 bg-yellow-500 text-black hover:bg-yellow-400 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          `Confirmar Pago de $${selectedCoinPackage.price} USD`
                        )}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// Sub components to fix simple undefined variables issues
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
