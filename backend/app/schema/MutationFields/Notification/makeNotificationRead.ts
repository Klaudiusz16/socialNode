import { GraphQLString } from "graphql";
import { NotificationSchemaType } from "../../../types/Notification";
import { MAKE_FRIEND_SHIP } from "./../../../db/Functions/FRIENDSHIP/makeFriendShip";
import { MAKE_NOTIFICATIONS_READ } from "./../../../db/Functions/NOTIFICATION/makeNotificationsRead";

export const makeNotificationRead = {
  type: NotificationSchemaType,
  args: {
    userID: { type: GraphQLString },
  },
  async resolve(_, { userID }) {
    try {
      const response = await MAKE_NOTIFICATIONS_READ(userID);
      return {
        id: response,
      };
    } catch (err) {
      return { error: err };
    }
  },
};
