<template>
  <div>
    <NuxtLayout>
      <h1>{{ error?.statusCode || 'Error' }}</h1>
      <p>Something went wrong! Please refresh and try again.</p>
      <a class="u-underline u-cursor-pointer" @click="handleError">Go to the homepage</a>
    </NuxtLayout>
  </div>
</template>

<script setup>
const error = useError();

function handleError() {
  clearError({
    redirect: '/',
  });
}
</script>
