import User from "./User";

const { Model } = require("objection");

class ChatMessage extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "chatMessages";
  }
  static relationMappings = {
    CreatorID: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: "chatMessages.Creator",
        to: "users.id",
      },
    },
  };
}

export default ChatMessage;
