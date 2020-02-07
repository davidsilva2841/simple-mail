const router = require('express').Router();
const Sentry = require('@sentry/node');

// ERROR HANDLING - DONT MOVE - The error handler must be before any other error middleware and after all controllers
router.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
router.use(function onError(err, req, res, next) {
  console.log('error handling her');
  res.statusCode = 500;
  res.end(`Sentry Error Code: ${res.sentry}`);
});



module.exports = router;
