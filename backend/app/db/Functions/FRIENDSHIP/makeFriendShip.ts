import Friendship from "../../models/Friendship";
import User from "../../models/User";
import { PUSH_NEW_NOTIFICATION } from "../NOTIFICATION/pushNewNotification";

export const MAKE_FRIEND_SHIP = async (
  sender: string,
  friend: string,
  date: string
) => {
  try {
    const friendship = await Friendship.query().insert({
      User1: sender,
      User2: friend,
      Since: date,
    });

    const notification = await PUSH_NEW_NOTIFICATION(
      friend,
      "has added you to his friends",
      date,
      sender
    );
    return friendship.id;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
