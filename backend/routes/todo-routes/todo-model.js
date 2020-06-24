const db = require('../../data/dbConfig');

module.exports = {
  find,
  findTodo,
  filterByUser,
  insert,
  update,
  remove
}

function find() {
  return db('todos');
}

function findTodo(todoId) {
  return find()
    .where('id', todoId)
    .first();
}

function filterByUser(id) {
  return find()
    .where('user_id', id)
}

function insert(todo) {
  return find()
    .insert(todo);
}

function update(todoId, changes) {
  return findTodo(todoId)
    .update(changes);
}

function remove(todoId) {
  return findTodo(todoId)
    .del();
}