import { KbdKey } from '@heroui/react';

export type Shortcut = {
  keys: KbdKey[];
  key: string;
  label: string;
}

export const VIDEO_PLAYER_SHORTCUTS: { [key: string]: Shortcut[] } = {
  common: [
    {
      keys: [],
      key: '←',
      label: 'Previous Subtitle',
    },
    {
      keys: [],
      key: '→',
      label: 'Next Subtitle',
    },
  ],
  mac: [
    {
      keys: ['option'],
      key: 'Q',
      label: 'Create Flashcard',
    },
  ],
  other: [
    {
      keys: ['alt'],
      key: 'Q',
      label: 'Create Flashcard',
    },
  ],
};
