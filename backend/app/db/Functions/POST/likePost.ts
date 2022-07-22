import LikedPost from "../../models/LikedPost";

export const LIKE_POST = async (postID: string, userID: string) => {
  try {
    const Likes = await LikedPost.query().where("LikedPostID", postID);
    if (Likes.length) {
      await LikedPost.query().delete().where("LikedPostID", postID);
    } else {
      await LikedPost.query().insert({ LikedPostID: postID, LikerID: userID });
    }
  } catch (err) {
    throw err;
  }
};
