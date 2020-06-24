
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('todos', tbl => {
      tbl
        .increments()
        .primary();

      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl
        .string('task')
        .notNullable();

      tbl
        .boolean('completed')
        .defaultTo(false)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('todos')
};
