import { create } from 'zustand';

export function useLayout() {
  return useLayoutStore();
}

type LayoutState = {
  menuOpen: boolean;
  toggleMenu: (value?: boolean) => void;
};

const useLayoutStore = create<LayoutState>((set) => ({
  menuOpen: false,
  toggleMenu: (value?: boolean) => set(({ menuOpen }) => ({ menuOpen: value ?? !menuOpen })),
}));
