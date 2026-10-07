import { create } from 'zustand';

export type TabName = 'home' | 'search' | 'categories' | 'settings';

interface AppState {
  activeTab: TabName;
  earnKaroId: string;
  setActiveTab: (tab: TabName) => void;
  setEarnKaroId: (id: string) => void;
  loadEarnKaroId: () => void;
}

const DEFAULT_EARNKARO_ID = 'TEST_ID_123';

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'home',
  earnKaroId: DEFAULT_EARNKARO_ID,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setEarnKaroId: (id) => {
    const trimmed = id.trim();
    const final = trimmed || DEFAULT_EARNKARO_ID;
    localStorage.setItem('earnKaroId', final);
    set({ earnKaroId: final });
  },
  loadEarnKaroId: () => {
    const stored = localStorage.getItem('earnKaroId');
    set({ earnKaroId: stored || DEFAULT_EARNKARO_ID });
  },
}));
