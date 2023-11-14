import { create } from "zustand";

interface usePlayerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlayer = create<usePlayerProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
