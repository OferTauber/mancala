const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
  res.send({ massage: 'server is running' });
});

module.exports = route;
