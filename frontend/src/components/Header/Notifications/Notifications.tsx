import { Grow, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppSelector } from "../../../redux/hooks";
import NotificationItem from "./NotificationItem";
import { useAppDispatch } from "../../../redux/hooks";
import { switchNotificationsModal } from "../../../redux/modalStates";
import { gql, useMutation, useQuery } from "@apollo/client";
import { NotificationType } from "./../../../interfaces/Notification";

const Container = styled.div<{ counter: number }>`
  position: relative;
  z-index: 4;
  ${({ counter }) =>
    counter &&
    css`
      ::before {
        content: "${counter.toString()}";
        position: absolute;
        background-color: white;
        color: var(--blue);
        z-index: 4;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: -4px;
        left: 0;
      }
    `};
`;

const NotificationsListWrapper = styled.div<{ isEmpty: boolean }>`
  border-radius: 5px;
  position: fixed;
  width: 330px;
  left: calc(50% - 165px);
  position: fixed;
  background-color: white;
  top: 80px;
  max-height: 80%;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 28px -16px rgba(66, 68, 90, 1);

  @media (min-width: 600px) {
    position: absolute;
    left: -300px;
    top: 60px;
    height: ${({ isEmpty }) => (isEmpty ? "initial" : "30rem")};
    max-height: initial;
  }
`;

const NotificationIconWrapper = styled.div<{ isOpen: boolean }>`
  background-color: white;
  color: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
  transition: border 0.1s ease-in-out, background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      border: 1px solid var(--blue);
      background-color: white;
      color: var(--blue);
    `};
`;

export default function Notifications({ playAudio }) {
  const dispatch = useAppDispatch();
  const { notifications: isOpen } = useAppSelector((state) => state.modals);
  const [notificationsToRender, updateNotifications] = useState<
    NotificationType[]
  >([]);
  const newNotificationsCounter = notificationsToRender.filter(
    (not) => not.IsRead === false
  ).length;

  const { id: userID } = useAppSelector((state) => state.user);

  const { data: NotificationsData } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      userID: userID,
    },
    pollInterval: 500,
  });

  const [readNotifications] = useMutation(MAKE_NOTIFICATIONS_READ, {
    variables: {
      userID: userID,
    },
  });

  useEffect(() => {
    if (NotificationsData?.getNotifications) {
      updateNotifications(NotificationsData?.getNotifications.notifications);
    }
    if (newNotificationsCounter) playAudio();
  }, [NotificationsData, newNotificationsCounter]);

  if (NotificationsData?.getNotifications) {
    return (
      <Container
        counter={newNotificationsCounter}
        className="notifications_cointainer"
      >
        <NotificationIconWrapper
          isOpen={isOpen}
          onClick={() => {
            isOpen
              ? dispatch(switchNotificationsModal("off"))
              : dispatch(switchNotificationsModal("on"));
            if (newNotificationsCounter) readNotifications();
          }}
          data-testid="notifications_icon"
        >
          <NotificationsIcon />
        </NotificationIconWrapper>

        <Grow in={isOpen}>
          <NotificationsListWrapper
            isEmpty={notificationsToRender.length === 0 ? true : false}
          >
            <Typography
              width={"100%"}
              textAlign={"center"}
              color="#6aa4e6;"
              fontWeight={"bold"}
              letterSpacing={"1px"}
              textTransform={"uppercase"}
            >
              Notifications
            </Typography>
            <List
              disablePadding
              sx={{
                display: "flex",
                flexDirection: "column",

                margin: "2px",
                overflowY: Notifications.length > 0 ? "scroll" : "hidden",
                maxHeight: "30rem",
                padding: "5px",
              }}
            >
              {notificationsToRender.length > 0 ? (
                [...notificationsToRender]
                  .sort(
                    (a, b) =>
                      new Date(b.Date).getTime() - new Date(a.Date).getTime()
                  )
                  .map((notification, i) => (
                    <ListItem
                      sx={{
                        display: "flex",
                        aliginItems: "center",
                      }}
                      disablePadding
                      key={notification.Date + i}
                    >
                      <NotificationItem {...notification} />
                    </ListItem>
                  ))
              ) : (
                <Typography
                  sx={{
                    color: "var(--blue)",
                  }}
                >
                  You don't have any notifications.
                </Typography>
              )}
            </List>
          </NotificationsListWrapper>
        </Grow>
      </Container>
    );
  }
}

const GET_NOTIFICATIONS = gql`
  query getNotifications($userID: String!) {
    getNotifications(userID: $userID) {
      notifications {
        id
        Image
        TextContent
        From {
          Firstname
          Surname
          Avatar
          id
        }
        IsRead
        Date
        UserID
      }
    }
  }
`;

const MAKE_NOTIFICATIONS_READ = gql`
  mutation makeNotificationRead($userID: String!) {
    makeNotificationRead(userID: $userID) {
      id
    }
  }
`;
