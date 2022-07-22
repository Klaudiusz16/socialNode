/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friendShips", (table) => {
    table.increments("id").primary();
    table.integer("User1").notNullable();
    table.integer("User2").notNullable();
    table.dateTime("Since").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
