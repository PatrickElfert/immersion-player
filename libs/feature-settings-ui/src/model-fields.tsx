import { useModelFields } from './hooks/useModelFields.js';
import { Section } from './section.js';
import Accordion, { AccordionItem } from '../../shared-ui/src/lib/accordion.js';
import { Checkbox } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';
import useSelectModelFields from './hooks/useSelectModelFields.js';

export function ModelFields() {
  const modelFields = useModelFields();
  const { selectModelFields } = useSelectModelFields();

  const accordionItems: AccordionItem[] = Object.entries(modelFields).map(([modelName, modelValue]) => ({
    value: modelName,
    children: (
      <div>
        {modelValue.fields.map((field) => (
          <div className="flex items-center my-2">
            <Checkbox.Root
              checked={field.selected}
              onCheckedChange={(selected) => {
                field.selected = !!selected;
                selectModelFields(modelFields);
              }}
              className="flex w-4 h-4 items-center justify-center rounded bg-white outline-none hover:bg-primary"
            >
              <Checkbox.Indicator>
                <CheckIcon className="text-black" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="ml-2 leading-none text-white">{field.text}</label>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <Section title="Field Mappings">
      <Accordion items={accordionItems}></Accordion>
    </Section>
  );
}
