const i18n = require('i18n');

i18n.configure({
  directory: __dirname + '/../locales/json',
  defaultLocale: 'en',
  cookie: 'lang',
  objectNotation: true
});

module.exports = i18n;