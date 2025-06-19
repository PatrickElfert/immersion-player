import {useQueryClient  ,useMutation } from "@tanstack/react-query";
import { UpdateFieldMappingPayload } from '@immersion-player/shared-types';

export default function useUpdateFieldMapping() {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn:
      // @ts-expect-error window.electron is not typed
      (payload: UpdateFieldMappingPayload) => window.api.selectModelFields(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['modelFields'] });
      await queryClient.resetQueries({ queryKey: ['knownWords'] });
    },
  });
  return { updateFieldMapping: mutate, error };
}
