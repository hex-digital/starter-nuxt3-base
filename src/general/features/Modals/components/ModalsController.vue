<script setup lang="ts">
import { useUiModal } from '~/general/features/Modals'

const { modals, close: closeModal } = useUiModal()
</script>

<template>
  <div>
    <template v-for="modal in modals as any">
      <GenericModal
        v-if="!modal.component"
        :id="modal.id"
        :key="modal.id"
        :modal-title="modal.title"
        :heading="modal.heading"
        :content="modal.content"
        :buttons="modal.buttons"
        @close="closeModal(modal.id)"
      />

      <BaseModal v-else :key="modal.id" :visible="true" :title="modal.title" @close="closeModal(modal.id)">
        <component :is="modal.component" v-bind="modal.componentBinds" @close="closeModal(modal.id)" />
      </BaseModal>
    </template>
  </div>
</template>
