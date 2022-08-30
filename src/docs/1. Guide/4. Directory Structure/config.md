# Guide > Directory Structure > Config

The [Config directory](../../../config) contains configuration for different parts of our app.

Feel free to add further directories under this config folder to manage more configuration for the application.

## Nuxt Configuration

Out of the box, all Nuxt configuration lives in the `nuxt.theme.ts` file. This file can get cumbersome as it grows to a
large size.

Therefore, we break some of the configuration out into separate files, and these files live under [`~/config/nuxt`](../../../config/nuxt).

## Tailwind Configuration

Similarly to the above, out of the box all our Tailwind configuration lives in `tailwind.theme.ts`. This too can get
cumbersome.

We break this configuration down into separate files, one per Tailwind key, and these live in [`~/config/tailwind`](../../../config/tailwind).