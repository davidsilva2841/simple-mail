const gmail = require("../routes/gmail");
// const testing = require("../routes/testing");
const passport = require("../routes/passport");
const publicRoute = require('../routes/public');
const error = require('../middleware/error');


module.exports = function(app) {
  app.use("/api/gmail", gmail);
  // app.use("/api/testing/", testing);
  app.use("/", passport);
  app.use("/", publicRoute);
  app.use(error);
};
