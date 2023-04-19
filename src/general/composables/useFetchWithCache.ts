/**
 * This composable is currently experimental, as it is only a basic caching implementation.
 * Use this composable in its current state if you want to store something that persists on refresh, but clears on new tab.ygtrewwq
 */

import { StorageSerializers } from '@vueuse/core'
import type { Ref } from '@vue/reactivity'
import { logger } from '~/plugins/logger'

export default async function useFetchWithCache<DataReturnType>(url: string) {
  const cached = useSessionStorage<DataReturnType>(url, null, {
    serializer: StorageSerializers.object,
  })
  let error: Ref = ref(null)

  async function refresh() {
    // useFetch will get off window's initial state if possible, if hydrating on client
    const { data, error: fetchError } = await useFetch<DataReturnType>(url)
    // @ts-expect-error Problem with RefSymbol in typescript
    error = fetchError

    if (fetchError.value) {
      // TODO do we want to throw here?
      logger.error(`Could not fetch data from ${url}`)
    }

    cached.value = data.value as DataReturnType
  }

  if (!cached.value) {
    logger.debug(`Cache miss for ${url}`)
    await refresh()
  }
  else {
    logger.debug(`Cache hit for ${url}`)
  }

  return {
    data: cached,
    error,
    refresh,
  }
}
