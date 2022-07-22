import React from "react";
import styled from "styled-components";
import Logo from "../Layout/Logo";
import Messenger from "./Messenger/Messenger";
import Notifications from "./Notifications/Notifications";
import Searchbar from "./Searchbar/Searchbar";
import User from "./User/User";
// @ts-ignore
import sound from "../../audio/positiveChime.mp3";
import { useSound } from "use-sound";

const HeaderContainer = styled.header`
  width: 100vw;
  background: var(--gradient);
  padding: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: nowrap;
  position: fixed;
  height: 60px;
  z-index: 7;
  top: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`;

const HelpedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default function Header() {
  const [audio] = useSound(sound);
  return (
    <HeaderContainer>
      <Row>
        <HelpedContainer>
          <Logo width="50px" height="50px" />
          <Searchbar />
        </HelpedContainer>

        <HelpedContainer>
          <Notifications playAudio={() => audio() }/>
          <Messenger playAudio={() => audio()} />
          <User />
        </HelpedContainer>
      </Row>
    </HeaderContainer>
  );
}
