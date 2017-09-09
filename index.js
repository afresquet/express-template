'use strict';

// CREATE EXPRESS APP
const express = require('express'),
          app = express();
// View Engine
app.set('view engine', 'pug');
// Static Server
app.use(express.static(__dirname + '/public'));

// ********************************************************************** //

// THIRD-PARTY MIDDLEWARE
const bodyParser = require('body-parser'); // body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser'); // cookie-parser
app.use(cookieParser('my express app'));

const i18n = require('./middleware/i18n'); // i18n
app.use(i18n.init);

// ********************************************************************** //

//ROUTES (./routes)

const locales = require('./routes/locales'); // locales.js
app.use(locales);

const error = require('./helpers/error');  // errors.js
app.use((req, res, next) => next(error(404, 'Page not Found'))); // err404

// ********************************************************************** //

// ERROR HANDLING
const errHandler = require('./middleware/error-handler');
app.use(errHandler); // error-handler.js

// ********************************************************************** //

// LISTEN
app.listen(3000, () => console.log('Server started on port 3000...'));