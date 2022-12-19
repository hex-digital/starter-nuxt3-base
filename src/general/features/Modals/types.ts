// @todo: fix these types for the component key now that we've migrated to Vue 3 (these were from Vue 2)
import type { ButtonTheme } from '~/general/components/base/Buttons/types';
// import type { AsyncComponent } from 'vue/types/options'
// import type { VueConstructor } from 'vue'
import type { CLOSE } from '~/general/features/Modals';

export interface UiModalButton {
  text: string
  onClick: typeof CLOSE | ((...args: any) => void)
  theme?: ButtonTheme
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
};

export interface Modals {
  modals: Array<UiModal>
}
