'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home, Compass, Plus, MessageSquare, User, Search, Bell, Crown,
  BadgeCheck, Eye, Gamepad2, Mic2, Radio, Trophy, Coffee, Headphones,
  Monitor, Flame, ChevronRight, Play, ArrowLeft, Upload, Menu, Shield,
  Heart, Image, Grid, Film, X, Sparkles, Smartphone, QrCode, LogOut, Edit3, Lock, Smile,
  MessageCircle, Trash2
} from 'lucide-react';
import { updateProfile } from '@/app/actions/profile';
import { logoutUser } from '@/app/actions/auth';
import { toggleFollowUser, getProfileStats, getTabPosts, checkFollowStatus, toggleLikePost, getPostComments, createComment, toggleLikeComment, deleteComment, getFollowersListAction, getFollowingListAction, deletePostAction, getUserLevelInfoAction } from '@/app/actions/social';
import { useRouter, useSearchParams } from 'next/navigation';
import { addWalletCoins } from '@/app/actions/battle';
import { submitRechargeRequestAction, submitWithdrawalRequestAction, submitHelpRequestAction } from '@/app/actions/admin';
import { toast } from 'react-hot-toast';
import { Check, AlertCircle, Coins, CreditCard, Wallet, HelpCircle } from 'lucide-react';
import { useBadgeCounts } from '@/hooks/useBadgeCounts';

// Facebook Custom SVG Icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  );
}

// TikTok Custom SVG Icon
function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2.02 3.73 2.37v3.91c-1.39-.02-2.77-.4-3.99-1.12-.62-.37-1.18-.84-1.66-1.38v5.82c.04 1.52-.32 3.03-1.04 4.35-.72 1.33-1.8 2.42-3.1 3.15-1.31.74-2.81 1.13-4.33 1.11-1.52-.01-3.02-.43-4.32-1.2-1.28-.76-2.31-1.88-2.98-3.21C-.3 16.71-.46 15.19-.2 13.68c.26-1.5.94-2.91 1.96-4.04 1.02-1.14 2.37-1.92 3.86-2.26v4.06c-.84.23-1.6.72-2.18 1.4-.58.68-.9 1.55-.92 2.45-.02.91.24 1.8.76 2.53.51.74 1.26 1.28 2.11 1.53.86.25 1.77.19 2.59-.16.82-.35 1.5-1.0 1.94-1.81.44-.82.61-1.75.5-2.68v-14.8c.01-.02.01-.03.01-.05z" />
    </svg>
  );
}

