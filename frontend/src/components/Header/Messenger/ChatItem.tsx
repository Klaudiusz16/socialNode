import React, { useEffect, useState } from "react";
import { ChatType } from "../../../interfaces/ChatType";
import styled, { css } from "styled-components";
import { Avatar, Typography } from "@mui/material";
import { CalcTime } from "../../calctime/calcTime";
import { useAppSelector } from "../../../redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { MessageType } from "./../../../interfaces/ChatType";

const Container = styled.div<{ isNewMessage: boolean }>`
  width: 310px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 8px 5px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.1s ease-in-out;
  :hover,
  :active {
    background-color: rgba(106, 164, 230, 0.1);

    transition: background-color 0.1s ease-in-out;
  }

  position: relative;
  ${({ isNewMessage }) =>
    isNewMessage &&
    css`
      ::before {
        content: "";
        position: absolute;
        border-radius: 50%;
        width: 8px;
        display: block;
        height: 8px;
        top: 8px;
        right: 15px;
        background-color: var(--blue);
      }
    `}
`;

const MyColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  flex-wrap: nowrap;
  min-height: 80px;
`;

export default function ChatItem({ chatData }: { chatData: ChatType }) {
  const { id: userID } = useAppSelector((state) => state.user);
  let friend = chatData.Participants.find((par) => par.id != userID);
  let user = chatData.Participants.find((par) => par.id == userID);

  const [lastMessage, updateLastMessage] = useState<MessageType>(
    chatData.Messages.sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
    )[0]
  );

  useEffect(() => {
    const last = chatData.Messages.sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
    )[0];

    updateLastMessage(last);
  }, [chatData]);

  let lastMessageType = lastMessage?.Creator.id == userID ? "user" : "friend";
  const isNewMessage =
    !lastMessage?.IsRead && lastMessage?.Creator.id != userID ? true : false;

  const [makeMessageRead, { data }] = useMutation(MAKE_MESSAGE_READ, {
    variables: {
      userID: userID,
      chatID: chatData.id,
    },
  });

  if (chatData.id) {
    return (
      <Container
        data-testid="chat_item"
        isNewMessage={isNewMessage}
        onClick={() => makeMessageRead()}
      >
        <Avatar
          src={user.Avatar}
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
        <MyColumn>
          <Typography
            fontSize="16px"
            color="black"
            fontWeight={isNewMessage ? "Bold" : "400"}
          >
            {friend.Firstname + " " + friend.Surname}
          </Typography>
          <Typography
            sx={{
              maxWidth: "150px",
            }}
            noWrap
            fontSize="14px"
            fontWeight={isNewMessage ? "Bold" : "400"}
          >
            {lastMessageType === "user"
              ? "you: " + lastMessage.TextContent
              : lastMessage.TextContent}
          </Typography>
        </MyColumn>
        <Typography
          fontSize={"12px"}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexGrow: "2",
          }}
        >
          {CalcTime(new Date(lastMessage.Date))}
        </Typography>
      </Container>
    );
  }
}

const MAKE_MESSAGE_READ = gql`
  mutation makeMessageRead($userID: String!, $chatID: String!) {
    makeMessageRead(userID: $userID, chatID: $chatID) {
      id
    }
  }
`;
