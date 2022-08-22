// @todo: fix these types now that we've migrated to Vue 3 (these were from Vue 2)
// import type { AsyncComponent } from 'vue/types/options'
// import type { VueConstructor } from 'vue'
import type { ModalData, Modals } from '~/app-modules/ui/Modals/types';
import { Logger } from '~/plugins/logger'

export const CLOSE = 'close'

const state = reactive<Modals>({
  modals: []
})
const maxVisibleModals = 10

export default function useUiModal() {
  function open(modalData?: ModalData) {
    const id = Symbol('modal')

    function dismiss() {
      close(id)
    }

    const modal = Object.assign({}, modalData, {
      id,
      dismiss,
    })

    state.modals.push(modal)

    if (state.modals.length > maxVisibleModals)
      state.modals.shift()

    Logger.debug('useUiModal/open', modal)

    return id
  }

  function close(id: Symbol) {
    const index = state.modals.findIndex(modal => modal.id === id)

    if (index !== -1) {
      const modal = state.modals[index]
      if (modal.onDismiss)
        modal.onDismiss()

      state.modals.splice(index, 1)
    }
  }

  return {
    open,
    close,
    modals: computed(() => state.modals),
  }
}