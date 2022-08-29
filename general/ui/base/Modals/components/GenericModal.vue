<script setup lang="ts">
import type { UiModalButton } from '~/general/ui/base/Modals/composables/useUiModal';

interface Props {
  id: Symbol
  modalTitle?: string
  heading?: string
  content?: string
  buttons?: Array<UiModalButton>
}

const {
  id,
  modalTitle = '',
  heading = '',
  content = '',
  buttons = () => [],
} = defineProps<Props>()

const emit = defineEmits(['close'])

function onClick(onClick: UiModalButton['onClick']) {
  if (onClick === 'close')
    emit('close')
  else
    onClick()
}
</script>

<template>
  <BaseModal :visible="true" :title="modalTitle" @close="$emit('close')">
    <h4 v-if="heading" style="margin-bottom: 2rem">{{ heading }}</h4>
    <div v-if="content" v-html="content" />
    <BaseButton v-for="(button, index) in buttons" :key="index" :theme="button.theme" @click="onClick(button.onClick)">
      {{ button.text }}
    </BaseButton>
  </BaseModal>
</template>
