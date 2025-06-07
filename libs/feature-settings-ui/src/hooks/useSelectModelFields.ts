import {useQueryClient  ,useMutation } from "@tanstack/react-query";
import { ModelFields } from '@immersion-player/shared-types';

export default function useSelectModelFields() {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn:
      // @ts-expect-error window.electron is not typed
      (selectedModelFields: ModelFields) => window.api.selectModelFields(selectedModelFields),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['modelFields'] });
      await queryClient.invalidateQueries({ queryKey: ['knownWords'] });
    },
  });
  return { selectModelFields: mutate, error };
}
