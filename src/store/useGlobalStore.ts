import { Path } from '@app/routes/routes';
import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

interface GlobalState {
  currentPageId: Path;
  changeCurrentPageId: (arg: Path) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  currentPageId: '/',
  changeCurrentPageId: (id: GlobalState['currentPageId']) =>
    set(() => ({ currentPageId: id })),
}));
