import { useQuery} from '@tanstack/react-query';
import { ModelFields } from '@immersion-player/shared-types';

export function useModelFields() {
  const { data } = useQuery<ModelFields>({
    queryKey: ['modelFields'],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.loadModelFields(),
  });

  return data;
}
