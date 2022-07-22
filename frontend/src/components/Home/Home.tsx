import React from "react";
import styled from "styled-components";
import PostCreator from "./PostCreator/PostCreator";
import PostsContainer from "./PostsContainer/PostsContainer";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--gray);
  /* min-height: 100vh; */
  /* height: 100%; */

  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
  max-width: 100%;
  ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track {
    width: 0;
  }
`;
export default function Home() {
  return (
    <Container>
      <PostCreator />
      <PostsContainer />
    </Container>
  );
}
