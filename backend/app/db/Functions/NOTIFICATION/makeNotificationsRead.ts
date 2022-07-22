import Notification from "../../models/Notification";

export const MAKE_NOTIFICATIONS_READ = async (userID) => {
  try {
    const response = await Notification.query()
      .patch({ IsRead: true })
      .where("IsRead", false)
      .where("UserID", userID);

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
