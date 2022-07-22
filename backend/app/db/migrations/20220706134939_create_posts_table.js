/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("Creator").notNullable().references("id").inTable("users");
    table.dateTime("Date").notNullable();
    table.string("TextContent").notNullable();
    table.string("Images");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
