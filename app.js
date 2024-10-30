const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session)
const morgan = require('morgan');

require('dotenv').config()

const fs = require('fs');

const HomeController = require('./controllers/HomeController');
const OrderController = require('./controllers/OrderController');

const { APP_NAME, APP_DESCRIPTION, APP_VERSION } = require('./config/consts');

const app = express();

// view engine setup
app.engine('ejs', require('express-ejs-extend'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secret_dev = process.env.SESSION_SECRET
const secret_prod = process.env.SESSION_SECRET
const age = 48 * 60 * 60 * 1000 // 48 hours

const modactuel = process.env.NODE_ENV || 'development'
if (modactuel == "development") {
  const client = redis.createClient()
  app.use(session({
    secret: secret_dev,
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: client,
      ttl: 260
    }),
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: age
    }
  }));
} else {
  app.use(session({
    secret: secret_prod,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: age
    }
  }));
}

app.use(
  '/order',
  (req, res, next) => {
    console.log("__OrderController________________________________")
    next()
  }, OrderController
)


app.use(
  '/',
  (req, res, next) => {
    console.log("__HomeController________________________________")
    next()
  }, HomeController
)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.render('security/notfound', {
    appName: APP_NAME,
    appVersion: APP_VERSION,
    appDescription: APP_DESCRIPTION
  })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
