<<<<<<< HEAD
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
<<<<<<< HEAD

let indexRouter = require('./routes/index');
let userRouter = require('./routes/userRouter');
=======
const session = require('express-session');

let indexRouter = require('./routes/index');
let availableHoursRouter = require('./routes/availableHoursRouter');
let schedulesRouter = require('./routes/schedulesRouter');
let usersRouter = require('./routes/usersRouter');
let addressesRouter = require('./routes/addressesRouter');
>>>>>>> 5077fa2bc7f43e93bd85f7420b51f572d2c30cbc

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: "instagram-avanade",
  saveUninitialized: true,
  resave: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
<<<<<<< HEAD
app.use('/users', userRouter);
=======
app.use('/users', usersRouter);
app.use("/hours", availableHoursRouter);
app.use("/schedules", schedulesRouter);
app.use('/addresses', addressesRouter);

>>>>>>> 5077fa2bc7f43e93bd85f7420b51f572d2c30cbc

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
=======
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session');

let indexRouter = require('./routes/index');
let availableHoursRouter = require('./routes/availableHoursRouter');
let schedulesRouter = require('./routes/schedulesRouter');
let usersRouter = require('./routes/usersRouter');
let addressesRouter = require('./routes/addressesRouter');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: "instagram-avanade",
  saveUninitialized: true,
  resave: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/hours", availableHoursRouter);
app.use("/schedules", schedulesRouter);
app.use('/addresses', addressesRouter);


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
>>>>>>> 2bd724290c54e46e59d8acc2ff98b227117ad531
