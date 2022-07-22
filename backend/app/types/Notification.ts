import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import { CreatorSchemaType } from "./PostType";
export interface NotificationType {
  Image: string;
  TextContent: string;
  From: string;
  IsRead: boolean;
  Date: string;
  UserID: string;
}

export const NotificationSchemaType = new GraphQLObjectType({
  name: "Notification",
  fields: () => ({
    Image: { type: GraphQLString },
    TextContent: { type: GraphQLString },
    From: { type: CreatorSchemaType },
    IsRead: { type: GraphQLBoolean },
    Date: { type: GraphQLString },
    UserID: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});
