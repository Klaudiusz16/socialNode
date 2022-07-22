import { Avatar, Grow, Typography } from "@mui/material";

import React, { useState } from "react";
import styled from "styled-components";
import { MessageType } from "../../../../interfaces/ChatType";
import { useAppSelector } from "../../../../redux/hooks";
import { CalcTime } from "../../../calctime/calcTime";

const Wrapper = styled.div<{ from: string }>`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: ${({ from }) =>
    from == "user" ? "flex-end" : "flex-start"};
  margin: 4px 0;
  max-height: 50px;
`;

const Text = styled(Typography)`
  border-radius: 15px;
  background-color: var(--blue);
  color: white;
  max-width: 45%;
  padding: 2px 8px;
  word-wrap: wrap;
  cursor: pointer;
`;

const Column = styled.div<{ from: string }>`
  display: flex;
  align-items: ${({ from }) => (from == "user" ? "flex-end" : "flex-start")};
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

export default function MessageItem({
  message,
  friendAvatar,
}: {
  message: MessageType;
  friendAvatar: string;
}) {
  const [isDateShow, updateDateShowState] = useState<boolean>(false);

  const { id: userID } = useAppSelector((state) => state.user);

  const messageType = message.Creator.id == userID ? "user" : "friend";

  return (
    <Wrapper
      from={messageType}
      onClick={() =>
        isDateShow ? updateDateShowState(false) : updateDateShowState(true)
      }
    >
      {messageType == "friend" ? (
        <Avatar
          sx={{
            marginRight: "10px",
            height: "30px",
            width: "30px",
          }}
          src={friendAvatar}
        />
      ) : null}
      <Column from={messageType}>
        <Text fontSize={"15px"}>{message.TextContent}</Text>
        {isDateShow ? (
          <Grow in={isDateShow}>
            <Typography
              sx={{
                fontSize: "10px",
              }}
            >
              {CalcTime(new Date(message.Date))}
            </Typography>
          </Grow>
        ) : null}
      </Column>
    </Wrapper>
  );
}
