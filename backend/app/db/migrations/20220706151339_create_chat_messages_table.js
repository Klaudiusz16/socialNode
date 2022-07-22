/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("chatMessages", (table) => {
    table.increments("id").primary();
    table.string("TextContent").notNullable();
    table.string("Creator").notNullable().references("id").inTable("users");
    table.boolean("IsRead").notNullable();
    table.dateTime("Date").notNullable();
    table.integer("ChatID").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
