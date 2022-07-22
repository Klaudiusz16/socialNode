import { GraphQLObjectType, GraphQLString } from "graphql";
import { ADD_COMMENT } from "../../../db/Functions/POST/addComment";

const CommentType = new GraphQLObjectType({
  name: "addComment",
  fields: () => ({
    textContent: { type: GraphQLString },
    date: { type: GraphQLString },
    userID: { type: GraphQLString },
    postID: { type: GraphQLString },
    error: { type: GraphQLString },
  }),
});

export const addComment = {
  type: CommentType,
  args: {
    textContent: { type: GraphQLString },
    date: { type: GraphQLString },
    userID: { type: GraphQLString },
    postID: { type: GraphQLString },
  },
  async resolve(_, { textContent, date, userID, postID }) {
    try {
      const response = await ADD_COMMENT(postID, userID, textContent, date);

      return { userID: userID };
    } catch (err) {
      return { error: err };
    }
  },
};
