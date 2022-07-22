import { GraphQLList, GraphQLString } from "graphql";
import { PostSchemaType } from "../../types/PostType";
import { GET_USER_POSTS } from "./../../db/Functions/POST/getUserPosts";

export const getUserPosts = {
  type: new GraphQLList(PostSchemaType),
  args: {
    userID: { type: GraphQLString },
  },
  async resolve(_, { userID }) {
    try {
      const posts = await GET_USER_POSTS(userID);

      return posts;
    } catch (err) {
      return { status: err.message };
    }
  },
};
