const router = require('express').Router();
const gapi = require('../services/gmail.js');
const auth = require('../middleware/auth');
const emails = require('../data/emails');
// --------------------------------------------------------------------------------------------------

/**
 * Get labels & filters
 */
router.get('/labels-filters', auth, (req, res, next) => {
  let {gmail} = req;
  let result = {};
  gapi.getLabels(gmail).then(labels => {
    result[ 'labels' ] = emails.cleanLabels(labels);
    return gapi.getFilters(gmail);
  }).then(filters => {
    result[ 'filters' ] = emails.cleanFilters(filters, result.labels);
    res.send(result);
  }).catch(error => {
    next(error);
  });
});


// TODO: Add a loop to fetch ALL mail
/**
 * Get all mail for active user
 */
router.get('/mail', auth, (req, res, next) => {
  let {gmail} = req;
  gapi.getAllInfo(gmail).then(result => {
    res.send(result);
  }).catch(error => {
    next(error);
  });
});


/**
 * Delete a filter
 */
router.delete('/filter', auth, (req, res, next) => {
  let {gmail} = req;
  gapi.deleteFilter(gmail, req.query.filterId).then(() => {
    res.sendStatus(200);
  }).catch(error => {
    if ( error.code === 400 ) {
      try {
        let message = error.errors[ 0 ].message;
        res.status(400).send(message);
      } catch (err) {
        next(error);
      }
    } else {
      next(error);
    }
  });
});


/**
 * Create a filter
 */
router.post('/filter', auth, (req, res, next) => {
  let {gmail} = req;
  gapi.createFilter(gmail, req.body).then(() => {
    res.sendStatus(200);
  }).catch(error => {
    try {
      let message = error.errors[ 0 ].message;
      res.status(400).send(message);
    } catch (err) {
      next(error);
    }
  });
});


/**
 * Create a label
 */
router.post('/label', auth, (req, res, next) => {
  let {gmail} = req;
  gapi.createLabel(gmail, req.body).then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    try {
      let message = error.errors[ 0 ].message;
      res.status(400).send(message);
    } catch (err) {
      next(error);
    }
  });
});


module.exports = router;
