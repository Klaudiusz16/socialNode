import { LOGIN_USER } from "../../db/Functions/USER/loginUser";

require("dotenv").config();
const jwt = require("jsonwebtoken");

export const LOGIN_ROUTE = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await LOGIN_USER(email, password);
    const token = jwt.sign({ userID: response.ID }, process.env.TOKEN_JWT);

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: true,
      // domain: ClientServer,
    });

    res.send({
      userID: response.ID,
    });
  } catch (err) {
    console.log(err);
    res.send({
      isSucces: false,
      errors: [typeof err == "string" ? err : err.message],
    });
  }
};
