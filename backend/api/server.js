const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(
  express.json(),
  cors(),
  helmet()
)

const authRouter = require('../routes/authentication/auth-router');

server.use(
  authRouter
)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'active' })
})

module.exports = server;