// Instagram Custom SVG Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// YouTube Custom SVG Icon
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function MobileProfile({ sessionUser, targetUser, isOwnProfile }: { sessionUser: any, targetUser: any, isOwnProfile: boolean }) {
  const targetUsername = targetUser?.username || '';
  const [activeTab, setActiveTab] = useState('Videos');
  const router = useRouter();
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [levelInfo, setLevelInfo] = useState<any>(null);
  const [showLevelInfoModal, setShowLevelInfoModal] = useState(false);

  // Support / Help Ticket State
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpTitle, setHelpTitle] = useState('Apelación de Restricción');
  const [helpMessage, setHelpMessage] = useState('');
  const [sendingHelp, setSendingHelp] = useState(false);

  const handleSubmitHelp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpTitle.trim() || !helpMessage.trim()) return;
    setSendingHelp(true);
    try {
      const res = await submitHelpRequestAction(helpTitle, helpMessage);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success('Tu solicitud de soporte ha sido enviada al administrador.');
        setIsHelpOpen(false);
        setHelpMessage('');
      }
    } catch (err) {
      toast.error('Error al enviar la solicitud.');
    } finally {
      setSendingHelp(false);
    }
  };

  const handleLikePostInModal = async (postId: string) => {
    if (!sessionUser) {
      router.push('/login');
      return;
    }
    setTabPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newLiked = !p.isLiked;
        return {
          ...p,
          isLiked: newLiked,
          likesCount: newLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
    try {
      const res = await toggleLikePost(postId);
      if (res.error) {
        setTabPosts(prev => prev.map(p => {
          if (p.id === postId) {
            const newLiked = !p.isLiked;
            return {
              ...p,
              isLiked: newLiked,
              likesCount: newLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
            };
          }
          return p;
        }));
      } else if (res.success) {
        setTabPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              isLiked: res.liked,
              likesCount: res.count
            };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Error liking post in modal:', err);
    }
  };

  // Real stats & follow states
  const [stats, setStats] = useState({ followers: 0, following: 0, likes: 0 });
  const [isFollowingTargetUser, setIsFollowingTargetUser] = useState(false);

  // Real tab posts states
  const [tabPosts, setTabPosts] = useState<any[]>([]);
  const [tabLoading, setTabLoading] = useState(true);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  // Fetch comments when modal is open and showComments is active
  useEffect(() => {
    if (activeMediaIndex === null || !showComments) return;
    const post = tabPosts[activeMediaIndex];
    if (!post) return;

    async function fetchComments() {
      setCommentsLoading(true);
      try {
        const data = await getPostComments(post.id);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [activeMediaIndex, showComments, tabPosts]);

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMediaIndex === null) return;
    const post = tabPosts[activeMediaIndex];
    if (!post || !newCommentText.trim()) return;

    try {
      const res = await createComment(post.id, newCommentText);
      if (res.error) {
        triggerToast(res.error);
      } else if (res.success && res.comment) {
        setComments(prev => [res.comment, ...prev]);
        setNewCommentText('');
        // Update commentsCount in the current post
        setTabPosts(prev => prev.map(p => {
          if (p.id === post.id) {
            return { ...p, commentsCount: (p.commentsCount || 0) + 1 };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  const handleToggleLikeComment = async (commentId: string) => {
    // Optimistic update
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        const newLiked = !c.isLiked;
        return {
          ...c,
          isLiked: newLiked,
          likesCount: newLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
        };
      }
      return c;
    }));

    try {
      const res = await toggleLikeComment(commentId);
      if (res.error) {
        // Rollback
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            const newLiked = !c.isLiked;
            return {
              ...c,
              isLiked: newLiked,
              likesCount: newLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
            };
          }
          return c;
        }));
        triggerToast(res.error);
      } else if (res.success) {
        // Settle with server value
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            return { ...c, isLiked: res.liked, likesCount: res.count };
          }
          return c;
        }));
      }
    } catch (err) {
      console.error('Error toggling comment like:', err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este comentario?')) return;
    try {
      const res = await deleteComment(commentId);
      if (res.error) {
        triggerToast(res.error);
      } else if (res.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        triggerToast('Comentario eliminado');
        if (activeMediaIndex !== null) {
          const post = tabPosts[activeMediaIndex];
          setTabPosts(prev => prev.map(p => {
            if (p.id === post.id) {
              return { ...p, commentsCount: Math.max(0, (p.commentsCount || 0) - 1) };
            }
            return p;
          }));
        }
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  // Load stats
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getProfileStats(targetUsername);
        setStats(res);
      } catch (err) {
        console.error('Error loading stats:', err);
      }
    }
    loadStats();
  }, [targetUsername]);

  // Load follow status
  useEffect(() => {
    async function loadFollowStatus() {
      if (isOwnProfile || !sessionUser) return;
      try {
        const res = await checkFollowStatus(targetUser.id);
        setIsFollowingTargetUser(res.following);
      } catch (err) {
        console.error('Error checking follow status:', err);
      }
    }
    loadFollowStatus();
  }, [targetUser.id, isOwnProfile, sessionUser]);

  // Load tab posts
  useEffect(() => {
    async function loadTabPosts() {
      setTabLoading(true);
      try {
        const posts = await getTabPosts(targetUsername, activeTab, sessionUser?.id);
        setTabPosts(posts);
      } catch (err) {
        console.error('Error loading tab posts:', err);
      } finally {
        setTabLoading(false);
      }
    }
    loadTabPosts();
  }, [activeTab, targetUsername, sessionUser?.id]);

  const handleProfileFollowToggle = async () => {
    if (!sessionUser) {
      router.push('/login');
      return;
    }
    const prevStatus = isFollowingTargetUser;
    setIsFollowingTargetUser(!prevStatus);
    setStats(prev => ({
      ...prev,
      followers: !prevStatus ? prev.followers + 1 : Math.max(0, prev.followers - 1)
    }));
    try {
      const res = await toggleFollowUser(targetUser.id);
      if (res.error) {
        setIsFollowingTargetUser(prevStatus);
        setStats(prev => ({
          ...prev,
          followers: prevStatus ? prev.followers + 1 : Math.max(0, prev.followers - 1)
        }));
        triggerToast(res.error);
      } else if (res.success) {
        setIsFollowingTargetUser(res.following ?? !prevStatus);
      }
    } catch (err) {
      setIsFollowingTargetUser(prevStatus);
      setStats(prev => ({
        ...prev,
        followers: prevStatus ? prev.followers + 1 : Math.max(0, prev.followers - 1)
      }));
    }
  };

  const formatStat = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const tabs = isOwnProfile 
    ? ['Videos', 'Shorts', 'Fotos', 'Streams', 'Guardados', 'Me gusta']
    : ['Videos', 'Shorts', 'Fotos', 'Streams', 'Me gusta'];

  
  const { unreadMessages } = useBadgeCounts();
  const searchParams = useSearchParams();
  const settingsTab = searchParams.get('settings');

  useEffect(() => {
    async function loadLevelInfo() {
      try {
        const info = await getUserLevelInfoAction(targetUser.username);
        setLevelInfo(info);
      } catch (err) {
        console.error('Error loading level info:', err);
      }
    }
    loadLevelInfo();
  }, [targetUser.username]);

  useEffect(() => {
    if (settingsTab === 'monedas') {
      setDrawerSubView('recargar');
      setIsDrawerOpen(true);
    }
  }, [settingsTab]);

  // Mobile drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSubView, setDrawerSubView] = useState<'menu' | 'editar' | 'recargar' | 'apk' | 'redes' | 'retiro'>('menu');
  
  // Input fields states
  const [profileName, setProfileName] = useState(targetUser?.username || '');
  const [profileBio, setProfileBio] = useState(targetUser?.bio || '');
  const [profileEmail, setProfileEmail] = useState(targetUser?.email || '');
  
  // Social links state
  const [tiktokActive, setTiktokActive] = useState(targetUser?.tiktokActive || false);
  const [tiktokUrl, setTiktokUrl] = useState(targetUser?.tiktokUrl || '');
  const [instagramActive, setInstagramActive] = useState(targetUser?.instagramActive || false);
  const [instagramUrl, setInstagramUrl] = useState(targetUser?.instagramUrl || '');
  const [youtubeActive, setYoutubeActive] = useState(targetUser?.youtubeActive || false);
  const [youtubeUrl, setYoutubeUrl] = useState(targetUser?.youtubeUrl || '');
  const [facebookActive, setFacebookActive] = useState(targetUser?.facebookActive || false);
  const [facebookUrl, setFacebookUrl] = useState(targetUser?.facebookUrl || '');

  // Avatar and Cover live preview / state
  const [avatarUrl, setAvatarUrl] = useState(targetUser?.avatar || '');
  const [coverUrl, setCoverUrl] = useState(targetUser?.cover || '');

  // Withdrawal request states
  const [withdrawCoins, setWithdrawCoins] = useState<number>(100);
  const [withdrawDetails, setWithdrawDetails] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Followers / Following modal states
  const [showFollowsModal, setShowFollowsModal] = useState(false);
  const [followsModalType, setFollowsModalType] = useState<'followers' | 'following'>('followers');
  const [followsList, setFollowsList] = useState<any[]>([]);
  const [loadingFollows, setLoadingFollows] = useState(false);

  const openFollowsModal = async (type: 'followers' | 'following') => {
    setFollowsModalType(type);
    setShowFollowsModal(true);
    setLoadingFollows(true);
    try {
      const list = type === 'followers' 
        ? await getFollowersListAction(targetUsername)
        : await getFollowingListAction(targetUsername);
      setFollowsList(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFollows(false);
    }
  };

  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'paypal' | 'card' | 'google' | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [googleCode, setGoogleCode] = useState('');

  // Toast notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Guardando cambios... ⏳');
    try {
      const res = await updateProfile({
        username: profileName,
        bio: profileBio,
      });
      if (res.error) {
        triggerToast(`Error: ${res.error}`);
      } else {
        triggerToast('¡Perfil actualizado con éxito! ✨');
        if (profileName !== targetUser.username) {
          window.location.href = `/u/${profileName}`;
        } else {
          setTimeout(() => {
            setIsDrawerOpen(false);
            setDrawerSubView('menu');
          }, 800);
        }
      }
    } catch (err) {
      triggerToast('Error al guardar el perfil.');
    }
  };

  const handleSaveSocialLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Guardando enlaces... ⏳');
    try {
      const res = await updateProfile({
        tiktokActive,
        tiktokUrl,
        instagramActive,
        instagramUrl,
        youtubeActive,
        youtubeUrl,
        facebookActive,
        facebookUrl,
      });
      if (res.error) {
        triggerToast(`Error: ${res.error}`);
      } else {
        triggerToast('¡Redes sociales actualizadas con éxito! ✨');
        setTimeout(() => {
          setIsDrawerOpen(false);
          setDrawerSubView('menu');
        }, 800);
      }
    } catch (err) {
      triggerToast('Error al guardar redes sociales.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      triggerToast('La imagen supera el límite de 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      if (type === 'avatar') {
        setAvatarUrl(base64String);
      } else {
        setCoverUrl(base64String);
      }
      triggerToast('Subiendo imagen... ⏳');
      try {
        const res = await updateProfile({ [type]: base64String });
        if (res.error) {
          triggerToast(`Error: ${res.error}`);
        } else {
          triggerToast('¡Imagen actualizada con éxito! ✨');
        }
      } catch (err) {
        console.error(err);
        triggerToast('Error de conexión al subir la imagen.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBuyCoins = (packAmount: number) => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      triggerToast(`¡Compra exitosa de ${packAmount.toLocaleString()} Monedas! 🪙`);
      setSelectedPack(null);
      setIsDrawerOpen(false);
      setDrawerSubView('menu');
    }, 1500);
  };

  const creator = {
    name: profileName,
    username: targetUsername,
    verified: true,
    avatar: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${targetUsername}`,
    banner: coverUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    followers: '1.2M',
    following: '248',
    likes: '3.6M',
    bio: profileBio,
    level: 24,
    levelName: 'Stream Queen',
    xpProgress: 75,
  };

  // Static fallback grid items (only used if no real posts)
  const staticGridItems = [
    { id: 1, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=300', views: '1.2M', pinned: true },
    { id: 2, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&u=1', views: '840K', pinned: true },
    { id: 3, img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300&u=2', views: '2.3M', pinned: true },
    { id: 4, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=300&u=3', views: '1.1M' },
    { id: 5, img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=300', views: '560K' },
    { id: 6, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300&u=4', views: '950K' },
  ];

  return (
    <>
    <div className="flex flex-col h-[100dvh] w-full bg-[#05050a] text-white overflow-hidden relative">
      
      {/* Top Header */}
      <div className="h-[55px] shrink-0 px-4 flex items-center justify-between z-20 bg-[#05050a] border-b border-white/5">
        <Link href="/dashboard" className="text-zinc-300">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-black tracking-wide">{isOwnProfile ? 'Mi perfil' : `@${targetUsername}`}</h1>
        <div className="flex items-center gap-4 text-zinc-300">
          <button onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            triggerToast('¡Enlace de perfil copiado! 🔗');
          }} className="cursor-pointer">
            <Upload className="w-5 h-5" />
          </button>
          {isOwnProfile && (
            <>
            <button className="cursor-pointer" onClick={() => setIsHelpOpen(true)} title="Soporte / Ayuda">
              <HelpCircle className="w-5 h-5 text-purple-400" />
            </button>
            <button className="cursor-pointer" onClick={() => { setDrawerSubView('menu'); setIsDrawerOpen(true); }}>
              <Menu className="w-5 h-5" />
            </button>
            </>
          )}
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
        
        {/* Cover Banner & Profile Circle Overlap */}
        <div className="relative">
          {/* Banner */}
          <div className="h-[120px] w-full overflow-hidden relative">
            <img src={coverUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'} className="w-full h-full object-cover opacity-55" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-black/20" />
            {isOwnProfile && (
              <label className="absolute top-2 left-2 z-20 bg-black/60 hover:bg-black/80 border border-white/10 p-2 rounded-full text-xs font-bold transition-all flex items-center justify-center text-white cursor-pointer shadow-md">
                <Edit3 className="w-3.5 h-3.5" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, 'cover')} 
                />
              </label>
            )}
          </div>

          {/* Centered Large Avatar overlapping banner */}
          <div className="flex flex-col items-center -mt-14 relative z-10 px-4">
            <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-600 to-pink-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#05050a] relative">
                <img src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${targetUsername}`} className="w-full h-full object-cover" alt="" />
                {isOwnProfile && (
                  <label htmlFor="avatar-mobile-file-input" className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10">
                    <Edit3 className="w-4 h-4 text-white/80" />
                  </label>
                )}
              </div>
              {isOwnProfile && (
                <input 
                  id="avatar-mobile-file-input" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, 'avatar')} 
                />
              )}
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-3 border-[#05050a]" />
            </div>

            {/* Profile Info */}
            <h2 className="text-lg font-black mt-2.5 flex items-center gap-1">
              {creator.name}
              <BadgeCheck className="w-5 h-5 text-blue-400 fill-transparent" />
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded flex items-center justify-center border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                <Trophy className="w-2.5 h-2.5 text-black fill-black" />
              </div>
            </h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400 mb-2">
              <span className="font-semibold text-zinc-300">@{creator.username}</span>
              <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-[9px] font-bold rounded-full">Creadora</span>
            </div>

            {/* Biography */}
            <p className="text-xs text-zinc-300 text-center max-w-sm px-4 leading-relaxed mb-4">
              {creator.bio}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mb-5">
              {tiktokActive && tiktokUrl && (
                <a 
                  href={tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <TiktokIcon />
                </a>
              )}
              {instagramActive && instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {youtubeActive && youtubeUrl && (
                <a 
                  href={youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <YoutubeIcon />
                </a>
              )}
              {facebookActive && facebookUrl && (
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex w-full max-w-xs items-center justify-around bg-white/5 p-3 rounded-2xl border border-white/5 mb-5">
              <div onClick={() => openFollowsModal('followers')} className="text-center cursor-pointer active:scale-95 transition-transform">
                <span className="font-black text-sm text-white block leading-none">{formatStat(stats.followers)}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Seguidores</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div onClick={() => openFollowsModal('following')} className="text-center cursor-pointer active:scale-95 transition-transform">
                <span className="font-black text-sm text-white block leading-none">{formatStat(stats.following)}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Siguiendo</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="text-center">
                <span className="font-black text-sm text-white block leading-none">{formatStat(stats.likes)}</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Me gusta</span>
              </div>
            </div>

            {/* Action Buttons for Visiting Profile */}
            {!isOwnProfile && (
              <div className="flex w-full max-w-xs gap-3 mb-5">
                <button
                  onClick={handleProfileFollowToggle}
                  className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    isFollowingTargetUser
                      ? 'bg-zinc-800 text-white border border-white/10'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-500/20 active:scale-95'
                  }`}
                >
                  {isFollowingTargetUser ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" /> Siguiendo
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Seguir
                    </>
                  )}
                </button>
                <Link
                  href={`/mensajes?to=${targetUsername}`}
                  className="flex-1 py-3 bg-[#12152b] border border-white/10 hover:bg-[#1f2444] rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 text-white shadow-md active:scale-95 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Mensaje
                </Link>
              </div>
            )}

            {/* XP Level System Card */}
            <div 
              onClick={() => isOwnProfile && setShowLevelInfoModal(true)}
              className={`w-full max-w-sm bg-[#171333]/70 border border-purple-500/20 rounded-2xl p-3.5 mb-5 shadow-[0_0_12px_rgba(147,51,234,0.05)] ${isOwnProfile ? 'active:scale-98 transition-transform cursor-pointer' : ''}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center border border-purple-400 shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white leading-tight">Nivel {levelInfo?.level ?? 1}</h3>
                  <p className="text-[9px] text-purple-300 font-bold uppercase tracking-wider">{levelInfo?.title ?? 'CREADOR INICIANTE'}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${levelInfo?.progressPercentage ?? 0}%` }} />
              </div>
            </div>

          </div>
        </div>

        {/* Tab Text Scrollable Row */}
        <div className="border-t border-b border-white/5 flex items-center gap-6 overflow-x-auto scrollbar-none px-4 py-3 mb-2 bg-[#0a0a0f]/50 whitespace-nowrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-black uppercase tracking-wider transition-all relative pb-1 shrink-0 ${
                activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              )}
            </button>
          ))}
        </div>

        {/* 3-Column Media Grid */}
        <div className="grid grid-cols-3 gap-0.5 px-0.5">
          {tabLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 aspect-[3/4] border border-white/5" />
            ))
          ) : tabPosts.length > 0 ? (
            tabPosts.map((post: any, index: number) => (
              <div key={post.id} className="relative aspect-[3/4] overflow-hidden group cursor-pointer" onClick={() => setActiveMediaIndex(index)}>
                {post.isStream ? (
                  <>
                    <img src={post.url} className="w-full h-full object-cover" alt={post.title} />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 bg-red-600/80 text-[7px] font-black rounded uppercase tracking-wider shadow">
                        ● DIRECTO
                      </span>
                    </div>
                  </>
                ) : post.type === 'VIDEO' ? (
                  <video src={post.url} className="w-full h-full object-cover" muted playsInline />
                ) : (
                  <img src={post.url} className="w-full h-full object-cover" alt={post.title} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Private badge */}
                {post.isPrivate && (
                  <div className="absolute top-1.5 left-1.5">
                    <span className="px-1.5 py-0.5 bg-pink-600/80 text-[7px] font-black rounded uppercase tracking-wider shadow flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Privado
                    </span>
                  </div>
                )}

                {/* Type badge */}
                {!post.isStream && (
                  <div className="absolute top-1.5 right-1.5">
                    {post.type === 'VIDEO' ? (
                      <span className="px-1.5 py-0.5 bg-purple-600/80 text-[7px] font-black rounded uppercase tracking-wider shadow flex items-center gap-0.5">
                        <Film className="w-2.5 h-2.5" /> Video
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-blue-600/80 text-[7px] font-black rounded uppercase tracking-wider shadow flex items-center gap-0.5">
                        <Image className="w-2.5 h-2.5" /> Foto
                      </span>
                    )}
                  </div>
                )}

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-1.5 right-1.5 flex items-center gap-2 text-[8px] font-bold text-white pointer-events-none z-10">
                  <div className="flex items-center gap-0.5">
                    <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500 shrink-0" />
                    <span>{formatStat(post.likesCount || 0)}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MessageCircle className="w-2.5 h-2.5 fill-purple-500 text-purple-500 shrink-0" />
                    <span>{formatStat(post.commentsCount || 0)}</span>
                  </div>
                </div>

                {isOwnProfile && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
                        try {
                          const res = await deletePostAction(post.id);
                          if (res.error) {
                            toast.error(res.error);
                          } else {
                            toast.success('Publicación eliminada.');
                            setTabPosts(prev => prev.filter(p => p.id !== post.id));
                          }
                        } catch (err) {
                          toast.error('Error al eliminar.');
                        }
                      }
                    }}
                    className="absolute top-8 right-1.5 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg z-20 shadow-lg pointer-events-auto flex items-center justify-center cursor-pointer"
                    title="Eliminar publicación"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[8px] font-bold text-white truncate">
                  {post.title}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-10 text-center border border-dashed border-white/5 rounded-2xl bg-[#0a0a0f]/50 my-2 mx-2">
              <AlertCircle className="w-6 h-6 text-zinc-600 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-zinc-400">Sin contenido</p>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#05050a] flex items-center justify-around z-20 px-2 pb-2 pt-1 border-t border-white/5">
        <Link href="/dashboard?tab=inicio" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </Link>
        <Link href="/en-vivo" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
          <Play className="w-6 h-6" />
          <span className="text-[10px] font-bold">Gaming</span>
        </Link>
        <div className="relative -top-4">
          <button className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 border-4 border-[#05050a]">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        <Link href="/mensajes" className="flex flex-col items-center gap-1 text-zinc-500 relative">
          <MessageSquare className="w-6 h-6" />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#05050a]">{unreadMessages}</span>
          )}
          <span className="text-[10px] font-bold">Mensajes</span>
        </Link>
        <Link href={`/u/${sessionUser.username}`} className="flex flex-col items-center gap-1 text-pink-500">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </Link>
      </div>

      {/* Mobile Drawer (Bottom Sheet) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm transition-all duration-300">
          {/* Backdrop Tap to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer content body */}
          <div className="bg-[#0b0b12] border-t border-purple-500/30 rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col gap-5 shadow-[0_-10px_35px_rgba(147,51,234,0.2)]">
            
            {/* Drawer Header Drag Bar */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-2 mb-2" />

            {/* Back arrow inside subviews */}
            {drawerSubView !== 'menu' && (
              <button onClick={() => setDrawerSubView('menu')} className="self-start flex items-center gap-1.5 text-xs text-purple-400 font-bold">
                <ArrowLeft className="w-4 h-4" /> Volver al menú
              </button>
            )}

            {/* VIEW 1: MAIN NAVIGATION OPTIONS */}
            {drawerSubView === 'menu' && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Opciones de Cuenta</h3>
                  <button onClick={() => setIsDrawerOpen(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <button onClick={() => setDrawerSubView('editar')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Edit3 className="w-4.5 h-4.5 text-purple-400" /> Editar Perfil
                </button>

                <button onClick={() => setDrawerSubView('redes')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <FacebookIcon className="w-4.5 h-4.5 text-blue-400" /> Redes Sociales
                </button>

                <button onClick={() => setDrawerSubView('recargar')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Sparkles className="w-4.5 h-4.5 text-yellow-400" /> Recargar Monedas
                </button>

                <button onClick={() => setDrawerSubView('retiro')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Wallet className="w-4.5 h-4.5 text-purple-400" /> Retirar Monedas
                </button>

                <button onClick={() => setDrawerSubView('apk')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Smartphone className="w-4.5 h-4.5 text-pink-400" /> Descargar APK Móvil
                </button>

                <button onClick={() => triggerToast('¡Configuración de cuenta activa! 🔒')} className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-white/10 transition-all">
                  <Shield className="w-4.5 h-4.5 text-blue-400" /> Privacidad & Seguridad
                </button>

                <button onClick={() => { setIsHelpOpen(true); setIsDrawerOpen(false); }} className="w-full p-4 bg-[#141226]/50 border border-purple-500/20 rounded-2xl text-sm font-bold text-left flex items-center gap-3 active:bg-purple-950/20 transition-all">
                  <HelpCircle className="w-4.5 h-4.5 text-purple-400" /> Soporte / Ayuda
                </button>

                <button onClick={() => logoutUser()} className="w-full p-4 bg-red-950/20 border border-red-500/20 rounded-2xl text-sm font-black text-red-400 flex items-center justify-center gap-2 active:bg-red-900/20 transition-all mt-4">
                  <LogOut className="w-4.5 h-4.5" /> Cerrar sesión
                </button>
              </div>
            )}

            {/* VIEW 2: EDIT PROFILE FORM */}
            {drawerSubView === 'editar' && (
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Editar Perfil</h3>
                  <p className="text-[10px] text-zinc-400">Actualiza tu nombre y tu biografía pública.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Nombre de Perfil</label>
                  <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white" required />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Biografía</label>
                  <textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-purple-500 text-white resize-none" required />
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 mt-2">
                  Guardar Cambios
                </button>
              </form>
            )}

            {/* VIEW 5: SOCIAL NETWORKS FORM */}
            {drawerSubView === 'redes' && (
              <form onSubmit={handleSaveSocialLinks} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Redes Sociales</h3>
                  <p className="text-[10px] text-zinc-400">Activa y añade los enlaces de tus redes sociales.</p>
                </div>

                {/* TikTok */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TiktokIcon className="text-white" />
                      <span className="text-xs font-bold text-white">TikTok</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tiktokActive} 
                        onChange={(e) => setTiktokActive(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                    </label>
                  </div>
                  {tiktokActive && (
                    <input 
                      type="url" 
                      placeholder="https://tiktok.com/@tu_usuario" 
                      value={tiktokUrl} 
                      onChange={(e) => setTiktokUrl(e.target.value)} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-purple-500 text-white"
                      required
                    />
                  )}
                </div>

                {/* Instagram */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <InstagramIcon className="text-pink-500" />
                      <span className="text-xs font-bold text-white">Instagram</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={instagramActive} 
                        onChange={(e) => setInstagramActive(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                    </label>
                  </div>
                  {instagramActive && (
                    <input 
                      type="url" 
                      placeholder="https://instagram.com/tu_usuario" 
                      value={instagramUrl} 
                      onChange={(e) => setInstagramUrl(e.target.value)} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-purple-500 text-white"
                      required
                    />
                  )}
                </div>

                {/* YouTube */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <YoutubeIcon className="text-red-500" />
                      <span className="text-xs font-bold text-white">YouTube</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={youtubeActive} 
                        onChange={(e) => setYoutubeActive(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                    </label>
                  </div>
                  {youtubeActive && (
                    <input 
                      type="url" 
                      placeholder="https://youtube.com/@tu_canal" 
                      value={youtubeUrl} 
                      onChange={(e) => setYoutubeUrl(e.target.value)} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-purple-500 text-white"
                      required
                    />
                  )}
                </div>

                {/* Facebook */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FacebookIcon className="text-blue-500" />
                      <span className="text-xs font-bold text-white">Facebook</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={facebookActive} 
                        onChange={(e) => setFacebookActive(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600 peer-checked:after:bg-white" />
                    </label>
                  </div>
                  {facebookActive && (
                    <input 
                      type="url" 
                      placeholder="https://facebook.com/tu_perfil" 
                      value={facebookUrl} 
                      onChange={(e) => setFacebookUrl(e.target.value)} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-purple-500 text-white"
                      required
                    />
                  )}
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 mt-2">
                  Guardar Redes Sociales
                </button>
              </form>
            )}

            {/* VIEW 3: RECHARGE COINS (TIK TOK PACKAGES) */}
            {drawerSubView === 'recargar' && (
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-1.5">Recargar Monedas <Sparkles className="w-4 h-4 text-yellow-400" /></h3>
                  <p className="text-[10px] text-zinc-400">Apoya a tus streamers enviando increíbles regalos de neón.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 my-1">
                  {[
                    { coins: 100, price: '1.00' },
                    { coins: 500, price: '5.00' },
                    { coins: 1000, price: '10.00', popular: true },
                    { coins: 3000, price: '30.00' },
                  ].map(pack => (
                    <div
                      key={pack.coins}
                      onClick={() => setSelectedPack(pack.coins)}
                      className={`relative border rounded-2xl p-3 flex flex-col items-center justify-between cursor-pointer transition-all ${
                        selectedPack === pack.coins
                          ? 'bg-[#1e143d] border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2 px-1.5 py-0.5 bg-pink-500 text-[6px] font-black rounded-full uppercase tracking-wider">
                          Recomendado
                        </span>
                      )}
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border border-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)] mb-1">
                        <span className="text-[8px] font-black text-black">L</span>
                      </div>
                      <span className="text-xs font-black">{pack.coins.toLocaleString()}</span>
                      <span className="text-[9px] text-purple-300 font-bold">${pack.price} USD</span>
                    </div>
                  ))}
                </div>

                {selectedPack ? (
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Comprar {selectedPack.toLocaleString()} Monedas
                  </button>
                ) : (
                  <div className="w-full py-3 text-center border border-dashed border-white/10 rounded-xl text-[10px] text-zinc-500">
                    Selecciona un paquete para proceder
                  </div>
                )}
              </div>
            )}

            {/* VIEW: WITHDRAWAL FORM */}
            {drawerSubView === 'retiro' && (() => {
              const totalCash = withdrawCoins * 0.01;
              const payout = totalCash * 0.70;
              const platformCut = totalCash * 0.30;
              return (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-1.5">
                      Retirar Monedas <Wallet className="w-5 h-5 text-purple-400" />
                    </h3>
                    <p className="text-[10px] text-zinc-400">Canjea tus monedas por dólares reales. Cada moneda equivale a $0.01 USD. (Tarifa de plataforma del 30%).</p>
                  </div>

                  <div className="space-y-3.5 my-1">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Cantidad de monedas a retirar</label>
                      <input 
                        type="number" 
                        min={1}
                        value={withdrawCoins} 
                        onChange={(e) => setWithdrawCoins(Math.max(1, parseInt(e.target.value) || 0))} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500 text-white" 
                        required 
                      />
                    </div>

                    {/* calculations */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Monto Total:</span>
                        <span className="text-white font-bold">${totalCash.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Tarifa Plataforma (30%):</span>
                        <span className="text-red-400 font-bold">-${platformCut.toFixed(2)} USD</span>
                      </div>
                      <div className="border-t border-white/5 pt-1.5 flex justify-between text-xs font-black">
                        <span className="text-yellow-500">Recibirás (70%):</span>
                        <span className="text-yellow-500">${payout.toFixed(2)} USD</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Detalles de Cuenta / Método de Pago</label>
                      <textarea 
                        rows={3}
                        placeholder="Ingresa tu banco, tipo de cuenta, número de cuenta bancaria o correo de PayPal..." 
                        value={withdrawDetails} 
                        onChange={(e) => setWithdrawDetails(e.target.value)} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500 text-white resize-none" 
                        required 
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isWithdrawing || (targetUser.wallet?.balance || 0) < withdrawCoins}
                    onClick={async () => {
                      setIsWithdrawing(true);
                      const res = await submitWithdrawalRequestAction(withdrawCoins, withdrawDetails);
                      setIsWithdrawing(false);
                      if (res.error) {
                        toast.error(res.error);
                      } else {
                        toast.success("¡Solicitud de retiro enviada con éxito!");
                        setWithdrawCoins(100);
                        setWithdrawDetails('');
                        setIsDrawerOpen(false);
                        setTimeout(() => {
                          window.location.reload();
                        }, 500);
                      }
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 transition-transform"
                  >
                    {isWithdrawing ? 'Enviando...' : (targetUser.wallet?.balance || 0) < withdrawCoins ? 'Monedas Insuficientes' : `Enviar solicitud de retiro ($${payout.toFixed(2)} USD)`}
                  </button>
                </div>
              );
            })()}

            {/* VIEW 4: APK DOWNLOAD MOBILE PAGE */}
            {drawerSubView === 'apk' && (
              <div className="flex flex-col gap-4 items-center text-center">
                <div>
                  <h3 className="text-base font-black text-white flex items-center justify-center gap-1.5">Descargar APK Oficial <Smartphone className="w-5 h-5 text-purple-400" /></h3>
                  <p className="text-[10px] text-zinc-400">Instala LiveX en tu smartphone y disfruta una experiencia fluida.</p>
                </div>

                <div className="bg-[#07070b]/60 border border-white/5 rounded-2xl p-4 w-full flex flex-col items-center gap-4 my-2">
                  <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl shadow-md">
                    <div className="w-20 h-20 bg-[#05050a] rounded flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-purple-400" />
                    </div>
                  </div>
                  <div className="text-left text-[10px] text-zinc-400 flex flex-col gap-1.5 w-full">
                    <p className="font-bold text-white mb-0.5">Pasos de instalación:</p>
                    <p>1. Pulsa el botón de descarga a continuación.</p>
                    <p>2. Abre el archivo .apk en tus descargas.</p>
                    <p>3. Habilita "Permitir desde esta fuente" si tu celular lo solicita.</p>
                  </div>
                </div>

                <button onClick={() => { triggerToast('Descargando APK de LiveX... 🚀'); setIsDrawerOpen(false); }} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5">
                  <Smartphone className="w-4 h-4" /> Descargar APK para Android
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Real Money Coin Store checkout simulator */}
      {showCheckoutModal && selectedPack && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => { setShowCheckoutModal(false); setSelectedPaymentMethod(null); }} />
          
          <div className="bg-[#0b0a12] border-2 border-yellow-500/20 rounded-3xl max-w-md w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Coins className="w-5.5 h-5.5 text-yellow-500 animate-pulse" /> Confirmar Recarga
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Monto: {selectedPack} Monedas</p>
              </div>
              <button 
                type="button"
                onClick={() => { setShowCheckoutModal(false); setSelectedPaymentMethod(null); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer z-50"
              >
                <X className="w-4 h-4 pointer-events-none" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Paquete</span>
                  <h4 className="text-sm font-black text-white">{selectedPack} Monedas</h4>
                </div>
                <div className="text-right font-black text-yellow-500">
                  ${selectedPack === 100 ? '1.00' : selectedPack === 500 ? '5.00' : selectedPack === 1000 ? '10.00' : '30.00'} USD
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-zinc-300 leading-relaxed bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl">
                  Para recargar tus monedas, envía una solicitud de compra a la plataforma. 
                  Una vez enviada, te llegará un mensaje directo de nuestro equipo de soporte con los datos de cuenta bancaria/métodos para realizar el depósito y verificar tu comprobante.
                </p>

                <button 
                  type="button" 
                  disabled={isPurchasing}
                  onClick={async () => {
                    setIsPurchasing(true);
                    const price = selectedPack === 100 ? 1.00 : selectedPack === 500 ? 5.00 : selectedPack === 1000 ? 10.00 : 30.00;
                    const res = await submitRechargeRequestAction(selectedPack || 100, price);
                    setIsPurchasing(false);
                    if (res.error) {
                      toast.error(res.error);
                    } else {
                      toast.success("¡Solicitud enviada! Revisa tu historial de mensajes, te llegará un mensaje de la plataforma.");
                      setShowCheckoutModal(false);
                      setSelectedPack(null);
                    }
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer active:scale-98 transition-transform shadow-lg shadow-pink-500/20"
                >
                  {isPurchasing ? 'Enviando solicitud...' : 'Enviar solicitud de compra al administrador'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {/* Followers / Following List Modal */}
      {showFollowsModal && (
        <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-end flex-col animate-in fade-in duration-200">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowFollowsModal(false)} />
          
          <div className="bg-[#0b0a12] border-t border-purple-500/20 rounded-t-[32px] w-full p-6 relative overflow-hidden animate-in slide-in-from-bottom duration-250 z-10 flex flex-col max-h-[70vh]">
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto -mt-2 mb-4" />

            <div className="flex justify-between items-center mb-4 shrink-0">
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                {followsModalType === 'followers' ? 'Seguidores' : 'Siguiendo'}
              </h3>
              <button 
                onClick={() => setShowFollowsModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1 pb-6">
              {loadingFollows ? (
                <div className="text-center py-10 text-xs font-bold text-zinc-500 animate-pulse">
                  Cargando lista...
                </div>
              ) : followsList && followsList.length > 0 ? (
                followsList.map((usr) => (
                  <div key={usr.id} className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <img 
                        src={usr.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${usr.username}`} 
                        className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 object-cover" 
                      />
                      <div className="text-left">
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          @{usr.username} <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 fill-transparent" />
                        </div>
                        <div className="text-[10px] text-zinc-500 line-clamp-1 max-w-[150px]">{usr.bio || 'Sin biografía.'}</div>
                      </div>
                    </div>
                    <Link 
                      href={`/u/${usr.username}`}
                      onClick={() => setShowFollowsModal(false)}
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      Ver perfil
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs font-bold text-zinc-500">
                  No hay usuarios para mostrar.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-[#0e0c1f] border border-purple-500/50 text-white rounded-2xl px-4 py-3 shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4.5 h-4.5 text-yellow-400 shrink-0" />
          <span className="text-[11px] font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Fullscreen TikTok-like Media Player Modal */}
      {activeMediaIndex !== null && tabPosts[activeMediaIndex] && (() => {
        const post = tabPosts[activeMediaIndex];
        
        const handlePrev = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setActiveMediaIndex(prev => {
            if (prev === null) return null;
            return prev === 0 ? tabPosts.length - 1 : prev - 1;
          });
        };

        const handleNext = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setActiveMediaIndex(prev => {
            if (prev === null) return null;
            return prev === tabPosts.length - 1 ? 0 : prev + 1;
          });
        };

        return (
          <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-2 animate-in fade-in duration-200">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveMediaIndex(null)} />

            {/* Viewport-fixed Close Button */}
            <button 
              type="button"
              onClick={() => setActiveMediaIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all z-50 border border-white/10 shadow-lg backdrop-blur-md"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Left Arrow */}
            {tabPosts.length > 1 && (
              <button 
                type="button"
                onClick={handlePrev}
                className="absolute left-2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 active:scale-90 text-white flex items-center justify-center transition-all z-30 border border-white/5 shadow-md backdrop-blur-sm"
                title="Anterior"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}

            {/* Navigation Right Arrow */}
            {tabPosts.length > 1 && (
              <button 
                type="button"
                onClick={handleNext}
                className="absolute right-2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 active:scale-90 text-white flex items-center justify-center transition-all z-30 border border-white/5 shadow-md backdrop-blur-sm"
                title="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Main Immersive Phone-style Player Container */}
            <div className="relative w-full max-w-[400px] h-[85vh] bg-[#09090e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center z-10 pointer-events-auto">
              
              {/* Media Content */}
              <div className="w-full h-full flex items-center justify-center bg-black">
                {post.type === 'VIDEO' ? (
                  <video 
                    key={post.id}
                    src={post.url} 
                    className="w-full h-full object-contain" 
                    controls 
                    autoPlay 
                    loop 
                    playsInline
                  />
                ) : (
                  <img 
                    src={post.url} 
                    className="w-full h-full object-contain" 
                    alt={post.title} 
                  />
                )}
              </div>

              {/* Top gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />

              {/* Creator Info & Like Actions Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2.5 z-20">
                {/* Creator Identity Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={targetUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${targetUsername}`} 
                      className="w-8 h-8 rounded-full border border-white/15 bg-zinc-800 shrink-0" 
                      alt="" 
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold flex items-center gap-1">
                        {targetUsername}
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-400 fill-transparent shrink-0" />
                      </div>
                      <span className="text-[9px] text-zinc-400">Post de {activeTab}</span>
                    </div>
                  </div>

                  {/* Follow status inside player */}
                  {!isOwnProfile && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProfileFollowToggle();
                      }}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all shadow-md ${
                        isFollowingTargetUser 
                          ? 'bg-white/10 text-white border border-white/10' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white active:scale-95'
                      }`}
                    >
                      {isFollowingTargetUser ? 'Siguiendo' : 'Seguir'}
                    </button>
                  )}
                </div>

                {/* Title and Description */}
                <p className="text-[11px] text-zinc-200 text-left line-clamp-3 leading-snug font-medium">
                  {post.title}
                </p>

                {/* Interaction icons bar */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-2.5">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikePostInModal(post.id);
                    }}
                    className="flex items-center gap-1 text-zinc-300 active:text-pink-500 transition-colors"
                  >
                    <Heart className={`w-4.5 h-4.5 ${post.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                    <span className="text-xs font-bold">{formatStat(post.likesCount || 0)}</span>
                  </button>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowComments(!showComments);
                    }}
                    className="flex items-center gap-1.5 text-zinc-300 active:text-purple-400 transition-colors"
                  >
                    <MessageCircle className={`w-4.5 h-4.5 ${showComments ? 'fill-purple-500 text-purple-500' : ''}`} />
                    <span className="text-xs font-bold">{formatStat(post.commentsCount || 0)}</span>
                  </button>

                  <div className="text-[9px] text-zinc-500 font-bold ml-auto uppercase tracking-wider">
                    {new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Comments drawer backdrop */}
              {showComments && (
                <div 
                  className="absolute inset-0 bg-black/60 z-30 transition-opacity animate-in fade-in duration-200" 
                  onClick={() => setShowComments(false)}
                />
              )}

              {/* Bottom Sheet Drawer */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[65%] bg-[#0b0b12] rounded-t-3xl border-t border-white/10 z-40 flex flex-col overflow-hidden transition-transform duration-300 ease-out ${
                  showComments ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                {/* Drawer Header */}
                <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-400">
                    Comentarios ({comments.length})
                  </span>
                  <button 
                    onClick={() => setShowComments(false)}
                    className="text-zinc-500 hover:text-white transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 flex flex-col gap-3.5">
                  {commentsLoading ? (
                    <div className="flex flex-col items-center justify-center p-6 gap-2">
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[9px] text-zinc-500 font-bold">Cargando comentarios...</span>
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment: any) => {
                      const isCommentOwn = sessionUser && sessionUser.id === comment.userId;
                      const isPostOwn = sessionUser && sessionUser.id === post.userId;
                      const canDelete = isCommentOwn || isPostOwn;
                      return (
                        <div key={comment.id} className="flex gap-2 items-start text-xs group/item">
                          <Link href={`/u/${comment.user.username}`}>
                            <img 
                              src={comment.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.username}`} 
                              className="w-6 h-6 rounded-full border border-white/10 bg-zinc-800 shrink-0 hover:border-purple-500 transition-colors cursor-pointer" 
                              alt="" 
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Link href={`/u/${comment.user.username}`}>
                                <span className="font-extrabold text-white text-[10px] hover:text-purple-400 transition-colors cursor-pointer">@{comment.user.username}</span>
                              </Link>
                              <span className="text-[7px] text-zinc-600 font-medium">
                                {new Date(comment.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <p className="text-zinc-300 break-words pr-2 leading-relaxed text-[10px]">{comment.content}</p>
                          </div>

                          {/* Actions on comment */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleLikeComment(comment.id);
                              }}
                              className="flex items-center gap-0.5 text-[9px] text-zinc-500 hover:text-pink-500 transition-colors"
                            >
                              <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                              <span className="text-[9px]">{comment.likesCount}</span>
                            </button>
                            {canDelete && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteComment(comment.id);
                                }}
                                className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                title="Eliminar comentario"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center gap-1.5 mt-4">
                      <MessageCircle className="w-6 h-6 text-zinc-700 animate-pulse" />
                      <h4 className="text-[10px] font-bold text-zinc-500">Sin comentarios todavía</h4>
                      <p className="text-[8px] text-zinc-600 max-w-[120px]">¡Sé el primero en comentar esta publicación!</p>
                    </div>
                  )}
                </div>

                {/* Write Comment Form */}
                <form onSubmit={handleCreateComment} className="p-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] border-t border-white/5 bg-[#07070b] shrink-0">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 h-11 focus-within:border-purple-500 transition-colors gap-2.5">
                    <Smile className="w-5 h-5 text-zinc-400 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Añadir comentario..." 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-xs text-white placeholder-zinc-500 font-semibold w-full min-w-0"
                      maxLength={300}
                    />
                    <button 
                      type="submit" 
                      disabled={!newCommentText.trim()}
                      className="text-xs font-black text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-40 shrink-0"
                    >
                      Publicar
                    </button>
                  </div>

                  {/* Emoji Quick Picker List */}
                  <div className="flex items-center gap-2 mt-1.5 overflow-x-auto py-1 px-1 max-w-full custom-scrollbar">
                    {['❤️', '🔥', '👏', '🙌', '😂', '😍', '😮', '🎉', '💡', '🎮', '⭐️'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewCommentText(prev => prev + emoji);
                        }}
                        className="text-sm hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      })()}

    </div>

    {/* LEVEL INFO MODAL */}
    {showLevelInfoModal && levelInfo && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity p-4">
        <div className="absolute inset-0 cursor-pointer" onClick={() => setShowLevelInfoModal(false)} />
        
        <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.25)] z-10 animate-in zoom-in-95 p-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          <button onClick={() => setShowLevelInfoModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center gap-4 mt-2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Shield className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Tu Sistema de Nivel</h3>
              <p className="text-xs text-purple-400 font-extrabold uppercase tracking-wider mt-0.5">{levelInfo.title} (Nivel {levelInfo.level})</p>
            </div>
            
            <div className="w-full bg-[#12121a] rounded-xl p-3.5 border border-white/5 flex flex-col gap-2.5 text-left">
              <h4 className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-0.5">Tus Estadísticas de Nivel</h4>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Total XP acumulada:</span>
                <span className="font-extrabold text-white">{levelInfo.xp} XP</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Publicaciones:</span>
                <span className="font-extrabold text-purple-400">+{levelInfo.postsCount * 50} XP</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Likes recibidos:</span>
                <span className="font-extrabold text-pink-400">+{levelInfo.totalLikesReceived * 10} XP</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Monedas recargadas:</span>
                <span className="font-extrabold text-yellow-500">+{levelInfo.totalCoinsRecharged} XP</span>
              </div>
            </div>

            <div className="w-full text-left">
              <h4 className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-2">¿Cómo subir de nivel?</h4>
              <ul className="text-xs text-zinc-400 flex flex-col gap-1.5 pl-0.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-black">⚡</span>
                  <span><strong>Sube videos:</strong> +50 XP por publicación.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-400 font-black">❤️</span>
                  <span><strong>Consigue Likes:</strong> +10 XP por me gusta recibido.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-500 font-black">🪙</span>
                  <span><strong>Recarga Monedas:</strong> +1 XP por cada moneda recargada.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowLevelInfoModal(false)}
              className="w-full mt-1.5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    )}

    {/* SUPPORT HELP MODAL */}
    {isHelpOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm transition-opacity p-4">
        <div className="absolute inset-0 cursor-pointer" onClick={() => setIsHelpOpen(false)} />
        
        <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.25)] z-10 animate-in zoom-in-95 p-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
          <button onClick={() => setIsHelpOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          
          <form onSubmit={handleSubmitHelp} className="flex flex-col gap-4">
            <h3 className="text-sm font-black text-white flex items-center gap-1.5 mt-1">
              <HelpCircle className="w-5 h-5 text-purple-400" /> Contactar Soporte / Ayuda
            </h3>
            <p className="text-[10px] text-zinc-400 -mt-1 leading-relaxed text-left">
              Describe tu duda, petición o solicitud de apelación. El administrador la revisará y te responderá mediante las notificaciones.
            </p>
            
            <div className="flex flex-col gap-1 text-left">
              <label className="text-[9px] font-black uppercase tracking-wider text-zinc-500">Asunto</label>
              <select
                value={helpTitle}
                onChange={(e) => setHelpTitle(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-bold outline-none focus:border-purple-500 transition-colors"
              >
                <option value="Apelación de Restricción" className="bg-zinc-950 text-white">Apelación de Restricción de Cuenta</option>
                <option value="Problemas con Monedas" className="bg-zinc-950 text-white">Problema con Monedas / Saldo</option>
                <option value="Reportar un Bug" className="bg-zinc-950 text-white">Reportar un Error / Bug</option>
                <option value="Otro Asunto" className="bg-zinc-950 text-white">Otro Asunto</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 text-left">
              <label className="text-[9px] font-black uppercase tracking-wider text-zinc-500">Mensaje Detallado</label>
              <textarea 
                required
                rows={3}
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-medium outline-none focus:border-purple-500 transition-colors resize-none leading-relaxed"
                placeholder="Detalla aquí tu problema o solicitud..."
              />
            </div>

            <div className="flex gap-2.5 mt-1">
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={sendingHelp}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-purple-600/20"
              >
                {sendingHelp ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
}
