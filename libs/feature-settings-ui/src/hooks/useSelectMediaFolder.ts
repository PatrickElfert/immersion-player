import {useQueryClient  ,useMutation } from "@tanstack/react-query";

export default function useSelectMediaFolder() {
  const queryClient = useQueryClient()
  const { mutate, error} = useMutation<string>(
    {
      mutationFn:
        // @ts-expect-error window.electron is not typed
        async () => await window.api.selectMediaFolder(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userSettings'] })
        queryClient.invalidateQueries({ queryKey: ['library'] })
      },
    }
  )
  return { selectMediaFolder: mutate, error };
}
