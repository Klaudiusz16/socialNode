const { Model } = require("objection");
import ChatMessage from "./ChatMessage";
import ChatParticipant from "./ChatParticipant";

class Chat extends Model {
  static get tableName() {
    return "chats";
  }

  static relationMappings = {
    Messages: {
      relation: Model.HasManyRelation,
      modelClass: ChatMessage,
      join: {
        from: "chats.id",
        to: "chatMessages.ChatID",
      },
    },
    ParticipantsRelation: {
      relation: Model.HasManyRelation,
      modelClass: ChatParticipant,
      join: {
        from: "chats.id",
        to: "chatParticipants.ChatID",
      },
    },
  };
}

export default Chat;
