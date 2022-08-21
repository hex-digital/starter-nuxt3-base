<script setup>
useHead({
  title: 'Nuxt3 Vanilla - Hex Starter',
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
})
</script>

<template>
  <NuxtLayout cl>
    <NuxtPage />
  </NuxtLayout>
  <ModalsController />
  <NotificationsController />
</template>
