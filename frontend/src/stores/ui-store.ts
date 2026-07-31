import { create } from 'zustand';

interface UIState {
  activeTab: number;
  sidebarOpen: boolean;
  currentModal: string | null;
  setActiveTab: (tab: number) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 0,
  sidebarOpen: false,
  currentModal: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openModal: (modalId) => set({ currentModal: modalId }),
  closeModal: () => set({ currentModal: null }),
}));
