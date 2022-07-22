import User from "./User";

const { Model } = require("objection");

class ChatParticipant extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "chatParticipants";
  }

  static relationMappings = {
    User: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: "chatParticipants.ParticipantID",
        to: "users.id",
      },
    },
  };
}

export default ChatParticipant;
