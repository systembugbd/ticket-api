require('dotenv').config('../.env');
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('../middleware/errorHandler');
const notfound = require('../middleware/notFoundHandler');
const router = require('../routes/router');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'API Health is good',
  });
});

app.get('/', (req, res) => {
  res.send('<h3>Home page is Alive</h3>');
});

app.use('/api/v1/tickets/', router);
app.use(notfound);
app.use(errorHandler);
module.exports = app;
