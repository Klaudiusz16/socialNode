import User from "./User";

const { Model } = require("objection");

class Notification extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "notifications";
  }

  static relationMappings = {
    FromUser: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: "notifications.From",
        to: "users.id",
      },
    },
  };
}

export default Notification;
