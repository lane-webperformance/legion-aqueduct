'use strict';

const express = require('express');
const path = require('path');
const querystring = require('querystring');

module.exports = function(params) {
  const app = express();

  app.get('/', function(_req, res) {
    res.redirect('index.html?' + querystring.stringify(params));
  });
  
  app.use(express.static(path.join(__dirname, '../dist/')));

  return app;
};

