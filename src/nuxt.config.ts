import components from './config/nuxt/components';
import { build } from './config/nuxt/build';
import { postcss } from './config/nuxt/postcss';
import { plugins } from './config/nuxt/plugins';
import { hooks } from './config/nuxt/hooks';
import { runtimeConfig } from './config/nuxt/runtimeConfig';

// See: https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig,

  components,

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],

  build,
  postcss,

  plugins,

  hooks,

  typescript: {
    strict: true,
  },
});
