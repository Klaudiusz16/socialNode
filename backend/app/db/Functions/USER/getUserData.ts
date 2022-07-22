import User from "../../models/User";
import Friendship from "./../../models/Friendship";

export const GET_USER_DATA = async (id) => {
  try {
    const data = await User.query().withGraphFetched().findOne("Id", id);
    const friends1 = await Friendship.query()
      .withGraphFetched("[User1Data, User2Data]")
      .where("User1", data.id);
    const friends2 = await Friendship.query()
      .withGraphFetched("[User1Data, User2Data]")
      .where("User2", data.id);

    const Friends = friends1.concat(friends2);

    Friends.forEach((ship) => {
      const {
        id: id1,
        Firstname: Firstname1,
        Surname: Surname1,
        Avatar: Avatar1,
      } = ship.User1Data;
      ship.User1 = {
        id: id1,
        Firstname: Firstname1,
        Surname: Surname1,
        Avatar: Avatar1,
      };
      delete ship.User1Data;

      const {
        id: id2,
        Firstname: Firstname2,
        Surname: Surname2,
        Avatar: Avatar2,
      } = ship.User2Data;
      ship.User2 = {
        id: id2,
        Firstname: Firstname2,
        Surname: Surname2,
        Avatar: Avatar2,
      };
      delete ship.User2Data;
    });

    data.Friends = Friends;

    if (data?.Password) data.Password = "";

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
