'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {PORT, DATABASE_URL} = requrie('./config')

const app = express();

app.use(morgan('common'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
      return res.send(204);
    }
    next();
  });

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.json({'message': 'answer'});
});
app.listen(process.env.PORT || 8080);

module.exports = {app};