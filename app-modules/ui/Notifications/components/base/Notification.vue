<script setup lang="ts">
/**
 * todo: Implement the base-fade transitions
 * todo: icons
 */
interface Props {
  visible?: boolean
  close?: boolean
  title?: string
  message?: string
  button?: string
  type?: 'info' | 'success' | 'warning' | 'danger'
  icon?: string | boolean
}

const {
  visible = false,
  close = true,
  title = '',
  message = '',
  button = '',
  type = 'info',
  icon = null,
} = defineProps<Props>()

const emit = defineEmits(['click:action', 'click:close'])

const iconFile = computed(() => icon !== false && icon != null ? icon : iconFromType(type));
const colorClass = computed(() => `b-notification--${type}`);

function iconFromType(type: string) {
  switch (type) {
    case 'success':
      return 'plus';
    case 'danger':
      return 'x';
    case 'warning':
      return 'warning';
    default:
      return 'chat';
  }
}

function actionHandler() {
  emit('click:action')
}

function closeHandler() {
  emit('click:close');
}
</script>

<template>
  <transition name="base-fade">
    <div v-show="visible" :class="['b-notification', colorClass]">
      <slot name="icon" v-bind="{ icon }">
<!--        <BaseIcon-->
<!--            v-show="icon !== false && iconFile"-->
<!--            :type="iconFile"-->
<!--            class="b-notification__icon"-->
<!--            color="currentColor"-->
<!--        />-->
        <div
          v-show="icon !== false && iconFile"
          :type="iconFile"
          class="b-notification__icon"
        >x</div>
      </slot>

      <div>
        <slot name="title" v-bind="{ title }">
          <div v-show="title" class="b-notification__title desk:u-hidden">
            {{ title }}
          </div>
        </slot>

        <slot name="message" v-bind="{ message }">
          <span v-show="message" class="b-notification__message">{{ message }}</span>
        </slot>

        <slot name="button" v-bind="{ button, actionHandler }">
          <BaseButton v-show="button" class="b-notification__action" pure @click="actionHandler">
            {{ button }}
          </BaseButton>
        </slot>
      </div>
      <slot name="close" v-bind="{ closeHandler }">
        <BaseButton
            v-show="close"
            aria-label="Close notification"
            class="b-notification__close"
            pure
            @click="closeHandler"
        >
<!--          <BaseIcon color="gray" type="x"/>-->
          <div>x</div>
        </BaseButton>
      </slot>
    </div>
  </transition>
</template>

<style scoped>
.b-notification {
  &--info {
    --notification-background: #333;
    --notification-color: #f8f8f8;
  }
  &--success {
    --notification-background: #333;
    --notification-color: #f8f8f8;
  }
  &--warning {
    --notification-background: #ffdd57;
    --notification-color: #000;
  }
  &--danger {
    --notification-background: #ff3860;
    --notification-color: #fff;
  }
}

.b-notification {
  align-items: var(--notification-align-items, flex-start);
  background: var(--notification-background, #333);
  border-radius: var(--notification-border-radius, 16px);
  box-shadow: var(--notification-box-shadow, 0 2px 3px rgba(0 0 0 / 35%));
  box-sizing: border-box;
  color: var(--notification-color, #fff);
  display: flex;
  max-width: var(--notification-max-width, 20.9375rem);
  padding: var(--notification-padding, theme('padding.16') theme('padding.8') theme('padding.16') theme('padding.12'));
  position: relative;

  @screen desk {
    --notification-action-display: inline;
    --notification-close-right: var(--spacer-sm);
    --notification-close-top: auto;
    --notification-icon-margin: 0 var(--spacer-base) 0 0;
    --notification-max-width: 100%;
  }
}

.b-notification__title {
  display: var(--notification-title-display, block);

  &::after {
    content: ' ';

    @screen desk {
      content: none;
    }
  }
}

.b-notification__message {
  display: block;
}

.b-notification__action {
  color: var(--notification-action-color, #fff);
  display: var(--notification-action-display, none);
  font: var(--notification-action-font, inherit);
  text-decoration: var(--notification-action-text-decoration, underline);
}

.b-notification__icon {
  --icon-size: 1rem;

  margin: var(--notification-icon-margin, 0.1rem theme('margin.6') 0 0);

  @screen desk {
    --icon-size: 1.25rem;
  }
}

.b-notification__close {
  --icon-size: 0.85rem;

  margin: var(--notification-close-margin, 0 0 0 theme('margin.6'));
}
</style>
