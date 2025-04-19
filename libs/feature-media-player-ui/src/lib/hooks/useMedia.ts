import { useLocation } from 'react-router-dom';
import { useLibrary } from '@immersion-player/feature-content-library-ui';

export function useLibraryItem() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const libraryItem = useLibrary().find((entry) => entry.id === params.get('id'));
  if(!libraryItem) {
    throw Error(`Item with id ${params.get('id')} does not exist!`)
  }

  return libraryItem;
}
