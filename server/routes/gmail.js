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
      console.log(labels);
      result['labels'] = emails.cleanLabels(labels);
      return gapi.getFilters(gmail);
    })
    .then(filters => {
      result['filters'] = emails.cleanFilters(filters, result.labels);
      res.send(result);
    })
    .catch(error => {
      console.error(`FILE: gmail.js () | ERROR: \n`, error);
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
      console.error(`FILE: gmail.js | ERROR: \n`, error);
      res.sendStatus(500);
    });
});


/**
 * Delete a filter
 */
router.delete('/filter', auth, (req, res) => {
  let { gmail } = req;
  console.log(`FILE: gmail.js () | req.query.filterId: \n`, req.query.filterId);
  gapi.deleteFilter(gmail, req.query.filterId)
    .then(result => {
      console.log(`FILE: gmail.js () | result:`, result);
    	res.sendStatus(200);
      
    })
    .catch(() => {
    	res.sendStatus(500);
    });
});



router.post('/filter', auth, (req, res) => {
//    return gapi.client.gmail.users.settings.filters.create({
//       "resource": {
//         "criteria": {
//           "from": "",
//           "to": "as"
//         },
//         "action": {
//           "addLabelIds": [
//             "1",
//             "2"
//           ],
//           "removeLabelIds": [
//             "1",
//             "2"
//           ]
//         }
//       }
//     })
});


module.exports = router;
