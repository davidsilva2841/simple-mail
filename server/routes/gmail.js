const router = require('express').Router();
const users = require('../db/users');
const gapi = require('../services/gmail.js');
const emails = require('../data/emails');

// --------------------------------------------------------------------------------------------------


/**
 * Get labels for active user
 */
router.get('/gmail/labels', (req, res) => {
  users.getUser(req.signedCookies.cookie.user)
    .then(rows => {
      let { access_token: accessToken, refresh_token: refreshToken } = rows[ 0 ];
      let token = gapi.getToken(accessToken, refreshToken);
      let gmail = gapi.getGmail(token);
      return gapi.getLabels(gmail);
    })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.error(`FILE: gmail.js GET /gmail/labels | ERROR: \n`, error);
      res.sendStatus(500);
    });
  
});


/**
 * Get filters for active user
 */
router.get('/gmail/filters', (req, res) => {
  users.getUser(req.signedCookies.cookie.user)
    .then(rows => {
      let { access_token: accessToken, refresh_token: refreshToken } = rows[ 0 ];
      let token = gapi.getToken(accessToken, refreshToken);
      let gmail = gapi.getGmail(token);
      return gapi.getFilters(gmail);
    })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.error(`FILE: gmail.js GET /gmail/filters| ERROR: \n`, error);
      res.sendStatus(500);
    });
});


// TODO: Add a loop to fetch ALL mail
/**
 * Get all mail for active user
 */
router.get('/gmail/mail', (req, res) => {
  users.getUser(req.signedCookies.cookie.user)
    .then(rows => {
      let { access_token: accessToken, refresh_token: refreshToken } = rows[ 0 ];
      let token = gapi.getToken(accessToken, refreshToken);
      let gmail = gapi.getGmail(token);
      return gapi.getAllInfo(gmail);
    })
    .then(result => {
      res.send(result);
      let mail = emails.clean(result);
      res.send(mail);
    })
    .catch(error => {
      console.error(`FILE: gmail.js GET /gmail/mail | ERROR: \n`, error);
      res.sendStatus(500);
    });
});






module.exports = router;
