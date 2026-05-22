import { create } from 'zustand';

interface CreatorState {
  isOpen: boolean;
  activeTab: 'menu' | 'upload' | 'room' | 'coins';
  open: (tab?: 'menu' | 'upload' | 'room' | 'coins') => void;
  close: () => void;
}

export const useCreatorStore = create<CreatorState>((set) => ({
  isOpen: false,
  activeTab: 'menu',
  open: (tab = 'menu') => set({ isOpen: true, activeTab: tab }),
  close: () => set({ isOpen: false }),
}));
