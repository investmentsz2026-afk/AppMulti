import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatComment {
  id: string;
  user: string;
  text: string;
  badge?: string;
  color?: string;
}

interface LiveState {
  isLive: boolean;
  streamTitle: string;
  streamCategory: string;
  viewers: number;
  likes: number;
  comments: ChatComment[];
  startLive: (title: string, category: string) => void;
  stopLive: () => void;
  addLike: () => void;
  addComment: (comment: ChatComment) => void;
  setViewers: (viewers: number) => void;
  resetStream: () => void;
}

export const useLiveStore = create<LiveState>()(
  persist(
    (set) => ({
      isLive: false,
      streamTitle: '',
      streamCategory: 'Gaming',
      viewers: 0,
      likes: 0,
      comments: [],
      startLive: (title, category) => set({
        isLive: true,
        streamTitle: title || '¡Transmisión en Vivo de LiveX! 🎮',
        streamCategory: category || 'Gaming',
        viewers: Math.floor(Math.random() * 50) + 80,
        likes: 0,
        comments: [
          { id: 'welcome', user: 'System', text: '¡Tu transmisión en vivo ha comenzado! Comparte con tus espectadores.', badge: 'LiveX', color: 'text-pink-400' }
        ]
      }),
      stopLive: () => set({
        isLive: false,
        streamTitle: '',
        streamCategory: 'Gaming',
        viewers: 0,
        likes: 0,
        comments: []
      }),
      addLike: () => set((state) => ({ likes: state.likes + 1 })),
      addComment: (comment) => set((state) => ({
        comments: [...state.comments.slice(-49), comment] // Keep last 50 comments
      })),
      setViewers: (viewers) => set({ viewers }),
      resetStream: () => set({
        isLive: false,
        streamTitle: '',
        streamCategory: 'Gaming',
        viewers: 0,
        likes: 0,
        comments: []
      })
    }),
    {
      name: 'live-stream-storage',
    }
  )
);
