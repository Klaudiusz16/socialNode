import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import ChatItem from "./ChatItem";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { ChatType } from "../../../interfaces/ChatType";
import { gql, useQuery } from "@apollo/client";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  max-height: 32rem;
  padding: 0 5px;
  overflow-x: hidden;
  width: 100%;
`;

const WriteNewMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
  border-radius: 15px;
  margin: 20px auto;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  height: 55px;
  width: 100%;
  padding-top: 6px;
`;

export default function ChatList({
  setChatView,
  updateCounter,
  chats,
  refetchChats,
}: {
  setChatView: Function;
  updateCounter: Function;
  chats: ChatType[];
  refetchChats;
}) {
  const { id: userID } = useAppSelector((state) => state.user);

  const [searchValue, setSearchValue] = useState<string>("");
  const [chatsToRender, updateChatsToRender] = useState<ChatType[]>(chats);
  const [isTyping, setTypingState] = useState<boolean>(false);
  useEffect(() => {
    updateChatsToRender(
      [...chats]
        .filter((chat) => {
          const participant = chat.Participants.find(
            (participants) => participants.id != userID
          );
          const userName = (
            participant.Firstname +
            " " +
            participant.Surname
          ).toLowerCase();
          return userName.includes(searchValue.toLowerCase());
        })
        .sort(
          (a, b) =>
            new Date(b.Messages[b.Messages.length - 1].Date).getTime() -
            new Date(a.Messages[a.Messages.length - 1].Date).getTime()
        )
    );
  }, [searchValue, chats]);

  return (
    <Container className="messenger_chatview">
      <Row>
        <TextField
          id="standard-basic"
          label={isTyping ? "Searching..." : "Search in Messenger"}
          variant="outlined"
          onFocus={() => setTypingState(true)}
          onBlur={() => setTypingState(false)}
          size="small"
          sx={{
            "& fieldset": {
              borderRadius: "15px",
            },
            "&::focus": {
              borderColor: "var(--blue)",
            },
          }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          onClick={() => setChatView("new")}
          variant="text"
          sx={{
            borderRadius: "15px",
            color: "white",
            height: "40px",
            backgroundColor: "var(--blue)",
            "&: hover": {
              backgroundColor: "var(--blue)",
            },
          }}
        >
          <AddCommentIcon />
        </Button>
      </Row>

      <List
        disablePadding
        sx={{
          overflowY: chatsToRender.length > 0 ? "scroll" : "hidden",
          height: "70vh",
          marginTop: "5px",
          overflowX: "hidden",
          marginLeft: "-10px",
        }}
      >
        {chatsToRender.length > 0
          ? chatsToRender.map((chat) => (
              <ListItem
                key={chat.id}
                onClick={() => {
                  setChatView(chat.id);
                  refetchChats();
                }}
                sx={{ width: "100%" }}
              >
                <ChatItem chatData={chat} />
              </ListItem>
            ))
          : null}
        {chatsToRender.length == 0 ? (
          <WriteNewMessageWrapper>
            <Typography
              sx={{
                width: "80%",
                color: "var(--blue)",
                background: "white",
                borderRadius: "15px",
                textAlign: "center",
                padding: "5px 0",
              }}
            >
              Oh.. You don't have any chats yet.
            </Typography>

            <Button
              variant="text"
              onClick={() => setChatView("new")}
              sx={{
                borderRadius: "15px",
                color: "var(--blue)",
                height: "60px",
                transform: "scale(1.2)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                backgroundColor: "var(--blue)",
                "&:active, &:focus, &:hover": {
                  backgroundColor: "var(--blue)",
                },
              }}
            >
              <BorderColorIcon
                sx={{
                  color: "white",
                }}
              />
              <Typography
                fontSize={"10px"}
                sx={{
                  color: "white",
                }}
              >
                Let's Write one
              </Typography>
            </Button>
          </WriteNewMessageWrapper>
        ) : null}
      </List>
    </Container>
  );
}
