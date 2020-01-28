const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const Sentry = require('@sentry/node');

const app = express();

Sentry.init({ dsn: 'https://074dc8f2556043499f456505efc59bd4@sentry.io/2019925' });
app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
// --------------------------------------------------------------------------------------------------

app.use("/", express.static(path.join(__dirname, "/public/")));

// --------------------------------------------------------------------------------------------------
// ***


var GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(new GoogleStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log('\n\n\nAccess token: ' + accessToken);
    console.log('Refresh token: ' + refreshToken);
    console.log('Profile: ' + profile);
    console.log('\n\n');
    let user = {
      profile,
      accessToken
    };
    return cb(null, user);

  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);



// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------



app.get("/*", function(req, res) {
  console.log('GET /*');
  res.sendFile(path.join(__dirname, "/public/index.html"), function(err) {
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
