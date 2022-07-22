import { UserType } from "../../../types/UserType";
import User from "../../models/User";
import Notification from "../../models/Notification";

export const PUSH_NEW_NOTIFICATION = async (
  userID,
  TextContent,
  Date,
  From
) => {
  try {
    const response = await Notification.query().insert({
      TextContent: TextContent,
      Date: Date,
      From: From,
      IsRead: false,
      userID: userID,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
