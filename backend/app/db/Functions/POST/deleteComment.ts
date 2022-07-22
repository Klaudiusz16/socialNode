import Comment from "../../models/Comment";

export const DELETE_COMMENT = async (commentID:string, userID:string) => {
  try {
    const comment = await Comment.query().findById(commentID);
    if (comment.CreatorID != userID)
      throw "You do not have permission to delete this comment";
    const deleted = await Comment.query().deleteById(commentID);
  } catch (err) {
    throw err;
  }
};
