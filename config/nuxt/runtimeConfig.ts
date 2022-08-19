import { appEnvironment, appDomain as getAppDomain } from './utils/envVars'

const appDomain = getAppDomain()

if (!appDomain)
  throw new Error('Environment variable APP_DOMAIN not defined - Please add environment variable to continue')

export const publicRuntimeConfig = {
  appDomain,
  appEnv: appEnvironment(),
  logLevel: process.env.APP_LOG_LEVEL,
}

export const privateRuntimeConfig = {}
