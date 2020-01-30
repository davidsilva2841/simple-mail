const router = require('express').Router();
const users = require('../db/users');
const config = require('config');
const gapi = require('../services/gmail.js');
const emails = require('../data/emails');
const dummyEmails = require('../data/ignore/dummyEmails');
const dummyFilters = require('../data/ignore/dummyFilters');
const dummyLabels = require('../data/ignore/dummyLabels');

// --------------------------------------------------------------------------------------------------

/**
 * Test if cookie exists
 */
router.get('/cookie', (req, res) => {
  console.log('unsigned');
  console.log(req.cookies);
  console.log('signed');
  console.log(req.signedCookies);
  console.log(req.signedCookies.cookie.user);
  res.sendStatus(200);
});


/**
 * Add user
 */
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

// --------------------------------------------------------------------------------------------------
// Dummy account

/**
 * Get labels with dummy account
 */
router.get('/gmail/labels', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  gapi.getLabels(gmail)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.error(`FILE: testing.js () | ERROR: \n`, error);
      res.sendStatus(500);
    })
});


/**
 * Get filters with dummy account
 */
router.get('/gmail/filters', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  gapi.getFilters(gmail)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
    	console.error(`FILE: testing.js () | ERROR: \n`, error);
    	res.sendStatus(500);
    })
});


/**
 * Get labels & filters with dummy account
 */
router.get('/gmail/labels-filters', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  let result = {};
  gapi.getLabels(gmail)
    .then(labels => {
      result['labels'] = labels;
      return gapi.getLabels(gmail);
    })
    .then(filters => {
      result['filters'] = filters;
    	res.send(result);
    })
    .catch(error => {
    	console.error(`FILE: testing.js () | ERROR: \n`, error);
    	res.sendStatus(500);
    })
});


/**
 * Get emails with dummy account
 */
router.get('/gmail/emails', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  gapi.getAllInfo(gmail)
    .then(result => {
      console.log(`FILE: testing.js | result: \n`, result);
      let mail = emails.clean(result);
      res.send(mail);
    })
    .catch(error => {
      console.error(`FILE: testing.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
});


/**
 * Create filter with dummy account
 */
router.get('/gmail/filters/add', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  let filter = {
    criteria: {
      from: '(testCreateFilter0FROM@gmail.com),(testCreateFilter1FROM@gmail.com)',
      to: 'testCreateFilter123@gmail.com'
    },
    action: {
      removeLabelIds: [
        'INBOX'
      ]
    }
  };
  gapi.createFilter(gmail, filter)
    .then(result => {
      console.log(`FILE: testing.js () | result: \n`, result);
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`FILE: testing.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
});


router.get('/gmail/labels/add', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  let label = {
    name: 'testCreateLabel'
  };
  gapi.createLabel(gmail, label)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`FILE: testing.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
});


/**
 * Delete a filter
 */
router.delete('/gmail/filter', (req, res) => {
  let token = gapi.getToken(config.get('testUser.accessToken'), config.get('testUser.refreshToken'));
  let gmail = gapi.getGmail(token);
  gapi.deleteFilter(gmail, req.query.filterId)
    .then(() => {
    	res.sendStatus(200);
    })
    .catch(error => {
      console.log(`FILE: testing.js DELETE /gmail/filter error:`, error);
      res.sendStatus(500);
    });
});


router.post('/gmail/filter', (req, res) => {
  console.log('h2');
  res.sendStatus(200);
  
});




// --------------------------------------------------------------------------------------------------
// Dummy data

/**
 * Get dummy mail data
 */
router.get('/gmail/emails0', (req, res) => {
  let mail = emails.clean(dummyEmails);
  res.send(mail);
});


/**
 * Get dummy filters
 */
router.get('/gmail/filters0', (req, res) => {
	res.send(dummyFilters);
});


/**
 * Get dummy labels
 */
router.get('/gmail/labels0', (req, res) => {
  let labels = emails.sortLabels(dummyLabels);
	res.send(labels);
});


/**
 * Get labels & filters
 */
router.get('/gmail/labels-filters0', (req, res) => {
 
	let result = {
	  labels: emails.cleanLabels(dummyLabels),
    filters: emails.cleanFilters(dummyFilters, emails.cleanLabels(dummyLabels))
  };
  res.send(result);
});



// --------------------------------------------------------------------------------------------------

module.exports = router;



