import { logger } from '~/plugins/logger';

/**
 * A decorator method for adding logging to function calls
 * @param methodName A name to identify where the log is coming from
 * @param fn The function to decorate
 */
export function withLog(methodName: any, fn: Function) {
  return (...args: any[]) => {
    logger.debug(`${methodName}`, '(', ...args, ')');
    let returnValue: any;
    try {
      returnValue = fn(...args);
    } catch (error) {
      logger.error(methodName);
      throw error;
    }
    logger.debug(`${methodName} end`);
    return returnValue;
  };
}
