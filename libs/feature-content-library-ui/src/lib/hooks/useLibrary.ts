import {useEffect, useState} from "react";
import {LibraryItem} from "@immersion-player/feature-content-provider";

export default function useLibrary(searchTerm?: string) {
  const [library, setLibrary] = useState<LibraryItem[]>([]);

  useEffect(() => {
    // @ts-ignore
    window.electron
      .getLibrary('/Documents/Animes/Shikimori is Not Just a Cutie')
      .then((library: LibraryItem[]) => setLibrary(library));
  }, []);

  return library.filter(l => searchTerm ?  l.name.includes(searchTerm): true);
}
