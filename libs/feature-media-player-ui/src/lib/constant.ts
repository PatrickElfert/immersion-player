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
      keys: ['command'],
      key: 'Q',
      label: 'Create Flashcard',
    },
  ],
  other: [
    {
      keys: ['ctrl'],
      key: 'Q',
      label: 'Create Flashcard',
    },
  ],
};
