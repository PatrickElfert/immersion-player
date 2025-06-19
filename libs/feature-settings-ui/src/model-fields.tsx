import { useModelFields } from './hooks/useModelFields.js';
import { Section } from './section.js';
import useUpdateFieldMapping from './hooks/useUpdateFieldMapping.js';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@heroui/react';

export function ModelFields() {
  const modelFields = useModelFields() ?? {};
  const { updateFieldMapping } = useUpdateFieldMapping();

  const accordionItems = Object.entries(modelFields).map(([modelName, modelValue]) => ({
    value: modelName,
    children: (
      <CheckboxGroup
        onValueChange={(selectedFields) => updateFieldMapping({ modelName, selectedFields })}
        color="primary"
        value={modelValue.fields?.filter((field) => field.selected).map((field) => field.text)}
      >
        {modelValue.fields?.map((field) => (
          <Checkbox value={field.text}>{field.text}</Checkbox>
        ))}
      </CheckboxGroup>
    ),
  }));

  return (
      <Accordion variant="splitted">
        {accordionItems.map((item) => (
          <AccordionItem key={item.value} aria-label={item.value} title={item.value}>
            {item.children}
          </AccordionItem>
        ))}
      </Accordion>
  );
}
