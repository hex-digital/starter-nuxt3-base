// import type { AsyncComponent } from 'vue/types/options'
// import type { VueConstructor } from 'vue'
import { Logger } from '~/plugins/logger'

/**
 * See ~/docs/base-components/modals.md for documentation on using modals, and this useUiModal composable.
 */

export const CLOSE = 'close'

export interface UiModalButton {
  text: string
  onClick: typeof CLOSE | ((...args: any) => void)
  theme?: string
}

export interface ModalData {
  title?: string
  cross?: boolean
  overlay?: boolean
  persistent?: boolean
  transitionOverlay?: string
  transitionModal?: string

  component?: any // VueConstructor | AsyncComponent<any, any, any, any>
  componentBinds?: Record<string, any>
  heading?: string
  content?: string
  buttons?: Array<UiModalButton>

  onDismiss?: () => void
}

export type UiModal = ModalData & {
  id: Symbol
  dismiss: () => void
}

export interface Modals {
  modals: Array<UiModal>
}

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