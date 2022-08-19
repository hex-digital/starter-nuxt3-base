<script setup lang="ts">
interface Props {
  title?: string
  back?: boolean
  close?: boolean
}

const {
  title = '',
  back = false,
  close = false,
} = defineProps<Props>()

const emit = defineEmits(['click:close', 'click:back'])
</script>

<template>
  <div class="b-bar">
    <div>
      <slot name="back">
        <BaseButton
          v-show="back"
          aria-label="back"
          class="b-bar__icon"
          type="button"
          pure
          @click="$emit('click:back')"
        >
          &lt; <!-- <BaseIcon type="caret-left" size="xsmall" color="gray" /> -->
        </BaseButton>
      </slot>
    </div>
    <div>
      <slot name="title" v-bind="{ title }">
        <div class="b-bar__title">{{ title }}</div>
      </slot>
    </div>
    <div>
      <slot name="close">
        <BaseButton
          v-show="close"
          class="b-bar__icon"
          aria-label="close"
          type="button"
          pure
          @click="$emit('click:close')"
        >
          x <!-- <BaseIcon type="x" size="xsmall" color="gray" /> -->
        </BaseButton>
      </slot>
    </div>
  </div>
</template>

<style>
.b-bar {
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 var(--bar-height, 3.125rem);
  height: var(--bar-height, 3.125rem);
  justify-content: space-between;
  padding: 0 1.5rem;
}

.b-bar__icon {
  background: transparent;
  border: 0;
  padding: 0;
}
</style>
