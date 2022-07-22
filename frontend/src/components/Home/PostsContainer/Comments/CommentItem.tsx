import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { CalcTime } from "../../../calctime/calcTime";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import { useAppSelector } from "../../../../redux/hooks";
import { gql, useMutation } from "@apollo/client";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-start;
  background-color: var(--gray);
  padding: 10px 20px;
  border-radius: 15px;
  gap: 10px;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 5px;
`;

const RemoveCommentIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  color: var(--blue);
`;

export default function CommentItem({
  commentData,
}: {
  commentData: {
    id: string;
    Creator: {
      Firstname: string;
      Surname: string;
      Avatar: string;
      id: string;
    };
    CommentContent: string;
    Date: string;
  };
}) {
  const { id: userID } = useAppSelector((state) => state.user);

  const [deleteComment, { data }] = useMutation(DELETE_COMMENT, {
    variables: {
      commentID: commentData.id,
      userID: userID,
    },
  });
  return (
    <Container>
      {commentData.Creator.id === userID ? (
        <RemoveCommentIcon onClick={() => deleteComment()}>
          <RemoveCircleOutline sx={{ cursor: "pointer" }} />
        </RemoveCommentIcon>
      ) : null}

      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
            gap: "9px",
          }}
        >
          <Avatar src={commentData.Creator.Avatar} />
          <Column>
            <Typography fontSize="16px" fontWeight={"400"}>
              {commentData.Creator.Firstname +
                " " +
                commentData.Creator.Surname}
            </Typography>
            <Typography fontSize="12px">
              {CalcTime(new Date(commentData.Date))}
            </Typography>
          </Column>
        </div>
      </Row>
      <Typography>{commentData.CommentContent}</Typography>
    </Container>
  );
}
const DELETE_COMMENT = gql`
  mutation deleteComment($commentID: String!, $userID: String!) {
    deleteComment(commentID: $commentID, userID: $userID) {
      error
    }
  }
`;
