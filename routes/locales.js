'use strict';

const router = require('express').Router(),
      i18n = require('../middleware/i18n');

router.get('/en', (req, res) => {
  res.clearCookie('lang');
  
  res.redirect('/');
});

const langs = i18n.getLocales();

langs.forEach((lang) => {
  if (lang != 'en') {
    router.get(`/${lang}`, (req, res) => {
      res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });

      res.redirect('/');
    });
  }
});

module.exports = router;