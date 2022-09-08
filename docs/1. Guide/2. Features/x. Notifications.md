# Guide > Base Components > Notifications

Notifications can be opened and closed with the `useUiNotifications()` composable.

They are controlled by the `ModalsController` component, which sits in the root of your app.

An offline notification is also displayed by default when it is detected that the user is not connected to the internet.

## Creating Notifications

Notifications can be created from anywhere in the application, using `useUiNotifications().send()` composable.

You can generate the content of notifications on-the-fly by creating an object, or you can import notification objects
from elsewhere in the codebase.

Notification objects are of the type NotificationData, imported from '~/general/features/Notifications/types.ts'

### On-the-fly

```vue
<script setup lang="ts">
import { DISMISS, useUiNotification } from '~/general/features/Notifications'
import type { NotificationData } from '~/general/features/Notifications'

const notifications = useUiNotification()

const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  timeToLive: 3.5,
  persistent: false,
  close: true,
  action: {
    text: 'Close!',
    onClick: DISMISS, // This can also take a function to call when the button is clicked, aka `() => console.log('test')`
  },
}

onMounted(() => {
  notifications.send(notificationData)
})
</script>
```

### Using a NotificationData Object

```vue
<script setup lang="ts">
import { DISMISS, useUiNotification } from '~/general/features/Notifications'
import loginNotification from '~/modules/authentication/notifications/loginNotification'

const notifications = useUiNotification()

onMounted(() => {
  notifications.send(loginNotification)
})
</script>
```

#### Customising a NotificationData Object

Sometimes you'll want to override some of the data that's already been set in a NotificationData Object.

The `useUiNotification` composable provides a `sendWith` function to make this easier.

```vue
<script setup lang="ts">
import { DISMISS, useUiNotification } from '~/general/features/Notifications'
import loginNotification from '~/modules/authentication/notifications/loginNotification'

const notifications = useUiNotification()

onMounted(() => {
  notifications.sendWith(loginNotification, { message: 'Overridden message' })
})
</script>
```

### Set Notification Time-To-Lives

The default time-to-live for all notifications is set in `~/general/ui/base/Notifications/config.ts`. Each individual
notification can also have a different time-to-live, set with the `timeToLive` property:

```typescript
const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  timeToLive: 2.5, // 2.5 seconds
};
```

### Persisting Notifications

Notifications that you do not want to expire can be set to be persistent. This is useful if you want a notification
to stay on screen until an action occurs, e.g. the User dismisses it, clicks a button, internet connection is restored, etc.

To persist a notification, set the `persistent` property to true. It defaults to false:

```typescript
const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  persistent: true,
};
```

### Closing a Notification

You can add a close button (an x) to the notification to allow the user to close it.

This is done with the `close` property:

```typescript
const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  close: true,
};
```

### Notification Interaction

There are a number of ways a user can interact with a notification:

- Closing/dismissing it
- Clicking the Action button on it
- Ignoring it until its time-to-live expires

Each of these actions can be associated with a callback, so that you can run code when they happen.

#### Closing/Dismissing a Notification

Closing a notification in this way to known as a "user dismiss". You can optionally add a callback for the notification
to call once it is dismissed by the user. This is done with the `onDismiss` property:

```typescript
const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  close: true,
  onDismiss: () => console.log('Notification dismissed')
};
```

#### Clicking the Action button

Each Notification is able to show one action button on it. This is set via the `action` property.

```typescript
const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  action: {
    text: 'Click me!',
    onClick: () => console.log('Nice!'),
  },
};
```

If the user clicks on this action button, it will run the callback and immediately remove the notification.

As well as providing a custom callback, you can use the DISMISS constant, to immediately close the notification on 
action click. This is useful for adding a "Dismiss" action, if desired. An action using `DISMISS` will also call the 
`onDismiss` callback, if one is provided.

```typescript
import { DISMISS } from '~/general/features/Notifications'

const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  action: {
    text: 'Dismiss',
    onClick: DISMISS,
  },
};
```

### Callback on exiry of Time-To-Live

If a notification expires before the user interacts with it, a callback can also be made.

This callback is always called when the notification is removed, even if it was removed via user dismiss. 

This means, if both an `onDismiss` and an `onRemove` property are given, the following occurs:

- If the user dismisses the notification, both `onDismiss` and `onRemove` are called
- If the notification's time-to-live expires, only `onRemove` is called
- If an `action` is given, and its onClick is set to `DISMISS`, `onDismiss` and `onRemove` are called
- If an `action` is given, and its onClick is a custom handler, only this handler and `onRemove` are called (and not `onDismiss`)

```typescript
const notificationData: NotificationData = {
  type: 'success',
  message: 'Well done, you rock!',
  onRemove: () => console.log('Notification was removed'),
};
```

## Removing Notifications

By default, notifications that are not **persistent** are removed after their time-to-live expires.

You may also manually remove a notification after it's been shown with the `remove` function.

When calling `send` or `sendWith`, you'll receive back a `Symbol`, which acts as the Notification's unique ID. This
is registered with the `NotificationsController`, so that it can be removed before it expires (or if it's persistent).

Use this Symbol to remove the Notification like this:

```vue
<script setup lang="ts">
import { DISMISS, useUiNotification } from '~/general/features/Notifications'
import loginNotification from '~/modules/authentication/notifications/loginNotification'

const notifications = useUiNotification()

onMounted(() => {
  const notificationId = notifications.send(loginNotification)
  notifications.remove(notificationId)
})
</script>
```
