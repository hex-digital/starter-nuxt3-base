<script setup lang="ts">
interface Props {
  transition?: string
  visible?: boolean
}

const { transition = 'fade', visible = false } = defineProps<Props>();
</script>

<template>
  <Transition :name="transition">
    <div v-if="visible" ref="overlay" class="b-overlay" v-bind="$attrs" />
  </Transition>
</template>

<style>
.b-overlay {
  background-color: rgba(0,0,0,0.7);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
}
</style>
