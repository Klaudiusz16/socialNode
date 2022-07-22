import { GraphQLList, GraphQLString } from "graphql";
import { GET_NOTIFICATIONS } from "./../../db/Functions/NOTIFICATION/getNotifications";
import { NotificationSchemaType } from "../../types/Notification";
import { GraphQLObjectType } from "graphql";

export const getNotifications = {
  type: new GraphQLObjectType({
    name: "notifications",
    fields: () => ({
      notifications: { type: new GraphQLList(NotificationSchemaType) },
    }),
  }),
  args: {
    userID: { type: GraphQLString },
  },
  async resolve(_, { userID }) {
    try {
      const notifications = await GET_NOTIFICATIONS(userID);

      return { notifications: notifications };
    } catch (err) {
      return { status: err.message };
    }
  },
};
