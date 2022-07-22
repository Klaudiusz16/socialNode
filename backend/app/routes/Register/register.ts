import axios from "axios";
import { REGISTER_USER } from "../../db/Functions/USER/registerUser";
const { areFieldsValid } = require("./RegisterValidator");
const jwt = require("jsonwebtoken");

export const REGISTER_ROUTE = async (req, res) => {
  try {
    let { data: countries } = await axios.get(
      "https://restcountries.com/v3.1/all"
    );
    countries = countries.map((country) => country.name.common).sort();

    const { firstname, surname, password, email, dateOfBirth, country } =
      req.body;
    const valdatorResponse = areFieldsValid(
      firstname,
      surname,
      password,
      email,
      dateOfBirth,
      {
        availableCountries: countries,
        passedCountry: country,
      }
    );

    const errors = [];
    if (!valdatorResponse.firstname.isValid)
      errors.push(valdatorResponse.firstname.comment);
    if (!valdatorResponse.surname.isValid)
      errors.push(valdatorResponse.surname.comment);
    if (!valdatorResponse.password.isValid)
      errors.push(valdatorResponse.password.comment);
    if (!valdatorResponse.email.isValid)
      errors.push(valdatorResponse.email.comment);
    if (!valdatorResponse.birthDate.isValid)
      errors.push(valdatorResponse.birthDate.comment);
    if (!valdatorResponse.country.isValid)
      errors.push(valdatorResponse.country.comment);

    if (errors.length) return res.send({ isSuces: false, errors: errors });

    const userID = await REGISTER_USER(
      firstname,
      surname,
      password,
      email,
      dateOfBirth,
      country
    );

    if (userID) {
      const token = jwt.sign({ userID: userID }, process.env.TOKEN_JWT);

      res.cookie("jwt", token, {
        httpOnly: true,
        // secure: true,
        // domain: ClientServer,
      });

      res.send({ isSucces: true, errors: [], userID: userID });
    }
  } catch (err) {
    res.send({
      isSucces: false,
      errors: [typeof err == "string" ? err : err.message],
    });
  }
};
