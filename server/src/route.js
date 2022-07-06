const express = require('express');

const route = express.Router();

route.get('/server', (req, res) => {
  res.send('server is running');
});

module.exports = route;
