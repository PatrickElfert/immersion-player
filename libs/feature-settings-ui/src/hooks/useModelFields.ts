import { useSuspenseQuery } from '@tanstack/react-query';
import { ModelFields } from '@immersion-player/shared-types';

export function useModelFields() {
  const { data } = useSuspenseQuery<ModelFields>({
    queryKey: ['modelFields'],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.loadModelFields(),
  });

  return data;
}
