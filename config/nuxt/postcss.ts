export const postcss = {
  order: 'cssnanoLast',
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
  },
}
