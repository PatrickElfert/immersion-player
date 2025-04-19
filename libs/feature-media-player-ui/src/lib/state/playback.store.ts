import { create } from "zustand";

type PlaybackState = {
  timestamp: number;
  setTimestamp: (timestamp: number) => void;
}

export const usePlaybackStore = create<PlaybackState>(set => ({
  timestamp: 0,
  setTimestamp: (timestamp: number) => set({ timestamp }),
}))

