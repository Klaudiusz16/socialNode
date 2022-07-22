import ChatMessage from "../../models/ChatMessage";
import { MessageType } from "./../../../types/ChatType";

export const MAKE_MESSAGE_READ = async (chatID: string, userID: string) => {
  try {
    const messages: MessageType[] = await ChatMessage.query().where(
      "chatID",
      chatID
    );
    const lastMessage = messages.sort(
      (message1, message2) =>
        new Date(message2.Date).getTime() - new Date(message1.Date).getTime()
    )[0];
    await ChatMessage.query().findById(lastMessage.id).patch({ IsRead: 1 });
  } catch (err) {
    throw err;
  }
};
