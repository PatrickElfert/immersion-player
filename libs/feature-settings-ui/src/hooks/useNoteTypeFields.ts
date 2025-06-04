import { useQuery } from '@tanstack/react-query';

export function useNoteTypeFields(name: string | null) {
  const { data } = useQuery<string[]>({
    queryKey: ['noteTypeFields', name],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.loadFieldsByNoteType(name),
    enabled: !!name
  });

  return data ?? [];
}
