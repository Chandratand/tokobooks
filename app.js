const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//router
const authRouter = require('./app/api/v1/auth/router');
// const categoriesRouter = require('./app/api/v1/categories/router');
const booksRouter = require('./app/api/v1/books/router');
const uploadRouter = require('./app/api/v1/uploads/router');
const checkoutRouter = require('./app/api/v1/checkout/router');
const transactionRouter = require('./app/api/v1/transactions/router');

const v1 = '/api/v1';

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to api TOKOBOOKS',
  });
});

app.use(`${v1}`, authRouter);
// app.use(`${v1}`, categoriesRouter);
app.use(`${v1}`, booksRouter);
app.use(`${v1}`, uploadRouter);
app.use(`${v1}`, checkoutRouter);
app.use(`${v1}`, transactionRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
