/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments().primary();
    table.integer("PostID").notNullable();
    table.integer("CreatorID").notNullable().references("id").inTable("users");
    table.string("CommentContent").notNullable();
    table.dateTime("Date").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
