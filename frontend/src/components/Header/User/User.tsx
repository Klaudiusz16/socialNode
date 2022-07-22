import { Avatar, Collapse, Grid, Grow } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { switchUserMenuModal } from "../../../redux/modalStates";
import { SERVER } from "../../../config";

const Container = styled.div`
  margin-right: 20px;
  position: relative;
  top: 0;
  z-index: 1;
`;

const Menu = styled.div`
  position: absolute;
  right: 20px;
  top: -15px;
  min-height: 250px;
  width: 250px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

export default function User() {
  const { userMenu: isOpen } = useAppSelector((state) => state.modals);
  const {
    Avatar: avatarSrc,
    Firstname,
    Surname,
    id,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: DashboardIcon,
    },
    {
      name: "Profile",
      href: `/profile/${id}`,
      icon: PersonIcon,
    },

    {
      name: "Logout",
      href: SERVER + "logout",
      icon: LogoutIcon,
    },
  ];

  return (
    <Container className="user_menu">
      <AvatarWrapper>
        <Avatar
          onClick={() =>
            isOpen
              ? dispatch(switchUserMenuModal("off"))
              : dispatch(switchUserMenuModal("on"))
          }
          src={SERVER + "avatar/" + avatarSrc}
          alt={Firstname + " " + Surname}
          data-testid="navbar_user_avatar"
        />
      </AvatarWrapper>

      <Grow in={isOpen}>
        <Menu data-testid="user_menu">
          {menuItems.map((item, i) => (
            <Grid item xs={6} key={item.href + i}>
              <MenuItem {...item} />
            </Grid>
          ))}
        </Menu>
      </Grow>
    </Container>
  );
}
