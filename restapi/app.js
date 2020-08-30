let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let analysisRouter = require('./routes/analysis');
let newsRouter = require('./routes/news');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/get-analysis', analysisRouter);
app.use('/get-news', newsRouter);

module.exports = app;
