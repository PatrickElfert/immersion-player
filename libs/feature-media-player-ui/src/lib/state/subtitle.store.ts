import { create } from 'zustand';
import { Subtitle } from '@immersion-player/shared-types';

type SubtitlesState = {
  currentSubtitle: Subtitle | null;
  currentSubtitleIndex: number | null;
  setCurrentSubtitle: (subtitle: Subtitle | null, subtitleIndex: number | null) => void;
  reset: () => void;
};

export const useSubtitleStore = create<SubtitlesState>((set) => ({
  currentSubtitle: null,
  currentSubtitleIndex: null,
  reset: () => set({currentSubtitle: null, currentSubtitleIndex: null}),
  setCurrentSubtitle: (subtitle: Subtitle | null, subtitleIndex: number | null) => {
    set((state) =>
      state.currentSubtitleIndex !== subtitleIndex
        ? { currentSubtitle: subtitle, currentSubtitleIndex: subtitleIndex }
        : state
    );
  },
}));
