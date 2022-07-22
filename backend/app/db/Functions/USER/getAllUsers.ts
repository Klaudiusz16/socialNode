import User from "../../models/User";

export const GET_ALL_USERS = async () => {
  try {
    const users = await User.query();
    users.map((user) => {
      return {
        Firstname: user.Firstname,
        Surname: user.Surname,
        id: user.id,
        Avatar: user.Avatar,
      };
    });
    return users;
  } catch (err) {
    throw err;
  }
};
