/* eslint-disable-next-line */

import SearchField from './search-field.js';
import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from './hooks/useLibrary.js';
import { Card, CardFooter, Image } from '@heroui/react';

function MediaCard({ name, thumbnail }: { name: string; thumbnail: string | null }) {
  const placeholderSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjM0NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1IiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE3Mi41IiByPSI0MCIgZmlsbD0iIzk5OSIvPjxwb2x5Z29uIHBvaW50cz0iMTM1LDE1MiAxMzUsMTkzIDE3NSwxNzIuNSIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMjQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdlbmVyYXRpbmcgdGh1bWJuYWlsLi4uPC90ZXh0Pjwvc3ZnPg==';
  
  return (
    <Card data-testid="media" isFooterBlurred className="border-none" radius="lg">
      <Image src={thumbnail || placeholderSvg} height={345} width={300} className="object-cover" />
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
