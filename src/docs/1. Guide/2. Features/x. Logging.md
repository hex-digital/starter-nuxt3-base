# Guide > Features > Logging

Logging is provided by the plugin at `~/plugins/logger`.  
It comes with a default logger that only logs to the console.  
The default logger works during SSR and on the client's browser.

For Production, we may want to add a custom logger, or multiple, so that we can log
to different or multiple places based on severity. E.G. send EMERGENCY and CRITICAL to Slack, send INFO and higher to PaperTrail, etc.

## Using the logger

There are 3 ways to use the logger:

1. Import `Logger` from `~/plugins/logger`
2. Import the `useLogger()` method from `~/plugins/logger` and pull the `Logger` object out of it.
3. Use the `$log` object from the [NuxtApp object](https://v3.nuxtjs.org/guide/going-further/nuxt-app).

### 1. Import `Logger`

```vue
<script setup>
import { Logger } from '~/plugins/logger';

Logger.debug('test');
</script>
```

### 2. Import `useLogger()`

```vue
<script setup>
import { useLogger } from '~/plugins/logger';

const Logger = useLogger();
Logger.debug('test');
</script>
```

### 3. Use `$log`

```vue
<script setup>
const { $log } = useNuxtApp()

$log.debug('test');
</script>
```

## Logging Levels / Verbosity

There are 8 log levels available:

- `Logger.emergency()` System is unusable, action must be taken immediately
- `Logger.critical()` Critical error, such as a component unavailable or unexpected exception
- `Logger.error()` Runtime errors that do not require immediate action but should be logged and monitored
- `Logger.warn()` Exceptional occurrences that are not errors
- `Logger.notice()` Normal but significant events
- `Logger.info()` Interesting events
- `Logger.debug()` Detailed debug information
- `Logger.verbose()` Extremely detailed debug information

Some logging implementations may handle some log levels in the same way. For example, the default
implementation calls `console.error()` for Emergency, Critical and Error levels. A Slack implementation
might log Emergency and Critical to a different channel than Error, for example.

### Setting the verbosity

Verbosity is set by the following methods, in descending order of priority:

- `LOG_LEVEL` defined in `.env`
- Based on the `APP_ENVIRONMENT` defined in `.env`
- Based on the `NODE_ENV` defined on `process.env`
- Otherwise, the fallback defined in the logger as the default mode

The defaultModes object in the logger is defined as follows:

```js
const defaultModes = {
  test: NONE,

  dev: WARN,
  development: WARN,

  prod: ERROR,
  production: ERROR,

  fallback: WARN,
};
```

## Providing a Custom Logger

To provide a custom logger, create a logger object with keys for all 8 levels:

```js
import { EMERGENCY, CRITICAL, ERROR, WARN, NOTICE, INFO, DEBUG, VERBOSE } from '../constants/log-verbosity';

export const customLogger = {
  [EMERGENCY]: (message) => console.error(`${EMERGENCY} ${message}`),
  [CRITICAL]: (message) => console.error(`${CRITICAL} ${message}`),
  [ERROR]: (message) => console.error(`${ERROR} ${message}`),
  [WARN]: (message) => console.warn(`${WARN} ${message}`),
  [NOTICE]: (message) => console.info(`${NOTICE} ${message}`),
  [INFO]: (message) => console.info(`${INFO} ${message}`),
  [DEBUG]: (message) => console.debug(`${DEBUG} ${message}`),
  [VERBOSE]: (message) => console.debug(`${VERBOSE} ${message}`),
};
```

Then import this customLogger into `~/plugins/logger/index.js` and set the `customLogger`
object in the plugin.

You could create and use different loggers for different environments, as well as
create a single logger that combines multiple loggers.

## Possible Extensions

- Provide multiple loggers out of the box
- Enable different combinations of loggers and log rotations via a config
- Export this whole module as a Nuxt module for inclusion across other projects
