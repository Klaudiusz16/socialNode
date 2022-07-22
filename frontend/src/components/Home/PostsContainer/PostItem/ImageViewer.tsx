import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Grow } from "@mui/material";

const Container = styled.div`
  background-color: #000000cc;
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  z-index: 8;
  left: 0;
  top: 0;
`;

const ImageWrapper = styled.div`
  width: 95%;
  margin: 10vh auto;
  height: 25rem;
  max-width: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }

  @media (min-width: 769px) {
    max-width: 50rem;
    height: 40rem;
    width: 50rem;
    margin: 60px auto;
  }
`;

const Shourtcuts = styled.div`
  ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track {
    height: 0;
    width: 0;
  }
  box-sizing: border-box;
  max-width: 95%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-left: 10px;
  gap: 5px;
  img {
    width: 80px;
    height: 98%;
  }
`;
export default function ImageViewer({
  Images,
  closeViewerFunction,
  isImageViewerOpen,
}: {
  Images: string[];
  closeViewerFunction: Function;
  isImageViewerOpen: boolean;
}) {
  const [selectedImage, selectImage] = useState<string>(
    Images.length ? Images[0] : ""
  );

  return (
    <Grow in={isImageViewerOpen}>
      <Container
        onClick={(e) =>
          !(e.target as HTMLDivElement).closest(".viewed_image") &&
          !(e.target as HTMLDivElement).closest(".images_shortcuts")
            ? closeViewerFunction()
            : null
        }
      >
        <Button onClick={() => closeViewerFunction()}>
          <CloseIcon sx={{ color: "white", transform: "scale(1.2)" }} />
        </Button>
        <ImageWrapper className="viewed_image">
          <img src={selectedImage} alt={"userImage-" + selectImage} />
        </ImageWrapper>
        <Shourtcuts className="images_shortcuts">
          {Images.map((image) => (
            <img
              key={image}
              src={image}
              onClick={() => selectImage(image)}
              alt={image}
              style={{
                border:
                  image === selectedImage ? "1px solid var(--blue)" : "none",
                cursor: "pointer",
              }}
            />
          ))}
        </Shourtcuts>
      </Container>
    </Grow>
  );
}
