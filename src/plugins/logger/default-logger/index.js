import { EMERGENCY, CRITICAL, ERROR, WARN, NOTICE, INFO, DEBUG, VERBOSE } from '../constants/log-verbosity' // eslint-disable-line sort-imports
import LOG_LEVEL_STYLE from './log-style'

export const defaultLogger = {
  /* eslint-disable no-console */
  [EMERGENCY]: makeLoggingMethod(EMERGENCY, console.error)(), // System is unusable, action must be taken immediately
  [CRITICAL]: makeLoggingMethod(CRITICAL, console.error)(), // Critical error, such as a component unavailable or unexpected exception
  [ERROR]: makeLoggingMethod(ERROR, console.error)(), // Runtime errors that do not require immediate action but should be logged and monitored
  [WARN]: makeLoggingMethod(WARN, console.warn)(), // Exceptional occurrences that are not errors or are intentional
  [NOTICE]: makeLoggingMethod(NOTICE, console.info)(), // Normal but significant events
  [INFO]: makeLoggingMethod(INFO, console.info)(), // Interesting events
  [DEBUG]: makeLoggingMethod(DEBUG, console.log)(), // Detailed debug information
  [VERBOSE]: makeLoggingMethod(VERBOSE, console.log)(), // Extremely detailed debug information
  /* eslint-enable no-console */
}

function makeLoggingMethod(verbosity, loggingFunction) {
  return function log() {
    return Function.prototype.bind.apply(loggingFunction, [console, ...makeMessageStyle(verbosity)])
  }
}

function makeMessageStyle(verbosity) {
  return mountLog(`${verbosity}`, LOG_LEVEL_STYLE[verbosity])
}

function mountLog(name, style) {
  const detectNode
    = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
    || process.env.NODE_ENV === 'production'

  if (detectNode)
    return [`${name}: `]

  return [`%c LOG %c ${name} %c`, LOG_LEVEL_STYLE.prefix, style, LOG_LEVEL_STYLE.reset]
}
