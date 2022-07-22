import User from "./User";

const { Model } = require("objection");

class Friendship extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "friendShips";
  }

  static relationMappings = {
    User1Data: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: "friendShips.User1",
        to: "users.id",
      },
    },
    User2Data: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: "friendShips.User2",
        to: "users.id",
      },
    },
  };
}

export default Friendship;
