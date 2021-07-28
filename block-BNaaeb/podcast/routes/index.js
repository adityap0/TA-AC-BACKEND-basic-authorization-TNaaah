var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  req.session.destroy();
  res.clearCookie();
  console.log(req.session);
  res.render("index", { title: "Express" });
});

module.exports = router;
