/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chatParticipants", (table) => {
    table.increments().primary();
    table.string("ChatID").notNullable();
    table
      .integer("ParticipantID")
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
