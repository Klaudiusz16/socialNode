const knex = require("knex");
const knexfile = require("./app/db/knexfile");
const { Model } = require("objection");

function setupDB() {
  Model.knex(
    knex({
      client: "sqlite3",
      connection: {
        filename: "./app/db/dev.sqlite3",
      },
    })
  );
}

module.exports = setupDB;
