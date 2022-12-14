<script setup lang="ts">
import type { ButtonType } from '~/general/types/html';

import type { ButtonSize, ButtonTheme } from '~/general/components/base/Buttons/types';

interface Props {
  disabled?: boolean
  pure?: boolean
  type?: ButtonType
  theme?: ButtonTheme
  size?: ButtonSize
  href?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  pure: false,
  type: 'button',
  theme: null,
  size: null,
  href: null,
});

defineEmits(['click']);

const onClient = computed(() => !process.server);
const isLink = props.href?.length;

const buttonClasses = computed(() => ({
  'button': true,
  [`is-${props.theme}`]: props.theme && !props.pure,
  [`button--${props.size}`]: props.size,
  'button--pure': props.pure,
  'button--disabled': props.disabled,
  'button--hydrating': !onClient,
}));
</script>

<template>
  <span class="b-button">
    <component
      :is="isLink ? 'a' : 'button'"
      :class="buttonClasses"
      :type="props.type"
      :aria-disabled="props.disabled"
      @click.stop="$emit('click')"
    >
      <slot />
    </component>
  </span>
</template>

<style scoped>
.b-button {
  display: inline-block;
}

/* Show a loading state if user hovers over button after SSR, but before JavaScript has hydrated and taken over clientside */
.button--hydrating {
  cursor: wait;
}

.button--disabled {
  cursor: no-drop;
}

.button {
  align-items: center;
  border: 1px solid transparent;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  color: #000;
  display: inline-flex;
  /* font-family: theme('fontFamily.body'); */
  font-size: var(--button-font-size, 1rem);
  height: max-content;
  justify-content: center;
  padding: var(--button-padding-y, 0.65rem) var(--button-padding-x, 1rem);
  width: 100%;
}

.button--disabled {
  pointer-events: none;
}

.button--small {
  font-size: var(--button-small-font-size, 0.875rem);
  padding: var(--button-small-padding-y, 0.4rem) var(--button-small-padding-x, 1rem);
}

.button--pure {
  box-shadow: unset;
  min-width: unset;
  padding: unset;
}
</style>
