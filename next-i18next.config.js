/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar']
  },
  fallbackLng: {
    default: ['ar']
  },
  // localeStructure: '{ns}/{lng}',
  localePath: typeof window === 'undefined' ? path.resolve('./src/translations') : '/translations',
  reloadOnPrerender: process.env.NODE_ENV === 'development'
  // debug: process.env.NODE_ENV === 'development',
};

module.exports = i18nConfig;
