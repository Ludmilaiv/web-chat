var createError = require('http-errors');
var express = require('express');

var app = express();

// var logger = require('morgan');
// app.use(logger('request processed: :date[web] :method :url :status - :response-time ms'));

app.get("/",function(req, res) {
  res.end("Hello");
})

app.get("/test",function(req, res) {
  res.end("test");
})

app.use("/forbidden",function(req, res, next) {
  next(createError(500, "Woops! You can't come here"))
})

// app.use("/favicon.ico",function(req, res) {
//   res.sendStatus(200);
// })

app.use(function(req, res) {
  res.status(404);
  res.send("Page Not Found. Sorry :((")
})

// var path = require('path');
// var cookieParser = require('cookie-parser');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');



// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
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
