import { GraphQLList } from "graphql";
import { PostSchemaType } from "../../types/PostType";
import { GET_POSTS } from "./../../db/Functions/POST/getPosts";

export const getPosts = {
  type: new GraphQLList(PostSchemaType),
  async resolve() {
    try {
      const posts = await GET_POSTS();

      return posts;
    } catch (err) {
      return { status: err.message };
    }
  },
};
