/* eslint-disable-next-line */

import SearchField from './search-field.js';
import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from './hooks/useLibrary.js';
import { Card, CardFooter, Image } from '@heroui/react';

function MediaCard({ name, thumbnail }: { name: string; thumbnail: string }) {
  return (
    <Card data-testid="media" isFooterBlurred className="border-none" radius="lg">
      <Image src={thumbnail} height={345} width={300} className="object-cover" />
      <CardFooter
        className="justify-between before:bg-white/10 border-white/20 border-1
      overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <p className="font-bold text-white/80">{name}</p>
      </CardFooter>
    </Card>
  );
}

export function FeatureContentLibrary() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  function handleOnChange(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  return (
    <div className="h-full gap-7 flex flex-col mx-5 min-w-[940px] max-w-[940px] my-4">
      <SearchField className="w-60 self-end mr-8" onChange={handleOnChange} debounce={300} />
      <Suspense fallback={null}>
        <LibraryItems searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}

export function LibraryItems({ searchTerm }: { searchTerm: string | undefined }) {
  const library = useLibrary(searchTerm);
  return (
    <div className="h-full flex flex-row flex-wrap gap-4 min-h-0 overflow-auto">
      {library.map((l, index) => (
        <Link className="h-max" key={index} to={`Player?id=${l.id}`}>
          <MediaCard name={l.name} thumbnail={l.thumbnail} key={l.name} />
        </Link>
      ))}
    </div>
  );
}

export default FeatureContentLibrary;
