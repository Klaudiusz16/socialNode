import { GraphQLString } from "graphql";
import { PostSchemaType } from "../../../types/PostType";
import { DELETE_POST } from "./../../../db/Functions/POST/deletePost";

export const deletePost = {
  type: PostSchemaType,
  args: {
    userID: { type: GraphQLString },
    postID: { type: GraphQLString },
  },
  async resolve(_, { userID, postID }) {
    try {
      const response = await DELETE_POST(postID, userID);

      return { userID: userID };
    } catch (err) {
      return { error: err };
    }
  },
};
