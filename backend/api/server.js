const express = require('express');

const server = express();

server.use(express.json())

const authRouter = require('../routes/authentication/auth-router');
const todoRouter = require('../routes/todo-routes/todo-router');

server.use(
  authRouter,
  todoRouter
)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'active' })
})

module.exports = server;