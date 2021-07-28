var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo");
var auth = require("./middlewares/auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var dashboardRouter = require("./routes/dashboard");

var app = express();

//Db connect
mongoose.connect(
  "mongodb://127.0.0.1:27017/podcast",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    console.log(error ? error : "Connected to Db");
  }
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//session middleware
app.use(
  session({
    secret: "podcast",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/podcast",
    }),
  })
);
app.use(auth.userInfo);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(auth.loggedInUser);
app.use("/admin", adminRouter);
app.use("/dashboard", dashboardRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
