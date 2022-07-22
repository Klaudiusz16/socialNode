import { GraphQLInputObjectType, GraphQLString } from "graphql";
import { MessageSchemaType } from "./../../../types/ChatType";

import { SEND_MESSAGE } from "../../../db/Functions/MESSENGER/sendMessage";

export const sendMessage = {
  type: MessageSchemaType,
  args: {
    textContent: { type: GraphQLString },
    creator: { type: GraphQLString },
    date: { type: GraphQLString },
    chatID: { type: GraphQLString },
  },
  async resolve(_, { textContent, creator, date, chatID }) {
    try {
      const response = await SEND_MESSAGE(creator, date, textContent, chatID);
      return {
        id: response,
      };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
};
