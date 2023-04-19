import { appEnvironment, appDomain as getAppDomain } from './utils/envVars';

const appDomain = getAppDomain();

if (!appDomain) {
  throw new Error('Environment variable APP_DOMAIN not defined - Please add environment variable to continue');
}

const privateConfig = {};

const publicConfig = {
  // Anything within this object will be available to all app users. Do not put any sensitive keys or passwords in this object!
  appDomain,
  appEnv: appEnvironment(),
  logLevel: process.env.APP_LOG_LEVEL,
};

export const runtimeConfig = {
  ...privateConfig,
  public: publicConfig,
};
