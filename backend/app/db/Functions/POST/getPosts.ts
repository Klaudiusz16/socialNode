import Post from "../../models/Post";
import User from "../../models/User";

export const GET_POSTS = async () => {
  try {
    const posts = await Post.query().withGraphFetched(
      "[CreatorID, LikedBy, Comments.Creator]"
    );

    posts.map((post) => {
      const { Firstname, Surname, id, Avatar } = post.CreatorID;
      post.Creator = {
        Firstname: Firstname,
        Surname: Surname,
        id: id,
        Avatar: Avatar,
      };
      post.Images = post.Images.split(",");
      delete post.CreatorID;
      post.LikedBy = post.LikedBy.map((like) => like.LikerID);
      post.Comments.map((comment) => {
        const { Firstname, Surname, Avatar, id } = comment.Creator;
        comment.Creator = {
          Firstname: Firstname,
          Surname: Surname,
          Avatar: Avatar,
          id: id,
        };
        delete comment.CreatorID;
      });
    });

    return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
