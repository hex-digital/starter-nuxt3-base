import { defineNuxtConfig } from 'nuxt'
import components from './config/nuxt/components'
import { build } from './config/nuxt/build'
import { postcss } from './config/nuxt/postcss'
import { plugins } from './config/nuxt/plugins'
import { hooks } from './config/nuxt/hooks'
import { privateRuntimeConfig, publicRuntimeConfig } from './config/nuxt/runtimeConfig'

// See: https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  experimental: {
    reactivityTransform: true, // See: https://vuejs.org/guide/extras/reactivity-transform.html
    viteNode: false, // See: https://v3.nuxtjs.org/api/configuration/nuxt.config#vitenode
  },

  publicRuntimeConfig,
  privateRuntimeConfig,

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
})
