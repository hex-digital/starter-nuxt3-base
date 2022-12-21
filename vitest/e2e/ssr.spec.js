/* @vitest-environment node */
import { fileURLToPath } from 'node:url';
import { $fetch, createTest } from '@nuxt/test-utils';

/* eslint-disable sort-imports */
import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  expect,
  it,
} from 'vitest';
/* eslint-enable sort-imports */

const hooks = createTest({
  server: true,
  dev: true,
  rootDir: fileURLToPath(new URL('../../.', import.meta.url)),
});

beforeAll(hooks.setup, 120 * 1000);
beforeEach(hooks.beforeEach);
afterEach(hooks.afterEach);
afterAll(hooks.afterAll);

describe('nuxt ionic', async () => {
  it('renders web components', async () => {
    const html = await $fetch('/');
    expect(html).toContain(
      '<ion-app><!--[--><ion-router-outlet></ion-router-outlet><!--]--></ion-app>',
    );
  });
  it('renders correct viewport tags', async () => {
    const html = await $fetch('/');
    expect(html).toContain(
      '<meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">',
    );
  });
});
