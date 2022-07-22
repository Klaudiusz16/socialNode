import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import PostCreator from "../Home/PostCreator/PostCreator";
import { PostType } from "./../../interfaces/PostType";
import PostItem from "./../Home/PostsContainer/PostItem/PostItem";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
  overflow-x: hidden;
`;

const PostCaptionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: -30px;
  margin-bottom: 20px;
`;

const PostsList = styled.div`
  overflow-y: scroll;
  width: 100%;
  overflow-x: hidden;
  height: 100%;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export default function PostsActivity({ posts }: { posts: PostType[] }) {
  return (
    <Container>
      <PostCaptionWrapper>
        <Typography
          fontSize="19px"
          sx={{
            color: "white",
            textAlign: "left",
            padding: "5px",
            marginLeft: "10px",
            backgroundColor: "var(--blue)",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          Posts
        </Typography>
      </PostCaptionWrapper>
      <PostCreator />
      <PostsList>
        {posts.length ? (
          [...posts]
            .sort(
              (post1, post2) =>
                new Date(post2.Date).getTime() - new Date(post1.Date).getTime()
            )
            .map((post) => <PostItem postData={post} key={post.id} />)
        ) : (
          <Typography
            sx={{
              color: "var(--blue)",
              width: "100%",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            No one posts yet
          </Typography>
        )}
      </PostsList>
    </Container>
  );
}
