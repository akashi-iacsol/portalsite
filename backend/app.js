var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ADAuthRouter = require('./routes/ad-auth');
var loginUserRouter = require('./routes/login-user');
var EmployeeListRouter = require('./routes/employee-list');
var DepartmentListRouter = require('./routes/department-list');
var PositionListRouter = require('./routes/position-list');
var AuthorityListRouter = require('./routes/authority-list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ad-auth', ADAuthRouter);
app.use('/login-user', loginUserRouter);
app.use('/employee-list', EmployeeListRouter);
app.use('/department-list', DepartmentListRouter);
app.use('/position-list', PositionListRouter);
app.use('/authority-list', AuthorityListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
