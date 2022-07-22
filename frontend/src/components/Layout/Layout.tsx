import React, { useState } from "react";

import { createGlobalStyle } from "styled-components";
import Header from "../Header/Header";
import { store } from "../../redux/store";
import OutsideClickHandler from "./OutsideClickHandler";
import Alert from "./../Alert/Alert";
import { navigate } from "@gatsbyjs/reach-router";
import Report from "../Report/Report";
import { Grow } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

const GlobalStyles = createGlobalStyle`
    :root {--gray: #f8f8f8; --blue: #57a9cd;  --gradient: linear-gradient(to right, #00d2ff, #928dab)}

    body {
        margin: 0;
        padding:0;
        background-color: var(--gray);
        font-family: 'Kdam Thmor Pro', sans-serif;
        /* overflow-x: hidden; */
        min-height: 100vh;
        min-width:100vw;
        box-sizing: border-box;

    }

    ::-webkit-scrollbar {
  width: 0px;
    }
    ::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #6aa4e6;
  border-radius: 5px;
}    
`;

export default function Layout({
  children,
  isLogged,
}: {
  children: any;
  isLogged: boolean;
}) {
  if (!isLogged) navigate("/");
  const { report: isReportModalOpen } = useAppSelector((state) => state.modals);
  return (
    <>
      <OutsideClickHandler>
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
        {isLogged ? <Header /> : null}
        {children}
      </OutsideClickHandler>
      {isReportModalOpen ? <Report /> : null}

      <Alert />
    </>
  );
}
