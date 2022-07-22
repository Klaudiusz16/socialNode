const { Model } = require("objection");

class LikedPost extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "likedPosts";
  }
}

export default LikedPost;
