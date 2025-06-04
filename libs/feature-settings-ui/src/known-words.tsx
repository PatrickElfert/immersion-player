import { useModelFields } from './hooks/useModelFields.js';
import { useState } from 'react';
import { Section } from './section.js';
import Accordion, { AccordionItem } from '../../shared-ui/src/lib/accordion.js';
import { Checkbox } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';

export function KnownWords() {
  const [selectedNoteType, setSelectedNoteType] = useState<string | null>(null);

  const models = useModelFields();
  const accordionItems: AccordionItem[] = models.map((model) => ({
    value: model.modelName,
    children: (
      <form>
        {model.fields.map((field) => (
          <div className="flex items-center my-2">
            <Checkbox.Root className="flex w-4 h-4 items-center justify-center rounded bg-white outline-none hover:bg-primary">
              <Checkbox.Indicator>
                <CheckIcon className="text-black" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="ml-2 leading-none text-white">{field}</label>
          </div>
        ))}
      </form>
    ),
  }));

  return (
    <Section title="Known Words">
      <Accordion items={accordionItems}></Accordion>
    </Section>
  );
}
