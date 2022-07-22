import { Avatar, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { resourceLimits } from "worker_threads";

const Wrapper = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px;
  :hover {
    background-color: #80808014;
    transition: background-color 0.1s ease-in-out;
  }
`;

export default function ResultItem({
  result,
}: {
  result: {
    Firstname: string;
    Surname: string;
    id: string;
    Avatar: string;
  };
}) {
  return (
    <Wrapper>
      <Avatar src={result.Avatar} alt={"avatar" + result.id} />
      <Typography>{result.Firstname + " " + result.Surname}</Typography>
    </Wrapper>
  );
}
