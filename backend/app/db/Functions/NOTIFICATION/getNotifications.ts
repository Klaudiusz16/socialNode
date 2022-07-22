import Notification from "./../../models/Notification";

export const GET_NOTIFICATIONS = async (userID: string) => {
  try {
    const notifications = await Notification.query()
      .withGraphFetched("[FromUser]")
      .where("UserID", userID);
    notifications.forEach((notification) => {
      notification.From = {
        Firstname: notification.FromUser.Firstname,
        Surname: notification.FromUser.Surname,
        Avatar: notification.FromUser.Avatar,
        id: notification.FromUser.id,
      };
      delete notification.FromUser;
    });

    return notifications;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
