export default {
  dirs: [
    {
      path: '~/general/components/base/',
      pattern: '**/*.vue',
      pathPrefix: false,
    },
    {
      path: '~/general/components/dev/',
      pattern: '**/*.vue',
      prefix: 'Dev',
      pathPrefix: false,
    },
    {
      path: '~/general/components/partial/',
      pattern: '**/*.vue',
      prefix: 'Partial',
      pathPrefix: false,
    },
    {
      path: '~/general/components/prefab/',
      pattern: '**/*.vue',
      prefix: 'Prefab',
      pathPrefix: false,
    },
    {
      path: '~/general/features',
      pattern: '**/*.vue',
      pathPrefix: false,
    },
  ],
};
