import consola from 'consola';
import { defineNuxtPlugin } from '#app';

export const logger = consola.withTag('app');

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    logger.error(error);
    logger.debug(context);
  };
});
