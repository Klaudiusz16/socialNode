import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Grow } from "@mui/material";
import { switchMessengerModal } from "../../../redux/modalStates";
import Home from "./Home";
import ChatView from "./ChatView/ChatView";
import { gql, useQuery } from "@apollo/client";
import { UserType } from "./../../../../../backend/app/types/UserType";
import { ChatType } from "../../../interfaces/ChatType";

const Container = styled.div<{ newMessagesCounter: number }>`
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;

  ${({ newMessagesCounter }) =>
    newMessagesCounter > 0 &&
    css`
      ::before {
        content: "${newMessagesCounter.toString()}";
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
        bottom: 5px;
        left: 0;
      }
    `};
`;

const IconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: var(--blue);
  min-height: 40px;
  position: relative;
  min-width: 40px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box;

  ${({ isOpen }) =>
    isOpen &&
    css`
      border: 1px solid var(--blue);
      background-color: white;
      color: var(--blue);
    `}
`;

const ModalWrapper = styled.div`
  position: fixed;
  background-color: white;
  top: 80px;
  left: calc(50% - 175px);
  width: 350px;
  height: 70vh;
  display: flex;
  justify-content: flex-start;
  border-radius: 10px;
  flex-direction: column;
  overflow: hidden;
  z-index: 5;
  box-shadow: 0px 0px 28px -16px rgba(66, 68, 90, 1);

  @media (min-width: 488px) {
    position: absolute;
    bottom: initial;
    left: -300px;
    top: 70px;
    max-height: 35rem;
    min-height: 35rem;
  }
`;

const Switcher = styled.div<{ isChatOpen: boolean }>`
  width: 100%;
  min-height: 0;
  display: flex;
  padding: 0;
  height: 100%;
  flex-flow: row nowrap;
  align-items: flex-start;
  transform: translateX(0px);
  transition: border 0.1s ease-in-out, background-color 0.1s ease-in-out,
    transform 0.2s ease-in-out;
  ${({ isChatOpen }) =>
    isChatOpen &&
    css`
      transform: translateX(-100%);
    `};
`;

export default function Messenger({ playAudio }) {
  const { messenger: isOpen } = useAppSelector((state) => state.modals);

  const { id: userID } = useAppSelector((state) => state.user);

  const [chatViewID, setChatView] = useState<null | string>(null);

  const dispatch = useAppDispatch();

  const [newMessagesCounter, updateCounter] = useState<number>(0);

  const [allUserList, updateAllUserList] = useState([]);

  const { data: allUsers } = useQuery(GET_ALL_USERS, {
    pollInterval: 500,
    fetchPolicy: "network-only",
  });

  const { data: chats, refetch: refetchChats } = useQuery(GET_CHATS, {
    variables: {
      userID: userID,
    },
    pollInterval: 500,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (allUsers && allUsers.getAllUsers && chats) {
      updateAllUserList(
        allUsers.getAllUsers.filter((user) => {
          if (chats.getChats.chats.length) {
            const exclude = [
              ...new Set(
                chats.getChats.chats
                  .map((chat) => {
                    return chat.Participants;
                  })
                  .flat()
              ),
            ];
            return !exclude.find((i: UserType) => i.id == user.id);
          } else {
            return user.id != userID;
          }
        })
      );
      let counter = 0;
      chats.getChats.chats.forEach((chat: ChatType) => {
        let lastMessage = chat.Messages.sort(
          (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
        )[0];

        const isNewMessage =
          !lastMessage.IsRead && lastMessage.Creator.id != userID
            ? true
            : false;

        if (isNewMessage) {
          counter = counter + 1;
        }
      });
      if (counter > newMessagesCounter) {
        playAudio();
      }
      updateCounter(counter);
    }
  }, [allUsers, chats, chatViewID]);

  if (allUsers && chats?.getChats) {
    return (
      <Container
        className="messenger_container"
        newMessagesCounter={newMessagesCounter}
      >
        <IconWrapper
          isOpen={isOpen}
          onClick={() =>
            isOpen
              ? dispatch(switchMessengerModal("off"))
              : dispatch(switchMessengerModal("on"))
          }
          data-testid="messenger_shortcut"
        >
          <ChatIcon />
        </IconWrapper>
        <Grow in={isOpen}>
          <ModalWrapper>
            <Switcher isChatOpen={chatViewID ? true : false}>
              <Home
                chats={chats.getChats.chats}
                setChatView={setChatView}
                updateCounter={updateCounter}
                refetchChats={refetchChats}
              />
              <ChatView
                allUsersList={allUserList}
                chatData={
                  chatViewID
                    ? [...chats.getChats.chats].find(
                        (chat) => chat.id == chatViewID
                      )
                    : null
                }
                setChatView={setChatView}
              />
            </Switcher>
          </ModalWrapper>
        </Grow>
      </Container>
    );
  }
}

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      Firstname
      Surname
      id
    }
  }
`;

const GET_CHATS = gql`
  query getChats($userID: String!) {
    getChats(userID: $userID) {
      chats {
        id
        Participants {
          Firstname
          Avatar
          Surname
          id
        }
        Messages {
          id
          Date
          IsRead
          TextContent
          Creator {
            Firstname
            Avatar
            Surname
            id
          }
        }
      }
    }
  }
`;
