const router = require('express').Router();
const gapi = require('../services/gmail.js');
const auth = require('../middleware/auth');
const emails = require('../data/emails');
// --------------------------------------------------------------------------------------------------

/**
 * Get labels & filters
 */
router.get('/labels-filters', auth, (req, res) => {
  let {gmail} = req;
  let result = {};
  gapi.getLabels(gmail)
    .then(labels => {
      result['labels'] = emails.cleanLabels(labels);
      return gapi.getFilters(gmail);
    })
    .then(filters => {
      result['filters'] = emails.cleanFilters(filters, result.labels);
      res.send(result);
    })
    .catch(error => {
      res.sendStatus(500);
    })
});

// TODO: Add a loop to fetch ALL mail
/**
 * Get all mail for active user
 */
router.get('/mail', auth, (req, res) => {
  let { gmail } = req;
  gapi.getAllInfo(gmail)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.sendStatus(500);
    });
});


/**
 * Delete a filter
 */
router.delete('/filter', auth, (req, res) => {
  let { gmail } = req;
  gapi.deleteFilter(gmail, req.query.filterId)
    .then(() => {
    	res.sendStatus(200);
    })
    .catch(() => {
    	res.sendStatus(500);
    });
});



router.post('/filter', auth, (req, res) => {
  let { gmail } = req;
  gapi.createFilter(gmail, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      if (error.code === 400){
        res.status(400).send(error.errors);
      } else {
        res.sendStatus(500);
      }
      
    });
});


module.exports = router;
