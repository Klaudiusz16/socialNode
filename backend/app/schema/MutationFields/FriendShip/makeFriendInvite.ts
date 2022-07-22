import { GraphQLString } from "graphql";
import { FriendShipSchemaType } from "../../../types/FriendShipType";
import { MAKE_FRIEND_SHIP } from "./../../../db/Functions/FRIENDSHIP/makeFriendShip";

export const makeFriendInvate = {
  type: FriendShipSchemaType,
  args: {
    sender: { type: GraphQLString },
    date: { type: GraphQLString },
    friend: { type: GraphQLString },
  },
  async resolve(_, { sender, date, friend }) {
    try {
      const response = await MAKE_FRIEND_SHIP(sender, friend, date);
      return {
        id: response,
      };
    } catch (err) {
      return { error: err };
    }
  },
};
