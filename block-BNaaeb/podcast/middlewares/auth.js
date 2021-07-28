var User = require("../models/User");
module.exports = {
  loggedInUser: (req, res, next) => {
    console.log(req.session);
    if (req.session && req.session.userId) {
      next();
    } else {
      res.redirect("/users/login");
    }
  },
  userInfo: (req, res, next) => {
    var userId = req.session && req.session.userId;
    if (userId) {
      User.findById(userId, "name email access", (error, user) => {
        if (error) return next(error);
        req.user = user;
        res.locals.user = user;
        next();
      });
    } else {
      req.user = null;
      res.locals.user = null;
      next();
    }
  },
};
