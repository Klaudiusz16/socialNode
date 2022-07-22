import User from "../../models/User";
import Chat from "./../../models/Chat";

export const GET_CHATS = async (userID: string) => {
  try {
    let chats = await Chat.query().withGraphFetched(
      "[Messages.CreatorID, ParticipantsRelation.User]"
    );

    chats = chats.filter(
      (chat) =>
        chat.ParticipantsRelation[0].ParticipantID == userID ||
        chat.ParticipantsRelation[1].ParticipantID == userID
    );

    await chats.map(async (chat) => {
      chat.Participants = chat.ParticipantsRelation;
      delete chat.ParticipantsRelation;

      chat.Messages.map((message) => {
        message.Creator = {
          Firstname: message.CreatorID.Firstname,
          Surname: message.CreatorID.Surname,
          Avatar: message.CreatorID.Avatar,
          id: message.CreatorID.id,
        };
        delete message.CreatorID;
      });
      chat.Participants.map((participant, i) => {
        delete participant.ParticipantID;
        const { Firstname, Surname, Avatar, id } = participant.User;
        chat.Participants[i] = {
          Firstname: Firstname,
          Surname: Surname,
          Avatar: Avatar,
          id: id,
        };
      });
    });
    return chats;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
