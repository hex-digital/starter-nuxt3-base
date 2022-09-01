import { maxVisibleNotifications, timeToLive } from '../config'
import type { NotificationData, Notifications } from '../types'
import { Logger } from '~/plugins/logger'

export const DISMISS = 'userDismiss'
export const REMOVE = 'remove'

const state = reactive<Notifications>({
  notifications: [],
})

export function useUiNotification() {
  function send(notificationData?: NotificationData) {
    const id = Symbol('notification')
    const alive = true

    const notification = Object.assign({}, notificationData, {
      id,
      userDismiss,
      alive,
    })

    function userDismiss() {
      if (notification.onDismiss && notification.alive)
        notification.onDismiss()

      remove(id)
    }

    state.notifications.push(notification)
    if (state.notifications.length > maxVisibleNotifications)
      state.notifications.shift()

    if (!notification.persistent)
      setTimeout(userDismiss, (notification.timeToLive || timeToLive) * 1000)

    Logger.debug('useUiNotification/send', notification)

    return id
  }

  function sendWith(...notificationData: Array<NotificationData>) {
    return send(Object.assign({}, ...notificationData))
  }

  function remove(id: Symbol) {
    const index = state.notifications.findIndex(notification => notification.id === id)

    if (index !== -1) {
      const notification = state.notifications[index]

      if (notification.onRemove && notification.alive)
        notification.onRemove()

      notification.alive = false

      state.notifications.splice(index, 1)
    }
  }

  return {
    send,
    sendWith,
    remove,
    notifications: computed(() => state.notifications),
  }
}
