/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next-translate').I18nConfig} */
module.exports = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  pages: {
    '*': ['common']
  },
  loadLocaleFrom: (lang, ns) =>
    new Promise(resolve => resolve(require(`./src/translations/${lang}/${ns}.json`)))
};
