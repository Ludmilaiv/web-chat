var createError = require('http-errors');
var express = require('express');
const config = require("./config");
const fs = require("fs");
const path = require("path");
const favicon = require('serve-favicon');
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');

var app = express();

var logger = require('morgan');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger(config.get("log_format")));

const logStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' });

app.use(logger(config.get("log_format"), { stream: logStream }))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/test', testRouter);

app.use("/forbidden",function(req, res, next) {
  next(createError(500, "Woops! You can't come here"))
})

app.use(function(req, res) {
  res.status(404);
  res.render("error404");
})



// var cookieParser = require('cookie-parser');

// var usersRouter = require('./routes/users');



// // view engine setup

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
