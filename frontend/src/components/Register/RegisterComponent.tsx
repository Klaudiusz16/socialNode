import {
  Button,
  Select,
  Autocomplete,
  TextField,
  Typography,
  Box,
  Grow,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { areFieldsValid } from "./RegisterValidator";
import { SERVER } from "../../config";
import { navigate } from "gatsby-link";

const Container = styled.form`
  width: 100vw;
  min-width: 100vw;
  background-color: white;
  display: flex;
  color: #6aa4e6;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  padding-top: 20px;

  @media (min-width: 768px) {
    max-width: 30rem;
    min-width: auto;
    border-radius: 15px;
    min-height: 650px;
  }
`;

const MyButton = styled(Button)`
  background-color: var(--blue) !important;
  height: 50px;
  width: 150px;
  color: white !important;
`;
const ForMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const MyTextField = styled(TextField)`
  height: 50px;
  width: 300px;
  p {
    font-size: 11px;
  }
`;

export default function RegisterComponent({
  goToLogin,
}: {
  goToLogin: Function;
}) {
  const [countries, updateCountries] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const parsed = await data.json();
      const countries = parsed.map((country) => country.name.common).sort();

      updateCountries(countries);
    })();
  }, []);

  const [errors, setError] = useState({
    firstnameField: {
      isValid: true,
      comment: "",
    },
    surnameField: {
      isValid: true,
      comment: "",
    },
    emailField: {
      isValid: true,
      comment: "",
    },
    passwordField: {
      isValid: true,
      comment: "",
    },
    countryField: {
      isValid: true,
      comment: "",
    },
    dateOfBirthField: {
      isValid: true,
      comment: "",
    },
  });

  const [passedData, updatePassedData] = useState<{
    firstname: string;
    surname: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    country: string;
  }>({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    country: countries[0],
  });

  const changeStateHandler = (param: string, value: any) => {
    const updatedState = passedData;
    updatedState[param] = value;
    updatePassedData({ ...updatedState });
  };

  const [isSubmiting, setSubmitStatus] = useState<boolean>(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setSubmitStatus(true);
      setErrorFromServer(false);
      const {
        firstname: firstnameErrorInfo,
        surname: surnameErrorInfo,
        password: passwordErrorInfo,
        email: emailErrorInfo,
        birthDate: birthDateErrorInfo,
        country: countryErrorInfo,
      } = areFieldsValid(
        passedData.firstname,
        passedData.surname,
        passedData.password,
        passedData.email,
        passedData.dateOfBirth,
        { passedCountry: passedData.country, availableCountries: countries }
      );

      setError({
        firstnameField: firstnameErrorInfo,
        surnameField: surnameErrorInfo,
        passwordField: passwordErrorInfo,
        emailField: emailErrorInfo,
        dateOfBirthField: birthDateErrorInfo,
        countryField: countryErrorInfo,
      });

      if (
        !firstnameErrorInfo.isValid ||
        !surnameErrorInfo.isValid ||
        !passwordErrorInfo.isValid ||
        !emailErrorInfo.isValid ||
        !birthDateErrorInfo.isValid ||
        !countryErrorInfo.isValid
      ) {
        setSubmitStatus(false);
        return;
      }

      const response = await fetch(SERVER + "register", {
        method: "POST",
        cache: "no-cache",

        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: passedData.firstname,
          surname: passedData.surname,
          password: passedData.password,
          email: passedData.email,
          dateOfBirth: passedData.dateOfBirth,
          country: passedData.country,
        }),
      });

      const { userID, errors, isSucces } = await response.json();

      if (errors.length) throw errors;

      if (isSucces) {
        document.cookie = `userID=${userID}`;
        document.cookie = "signedin=true";
      }

      setSubmitStatus(false);

      navigate("/");
    } catch (err) {
      setSubmitStatus(false);
      setErrorFromServer(err.join());
      return;
    }
  };

  const [errorFromServer, setErrorFromServer] = useState<string | boolean>(
    false
  );

  return (
    <Container onSubmit={(e) => submitHandler(e)}>
      <Typography
        marginBottom={"20px"}
        fontWeight={"500"}
        fontSize="22px"
        letterSpacing="1px"
      >
        Register on SocialNode
      </Typography>
      <MyTextField
        size="small"
        onChange={(e) =>
          changeStateHandler("firstname", (e.target as HTMLInputElement).value)
        }
        label="Firstname"
        variant="outlined"
        error={!errors.firstnameField.isValid}
        helperText={
          !errors.firstnameField.isValid && errors.firstnameField.comment
        }
      />
      <MyTextField
        size="small"
        onChange={(e) =>
          changeStateHandler("surname", (e.target as HTMLInputElement).value)
        }
        label="Surname"
        variant="outlined"
        error={!errors.surnameField.isValid}
        helperText={!errors.surnameField.isValid && errors.surnameField.comment}
      />
      <MyTextField
        size="small"
        onChange={(e) =>
          changeStateHandler("email", (e.target as HTMLInputElement).value)
        }
        label="Email"
        variant="outlined"
        error={!errors.emailField.isValid}
        helperText={!errors.emailField.isValid && errors.emailField.comment}
      />
      <MyTextField
        size="small"
        onChange={(e) =>
          changeStateHandler("password", (e.target as HTMLInputElement).value)
        }
        label="Password"
        type="password"
        variant="outlined"
        error={!errors.passwordField.isValid}
        helperText={
          !errors.passwordField.isValid && errors.passwordField.comment
        }
      />
      <Autocomplete
        id="country-select"
        options={[...countries, ""]}
        sx={{
          width: "300px",
          marginBottom: "10px",
        }}
        autoHighlight
        onChange={(e) =>
          changeStateHandler(
            "country",
            (e.target as HTMLSelectElement).innerText
          )
        }
        value={passedData.country ? passedData.country : ""}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <MyTextField
            size="small"
            {...params}
            label="Choose a country"
            error={!errors.countryField.isValid}
            helperText={
              !errors.countryField.isValid && errors.countryField.comment
            }
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date of your Birth"
          inputFormat="dd/MM/yyyy"
          value={passedData.dateOfBirth}
          onChange={(newDate) => changeStateHandler("dateOfBirth", newDate)}
          renderInput={(params) => (
            <MyTextField
              error={!errors.dateOfBirthField.isValid}
              sx={{
                marginBottom: "10px",
              }}
              helperText={
                !errors.dateOfBirthField.isValid &&
                errors.dateOfBirthField.comment
              }
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      {isSubmiting ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <MyButton type="submit">
            <Typography>Register</Typography>
          </MyButton>
          <ForMobile>
            <MyButton
              sx={{
                backgroundColor: "rgb(224, 224, 224) !important",
                color: "var(--blue)!important",
              }}
            >
              <Typography onClick={() => goToLogin()}>Back to Login</Typography>
            </MyButton>
          </ForMobile>

          <Grow in={errorFromServer ? true : false}>
            <Typography
              sx={{
                color: "red",
                height: "30px",
                padding: "5px",
                width: "100%",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {errorFromServer}
            </Typography>
          </Grow>
        </React.Fragment>
      )}
    </Container>
  );
}
