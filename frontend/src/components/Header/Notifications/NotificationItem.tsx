import { Avatar, Button, Typography } from "@mui/material";
import { navigate } from "gatsby";
import React from "react";
import styled, { css } from "styled-components";
import { NotificationType } from "../../../interfaces/Notification";
import { CalcTime } from "../../calctime/calcTime";

const Container = styled.div<{ isRead: boolean }>`
  background-color: white;
  display: flex;
  flex-direction: row;
  width: 310px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  gap: 10px;
  cursor: pointer;
  position: relative;
  ::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 2px;
    display: block;
    background-color: var(--blue);
    bottom: 0;
    left: calc(135px);
    border-radius: 10px;
  }

  ${({ isRead }) =>
    !isRead &&
    css`
      ::before {
        content: "";
        position: absolute;
        border-radius: 50%;
        width: 8px;
        display: block;
        height: 8px;
        top: calc(30%);
        right: 15px;
        background-color: var(--blue);
      }
    `}
`;

const HelpedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 90%;
`;

export default function NotificationItem(notification: NotificationType) {
  return (
    <Container isRead={notification.IsRead}>
      <Avatar
        sx={{
          width: "50px",
          height: "50px",
        }}
        alt="Notification image"
        src={notification.From.Avatar}
      />
      <HelpedContainer>
        <Typography fontSize={"14px"} sx={{ width: "200px" }}>
          <span>
            {notification.From.Firstname +
              " " +
              notification.From.Surname +
              " "}
          </span>
          {notification.TextContent.length < 150
            ? notification.TextContent
            : notification.TextContent.slice(0, 150) + "..."}
        </Typography>
        <Typography
          fontSize={"8px"}
          sx={{
            width: "100%",
            textAlign: "end",
            "@media (min-width: 1024px)": {
              fontSize: "10px",
            },
          }}
        >
          {CalcTime(new Date(notification.Date))}
        </Typography>
      </HelpedContainer>
    </Container>
  );
}
