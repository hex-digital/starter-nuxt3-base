<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { ESC, ESCAPE } from '~/app-modules/app/constants/keyboardEventKeys'

interface Props {
  title?: string
  visible?: boolean
  cross?: boolean
  overlay?: boolean
  persistent?: boolean
  transitionOverlay?: string
  transitionModal?: string
}

const {
  title = '',
  visible = false,
  cross = true,
  overlay = true,
  persistent = false,
  transitionOverlay = 'fade',
  transitionModal = 'fade',
} = defineProps<Props>()

const emit = defineEmits(['close'])

const refContainer = ref<HTMLElement | null>(null)
const refContent = ref<HTMLElement | null>(null)

onClickOutside(refContainer, () => closeIfNotPersistent())

watch(
  () => visible,
  (isVisible) => {
    if (!process.client)
      return

    if (isVisible) {
      nextTick(() => {
        if (refContent.value)
          disableBodyScroll(refContent.value)
      })
      document.addEventListener('keydown', keydownHandler)
    } else {
      clearAllBodyScrollLocks()
      document.removeEventListener('keydown', keydownHandler)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  clearAllBodyScrollLocks()
  document.removeEventListener('keydown', keydownHandler)
})

function close() {
  emit('close', false)
}

function closeIfNotPersistent() {
  if (!persistent)
    close()
}

function keydownHandler(event: KeyboardEvent) {
  if (event.key === ESCAPE || event.key === ESC)
    close()
}
</script>

<template>
  <section class="b-modal">
    <BaseOverlay v-if="overlay" class="b-modal__overlay" :transition="transitionOverlay" :visible="visible" />
    <Transition :name="transitionModal">
      <div v-if="visible" ref="refContainer" class="b-modal__container">
        <UseFocusTrap>
          <slot name="modal-bar">
            <BaseBar class="b-modal__bar" :close="cross" :title="title" @click:close="close" />
          </slot>

          <slot name="close">
            <BaseButton
              :class="{ 'display-none': !cross }"
              class="b-modal__close"
              aria-label="Close modal"
              type="button"
              pure
              @click="close"
            >x
              <!-- <BaseIcon type="x" size="xsmall" color="gray" /> -->
            </BaseButton>
          </slot>

          <div ref="refContent" class="b-modal__content">
            <slot />
          </div>
        </UseFocusTrap>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
@screen desk {
  .b-modal {
    --modal-width: 29.375rem;
    --modal-top: 50%;
    --modal-left: 50%;
    --modal-bottom: none;
    --modal-right: none;
    --modal-transform: translate3d(-50%, -50%, 0);
    --modal-height: auto;
    --modal-max-height: 90%;
    --modal-content-padding: 1.875rem 1.25rem;
  }
}

.b-modal__container {
  align-content: space-between;
  background-color: var(--modal-background, #f8f8f8);
  border: var(--modal-border, 2px solid #eee);
  bottom: var(--modal-bottom, 0);
  border-radius: var(--modal-border-radius, 20px);
  box-sizing: border-box;
  display: flex;
  flex-direction: var(--modal-flex-direction, column);
  height: var(--modal-height);
  left: var(--modal-left, 0);
  max-height: var(--modal-max-height);
  overflow-y: auto;
  position: fixed;
  right: var(--modal-right, 0);
  top: var(--modal-top, 0);
  transform: var(--modal-transform);
  width: var(--modal-width);
  z-index: var(--modal-index, 11);
}

.b-modal__container::-webkit-scrollbar {
  width: 0;
}

.b-modal__content {
  padding: var(--modal-content-padding, 1.5rem 1rem);
}

.b-modal__close {
  display: none;
  position: absolute;
  right: var(--modal-close-right, 1rem);
  top: var(--modal-close-top, 1rem);

  @screen desk {
    display: inline-flex;
  }
}

.b-modal__bar {
  @screen desk {
    display: none;
  }
}
</style>
