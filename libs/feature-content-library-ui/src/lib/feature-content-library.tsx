/* eslint-disable-next-line */

import SearchField from './search-field';
import { cn } from '@immersion-player/shared-utils';
import {useState} from "react";
import {Link} from "react-router-dom";
import {useLibrary} from "./hooks/useLibrary";

function MediaCard({ name, thumbnail }: { name: string; thumbnail: string }) {
  return (
    <div data-testid="media"
      className={cn(
        'relative h-[345px] w-[300px] bg-cover flex items-end rounded'
      )}
      style={{ backgroundImage: `url('${thumbnail}')` }}
    >
      <div className="absolute bg-black h-full w-full opacity-40"></div>
      <label className="font-semibold text-xl text-white p-3 z-10 relative break-all">
        {name}
      </label>
    </div>
  );
}

export function FeatureContentLibrary() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const library = useLibrary(searchTerm);

  function handleOnChange(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  return (
    <div className="h-full gap-7 flex flex-col">
      <SearchField
        className="w-60 self-end mr-8"
        onChange={handleOnChange}
        debounce={300}
      />
      <div className="h-full flex flex-row flex-wrap gap-4 min-h-0 overflow-auto">
        {library.map((l, index) => (
          <Link key={index} to={`Player?id=${l.id}`}>
            <MediaCard name={l.name} thumbnail={l.thumbnail} key={l.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeatureContentLibrary;
