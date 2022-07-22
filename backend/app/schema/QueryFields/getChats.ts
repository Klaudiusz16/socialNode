import { GraphQLList, GraphQLObjectType } from "graphql";
import { GraphQLString } from "graphql";
import { ChatSchemaType } from "./../../types/ChatType";
import { GET_CHATS } from "../../db/Functions/MESSENGER/getChats";

export const getChats = {
  type: new GraphQLObjectType({
    name: "chats",
    fields: () => ({
      chats: { type: new GraphQLList(ChatSchemaType) },
    }),
  }),
  args: {
    userID: { type: GraphQLString },
  },
  async resolve(_, { userID }) {
    try {
      const chats = await GET_CHATS(userID);
      return { chats: chats };
    } catch (err) {
      return {
        status: err.message,
      };
    }
  },
};
