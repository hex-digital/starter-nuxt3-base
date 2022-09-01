export const hooks = {
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  // Jamie (18th Aug): Looks like this may be fixed now, so I think we can remove it
  'vite:extendConfig': function (config: any, { isServer }: any) {
    if (isServer) {
      // Workaround for netlify issue
      // https://github.com/nuxt/framework/issues/6204
      config.build.rollupOptions.output.inlineDynamicImports = true
    }
  },
}
