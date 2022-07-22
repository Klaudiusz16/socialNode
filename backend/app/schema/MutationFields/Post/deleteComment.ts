import { GraphQLString } from "graphql";
import { CommentSchemaType } from "../../../types/PostType";
import { DELETE_COMMENT } from "./../../../db/Functions/POST/deleteComment";

export const deleteComment = {
  type: CommentSchemaType,
  args: {
    userID: { type: GraphQLString },
    commentID: { type: GraphQLString },
  },
  async resolve(_, { userID, commentID }) {
    try {
      const response = await DELETE_COMMENT(commentID, userID);

      return { userID: userID };
    } catch (err) {
      return { error: err };
    }
  },
};
