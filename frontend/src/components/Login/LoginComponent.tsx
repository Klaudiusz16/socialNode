import {
  Button,
  CircularProgress,
  Grow,
  TextField,
  Typography,
} from "@mui/material";
import { navigate } from "gatsby-link";
import React, { useState } from "react";
import styled from "styled-components";
import { SERVER } from "../../config";

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
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;
  @media (min-width: 768px) {
    max-width: 30rem;
    min-width: auto;
    border-radius: 15px;
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

export default function LoginContainer({
  goToRegister,
}: {
  goToRegister: Function;
}) {
  const [passedValue, updatePassedValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [errorFromServer, setErrorFromServer] = useState<string | boolean>(
    false
  );

  const [isSubmiting, setSubmitState] = useState<boolean>(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setSubmitState(true);
      setErrorFromServer(false);

      const request = await fetch(SERVER + "login", {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: passedValue.email.toLowerCase(),
          password: passedValue.password,
        }),
      });

      const { userID, errors } = await request.json();

      if (!userID) {
        throw errors[0];
      }

      document.cookie = `userID=${userID}`;
      document.cookie = "signedin=true";

      setSubmitState(false);

      navigate("/");
    } catch (err) {
      setErrorFromServer([err].flat(0).join());
      setSubmitState(false);
      return;
    }
  };

  return (
    <Container onSubmit={(e) => submitHandler(e)}>
      <Typography
        marginBottom={"20px"}
        fontWeight={"500"}
        fontSize="22px"
        letterSpacing="1px"
      >
        Login on SocialNode
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        onChange={(e) =>
          updatePassedValue({
            email: e.target.value,
            password: passedValue.password,
          })
        }
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) =>
          updatePassedValue({
            email: passedValue.email,
            password: e.target.value,
          })
        }
      />
      {isSubmiting ? (
        <Grow in={isSubmiting}>
          <CircularProgress />
        </Grow>
      ) : (
        <>
          <MyButton type="submit">
            <Typography>Login</Typography>
          </MyButton>
          <ForMobile>
            <Typography>or</Typography>
            <MyButton onClick={() => goToRegister()}>
              <Typography>Sign Up</Typography>
            </MyButton>
          </ForMobile>
        </>
      )}
      {errorFromServer ? (
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
      ) : null}
    </Container>
  );
}
