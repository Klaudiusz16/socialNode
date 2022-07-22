import User from "../../models/User";

export const UPDATE_USER_AVATAT = async (
  userAvatarLink: string,
  userID: string
) => {
  try {
    const response = await User.query()
      .findById(userID)
      .patch({ Avatar: userAvatarLink });
    return response;
  } catch (err) {
    throw err;
  }
};
