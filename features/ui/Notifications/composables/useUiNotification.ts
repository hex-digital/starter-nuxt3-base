import { Logger } from '~/plugins/logger';
import { maxVisibleNotifications, timeToLive } from '../config'

/**
 * See the feature docs for documentation on using notifications, and this useUiNotification composable.
 */

export const DISMISS = 'userDismiss';
export const REMOVE = 'remove';

export type UiNotificationAction = {
  text: string;
  onClick: typeof DISMISS | ((...args: any) => void);
};

export type NotificationData = {
  type?: 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  message?: string;
  action?: UiNotificationAction;

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

const state = reactive<Notifications>({
  notifications: [],
});

export default function useUiNotification() {
  function send(notificationData?: NotificationData) {
    const id = Symbol('notification');
    const alive = true;

    const notification = Object.assign({}, notificationData, {
      id,
      userDismiss,
      alive,
    });

    function userDismiss() {
      if (notification.onDismiss && notification.alive) {
        notification.onDismiss();
      }
      remove(id);
    }

    state.notifications.push(notification);
    if (state.notifications.length > maxVisibleNotifications) state.notifications.shift();

    if (!notification.persistent) {
      setTimeout(userDismiss, timeToLive);
    }

    Logger.debug('useUiNotification/send', notification);

    return id;
  }

  function remove(id: Symbol) {
    const index = state.notifications.findIndex((notification) => notification.id === id);

    if (index !== -1) {
      const notification = state.notifications[index];

      if (notification.onRemove && notification.alive) {
        notification.onRemove();
      }

      notification.alive = false;

      state.notifications.splice(index, 1);
    }
  }

  return {
    send,
    remove,
    notifications: computed(() => state.notifications),
  };
}