const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//router
const stylistsRouter = require('./app/api/v1/stylists/router');
const authRouter = require('./app/api/v1/auth/router');

const v1 = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to api s',
  });
});

app.use('/', stylistsRouter);
app.use(`${v1}/cms`, authRouter);

module.exports = app;
