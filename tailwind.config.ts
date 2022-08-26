/**
 * Make sure all imports are relative, starting with `./` and not `~/`.
 * This file isn't processed by webpack. Using `~/` results in some odd runtime problems, without any obvious errors.
 */

import { Config } from 'tailwindcss'
// @ts-ignore
import { pxToRem } from '@captaincss/captaincss/helpers'
import { screens } from './config/tailwind/screens'
import { spacing } from './config/tailwind/spacing'
import { safelist } from './config/tailwind/safelist'
import { fontSize } from './config/tailwind/typography'

export default <Config>{
  safelist,
  plugins: [require('@captaincss/captaincss')],
  prefix: 'u-',
  theme: {
    fontSize,
    screens,
    spacing,
  },
  content: [
    `app-modules/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  captain: {
    prefix: {
      objects: 'o-',
      components: 'c-',
    },
    separator: {
      elements: '__',
      modifiers: '--',
    },
    support: {
      flexGap: true, // https://caniuse.com/flexbox-gap
    },
  },
}
