import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import {
  Avatar,
  Button,
  Grow,
  imageListClasses,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { gql, useMutation } from "@apollo/client";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useAppDispatch } from "./../../../redux/hooks";
import { updateAlertState } from "../../../redux/AlertSlice";
import { SERVER } from "../../../config";

const Container = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  position: relative;
  z-index: 0;
  padding: 10px 5px;
  background-color: white;
  max-width: 100%;
  width: 95vw;
  margin: 0 auto;

  @media (min-width: 769px) {
    max-width: 40rem;
    width: 40rem;
    border-radius: 15px;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  margin-right: 20px;
`;

const AddPhotoShourtcut = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  color: var(--blue);
  cursor: pointer;
  background-color: white;
  z-index: 5;
  transition: transform 0.1s ease-in-out;
  :active,
  :hover {
    transform: scale(1.1);
  }
`;

const AttachedImage = styled.p`
  border-radius: 15px;
  min-width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  background-color: var(--blue);
  color: white;
  font-weight: thin;
  padding: 2px 5px;
  margin: 0;
  align-items: center;
  gap: 3px;
`;

export default function PostCreator() {
  const {
    Firstname,
    Surname,
    Avatar: avatarSrc,
  } = useAppSelector((state) => state.user);

  const { id } = useAppSelector((state) => state.user);

  const [postInputValue, updateInputValue] = useState<string>("");

  const [attachedImages, attachImages] = useState([]);

  const dispatch = useAppDispatch();

  const [addPost, { data, loading, error }] = useMutation<
    { addPost: any },
    {
      textContent: string;
      creator: string;
      images: any[];
      date: string;
    }
  >(ADD_POST, {
    onCompleted: () => {
      updateInputValue("");
      attachImages([]);
    },

    variables: {
      textContent: postInputValue,
      creator: id,
      images: attachedImages,
      date: new Date().toISOString(),
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    addPost();
  };

  useEffect(() => {
    if (data && data.addPost) {
      dispatch(updateAlertState(data?.addPost?.error));
    }
  }, [data]);

  const UploadOwnPhoto = useRef(null);

  return (
    <Container onSubmit={(e) => submitHandler(e)}>
      <AddPhotoShourtcut
        onClick={() => {
          UploadOwnPhoto.current.click();
        }}
      >
        <CameraAltIcon />
      </AddPhotoShourtcut>
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg"
        id="upload-image-original-button"
        ref={UploadOwnPhoto}
        style={{
          display: "none",
        }}
        onChange={(e) => {
          const images = (e.target as HTMLInputElement).files;
          const imagesToState = [...attachedImages];
          for (let i = images.length - 1; i >= 0; i--) {
            imagesToState.push(images[i]);
          }
          attachImages(imagesToState);
          (e.target as HTMLInputElement).value = null;
        }}
      />
      <Row>
        <Avatar
          src={SERVER + "avatar/" + avatarSrc}
          alt={`User ${Firstname + " " + Surname} Avatar `}
        />
        <TextField
          multiline
          rows={2}
          placeholder={`What's up ${Firstname}?`}
          fullWidth
          size="small"
          value={postInputValue}
          onChange={(e) => updateInputValue(e.target.value)}
          sx={{
            fieldset: {
              borderRadius: "15px",
            },
            "&::focus": {
              borderColor: "var(--blue)",
            },
          }}
        />
      </Row>
      <Row>
        {attachedImages.map((image, i) => (
          <Grow in={true} key={image.name + i}>
            <AttachedImage>
              {image.name}{" "}
              <RemoveCircleOutlineIcon
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  const filtered = attachedImages.filter(
                    (img) =>
                      img.name + img.lastModified !=
                      image.name + image.lastModified
                  );
                  attachImages(filtered);
                }}
              />
            </AttachedImage>
          </Grow>
        ))}
      </Row>
      {postInputValue.length ? (
        <Grow in={true}>
          <Buttons>
            <Button
              variant="outlined"
              sx={{
                color: "var(--blue)",
              }}
              onClick={() => {
                dispatch(updateAlertState(false));
                updateInputValue("");
                attachImages([]);
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--blue)",
              }}
              type="submit"
            >
              Post
            </Button>
          </Buttons>
        </Grow>
      ) : null}
    </Container>
  );
}

const ADD_POST = gql`
  mutation addPost(
    $textContent: String!
    $creator: String!
    $images: [Upload!]!
    $date: String!
  ) {
    addPost(
      textContent: $textContent
      creator: $creator
      images: $images
      date: $date
    ) {
      id
      error
    }
  }
`;
