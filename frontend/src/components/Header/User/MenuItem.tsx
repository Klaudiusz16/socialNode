import { Typography } from "@mui/material";
import { navigate } from "gatsby";
import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../redux/hooks";
import { switchUserMenuModal } from "../../../redux/modalStates";

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: white;
  transition: background-color 0.2s ease-in-out;
  background-color: var(--blue);
  :hover {
    background-color: #2276c52f;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export default function MenuItem({
  href,
  icon: Icon,
  name,
}: {
  href: string;
  icon: any;
  name: string;
}) {
  const dispatch = useAppDispatch();
  return (
    <Wrapper
      onClick={() => {
        if (name == "Logout") {
          document.cookie = "signedin=false";
          document.cookie = "userID=false";
          document.cookie = "jwt=false";
        }
        dispatch(switchUserMenuModal("off"));
        navigate(href);
      }}
    >
      <Icon />
      <Typography fontFamily={"Kdam Thmor Pro"} fontSize="14px">
        {name}
      </Typography>
    </Wrapper>
  );
}
