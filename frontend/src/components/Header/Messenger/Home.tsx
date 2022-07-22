import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import ChatList from "./ChatList";
import { ChatType } from "../../../interfaces/ChatType";

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
`;

export default function Home({
  setChatView,
  updateCounter,
  chats,
  refetchChats,
}: {
  setChatView: Function;
  updateCounter: Function;
  chats: ChatType[];
  refetchChats: Function;
}) {
  return (
    <Container className="messenger_home">
      <Typography
        sx={{
          color: "var(--blue)",
          height: "30px",
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "3px 0",
          backgroundColor: "white",
        }}
      >
        Chats
      </Typography>
      <ChatList
        chats={chats}
        updateCounter={updateCounter}
        setChatView={setChatView}
        refetchChats={refetchChats}
      />
    </Container>
  );
}
