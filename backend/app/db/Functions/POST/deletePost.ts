import Post from "./../../models/Post";

export const DELETE_POST = async (postID: string, userID: string) => {
  try {
    const post = await Post.query().findById(postID);
    if (post.Creator !== userID)
      throw "You do not have permission to delete this post";
    const deleted = await Post.query().deleteById(postID);
  } catch (err) {
    throw err;
  }
};
