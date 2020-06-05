
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    table.increments();
    table.string('title').notNullable();
    table.string('local').notNullable();
    table.string('descricao').notNullable();
       
    table.string('usuario_id').notNullable();

    table.foreign('usuario_id').references('id').inTable('usuario');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
