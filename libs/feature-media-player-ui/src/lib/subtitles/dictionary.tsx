import { cn } from '@immersion-player/shared-utils';
import { Definition, DictionaryResult, DictionaryResults, TargetWord } from '@immersion-player/shared-types';
import { Fragment, PropsWithChildren, useState } from 'react';
import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useDebounce } from '@uidotdev/usehooks';

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
    <div data-testid="definition" className={cn('flex flex-col', className)}>
      <div className="flex-col">
        <div className="flex">
          <Checkbox
            onChange={(event) =>
              event.target.checked ? onDefinitionSelected(definition) : onDefinitionUnselected(definition)
            }
          ></Checkbox>
          <label data-testid="word">{definition.text}</label>
        </div>
        <div data-testid="description" className="ml-8 font-light text-sm text-gray-400">
          {definition.description}
        </div>
      </div>
    </div>
  );
}

function DeinflectedTerm({
  dictionaryResult,
  onCreateFlashcard,
  term,
}: {
  dictionaryResult: DictionaryResult;
  onCreateFlashcard: (targetWords: TargetWord[]) => void;
  term: string;
}) {
  const [selectedDefinitions, setSelectedDefinitions] = useState<{ [key: string]: Definition }>({});
  const deinflectedTerm = dictionaryResult.token;

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

  const selectedDefinitionsArr = Object.values(selectedDefinitions).flatMap((definition) => definition);
  const definitionsToCreate = selectedDefinitionsArr.length > 0 ? selectedDefinitionsArr : dictionaryResult.definitions;

  return (
    <div data-testid="deinflectedTerm">
      <div className="m-2 px-1 pt-0.5 pb-1 rounded bg-primary-gradient flex items-center">
        <label data-testid="title" className="text-foreground font-normal">
          <ruby>
            {deinflectedTerm?.map((t, index) => (
              <Fragment key={index}>
                {t.original}
                {t.furigana && <rt>{t.furigana}</rt>}
              </Fragment>
            ))}
          </ruby>
        </label>
        <Button
          color="primary"
          isIconOnly
          aria-label="createFlashcard"
          onPress={() =>
            onCreateFlashcard([
              {
                token: deinflectedTerm,
                definitions: definitionsToCreate,
              },
            ])
          }
          className="ml-auto text-foreground"
        >
          <PaperPlaneIcon></PaperPlaneIcon>
        </Button>
      </div>
      {dictionaryResult.definitions.map((definition, index) => (
        <Definition
          key={index}
          onDefinitionSelected={() => addNewDefinition(definition, index.toString())}
          onDefinitionUnselected={() => removeDefinition(index.toString())}
          count={index + 1}
          definition={definition}
          className={'ml-4 my-1'}
        />
      ))}
    </div>
  );
}

interface DictionaryProps {
  dictionaryResults: DictionaryResults;
  onCreateFlashcard: (targetWords: TargetWord[]) => void;
}

function DictionaryShell({ children }: PropsWithChildren) {
  return (
    <div data-testid="dictionary" className="h-60 w-[30rem] flex flex-col text-foreground text-base overflow-y-scroll">
      {children}
    </div>
  );
}

function DictionaryEntries(props: DictionaryProps) {
  return (
    <>
      {Object.entries(props.dictionaryResults).map(([term, result]) => (
        <DeinflectedTerm key={term} term={term} onCreateFlashcard={props.onCreateFlashcard} dictionaryResult={result} />
      ))}
    </>
  );
}

function DictionaryEmpty() {
  return <div className="w-full text-center p-5 text-content1-foreground">No definitions found</div>;
}

export function DictionaryOverlay(props: PropsWithChildren<DictionaryProps & { enabled: boolean }>) {
  const [isHoveringChildren, setIsHoveringChildren] = useState(false);
  const [isHoveringDictionary, setIsHoveringDictionary] = useState(false);

  const isOpen = useDebounce((isHoveringChildren || isHoveringDictionary) && props.enabled, 100);

  return (
    <Popover className={'dark'} color="default" isOpen={isOpen} showArrow={false}>
      <PopoverTrigger>
        <div
          className={'hover:text-primary'}
          onMouseLeave={() => setIsHoveringChildren(false)}
          onMouseEnter={() => setIsHoveringChildren(true)}
        >
          {' '}
          {props.children}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div onMouseEnter={() => setIsHoveringDictionary(true)} onMouseLeave={() => setIsHoveringDictionary(false)}>
          <DictionaryShell>
            {Object.keys(props.dictionaryResults).length > 0 ? (
              <DictionaryEntries
                dictionaryResults={props.dictionaryResults}
                onCreateFlashcard={props.onCreateFlashcard}
              />
            ) : (
              <DictionaryEmpty />
            )}
          </DictionaryShell>
        </div>
      </PopoverContent>
    </Popover>
  );
}
