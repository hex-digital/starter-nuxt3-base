import LOG_VERBOSITY from '../constants/log-verbosity';

export default {
  [LOG_VERBOSITY.EMERGENCY]: 'background:#d12727; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
  [LOG_VERBOSITY.CRITICAL]: 'background:#d12727; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
  [LOG_VERBOSITY.ERROR]: 'background:#d12727; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff',
  [LOG_VERBOSITY.WARN]: 'background:#ecc713; padding: 2px; border-radius: 0 3px 3px 0;  color: #000;',
  [LOG_VERBOSITY.NOTICE]: 'background:#0468DB; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff;',
  [LOG_VERBOSITY.INFO]: 'background:#0468DB; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff;',
  [LOG_VERBOSITY.DEBUG]: 'background:#5ece7b; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff;',
  [LOG_VERBOSITY.VERBOSE]: 'background:#5ece7b; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff;',

  prefix: 'font-weight: bold; color: #3f3b32; background:#f8f5e9; padding: 2px; border-radius: 3px 0 0 3px;',
  reset: 'background: transparent;',
};
