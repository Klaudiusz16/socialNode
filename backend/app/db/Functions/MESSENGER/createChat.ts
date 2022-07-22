import Chat from "../../models/Chat";
import ChatMessage from "../../models/ChatMessage";
import ChatParticipant from "./../../models/ChatParticipant";

export const CREATE_CHAT = async (
  participants: string[],
  message: {
    textContent: string;
    creator: string;
    date: string;
  }
) => {
  try {
    const participant1_chats = await ChatParticipant.query().where(
      "ParticipantID",
      participants[0]
    );
    const participant2_chats = await ChatParticipant.query().where(
      "ParticipantID",
      participants[1]
    );

    participant1_chats.map((chat1) => {
      participant2_chats.map((chat2) => {
        if (chat1.ChatID == chat2.ChatID) throw "Chat Exist";
      });
    });

    const chatDBItem = await Chat.query().insert({
      CreatedDate: new Date().toISOString(),
    });

    participants.map(async (participant) => {
      await ChatParticipant.query().insert({
        ChatID: chatDBItem.id,
        ParticipantID: participant,
      });
    });

    const messageDBItem = await ChatMessage.query().insert({
      textContent: message.textContent,
      Creator: message.creator,
      Date: message.date,
      IsRead: false,
      ChatID: chatDBItem.id,
    });

    return chatDBItem.id;
  } catch (err) {
    throw err;
  }
};
