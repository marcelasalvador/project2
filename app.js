var createError = require('http-errors');
var express = require('express');
const session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var hbs = require("hbs")


var app = express();


require("./config/session.config")(app);

require('dotenv/config');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.user
  console.log(res.locals)
  next()
})

app.use((req, res, next) => {
  res.locals.isLoggedOut = !req.session.user
  next()
})

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var galleryRouter = require('./routes/gallery');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/gallery', galleryRouter);



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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


module.exports = app;


