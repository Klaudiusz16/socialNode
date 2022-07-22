import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";

import PostItem from "./PostItem/PostItem";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100%;
  max-width: 100%;
  margin-top: 10px;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  padding-bottom: 50px;

  @media (min-width: 769px) {
    max-width: 40rem;
    width: 40rem;
    gap: 20px;
  }
`;

export default function PostsContainer() {
  const { loading, error, data } = useQuery(GET_POSTS, {
    pollInterval: 500,
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (data && data.getPosts)
    return (
      <Container>
        {[...data.getPosts]
          .sort(
            (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
          )
          .map((post) => (
            <PostItem postData={post} key={post.id} />
          ))}
      </Container>
    );
}

const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      Creator {
        Avatar
        Surname
        Firstname
        id
      }
      Date
      TextContent
      Images
      LikedBy
      Comments {
        id
        Creator {
          Surname
          Firstname
          Avatar
          id
        }
        CommentContent
        Date
        LikedBy
      }
    }
  }
`;
