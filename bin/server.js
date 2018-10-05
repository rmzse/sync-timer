'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const RoomManager = require('../models/roomManager');

const server = (port) => {
  
  // Setup
  if (process.env.NODE_ENV !== 'test') {
    const logger = require('morgan');
    app.use(logger('dev'));
  }
  
  app.use(express.static('public'));
  app.set('view engine', 'pug');

  const rm = new RoomManager();

  // Routes
  const index = require('../routes/index')(rm);
  const timer = require('../routes/timer')(rm);
  app.use('/', index);
  app.use('/timer', timer);

  // Socket
  const socket = require('../middleware/socket')(http, rm);

  http.listen(port, () => console.log(`🕒  Sync Timer listening on port ${port}`));
  return http;
};

module.exports = server;