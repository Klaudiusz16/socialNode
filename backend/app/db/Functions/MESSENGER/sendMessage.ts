import ChatMessage from "../../models/ChatMessage";

export const SEND_MESSAGE = async (
  creator: string,
  date: string,
  textContent: string,
  chatID: string
) => {
  try {
    if (!textContent.trim().length) throw "empty text content";

    const response = await ChatMessage.query().insert({
      TextContent: textContent,
      Creator: creator,
      IsRead: false,
      Date: date,
      ChatID: chatID,
    });
    return response.id;
  } catch (err) {
    throw err;
  }
};
