/**
 * This composable is currently experimental, as it is only a basic caching implementation.
 * Use this composable in its current state if you want to store something that persists on refresh, but clears on new tab.ygtrewwq
 */

import { Logger } from '~/plugins/logger';
import { StorageSerializers } from '@vueuse/core';
import { Ref } from '@vue/reactivity';

export default async function useFetchWithCache<DataReturnType>(url: string) {
  const cached = useSessionStorage<DataReturnType>(url, null, {
    serializer: StorageSerializers.object,
  });
  let error: Ref = ref(null);

  async function refresh() {
    // useFetch will get off window's initial state if possible, if hydrating on client
    const { data, error: fetchError } = await useFetch<DataReturnType>(url);
    error = fetchError;

    if (fetchError.value) {
      // TODO do we want to throw here?
      Logger.error(`Could not fetch data from ${url}`);
    }

    cached.value = data.value as DataReturnType;
  }

  if (!cached.value) {
    Logger.debug(`Cache miss for ${url}`);
    await refresh();
  } else {
    Logger.debug(`Cache hit for ${url}`);
  }

  return {
    data: cached,
    error,
    refresh,
  };
}
