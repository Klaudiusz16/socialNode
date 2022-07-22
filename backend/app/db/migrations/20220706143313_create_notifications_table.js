/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary();
    table.string("TextContent").notNullable();
    table.dateTime("Date").notNullable();
    table.boolean("IsRead").notNullable();
    table.string("From").notNullable();
    table.integer("UserID").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
