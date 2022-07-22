import User from "./User";

const { Model } = require("objection");
class Comment extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "comments";
  }

  static relationMappings = {
    Creator: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: "comments.CreatorID",
        to: "users.id",
      },
    },
  };
}

export default Comment;
