var express = require("express");
var router = express.Router();
var Article = require("../models/Article");

router.get("/new", (req, res, next) => {
  res.render("article-new");
});
router.post("/new", (req, res, next) => {
  req.body.author = req.session.userId;
  Article.create(req.body, (error, article) => {
    if (error) return next(error);
    console.log(article);
    res.redirect("/users/dashboard");
  });
});
router.get("/:slug", (req, res, next) => {
  let slug = req.params.slug;
  Article.findOne({ slug }, (error, article) => {
    if (error) return next(error);
    console.log(article);
    res.render("article-details-page", { article });
  });
});
router.get("/:slug/likes", (req, res, next) => {
  let slug = req.params.slug;
  Article.findOneAndUpdate(
    { slug },
    { $inc: { likes: 1 } },
    (error, article) => {
      if (error) return next(error);
      res.redirect("/articles/" + slug);
    }
  );
});
router.get("/:slug/edit", (req, res, next) => {
  let slug = req.params.slug;
  Article.findOne({ slug }, (error, article) => {
    if (error) return next(error);
    res.render("article-edit-form", { article });
  });
});
router.post("/:slug/edit", (req, res, next) => {
  let slug = req.params.slug;
  Article.findOneAndUpdate({ slug }, req.body, (error, article) => {
    if (error) return next(error);
    res.redirect("/articles/" + slug);
  });
});
router.get("/:slug/delete", (req, res, next) => {
  let slug = req.params.slug;
  Article.findOneAndDelete({ slug }, req.body, (error, article) => {
    if (error) return next(error);
    res.redirect("/users/dashboard");
  });
});
router.post("/:slug/comment/new", (req, res, next) => {
  let slug = req.params.slug;
  console.log(req.session.userId);
  Article.findOne({ slug }, (error, article) => {
    if (error) return next(error);
    console.log(req.body);
  });
});
module.exports = router;
