const router = require('express').Router();
const passport = require('passport');
const config = require('config');
const users = require('../db/users.js');

router.use(passport.initialize());
router.use(passport.session());
// --------------------------------------------------------------------------------------------------
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: config.get('gmailClient.id'),
    clientSecret: config.get('gmailClient.secret'),
    callbackURL: config.get('gmailClient.redirectUri')
  },
  function (accessToken, refreshToken, profile, cb) {
    let user = {
      profile_id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      access_token: accessToken,
      refresh_token: refreshToken
    };
    
    const { error } = users.isValidUser(user);
    if (error) return cb('Invalid user', null);
    
    return users.addUser(user)
      .then(() => {
        return cb(null, {profile_id: profile.id});
      })
      .catch(error => {
        console.error(`FILE: passport.js () | ERROR: \n`, error);
        return cb(error, null);
      })
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


router.get('/auth/google', passport.authenticate('google',
    {
      accessType: 'offline',
      prompt: 'consent',
      scope: [
        'profile',
        'https://www.googleapis.com/auth/gmail.settings.basic',
        'https://www.googleapis.com/auth/gmail.labels'
      ]
    }
  )
);



router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    return res.status(200).cookie('cookie', req.session.passport, {signed: true}).redirect('/mail');
  }
);


module.exports = router;


