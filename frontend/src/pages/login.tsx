import React, { useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import LoginComponent from "../components/Login/LoginComponent";
import RegisterComponent from "../components/Register/RegisterComponent";

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(to right, #00d2ff, #928dab);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const GlobalStyles = createGlobalStyle`
  body{ 
    padding: 0;
    box-sizing: border-box;
    margin: 0;
    font-family: 'Kdam Thmor Pro', sans-serif !important;

    
  }
:root {--gray: #f8f8f8; --blue: #6aa4e6; --gradient: linear-gradient(to right, #00d2ff, #928dab)}
`;

const FormsWrapper = styled.div<{ isRegisterView: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 35px;
  margin-top: 60px;

  @media (max-width: 1060px) {
    flex-direction: column;
    margin-top: 0px;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 0px;
    flex-direction: row;
    transition: transform 0.2s ease-in-out;
    ${({ isRegisterView }) =>
      isRegisterView &&
      css`
        transform: translateX(-100%);
      `}
  }
`;

export default function Login() {
  const [selectedForm, selectForm] = useState<"login" | "register">("login");
  return (
    <Container>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={"true"}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap"
        rel="stylesheet"
      />
      <GlobalStyles />
      <FormsWrapper isRegisterView={selectedForm == "register"}>
        <LoginComponent goToRegister={() => selectForm("register")} />
        <RegisterComponent goToLogin={() => selectForm("login")} />
      </FormsWrapper>
    </Container>
  );
}
