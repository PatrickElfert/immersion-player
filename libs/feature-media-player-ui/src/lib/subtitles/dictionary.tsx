import { cn } from '@immersion-player/shared-utils';
import { Definition } from '@immersion-player/shared-types';
import { PropsWithChildren, useState } from 'react';
import { Fragment, PropsWithChildren, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useDebounce } from "@uidotdev/usehooks";

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
      <div className="relative pl-10">
        <div className="flex absolute top-0 left-0">
          <input
            className="mr-2 checked:accent-primary"
            type="checkbox"
            onChange={(event) =>
              event.target.checked ? onDefinitionSelected(definition) : onDefinitionUnselected(definition)
            }
          />
          <div>{count}.</div>
        </div>
        <label data-testid="word">{definition.text}</label>
      </div>
      <label data-testid="description" className="ml-6 font-light text-sm text-gray-400">
        {definition.description}
      </label>
    </div>
  );
}

function DeinflectedTerm({
  definitions,
  onCreateFlashcard,
}: {
  definitions: Definition[];
  onCreateFlashcard: (definitions: Definition[]) => void;
}) {
  const [selectedDefinitions, setSelectedDefinitions] = useState<{ [key: string]: Definition }>({});
  const deinflectedTerm = definitions[0]?.token;

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
          onPress={() => onCreateFlashcard(Object.values(selectedDefinitions).flatMap((definition) => definition))}
          className="ml-auto text-foreground"
        >
          <PaperPlaneIcon></PaperPlaneIcon>
        </Button>
      </div>
      {definitions.map((definition, index) => (
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
  definitions: Definition[][];
  onCreateFlashcard: (definitions: Definition[]) => void;
}

function Dictionary(props: DictionaryProps) {
  return (
    <div data-testid="dictionary" className="w-full flex items-center flex-col">
      <div className="h-60 min-w-[20rem] w-20 rounded flex flex-col text-foreground text-base font-extralight overflow-y-scroll">
        {props.definitions.map((entry, index) => (
          <DeinflectedTerm key={index} onCreateFlashcard={props.onCreateFlashcard} definitions={entry} />
        ))}
      </div>
    </div>
  );
}

export function DictionaryOverlay(props: PropsWithChildren<DictionaryProps & { enabled: boolean }>) {
  const [isHoveringChildren, setIsHoveringChildren] = useState(false);
  const [isHoveringDictionary, setIsHoveringDictionary] = useState(false);

  const isOpen = useDebounce((isHoveringChildren || isHoveringDictionary) && props.enabled, 100);

  return (
    <Popover className={'dark'} color="default" isOpen={isOpen} showArrow={true}>
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
          <Dictionary onCreateFlashcard={props.onCreateFlashcard} definitions={props.definitions} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
