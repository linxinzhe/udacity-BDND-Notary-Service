const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const simpleChain = require('./app/simpleChain');
const session = require('express-session');


const indexRouter = require('./routes/index');
const blockRouter = require('./routes/block');
const starsRouter = require('./routes/stars');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 300,
  },
}));

app.use('/', indexRouter);
app.use('/block', blockRouter);
app.use('/stars', starsRouter);

// init blockchain
simpleChain.createGenesisBlock();

module.exports = app;
