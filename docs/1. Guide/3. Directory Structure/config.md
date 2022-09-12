# Guide > Directory Structure > Config

The [Config directory](../../../src/config) contains configuration for different parts of our app.

Feel free to add further directories under this config folder to manage more configuration for the application.

## Nuxt Configuration

Out of the box, all Nuxt configuration lives in the `nuxt.theme.ts` file. This file can get cumbersome as it grows to a
large size.

Therefore, we break some of the configuration out into separate files, and these files live under [`~/config/nuxt`](../../../src/config/nuxt).

## Tailwind Configuration

Similarly to the above, out of the box all our Tailwind configuration lives in `tailwind.theme.ts`. This too can get
cumbersome.

We break this configuration down into separate files, one per Tailwind key, and these live in [`~/config/tailwind`](../../../src/config/tailwind).

## App Configuration

Configuration related to the application itself can also be found here. This is broken down into separate files relevant
to the section or feature of the application it is configuring. This lives in [~/config/app](../../../src/config/app)
