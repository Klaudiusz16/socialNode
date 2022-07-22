import { GraphQLObjectType } from "graphql";
import { GraphQLString } from "graphql";

export interface FriendShipType {
  id: string;
  UserID: string;
  FriendID: string;
  Status: string;
  Since: string;
}

export const FriendShipSchemaType = new GraphQLObjectType({
  name: "FriendShipType",
  fields: () => ({
    id: { type: GraphQLString },
    UserID: { type: GraphQLString },
    FriendID: { type: GraphQLString },
    Status: { type: GraphQLString },
    Since: { type: GraphQLString },
  }),
});
