import type { DISMISS } from '~/general/features/Notifications/composables/useUiNotification'

export interface UiNotificationAction {
  text: string
  onClick: typeof DISMISS | ((...args: any) => void)
}

export interface NotificationData {
  type?: 'info' | 'success' | 'warning' | 'danger'
  icon?: string
  message?: string
  action?: UiNotificationAction

  timeToLive?: number
  persistent?: boolean
  close?: boolean

  onDismiss?: () => void
  onRemove?: () => void
}

export type UiNotification = NotificationData & {
  id: Symbol
  userDismiss: () => void
  alive: boolean
}

export interface Notifications {
  notifications: Array<UiNotification>
}
