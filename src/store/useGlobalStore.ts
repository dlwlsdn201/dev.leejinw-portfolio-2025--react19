import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

interface GlobalState {
  currentPageId: 'Intro' | 'Projects' | 'Comments';
  changeCurrentPageId: (arg: 'Intro' | 'Projects' | 'Comments') => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  currentPageId: 'Intro',
  changeCurrentPageId: (id: GlobalState['currentPageId']) =>
    set(() => ({ currentPageId: id })),
}));
