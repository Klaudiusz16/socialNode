import React, { useState } from "react";
import styled from "styled-components";
import {
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { switchReportModal } from "../../../../redux/modalStates";

const SettingsWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 20px;
  background-color: transparent;
  color: var(--blue);
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWraper = styled.div`
  color: var(--blue) !important;
  cursor: pointer;

  background-color: white;
  &:focus,
  :active {
    background-color: white;
  }
`;

const Option = styled(Button)`
  color: var(--blue);
`;

export default function PostSettings({
  postOwnerID,
  postID,
}: {
  removeFNC?: Function;
  reportFNC: Function;
  editFNC?: Function;
  postOwnerID: string;
  postID: string;
}) {
  const { id: userID } = useAppSelector((state) => state.user);

  const [removePost, { data }] = useMutation(DELETE_POST, {
    variables: {
      postID: postID,
      userID: userID,
    },
  });

  const dispatch = useAppDispatch();

  return (
    <SettingsWrapper>
      <Option>
        <IconWraper>
          <FlagIcon onClick={() => dispatch(switchReportModal("on"))} />
        </IconWraper>
      </Option>
      {userID == postOwnerID ? (
        <Option>
          <IconWraper>
            <DeleteForeverIcon onClick={() => removePost()} />
          </IconWraper>
        </Option>
      ) : null}
    </SettingsWrapper>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postID: String!, $userID: String!) {
    deletePost(postID: $postID, userID: $userID) {
      error
    }
  }
`;
