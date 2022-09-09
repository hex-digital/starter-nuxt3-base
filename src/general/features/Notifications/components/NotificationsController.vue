<script setup lang="ts">
import { useOnline } from '@vueuse/core'
import { useUiNotification } from '~/general/features/Notifications'

const online = useOnline()

const { notifications } = useUiNotification()
const disableOfflineNotice = ref(false)

function closeOfflineNotice() {
  if (disableOfflineNotice.value === false) {
    disableOfflineNotice.value = true

    setTimeout(() => {
      disableOfflineNotice.value = false
    }, 1000 * 60 * 30)
  }
}
</script>

<template>
  <transition-group class="global-notifications" name="slide-fade" tag="div">
    <BaseNotification
      v-for="notification in notifications as any"
      :key="notification.id"
      :button="notification.action && notification.action.text"
      :message="notification.message"
      :type="notification.type || 'info'"
      :icon="notification.icon"
      :close="notification.close || true"
      visible
      @click:close="notification.userDismiss"
      @click:action="notification?.action?.onClick"
    />
    <BaseNotification
      v-if="!online"
      key="offline"
      message="Your internet seems to be unstable or disconnected."
      type="info"
      :close="true"
      visible
      @click:close="closeOfflineNotice"
    />
  </transition-group>
</template>

<style>
/** `transition-group` elements don't get the scope selector on their HTML properly, so need to make this style tag unscoped. */
.global-notifications {
  align-items: flex-end;
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 100%;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 12;

  @screen desk {
    bottom: auto;
    left: auto;
    right: 5%;
    top: 100px;
    width: 320px;
  }
}
</style>

<style scoped>
.global-notifications .b-notification {
  --notification-action-color: #fff;
  --notification-background: #333;
  --notification-border-radius: 16px;
  --notification-color: #fff;
  --notification-font-family: sans-serif;
  --notification-font-size: 1rem;
  --notification-font-weight: theme('fontWeight.normal');
  --notification-max-width: 100%;
  --notification-padding: theme('padding.16') theme('padding.8') theme('padding.16') theme('padding.12');

  margin: 0 theme('margin.8') theme('margin.8') auto;
  max-width: 100%;

  @screen desk {
    --notification-font-size: theme('fontSize.14');

    margin: 0 0 theme('margin.8') 0;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s;

  @screen desk {
    transition: opacity 0.25s linear;
  }
}

.slide-fade-enter {
  transform: translateY(40px);

  @screen desk {
    opacity: 0;
    transform: none;
  }
}

.slide-fade-leave-to {
  transform: translateY(40px);

  @screen desk {
    opacity: 0;
    transform: none;
  }
}
</style>
