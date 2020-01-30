const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const Sentry = require('@sentry/node');
const config = require('config');
const app = express();
// --------------------------------------------------------------------------------------------------

Sentry.init({ dsn: 'https://074dc8f2556043499f456505efc59bd4@sentry.io/2019925' });
app.use(Sentry.Handlers.requestHandler());

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.get('cookiePrivateKey')));

// --------------------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'development') {
  function enableCORSMiddleware (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin',  "http://localhost:9000");
    res.setHeader('Access-Control-Allow-Credentials',  true);
    res.setHeader('Access-Control-Allow-Methods',  'GET, PUT, POST, DELETE');
    next()
  }
  app.use(enableCORSMiddleware);
}


require("./startup/routes")(app);

// --------------------------------------------------------------------------------------------------

module.exports = app;
