var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article");
var auth = require("./middlewares/auth");

var app = express();

//Connect to Db
mongoose.connect(
  "mongodb://127.0.0.1:27017/aie-asn-2",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    console.log(error ? error : "Connect to Db");
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

//session middleWare
app.use(
  session({
    secret: "self-aware",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/aie-asn-2",
    }),
  })
);

app.use(auth.userInfo);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articleRouter);

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
