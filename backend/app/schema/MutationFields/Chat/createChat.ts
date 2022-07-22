import { GraphQLInputObjectType, GraphQLList, GraphQLString } from "graphql";
import { ChatSchemaType } from "./../../../types/ChatType";
import { CREATE_CHAT } from "./../../../db/Functions/MESSENGER/createChat";

const MessageType = new GraphQLInputObjectType({
  name: "message_chat",
  fields: () => ({
    textContent: { type: GraphQLString },
    creator: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

export const createChat = {
  type: ChatSchemaType,
  args: {
    participants: { type: new GraphQLList(GraphQLString) },
    message: { type: MessageType },
  },
  async resolve(_, { participants, message }) {
    try {
      const response = await CREATE_CHAT(participants, message);
      return {
        id: response,
      };
    } catch (err) {
      return { error: err };
    }
  },
};
