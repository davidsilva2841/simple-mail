const express = require('express');
const router = express.Router();
const path = require('path');

// --------------------------------------------------------------------------------------------------

const folder = path.join(__dirname, "../public/");
router.use("/", express.static(folder));



router.get("/*", function(req, res) {
  console.log('GET /*');
  res.sendFile(path.join(folder, "index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});





module.exports = router;
