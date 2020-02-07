const router = require('express').Router();
const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'https://074dc8f2556043499f456505efc59bd4@sentry.io/2019925' });


// ERROR HANDLING - DONT MOVE - The error handler must be before any other error middleware and after all controllers
router.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
router.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});



module.exports = router;
