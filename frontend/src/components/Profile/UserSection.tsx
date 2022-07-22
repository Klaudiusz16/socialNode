import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserType } from "./../../interfaces/UserType";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAppSelector } from "../../redux/hooks";
import CakeIcon from "@mui/icons-material/Cake";
import { gql, useMutation } from "@apollo/client";
import { SERVER } from "./../../config";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const AvatarWrapper = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
`;

const ChangePhoto = styled.div`
  position: absolute;
  bottom: 10%;
  right: 0%;
  color: var(--blue);
  height: 60px;
  cursor: pointer;
  &:active,
  &:hover {
    transform: scale(1.05);
  }
  .camera_icon {
    font-size: 60px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
  gap: 10px;
  color: var(--blue);
`;

export default function UserSection({ userData }: { userData: UserType }) {
  const { id: userID } = useAppSelector((state) => state.user);
  const [selectedImage, selectImage] = useState(null);
  const UploadOwnPhoto = useRef(null);

  const [updateAvatar, { data }] = useMutation(UPDATE_USER_AVATAR, {
    variables: {
      image: selectedImage,
      userID: userID,
    },
    onCompleted: () => {
      window.location.reload();
    },
  });

  useEffect(() => {
    if (data?.updateUserAvatar?.id) selectImage(null);
  }, [data]);

  return (
    <Container>
      <AvatarWrapper>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="upload-image-original-button"
          ref={UploadOwnPhoto}
          style={{
            display: "none",
          }}
          onChange={(e) => {
            selectImage((e.target as HTMLInputElement).files[0]);
          }}
        />
        <Avatar
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : SERVER + "avatar/" + userData.Avatar
          }
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
        {userID == userData.id ? (
          <ChangePhoto
            onClick={() => {
              UploadOwnPhoto.current.click();
            }}
          >
            <CameraAltIcon className="camera_icon" />
          </ChangePhoto>
        ) : null}
      </AvatarWrapper>
      {selectedImage ? (
        <Row>
          <Button onClick={() => updateAvatar()}>Save Avatar</Button>
          <Button onClick={() => selectImage(null)}>Decline</Button>
        </Row>
      ) : null}
      <Typography
        sx={{ margin: "20px 0" }}
        fontSize={"26px"}
        fontWeight={"500"}
      >
        {userData.Firstname + " " + userData.Surname}
      </Typography>{" "}
      <Row>
        <Button
          sx={{
            backgroundColor: "var(--blue)",
            "&:hover": { backgroundColor: "var(--blue)" },
          }}
        >
          <Typography sx={{ color: "white" }}>
            Friends: {userData.Friends.length}
          </Typography>
        </Button>
        <Typography sx={{ color: "var(--blue)" }}>
          {userData.Country}
        </Typography>
      </Row>
      <Row>
        <CakeIcon />
        <Typography>
          {new Date(userData.DateOfBirth).toLocaleDateString()}
        </Typography>
      </Row>
    </Container>
  );
}
const UPDATE_USER_AVATAR = gql`
  mutation updateUserAvatar($image: Upload!, $userID: String) {
    updateUserAvatar(image: $image, userID: $userID) {
      id
    }
  }
`;
