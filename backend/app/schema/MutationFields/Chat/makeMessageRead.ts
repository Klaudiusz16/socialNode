import { GraphQLString } from "graphql";
import { MessageSchemaType } from "./../../../types/ChatType";
import { MAKE_MESSAGE_READ } from "../../../db/Functions/MESSENGER/makeMessageRead";

export const makeMessageRead = {
  type: MessageSchemaType,
  args: {
    userID: { type: GraphQLString },
    chatID: { type: GraphQLString },
  },
  async resolve(_, { userID, chatID }) {
    try {
      const response = await MAKE_MESSAGE_READ(chatID, userID);
      return {
        id: response,
      };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
};
