/* eslint-disable-next-line */

import {useEffect, useState} from 'react';
import {LibraryItem} from "@immersion-player/feature-content-provider";

function MediaCard({name}: {name: string}) {
  return (
    <div className="relative h-[345px] w-[300px] bg-primary bg-[url('assets/shirokumacover.png')] bg-cover flex items-end rounded">
      <div className="absolute bg-black h-full w-full opacity-20"></div>
      <label className="font-semibold text-2xl text-white p-3 z-10 relative">
        {name}
      </label>
    </div>
  );
}

export function FeatureContentLibrary() {

  const [library, setLibrary] = useState<LibraryItem[]>([]);

  useEffect(() => {
    // @ts-ignore
    window.electron
      .getLibrary('/Documents/Animes')
      .then((library: LibraryItem[]) => setLibrary(library));
  }, []);

  return (
    <div className="h-full flex flex-row flex-wrap gap-4 min-h-0 overflow-auto">
      {library.map(l => <MediaCard name={l.name} key={l.name} />)}
    </div>
  );
}

export default FeatureContentLibrary;
