import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { PostType } from "../../../../interfaces/PostType";
import { CalcTime } from "../../../calctime/calcTime";
import PostContent from "./PostContent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

import PostSettings from "./PostSettings";
import { useAppSelector } from "../../../../redux/hooks";
import CommentsSection from "../Comments/CommentsSection";
import { gql, useMutation } from "@apollo/client";
import { navigate } from "gatsby";
import { SERVER } from "../../../../config";

const Container = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 5px;
  padding-bottom: 0;
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  @media (min-width: 769px) {
    border-radius: 15px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  background-color: white;
`;

const Column = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 5px;
`;

const BottomPanel = styled.div`
  min-width: 98%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  margin-left: 0px;
`;

const StyledButton = styled(Button)`
  width: 48%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export default function PostItem({ postData }: { postData: PostType }) {
  const Liked = postData.LikedBy;
  const { id: userID } = useAppSelector((state) => state.user);

  const [likePostFunction, { data, loading, error }] = useMutation(LIKE_POST, {
    variables: {
      postID: postData.id,
      userID: userID,
    },
  });



  const isPostLiked = Liked.includes(userID);
  const [isComments, setCommentsState] = useState<boolean>(false);
  return (
    <Container>
      <Row
        style={{
          width: "100%",
        }}
      >
        <Row
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/profile/" + postData.Creator.id)}
        >
          <Avatar src={SERVER + "avatar/" + postData.Creator.Avatar} />
          <Column>
            <Typography>
              {postData.Creator.Firstname + " " + postData.Creator.Surname}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              {CalcTime(new Date(postData.Date))}
            </Typography>
          </Column>
        </Row>
        <PostSettings
          postID={postData.id}
          postOwnerID={postData.Creator.id}
          reportFNC={() => {}}
        />
      </Row>
      <PostContent postData={postData} />
      <BottomPanel>
        <StyledButton
          onClick={() => likePostFunction()}
          sx={{
            gap: "10px",
            color: "white",
            backgroundColor: "var(--blue)",

            "&:focus,&:hover": {
              color: "white",
              backgroundColor: "var(--blue)",
            },
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {postData.LikedBy.length}
          </Typography>
          <ThumbUpIcon
            sx={{
              color: isPostLiked ? "#abc3e2" : "white",
            }}
          />
        </StyledButton>
        <StyledButton
          onClick={() =>
            isComments ? setCommentsState(false) : setCommentsState(true)
          }
          sx={{
            gap: "10px",
            color: "white",
            backgroundColor: isComments ? "#c4c4c4" : "var(--blue)",
            "&:focus,&:hover": {
              color: "white",
              backgroundColor: isComments ? "#c4c4c4" : "var(--blue)",
            },
          }}
        >
          <CommentIcon />{" "}
          {postData.Comments.length ? `${postData.Comments.length}` : null}
        </StyledButton>
      </BottomPanel>
      {isComments ? (
        <CommentsSection
          postID={postData.id}
          isOpen={isComments}
          closeFNC={() => setCommentsState(false)}
          commentsData={postData.Comments}
        />
      ) : null}
    </Container>
  );
}

const LIKE_POST = gql`
  mutation postLikeHandler($postID: String!, $userID: String!) {
    postLikeHandler(postID: $postID, userID: $userID) {
      userID
    }
  }
`;
