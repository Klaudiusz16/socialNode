import { Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { PostType } from "../../../../interfaces/PostType";
import ImageViewer from "./ImageViewer";

const Container = styled.div`
  margin: 10px 0;
  padding: 0 10px;
  width: 100%;
`;

const ImagesContainer = styled.div`
  max-width: 60%;
  max-height: 100%;
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const LookForOthersImages = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: block;
  right: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 25px);
  background-color: var(--blue);
  color: white;
  cursor: pointer;
  opacity: 0.8;
`;

export default function PostContent({ postData }: { postData: PostType }) {
  const isHaveImage = postData.Images.length;
  const [isImageViewerOpen, SetImageViewerState] = useState<boolean>(false);

  return (
    <Container>
      <Typography>{postData.TextContent}</Typography>
      {isHaveImage ? (
        <ImagesContainer>
          <img
            src={postData.Images[0]}
            alt={postData.Creator.Firstname + " " + postData.Creator.Surname}
          />
          {postData.Images.length > 1 ? (
            <LookForOthersImages onClick={() => SetImageViewerState(true)}>
              {"+" + (postData.Images.length - 1)}
            </LookForOthersImages>
          ) : null}
        </ImagesContainer>
      ) : null}
      <ImageViewer
        closeViewerFunction={() => SetImageViewerState(false)}
        Images={postData.Images}
        isImageViewerOpen={isImageViewerOpen}
      />
    </Container>
  );
}
