import { GraphQLObjectType, GraphQLString } from "graphql";
import { LIKE_POST } from "./../../../db/Functions/POST/likePost";

const postLikeSchema = new GraphQLObjectType({
  name: "postLikeHandler",
  fields: () => ({
    postID: { type: GraphQLString },
    userID: { type: GraphQLString },
  }),
});

export const postLikeHandler = {
  type: postLikeSchema,
  args: {
    postID: { type: GraphQLString },
    userID: { type: GraphQLString },
  },
  async resolve(_, { postID, userID }) {
    try {
      const response = await LIKE_POST(postID, userID);
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
