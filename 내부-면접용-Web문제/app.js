var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser')
var logger = require('morgan');
var session = require('express-session')

const exphbs  = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter=require('./routes/board.js');

var app = express();

// view engine setup
app.engine('hbs',exphbs({defaultLayout: null}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret:'test',
  resave:false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use('/static',express.static(path.join(__dirname, 'public')));
console.log(__dirname);

app.use('/', indexRouter);
app.use("/board", boardRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('error/404');
});

app.use(function(req, res, next) {
  res.status(500).render('error/500');
});

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error')
// });

module.exports = app;
