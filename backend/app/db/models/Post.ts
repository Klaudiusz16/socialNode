const { Model } = require("objection");
import Comment from "./Comment";
import User from "./User";
import LikedPost from "./LikedPost";

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static relationMappings = {
    CreatorID: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "posts.Creator",
        to: "users.id",
      },
    },
    LikedBy: {
      relation: Model.HasManyRelation,
      modelClass: LikedPost,
      join: {
        from: "posts.id",
        to: "likedPosts.LikedPostID",
      },
    },
    Comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: "posts.id",
        to: "comments.PostID",
      },
    },
  };
}
export default Post;
