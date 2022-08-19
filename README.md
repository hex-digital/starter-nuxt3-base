# Nuxt 3 Base - Hex Starter

A starter for a base Nuxt3 site, without UI bells and whistles.

Most other starters are derived from this one

- A solid application architecture, ready to section application code by modules.
- Barebones components, with no visuals. Customise as you like.
- Pre-integrated with Pinia, TypeScript.
- Pre-integrated with Tailwind and PostCSS.
- Documentation to detail how it all works, and why.

## Prerequisites

Node 16+ (`node -v`)  
Yarn 1.22+ (`yarn -v`)

## Setup

Create a `.env` file by copying the `.env.dist` file:

```
cp .env.dist .env
```

Install the node modules using `yarn`:

```
yarn install
```

## Start up

The app has two build modes: development and production.

Start the dev server for watching and hot module reloading:

```
yarn dev
```

Or build for production and run the production server:

```
yarn build
yarn start
```

## Contributing

All contributions are welcome. Jamie Warburton is the technical lead for this product. All PRs should be tagged for his review.
