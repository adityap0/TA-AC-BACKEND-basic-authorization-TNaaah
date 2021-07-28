var express = require("express");
var router = express.Router();
var flash = require("flash");

var User = require("../models/User");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//signup (NO Protection Required)
router.get("/signup", function (req, res, next) {
  res.render("signup");
});
router.post("/signup", function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    console.log(user);
    res.redirect("/");
  });
});
//login (NO Protection Required)
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.post("/login", function (req, res, next) {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/users/login");
  } else {
    User.findOne({ email }, (err, user) => {
      if (err) return next(err);
      //no user
      if (!user) {
        return res.redirect("/users/login");
      } else {
        user.verifyPassword(password, (error, result) => {
          if (error) return next(error);
          //wrong password
          if (!result) {
            return res.redirect("/users/login");
          } else {
            req.session.userId = user._id;
            if (user._id == "6100fddb03e4e00a6b1bee68") {
              res.redirect("/admin");
            } else {
              res.redirect("/dashboard");
            }
          }
        });
      }
    });
  }
});
//logout
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.clearCookie();
  res.redirect("/");
});
module.exports = router;
