import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import PostsActivity from "./PostsActivity";
import UserSection from "./UserSection";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: var(--gray);
  margin-top: 70px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background-color: white;
  gap: 6px;
  overflow-x: hidden;
  padding-bottom: 50px;
  max-width: 60rem;
  margin: 0 auto;
  margin-top: 70px;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default function Profile({ location }) {
  const userID =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { data: userData, loading: userDataLoading } = useQuery(GET_USER_DATA, {
    variables: {
      ID: userID,
      pollInterval: 500,
      fetchPolicy: "no-cache",
    },
  });
  const { id: loggedUserID } = useAppSelector((state) => state.user);
  const { data: userPosts, loading: userPostsLoading } = useQuery(
    GET_USER_POSTS,
    {
      variables: {
        userID: userID,
      },
      pollInterval: 500,
      fetchPolicy: "no-cache",
    }
  );

  let isFriend = userData?.getUserData?.Friends?.find(
    (ship) => ship.User1.id == loggedUserID || ship.User1.id == loggedUserID
  );

  const [inviteFriend] = useMutation(MAKE_FRIEND_INVITE, {
    variables: {
      sender: loggedUserID,
      friend: userID,
      date: new Date().toISOString(),
    },
    onCompleted: () => {
      isFriend = true;
    },
  });

  if (userDataLoading || userPostsLoading)
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );

  if (userData?.getUserData && userPosts?.getUserPosts) {
    return (
      <Container>
        <UserSection userData={userData.getUserData} />
        {loggedUserID != userID ? (
          <Button
            sx={{
              backgroundColor: "var(--blue)",
              color: "white",
              "&: hover": {
                backgroundColor: "var(--blue)",
              },
            }}
            onClick={() => {
              isFriend ? null : inviteFriend();
              isFriend = true;
            }}
          >
            {isFriend ? "- Remove Friend" : "+ Add Friend"}
          </Button>
        ) : null}

        <PostsActivity posts={userPosts.getUserPosts} />
      </Container>
    );
  }
}

const GET_USER_DATA = gql`
  query getUserData($ID: String!) {
    getUserData(ID: $ID) {
      id
      Firstname
      Surname
      Email
      Country
      Avatar
      DateOfBirth
      Friends {
        id
        User1 {
          Firstname
          Surname
          id
          Avatar
        }
        User2 {
          Firstname
          Surname
          id
          Avatar
        }
        Since
      }
    }
  }
`;

const GET_USER_POSTS = gql`
  query getUserPosts($userID: String!) {
    getUserPosts(userID: $userID) {
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

const MAKE_FRIEND_INVITE = gql`
  mutation makeFriendInvate($sender: String!, $friend: String!, $date: String) {
    makeFriendInvate(sender: $sender, friend: $friend, date: $date) {
      id
    }
  }
`;
