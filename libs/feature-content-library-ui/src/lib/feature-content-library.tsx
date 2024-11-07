/* eslint-disable-next-line */

import SearchField from './search-field';
import useLibrary from './hooks/useLibrary';
import { cn } from '@immersion-player/shared-utils';

function MediaCard({ name, thumbnail }: { name: string; thumbnail: string }) {
  return (
    <div
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
  const library = useLibrary();

  function handleOnChange(searchTerm: string) {}

  return (
    <div className="h-full gap-7 flex flex-col">
      <SearchField
        className="w-60 self-end mr-8"
        onChange={handleOnChange}
        debounce={300}
      />
      <div className="h-full flex flex-row flex-wrap gap-4 min-h-0 overflow-auto">
        {library.map((l) => (
          <MediaCard name={l.name} thumbnail={l.thumbnail} key={l.name} />
        ))}
      </div>
    </div>
  );
}

export default FeatureContentLibrary;
