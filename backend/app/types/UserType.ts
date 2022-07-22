import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export interface UserType {
  id: string | number;
  Firstname: string;
  Surname: string;
  DateOfBirth: string;
  Country: string;
  Email: string;
  Password: string;
  Avatar: string;
}

const FriendSchemaType = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    id: { type: GraphQLString },
    Firstname: { type: GraphQLString },
    Surname: { type: GraphQLString },
    Avatar: { type: GraphQLString },
  }),
});

const FriendsSchemaType = new GraphQLObjectType({
  name: "Friends",
  fields: () => ({
    id: { type: GraphQLString },
    Since: { type: GraphQLString },
    User1: { type: FriendSchemaType },
    User2: { type: FriendSchemaType },
  }),
});

export const UserSchemaType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    Firstname: { type: GraphQLString },
    Surname: { type: GraphQLString },
    DateOfBirth: { type: GraphQLString },
    Country: { type: GraphQLString },
    Email: { type: GraphQLString },
    Password: { type: GraphQLString },
    Avatar: { type: GraphQLString },
    Friends: { type: new GraphQLList(FriendsSchemaType) },
  }),
});
