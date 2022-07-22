import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Typography, TextField, Button, Grow } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { updateAlertState } from "../../../../redux/AlertSlice";
import { useAppDispatch } from "./../../../../redux/hooks";
import { SERVER } from "../../../../config";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 96%;
  justify-content: flex-start;
  background-color: var(--gray);
  margin: 0 auto;
  border-radius: 15px;
  padding: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 15px;

  max-width: 100%;
`;

const Column = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  padding-left: 5px;
  gap: 5px;
  width: 100%;
  max-width: 100%;
`;

export default function CommentCreator({ postID }: { postID: string }) {
  const {
    Avatar: avatarSrc,
    Firstname,
    Surname,
    id,
  } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [commentValue, setCommentValue] = useState<string>("");

  const [addCommentFunction, { data, error }] = useMutation(ADD_COMMENT, {
    variables: {
      userID: id,
      postID: postID,
      textContent: commentValue,
      date: new Date().toISOString(),
    },
    onCompleted: () => {
      setCommentValue("");
    },
  });

  if (data && data.addComment) {
    dispatch(updateAlertState(data.addComment.error));
  }

  return (
    <Container>
      <Column>
        <Row>
          <Avatar src={SERVER + "avatar/" + avatarSrc} />
          <Typography>{Firstname + " " + Surname}</Typography>
        </Row>
        <Row>
          <TextField
            multiline
            rows={2}
            placeholder={`Comment this post`}
            size="small"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            style={{ width: "70%" }}
            sx={{
              fieldset: {
                borderRadius: "15px",
              },
              "&::focus": {
                borderColor: "var(--blue)",
              },
            }}
          />

          <Button
            sx={{
              color: "var(--blue)",
            }}
            onClick={() => {
              dispatch(updateAlertState(false));
              addCommentFunction();
            }}
          >
            Comment
          </Button>
        </Row>
      </Column>
    </Container>
  );
}

const ADD_COMMENT = gql`
  mutation addComment(
    $userID: String!
    $postID: String!
    $textContent: String!
    $date: String!
  ) {
    addComment(
      userID: $userID
      postID: $postID
      textContent: $textContent
      date: $date
    ) {
      userID
      error
    }
  }
`;
