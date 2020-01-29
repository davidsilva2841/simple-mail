const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const Sentry = require('@sentry/node');
const config = require('config');
const app = express();

Sentry.init({ dsn: 'https://074dc8f2556043499f456505efc59bd4@sentry.io/2019925' });
app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.get('cookiePrivateKey')));



if (process.env.NODE_ENV === 'development') {
  function enableCORSMiddleware (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin',  "http://localhost:9000");
    res.setHeader('Access-Control-Allow-Credentials',  true);
    next()
  }
  app.use(enableCORSMiddleware);
}

require("./startup/routes")(app);
let folder = path.join(__dirname, "/public/");
app.use("/", express.static(folder));


// --------------------------------------------------------------------------------------------------
// require("./startup/routes")(app);
// const passport = require('./routes/passport.js');
// app.use('/', passport);
//
// const testing = require('./routes/testing.js');
// app.use('/api/test/', testing);

// --------------------------------------------------------------------------------------------------

app.get("/*", function(req, res) {
  console.log('GET /*');
  res.sendFile(path.join(folder, "index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// --------------------------------------------------------------------------------------------------

// ERROR HANDLING - DONT MOVE - The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  console.log(`FILE: app.js onError() | err: \n`, err);
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// --------------------------------------------------------------------------------------------------

module.exports = app;
