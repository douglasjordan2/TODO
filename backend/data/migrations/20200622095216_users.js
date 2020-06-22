
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', tbl => {
      tbl
        .increments()
        .primary();

      tbl
        .string('email')
        .notNullable();

      tbl
        .string('password')
        .notNullable();

      tbl
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users');
};
