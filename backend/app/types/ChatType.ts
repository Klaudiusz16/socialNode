import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export interface MessageType {
  id: string;
  Date: string;
  IsRead: boolean;
  TextContent: string;
  ChatID: string;
  Creator: string;
}

export interface ChatType {
  id: string;
  participants: {
    fullName: string;
    avatar: string;
    type: string;
  }[];
  lastMessage: MessageType;
}

const ParticipantSchemaType = new GraphQLObjectType({
  name: "participants",
  fields: () => ({
    Firstname: { type: GraphQLString },
    Avatar: { type: GraphQLString },
    Surname: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});

export const MessageSchemaType = new GraphQLObjectType({
  name: "message",
  fields: () => ({
    id: { type: GraphQLString },
    Date: { type: GraphQLString },
    IsRead: { type: GraphQLBoolean },
    TextContent: { type: GraphQLString },
    Creator: { type: ParticipantSchemaType },
  }),
});

export const ChatSchemaType = new GraphQLObjectType({
  name: "ChatTyp",
  fields: () => ({
    id: { type: GraphQLString },
    Participants: { type: new GraphQLList(ParticipantSchemaType) },
    Messages: { type: new GraphQLList(MessageSchemaType) },
    error: { type: GraphQLString },
  }),
});
