const db = require('../../data/dbConfig');

module.exports = {
  register,
  validate
}

function register(user) {
  return db('users')
    .insert(user)
    .then(([id]) => db('users'))
      .where('id', id)
      .first()
}

async function validate(email) {
  const user = await db('users').where('email', email);
  return user.length === 0 ? true : false;
}