import { PossibleDefinitions } from '@immersion-player/shared-types';
import { cn } from '@immersion-player/shared-utils';
import { useState } from 'react';
import Flashcard from './flashcard.svg?react';
import { createFlashcard } from '@immersion-player/feature-flashcard-creation';
import useAnkiConnect from '../hooks/useAnkiConnect';

type Definition = {
  text: string;
  description: string;
};

function Definition({
  definition,
  className,
  count,
  onDefinitionSelected,
  onDefinitionUnselected,
}: {
  definition: Definition;
  count: number;
  className?: string;
  onDefinitionSelected: (definition: Definition) => void;
  onDefinitionUnselected: (definition: Definition) => void;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex flex-row p-4 items-center">
        <div>{count}.</div>
        <label className="ml-2">{definition.text}</label>
        <input
          className="ml-auto checked:accent-primary"
          type="checkbox"
          onChange={(event) =>
            event.target.checked ? onDefinitionSelected(definition) : onDefinitionUnselected(definition)
          }
        />
      </div>
      {definition.description && (
        <label className="ml-6 font-light text-sm text-gray-400">{definition.description}</label>
      )}
    </div>
  );
}

function DeinflectedTerm({
  deinflectedTerm,
  definitions,
  onCreateFlashcard,
}: {
  deinflectedTerm: string;
  definitions: PossibleDefinitions;
  onCreateFlashcard: (targetWord: string, definitions: Definition[]) => void;
}) {
  const [selectedDefinitions, setSelectedDefinitions] = useState<{ [key: string]: Definition }>({});

  const addNewDefinition = (definition: Definition, key: string) => {
    setSelectedDefinitions((current) => {
      current[key] = definition;
      return current;
    });
  };

  const removeDefinition = (key: string) => {
    setSelectedDefinitions((current) => {
      delete current[key];
      return current;
    });
  };

  return (
    <>
      <div className="m-2 px-1 pt-0.5 pb-1 rounded bg-primary-gradient flex items-center">
        <label className="text-black font-normal">{deinflectedTerm}</label>
        <button
          onClick={() =>
            onCreateFlashcard(
              deinflectedTerm,
              Object.values(definitions).flatMap((definition) => definition)
            )
          }
          className="ml-auto p-2 text-white flex items-center"
        >
          <Flashcard />
        </button>
      </div>
      {definitions[deinflectedTerm].map((definition, index) => (
        <Definition
          onDefinitionSelected={() => addNewDefinition(definition, index.toString())}
          onDefinitionUnselected={() => removeDefinition(index.toString())}
          count={index + 1}
          definition={definition}
          className={'ml-4 my-1'}
        />
      ))}
    </>
  );
}

export function Dictionary(props: {
  definitions: PossibleDefinitions;
  onCreateFlashcard: (targetWord: string, definitions: Definition[]) => void;
}) {
  return (
    <div className="w-full flex absolute left-0 bottom-0 items-center flex-col">
      <div className="h-60 min-w-[20rem] w-20 bg-surface rounded flex flex-col text-white text-base font-extralight overflow-auto">
        {Object.keys(props.definitions).map((deinflectedTerm) => (
          <DeinflectedTerm
            onCreateFlashcard={props.onCreateFlashcard}
            deinflectedTerm={deinflectedTerm}
            definitions={props.definitions}
          />
        ))}
      </div>
      <div className="h-12 w-full bg-transparent"></div>
    </div>
  );
}
