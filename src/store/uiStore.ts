import { create } from "zustand";

type UIStore = {
  searchOpen: boolean;
  loginOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openLogin: () => void;
  closeLogin: () => void;
};

export const useUIStore = create<UIStore>()((set) => ({
  searchOpen: false,
  loginOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openLogin: () => set({ loginOpen: true }),
  closeLogin: () => set({ loginOpen: false }),
}));
