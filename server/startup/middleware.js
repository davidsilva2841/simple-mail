const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const Sentry = require('@sentry/node');
const config = require('config');

module.exports = function(app) {
  if ( process.env.NODE_ENV === 'development' ) {
    const {enableCORSMiddleware} = require('./development.js');
    app.use(enableCORSMiddleware);
  } else {
    Sentry.init({dsn: 'https://074dc8f2556043499f456505efc59bd4@sentry.io/2019925'});
    app.use(Sentry.Handlers.requestHandler());
    app.use(cors());
  }
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser(config.get('cookiePrivateKey')));
};


