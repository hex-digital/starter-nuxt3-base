import type { ModalData, Modals } from '~/general/features/Modals/types';
import { logger } from '~/plugins/logger';

export const CLOSE = 'close';

const state = reactive<Modals>({
  modals: [],
});
const maxVisibleModals = 10;

export function useUiModal() {
  function open(modalData?: ModalData) {
    const id = Symbol('modal');

    function dismiss() {
      close(id);
    }

    const modal = Object.assign({}, modalData, {
      id,
      dismiss,
    });

    state.modals.push(modal);

    if (state.modals.length > maxVisibleModals) {
      state.modals.shift();
    }

    logger.debug('useUiModal/open', modal);

    return id;
  }

  function close(id: Symbol) {
    const index = state.modals.findIndex(modal => modal.id === id);

    if (index !== -1) {
      const modal = state.modals[index];
      if (modal.onDismiss) {
        modal.onDismiss();
      }

      state.modals.splice(index, 1);
    }
  }

  return {
    open,
    close,
    modals: computed(() => state.modals),
  };
}
