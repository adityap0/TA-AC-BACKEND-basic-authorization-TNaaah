var express = require("express");
var router = express.Router();
var Podcast = require("../models/Podcast");
/* GET home page. */
router.get("/", function (req, res, next) {
  Podcast.find({}, (err, podcasts) => {
    res.render("dashboard", { podcasts });
  });
});

module.exports = router;
