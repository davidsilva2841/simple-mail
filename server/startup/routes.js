const gmail = require("../routes/gmail");
const passport = require("../routes/passport");
const publicRoute = require('../routes/public');
const error = require('../middleware/error');


module.exports = function(app) {
  if (process.env.NODE_ENV === 'development') {
    const testing = require("../routes/testing");
    app.use("/api/testing/", testing);
  }
  
  app.use("/api/gmail", gmail);
  app.use("/", passport);
  app.use("/", publicRoute);
  app.use(error);
  
};
