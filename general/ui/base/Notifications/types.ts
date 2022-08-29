import { DISMISS } from '~/general/ui/base/Notifications/composables/useUiNotification'

export type UiNotificationAction = {
  text: string;
  onClick: typeof DISMISS | ((...args: any) => void);
};

export type NotificationData = {
  type?: 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  message?: string;
  action?: UiNotificationAction;

  timeToLive?: number;
  persistent?: boolean;
  close?: boolean;

  onDismiss?: () => void;
  onRemove?: () => void;
};

export type UiNotification = NotificationData & {
  id: Symbol;
  userDismiss: () => void;
  alive: boolean;
};

export type Notifications = {
  notifications: Array<UiNotification>;
};
