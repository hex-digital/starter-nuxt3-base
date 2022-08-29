# Guide > Features > UI State

This composable acts as a global store for managing UI state.

It has properties for evaluating current state, and methods for altering it.

For example, imagine a mobile nav menu, which appears when the user clicks a hamburger button. It may
have a property of `isMobileMenuOpen` and a method for `toggleMobileMenu()`. 

The mobile menu component may use `isMobileMenuOpen` to decide whether to show itself or not.  
The header/hamburger button may use `toggleMobileMenu` to change the state.

## Extending the composable

All UI state can be managed in the composable. Properties and methods can be added to manage any of it.

It's a fairly simple component, so if something is a bit complex, you may prefer to use a separate composable, or a Pinia store module.

Other examples that fit this composable may include:

- `isCartSidebarOpen` - Is the cart sidebar open?
- `isCategoryGridView` - Is the product category page a grid or a list view?

## Showing Common UI Elements

Some UI Elements are so common, it makes sense to control them from here.

For example, you may have several components that would trigger a Login Modal.

Rather than have them each import the Login Modal, the `useUiModal` composable, and make the call to open
the Modal, a method can be added to the `useUiState` composable to do this more succinctly:

```typescript
import { useUiModal } from '~/general/ui/base/Modals/composables/useUiModal';
import LoginModal from '~/modules/authentication/components/modals/LoginModal.vue';

export default function useUiState() {
  const modals = useUiModal();
  
  function showLoginModal() {
      return modals.open({ component: LoginModal })
  }
}
```

And then use it anywhere like so:

```vue
<script setup lang="ts">
import useUiState from '~/general/composables/useUiState'

onMounted(() => useUiState().showLoginModal())
</script>
```
