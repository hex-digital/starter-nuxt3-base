import { EMERGENCY, CRITICAL, ERROR, WARN, NOTICE, INFO, DEBUG, VERBOSE, NONE } from './constants/log-verbosity' // eslint-disable-line sort-imports
import { defaultLogger } from './default-logger'
import { defineNuxtPlugin } from '#app'

// eslint-disable-next-line import/no-mutable-exports
let Logger = defaultLogger

const defaultModes = {
  test: NONE,

  dev: WARN,
  development: WARN,

  prod: ERROR,
  production: ERROR,

  fallback: WARN,
}

/**
 * Provide a Logger to the application.
 * Please see ~/docs/logging.md for usage information.
 */
const loggerPlugin = defineNuxtPlugin((nuxtApp) => {
  const verbosity
    = nuxtApp.$config.logLevel
    || defaultModes[nuxtApp.$config.appEnv]
    || defaultModes[process?.env?.NODE_ENV]
    || defaultModes.fallback

  const customLogger = null // @todo allow user to provide their own custom logger

  registerLogger(customLogger || defaultLogger, verbosity)

  nuxtApp.provide('log', () => Logger)
})

function useLogger() {
  return Logger
}

function registerLogger(loggerImplementation, verbosity) {
  if (typeof loggerImplementation === 'function') {
    Logger = loggerImplementation(verbosity)
    return
  }

  Logger = {
    ...defaultLogger,
    ...loggerImplementation,
  }

  switch (verbosity) {
      /**
       * Progressively blank methods the higher verbosity that's specified.
       * If NONE is the verbosity, the Logger will be an object with all empty methods, so will do nothing.
       */
      /* eslint-disable no-fallthrough */
    case NONE:
      Logger[EMERGENCY] = () => {}
    case EMERGENCY:
      Logger[CRITICAL] = () => {}
    case CRITICAL:
      Logger[ERROR] = () => {}
    case ERROR:
      Logger[WARN] = () => {}
    case WARN:
      Logger[NOTICE] = () => {}
    case NOTICE:
      Logger[INFO] = () => {}
    case INFO:
      Logger[DEBUG] = () => {}
    case DEBUG:
      Logger[VERBOSE] = () => {}
      break
      /* eslint-enable no-fallthrough */
  }
}

export { Logger, registerLogger, useLogger }
export default loggerPlugin
