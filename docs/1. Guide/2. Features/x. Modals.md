# Guide > Base Components > Modals

Modals can be opened and closed with the `useUiModal()` composable.

They are controlled by the `ModalsController` component, which sits in the root of your app.

Modals also display an Overlay behind them when shown, to help them stand out form other content.

## Creating Modals

Modals can be created from anywhere in the application, using `useUiModal().open()` composable.

You can generate the content of modals on-the-fly, or you can open a particular component inside a Modal.

It's common for features to create components specifically designed to be opened as modals, e.g. a LoginModal.vue.
However, you can also open any component you like as a Modal.

### On-the-fly

The following example will show a GenericModal.vue component, pre-filled with data.

This is a quick way to create modal's on-the-fly that may not need full components (though a component is usually
recommended).

```vue
<script setup lang="ts">
import { CLOSE, useUiModal } from '~/general/features/Modals'
import type { ModalData } from '~/general/features/Modals'

const modals = useUiModal()

const modalData: ModalData = {
  title: 'Title to show on mobile',
  heading: 'Some heading',
  content: '<p>Some content</p>',
  buttons: [
    {
      text: 'Close!',
      onClick: CLOSE, // This can also take a function to call when the button is clicked, aka `() => console.log('test')`
      theme: 'secondary',
    },
  ],
}

onMounted(() => {
  modals.open(modalData)
})
</script>
```

### Using a Component

The more common use-case is to create a specific component to be displayed as the Modal.

```vue
<script setup lang="ts">
import { useUiModal } from '~/general/features/Modals'
import LoginModal from '~/modules/authentication/components/modals/LoginModal.vue'

const modals = useUiModal()

onMounted(() => {
  modals.open({ component: LoginModal })
})
</script>
```

It's also possible to lazy load the modal, so that the client doesn't need to download it until it's used:

Please note this will usually incur a slight delay before the modal appears.

```vue
<script setup lang="ts">
import { useUiModal } from '~/general/features/Modals'

const modals = useUiModal()

onMounted(() => {
  modals.open({ component: () => import('~/modules/authentication/components/modals/LoginModal.vue') })
})
</script>
```

#### Binding props to a custom modal component using the `componentBinds` key

It's common that a component you wish to use as a modal requires props to be passed in.

We can achieve this using the `componentBinds` key when creating a modal.

For example, if our custom component takes a username as a prop, we could pass it like so:

```vue
<script setup lang="ts">
import { useUiModal } from '~/general/features/Modals'
import ProfileModal from '~/modules/profile/components/modals/ProfileModal.vue'

const modals = useUiModal()

onMounted(() => {
  modals.open({ component: ProfileModal, componentBinds: { username: 'Sparky' } })
})
</script>
```

Anything in the `componentBinds` key will be bound to the component using `v-bind`, so any attribute or prop can be
passed in to the component in this way.

## Waiting for User Input

Sometimes you will want to pause a subroutine and open a modal, then resume that subroutine when the modal is closed.

A simple example may be a modal that opens, warning the user of a potentially destructive action, and asking if they
wish to continue. We can create that by awaiting a promise, and resolving it on an action, like below:

(Note, this examples assumes the ConfirmDeletionModal has a `confirm` and a `cancel` prop—both taking a function—and
calls them when the relevant button is clicked).

```js
import ConfirmDeletionModal from '~/general/features/Modals/components/ConfirmDeletionModal.vue'

async function deleteItem() {
  const CONFIRM = 'confirm'
  const CANCEL = 'cancel'

  const confirmAction = await new Promise((resolve) => {
    useUiModal().open({
      component: ConfirmDeletionModal,
      componentBinds: { confirm: () => resolve(CONFIRM), cancel: () => resolve(CANCEL) },
      onDismiss: () => resolve(CANCEL),
    })
  })
  if (confirmAction === CANCEL) {
    // Continue with delete function
  }
}
```

You could also throw an exception if the user cancels, by calling `reject` instead of `resolve`:

```js
import ConfirmDeletionModal from '~/general/features/Modals/components/ConfirmDeletionModal.vue'

async function deleteItem() {
  try {
    // If canceled, an exception will be thrown. Catch it with a try/catch here, or try/catch somewhere up the stack.
    const confirmAction = await new Promise((resolve, reject) => {
      useUiModal().open({
        component: ConfirmDeletionModal,
        componentBinds: { confirm: resolve, cancel: reject },
        onDismiss: reject,
      })
    })
  }
  catch (error) {
    // The user cancelled or dismissed
  }
}
```

Lastly, it's possible to throw custom errors as well by changing the component binds. This can be useful when you want
to provide higher-level errors, or to be able to catch the user cancelling exception, separate from a logic error:

```js
import ConfirmDeletionModal from '~/general/features/Modals/components/ConfirmDeletionModal.vue'
import UserInputCancel from '~/general/exceptions/UserInputCancel'

async function deleteItem() {
  // If canceled, an exception will be thrown. Catch it with a try/catch here, or try/catch somewhere up the stack.
  const confirmAction = await new Promise((resolve, reject) => {
    useUiModal().open({
      component: ConfirmDeletionModal,
      componentBinds: { inputConfirm: resolve, inputCancel: () => reject(new UserInputCancel()) },
      onDismiss: () => reject(new UserInputCancel()),
    })
  })
}

function doSomething() {
  try {
    deleteItem()
  }
  catch (error) {
    if (error instanceof UserInputCancel) {
      // User cancelled the action
      return
    }

    // Some other unexpected error occurred
    throw error
  }
}
```
