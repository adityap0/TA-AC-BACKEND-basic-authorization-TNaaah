var express = require("express");
var router = express.Router();
var Podcast = require("../models/Podcast");

/* GET home page. */
router.get("/", function (req, res, next) {
  Podcast.find({}, (err, podcasts) => {
    if (err) return next(err);
    res.render("admin", { podcasts });
  });
});
router.get("/podcast/new", function (req, res, next) {
  res.render("podcast");
});
router.post("/podcast/new", function (req, res, next) {
  Podcast.create(req.body, (err, podcast) => {
    if (err) return next(err);
    res.redirect("/admin");
  });
});
router.get("/podcast/:id/edit", function (req, res, next) {
  let id = req.params.id;
  Podcast.findById(id, (err, item) => {
    if (err) return next(err);
    res.render("podcastEdit", { item });
  });
});
router.post("/podcast/:id/edit", function (req, res, next) {
  let id = req.params.id;
  Podcast.findByIdAndUpdate(id, req.body, (err, item) => {
    if (err) return next(err);
    res.redirect("/admin/");
  });
});
router.get("/podcast/:id/delete", function (req, res, next) {
  let id = req.params.id;
  Podcast.findByIdAndDelete(id, (err, item) => {
    if (err) return next(err);
    res.redirect("/admin/");
  });
});

module.exports = router;
