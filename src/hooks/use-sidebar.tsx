import { create } from "zustand";

interface useStoreSidebar {
  isExpanded: boolean;
  onExpanded: () => void;
  onClose: () => void;
}

export const useSidebar = create<useStoreSidebar>((set) => ({
  isExpanded: true,
  onExpanded: () => set({ isExpanded: true }),
  onClose: () => set({ isExpanded: false }),
}));
