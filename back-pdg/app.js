var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var instRouter = require("./routes/institution");
var courseRouter = require("./routes/course");
var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");
var messageRouter = require("./routes/message");
var contentRouter = require("./routes/content");
var feedbackRouter = require("./routes/feedback");
var homeworkRouter = require("./routes/homework");

var app = express();

// require("./config/Sequelize");
require("./model/Asociations");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/inst", instRouter);
app.use("/course", courseRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/message", messageRouter);
app.use("/content", contentRouter);
app.use("/feed", feedbackRouter);
app.use("/homework", homeworkRouter);
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
