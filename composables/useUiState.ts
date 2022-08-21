/**
 * Learn how to manage UI State within the application in the documentation:
 * ~/docs/1. Guide/2. Features/x. UI State.md
 */

const state = reactive({
  isNavigationSidebarOpen: false,
});

function toggle(currentState: boolean, shouldOpen?: boolean) {
  return typeof shouldOpen !== 'undefined' ? shouldOpen : !currentState;
}

export default function useUiState() {

  const isNavigationSidebarOpen = computed(() => state.isNavigationSidebarOpen);
  function toggleNavigationSidebar(shouldOpen?: boolean) {
    state.isNavigationSidebarOpen = toggle(state.isNavigationSidebarOpen, shouldOpen);
  }

  return {
    isNavigationSidebarOpen,
    toggleNavigationSidebar,
  };
}