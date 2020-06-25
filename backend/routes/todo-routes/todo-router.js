const express = require('express');
const router = express.Router();
const restricted = require('../authentication/restricted-middleware');

const Todos = require('./todo-model');
const db = require('../../data/dbConfig');

router.get('/api/users/:id/todos', restricted, validateUser, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todos = await Todos.filterByUser(id);

    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/api/todos', restricted, async (req, res) => {
  try {
    const { user_id, task } = req.body;

    if(user_id && task) {
      const [query] = await Todos.insert(req.body);
      const todo = await Todos.findTodo(query);

      res.status(200).json(todo);
    } else {
      res.status(403).json({ message: 'Invalid format.' })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/api/todos/:todo_id', restricted, validateData, async (req, res) => {
  const todo_id = parseInt(req.params.todo_id);

  const { task } = req.body;

  if(task) {
    await Todos.update(todo_id, req.body);
    const todo = await Todos.findTodo(todo_id);

    res.status(200).json(todo);
  } else {
    res.status(403).json({ message: 'Invalid format.' })
  }
});

router.delete('/api/todos/:todo_id', restricted, validateData, async (req, res) => {
  const todo_id = parseInt(req.params.todo_id);
  await Todos.remove(todo_id)

  res.status(200).json({ message: 'Deleted successfully.' })
})

async function validateData(req, res, next) {
  const todo_id = parseInt(req.params.todo_id);

  try {
    const todo = await Todos.findTodo(todo_id);

    if(todo) {
      next();
    } else {
      res.status(403).json({ message: 'Todo not found.' })
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

async function validateUser(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const user = await db('users')
      .where('users.id', id)
      .first();

    if(user) {
      next();
    } else {
      res.status(403).json({ message: 'User not found.' })
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = router;