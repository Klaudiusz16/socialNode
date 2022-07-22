const { Model } = require("objection");
import Friendship from "./Friendship";
import Notification from "./Notification";

class User extends Model {
  static get tableName() {
    return "users";
  }
}

export default User;
