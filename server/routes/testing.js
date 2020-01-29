const router = require('express').Router();
const users = require('../db/users');
const config = require('config');
const gapi = require('../services/gmail.js');
const emails = require('../data/emails');
const dummyEmails = require('../data/dummyEmails');

router.get('/cookie', (req, res) => {
  console.log('unsigned');
  console.log(req.cookies);
  console.log('signed');
  console.log(req.signedCookies);
  console.log(req.signedCookies.cookie.user);
  res.sendStatus(200);
});

router.get('/users/add', (req, res) => {
  users.addUser({
    username: 'user0',
    refresh_token: 'test0',
    access_token: 'test0'
  })
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`FILE: testing.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
});

router.get('/gmail/labels0', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  gapi.getLabels(gmail)
    .then(result => {
      res.send(result);
    })
});

router.get('/gmail/filters0', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  gapi.getFilters(gmail)
    .then(result => {
      res.send(result);
    })
});

router.get('/gmail/labels1', (req, res) => {
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
      console.error(`FILE: testing.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
  
});

router.get('/gmail/mail0', (req, res) => {
  users.getUser(req.signedCookies.cookie.user)
    .then(rows => {
      let { access_token: accessToken, refresh_token: refreshToken } = rows[ 0 ];
      let token = gapi.getToken(accessToken, refreshToken);
      let gmail = gapi.getGmail(token);
      return gapi.getAllInfo(gmail);
    })
    .then(result => {
    	res.send(result);
    })
    .catch(error => {
      console.error(`FILE: testing.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
});


router.get('/gmail/mail1', (req, res) => {
  let mail = emails.clean(dummyEmails);
  
  res.send(mail);
	// res.send(emails)
});




module.exports = router;
