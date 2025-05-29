import { useMutation } from "@tanstack/react-query";

export default function useSelectMediaFolder() {

  const { mutate, error} = useMutation<string>(
    {
      mutationKey: ['settings'],
      mutationFn:
        // @ts-expect-error window.electron is not typed
        () => window.api.selectMediaFolder(),
    }
  )
  return { selectMediaFolder: mutate, error };
}
