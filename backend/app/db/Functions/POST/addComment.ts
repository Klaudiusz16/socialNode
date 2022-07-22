import Comment from "../../models/Comment";

export const ADD_COMMENT = async (
  postID: string,
  userID: string,
  textContent: string,
  date: string
) => {
  try {
    if (!textContent.trim().length) {
      throw "Comment content can not be empty.";
    }

    const comment = await Comment.query().insert({
      PostID: postID,
      CreatorID: userID,
      CommentContent: textContent,
      Date: date,
    });
    return comment.id;
  } catch (err) {
    throw err;
  }
};
