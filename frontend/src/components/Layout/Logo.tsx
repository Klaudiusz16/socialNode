import React from "react";
import styled, { css } from "styled-components";
import { Typography } from "@mui/material";
import { navigate } from "gatsby";
// @ts-ignore
import LogoPNG from "./logo.png";

const LogoWrapper = styled.div<{ width: string; height: string }>`
  border-radius: 5px;
  background-color: white;
  ${({ width, height }) =>
    width &&
    css`
      min-width: ${width};
      min-height: ${height};
      max-width: ${width};
      max-height: ${height};
    `};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  overflow: hidden;
  img {
    height: 100%;
    width: 0fr;
  }
`;

export default function Logo({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
  return (
    <LogoWrapper onClick={() => navigate("/")} width={width} height={height}>
      <img src={LogoPNG} alt="logo" />
    </LogoWrapper>
  );
}
