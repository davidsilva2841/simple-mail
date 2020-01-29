const gmail = require("../routes/gmail");
const testing = require("../routes/testing");
const passport = require("../routes/passport");

module.exports = function(app) {
  app.use("/api/gmail", gmail);
  app.use("/api/testing/", testing);
  app.use("/", passport);
};
