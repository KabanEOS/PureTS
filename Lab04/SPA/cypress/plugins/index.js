/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

const dotenvPlugin = require('cypress-dotenv');

const AzureAdSingleSignOn = require('./azure-ad-sso/index').AzureAdSingleSignOn;

const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
  on('task', { AzureAdSingleSignOn });

  // `config` is the resolved Cypress config
  config = dotenvPlugin(config, { path: '.env.local' });
  return config;
};
