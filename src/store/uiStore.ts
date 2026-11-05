import { create } from "zustand";

type UIStore = {
  searchOpen: boolean;
  loginOpen: boolean;
  pageLoading: boolean;
  pageLoadingMessage: string;
  openSearch: () => void;
  closeSearch: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  startPageLoading: (message?: string) => void;
  stopPageLoading: () => void;
};

export const useUIStore = create<UIStore>()((set) => ({
  searchOpen: false,
  loginOpen: false,
  pageLoading: false,
  pageLoadingMessage: "Jaipur Atelier",
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openLogin: () => set({ loginOpen: true }),
  closeLogin: () => set({ loginOpen: false }),
  startPageLoading: (message = "Jaipur Atelier") =>
    set({ pageLoading: true, pageLoadingMessage: message }),
  stopPageLoading: () => set({ pageLoading: false }),
}));
