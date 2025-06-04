import { useSuspenseQuery } from '@tanstack/react-query';
import { AnkiFields, SelectedAnkiFields } from '@immersion-player/shared-types';

export function useModelFields() {
  const { data } = useSuspenseQuery<SelectedAnkiFields[]>({
    queryKey: ['noteTypes'],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.loadModelFields(),
  });

  return data;
}
