import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Autocomplete,
  Avatar,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import MessageItem from "./MessageItem";
import { gql, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import SendIcon from "@mui/icons-material/Send";
import { updateAlertState } from "../../../../redux/AlertSlice";
import { ChatType } from "../../../../interfaces/ChatType";
import { SERVER } from "../../../../config";
import { navigate } from "gatsby";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  min-width: 100%;
  height: 70vh;
  min-height: 0;
  justify-content: flex-start;
  background-color: white;

  @media (min-width: 488px) {
    height: initial;
    min-height: 100%;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  min-height: 50px;
  gap: 10px;
  /* border-bottom: 1px solid var(--blue); */
`;

const IconArrowBackWrappper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--blue);
  margin-left: 5px;
`;
const MessagesContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 330px;
  height: 67vh;
  max-height: 27rem;
  margin-top: 5px;
  padding: 10px 10px 0 0;
  display: flex;
  padding-bottom: 20px;
  flex-direction: column-reverse;
  @media (min-width: 488px) {
    max-height: 28rem;
  }
`;
const MyAutocomplete = styled(Autocomplete)`
  width: 70%;
  height: 80%;
`;

const Sender = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: auto;
  position: fixed;
  bottom: 0;
  background-color: var(--blue);
  border-radius: 15px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  padding: 5px;
`;

export default function ChatView({
  chatData,
  setChatView,
  allUsersList,
}: {
  chatData: ChatType;
  setChatView: Function;
  allUsersList: { Firstname: string; Surname: string; id: string }[];
}) {
  const dispatch = useAppDispatch();

  const { id: userID } = useAppSelector((state) => state.user);

  const isNewChat = !chatData ? true : false;

  const friend = chatData?.Participants?.find(
    (participant) => participant.id != userID
  );

  const [selectedFriend, selectFriend] = useState<string>("");
  const [textMessage, updateTextMessage] = useState<string>("");

  const [createChat, { data: dataCreateChat, loading: loadingCreateChat }] =
    useMutation(CREATE_CHAT);
  const [sendMessage, { data: dataSendMessage, loading: loadingSendMessage }] =
    useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (dataCreateChat && dataCreateChat.createChat) {
      setChatView(dataCreateChat.createChat.id);
    }
  }, [dataCreateChat]);

  const sendMessageHandler = (): void => {
    if (isNewChat) {
      console.log("chat");
      if (!selectedFriend) {
        dispatch(updateAlertState("You have to select a recipient"));
        return;
      }
      if (isNewChat) {
        createChat({
          variables: {
            participants: [selectedFriend, userID],
            message: {
              textContent: textMessage,
              creator: userID,
              date: new Date().toISOString(),
            },
          },
        });
      }
    } else {
      if (!textMessage.trim().length) {
        dispatch(updateAlertState("Message can not be empty."));
      } else {
        sendMessage({
          variables: {
            creator: userID,
            date: new Date().toISOString(),
            textContent: textMessage,
            chatID: chatData.id,
          },
        });
        return;
      }
    }
  };

  return (
    <Container>
      <Row>
        <IconArrowBackWrappper onClick={() => setChatView(null)}>
          <ArrowBackIcon />
        </IconArrowBackWrappper>
        {isNewChat || !chatData ? (
          <MyAutocomplete
            disablePortal
            noOptionsText={""}
            id="user-searcher"
            options={allUsersList}
            getOptionLabel={(option: {
              id: string;
              Firstname: string;
              Surname: string;
            }) => option.Firstname + " " + option.Surname}
            onChange={(
              e,
              newValue: {
                id: string;
                Firstname: string;
                Surname: string;
              }
            ) => {
              selectFriend(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="standard-basic"
                variant="outlined"
                size="small"
                placeholder="Select recipient"
                sx={{
                  "& fieldset": {
                    borderRadius: "0px",
                    height: "40px",
                    border: "none",
                    borderBottom: "1px solid var(--blue)",
                  },
                  "&::focus": {},
                }}
              />
            )}
          />
        ) : (
          <>
            <Avatar
              src={SERVER + "avatar/" + friend?.Avatar}
              sx={{
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile/" + friend.id)}
            />
            <Typography
              color="black"
              fontWeight="400"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/profile/" + friend.id)}
            >
              {friend.Firstname + " " + friend.Surname}
            </Typography>
          </>
        )}
      </Row>
      {isNewChat || !chatData ? null : (
        <MessagesContainer>
          {[...chatData.Messages]
            .sort(
              (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
            )
            .map((message, i) => (
              <MessageItem
                key={message.Date + i}
                message={message}
                friendAvatar={friend.Avatar}
              />
            ))}
        </MessagesContainer>
      )}

      <Sender>
        <TextField
          id="filled-basic"
          placeholder="Write a message"
          size="small"
          multiline
          value={textMessage}
          maxRows={4}
          onChange={(e) => updateTextMessage(e.target.value)}
          fullWidth
          sx={{
            borderRadius: "15px",
            border: "none",
            backgroundColor: "white",
            marginLeft: "5px",
            "& fieldset": {
              border: "none",
            },
          }}
        />
        <Button
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "50px",
          }}
          onClick={() => {
            updateTextMessage("");
            sendMessageHandler();
          }}
        >
          <SendIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
      </Sender>
    </Container>
  );
}

const CREATE_CHAT = gql`
  mutation createChat($participants: [String!]!, $message: message_chat) {
    createChat(participants: $participants, message: $message) {
      id
      error
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage(
    $creator: String
    $textContent: String
    $date: String
    $chatID: String
  ) {
    sendMessage(
      creator: $creator
      textContent: $textContent
      date: $date
      chatID: $chatID
    ) {
      id
    }
  }
`;
