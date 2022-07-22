import { UserType } from "../../../types/UserType";
import User from "../../models/User";
const bcrypt = require("bcrypt");

export const LOGIN_USER = async (email: string, password: string) => {
  try {
    const response = await User.query().findOne("Email", email);

    if (!response?.id) throw "User does not exist.";

    const isPasswordRight = bcrypt.compareSync(password, response.Password);
    if (!isPasswordRight) throw "Wrong password";
    else {
      return {
        ID: response.id,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
