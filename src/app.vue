<script setup lang="ts">
useHead({
  title: 'Nuxt3 Vanilla - Hex Starter',
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalsController />
  <NotificationsController />
</template>
