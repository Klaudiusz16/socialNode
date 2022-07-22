import { UserType } from "../../../types/UserType";
import User from "../../models/User";

const bcrypt = require("bcrypt");

export const REGISTER_USER = async (
  firstname: string,
  surname: string,
  password: string,
  email: string,
  dateOfBirth: string,
  country: string
) => {
  try {
    const cryptedPassword = bcrypt.hashSync(password, 8);

    const isEmail = await User.query().findOne(
      "Email",
      email.toLocaleLowerCase()
    );

    if (isEmail) throw "That email is already in use.";

    const response = await User.query().insert({
      Firstname: firstname,
      Surname: surname,
      Password: cryptedPassword,
      Email: email.toLowerCase(),
      DateOfBirth: dateOfBirth,
      Country: country,
      Avatar: "",
    });

    return response.id;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
