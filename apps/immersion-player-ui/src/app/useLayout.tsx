import { create } from 'zustand';

export function useLayout() {
  return useLayoutStore();
}

type LayoutState = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

const useLayoutStore = create<LayoutState>((set) => ({
  menuOpen: true,
  toggleMenu: () => set(({ menuOpen }) => ({ menuOpen: !menuOpen })),
}));
