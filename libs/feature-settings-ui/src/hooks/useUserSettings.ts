import { useSuspenseQuery } from '@tanstack/react-query'
import {UserSettings} from '@immersion-player/shared-types'

export function useUserSettings() {
  const { data } = useSuspenseQuery<UserSettings>({
    queryKey: ['userSettings'],
    // @ts-expect-error window.electron is not typed
    queryFn: () => window.api.getUserSettings(),
  }
  )

  return data;
}
