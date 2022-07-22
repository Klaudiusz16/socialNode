/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("Email").unique().notNullable();
    table.string("Password").notNullable();
    table.timestamps(false, true);
    table.string("Firstname").notNullable();
    table.string("Surname").notNullable();
    table.string("DateOfBirth").notNullable();
    table.string("Country").notNullable();
    table.string("Avatar").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
