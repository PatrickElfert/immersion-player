import { useNoteTypes } from './hooks/useNoteTypes.js';
import { useNoteTypeFields } from './hooks/useNoteTypeFields.js';
import { Dropdown } from '@immersion-player/shared-ui';
import { useState } from 'react';
import { Section } from './section.js';

export function KnownWords() {
  const [selectedNoteType, setSelectedNoteType] = useState<string | null>(null);

  const noteTypes = useNoteTypes();
  const noteTypeFields = useNoteTypeFields(selectedNoteType);

  return <Section title="Known Words">
    <Dropdown options={noteTypes}></Dropdown>
  </Section>;
}
