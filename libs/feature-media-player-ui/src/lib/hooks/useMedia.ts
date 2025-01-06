import { useLocation } from 'react-router-dom';
import { useLibrary } from '@immersion-player/feature-content-library-ui';

export function useMedia() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return useLibrary().find((entry) => entry.id === params.get('id'));
}
