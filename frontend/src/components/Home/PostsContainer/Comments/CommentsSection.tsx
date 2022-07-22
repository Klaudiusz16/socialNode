import React from "react";
import styled from "styled-components";
import { Grow, List, ListItem, Button, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import CommentCreator from "./CommentCreator";

const Container = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--blue);
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: none;
  max-width: 98vw;
  left: 1%;
  margin-top: 20px;
  max-height: 20rem;
  border: none;
`;

const MyList = styled(List)`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  max-height: 100%;
`;

export default function CommentsSection({
  isOpen,
  closeFNC,
  commentsData,
  postID,
}: {
  isOpen: boolean;
  closeFNC: Function;
  commentsData: {
    id: string;
    Creator: {
      Firstname: string;
      Surname: string;
      Avatar: string;
      id: string;
    };
    CommenContent: string;
    Date: string;
  }[];
  postID: string;
}) {
  return (
    <Grow in={isOpen}>
      <Container className="comments_container">
        <MyList
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <CommentCreator postID={postID} />
          {[...commentsData].map((comment) => (
            <ListItem
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
              key={comment.id}
            >
              <CommentItem commentData={comment} />
            </ListItem>
          ))}
        </MyList>
      </Container>
    </Grow>
  );
}
