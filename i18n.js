/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next-translate').I18nConfig} */
module.exports = {
  locales: ['ar'],
  defaultLocale: 'ar',
  pages: {
    '*': ['common', 'login', 'tasks', 'employees', 'board', 'history']
  },
  loadLocaleFrom: (lang, ns) =>
    new Promise(resolve => resolve(require(`./src/translations/${lang}/${ns}.json`)))
};
