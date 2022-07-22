import { Slide } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch } from "./../../redux/hooks";
import { updateAlertState } from "../../redux/AlertSlice";

const Wrapper = styled.div`
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  color: white;
  background-color: var(--blue);
`;

const HideAlert = styled.div`
  position: absolute;
  right: 50px;
  top: 15px;
  cursor: pointer;
`;

export default function Alert() {
  const { alertValue } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  return (
    <Slide direction="up" in={alertValue ? true : false}>
      <Wrapper>
        <HideAlert>
          <ClearIcon onClick={() => dispatch(updateAlertState(false))} />
        </HideAlert>
        <p>{alertValue}</p>
      </Wrapper>
    </Slide>
  );
}
