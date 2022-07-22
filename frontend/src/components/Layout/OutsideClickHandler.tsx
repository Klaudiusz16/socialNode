import React from "react";
import { useDispatch } from "react-redux";
import {
  switchMessengerModal,
  switchNotificationsModal,
  switchSearchbarModal,
  switchUserMenuModal,
} from "../../redux/modalStates";

export default function OutsideClickHandler({ children }: { children: any }) {
  const dispatch = useDispatch();

  const clickHandler = (e: any) => {
    if (!e.target.closest(".notifications_cointainer")) {
      dispatch(switchNotificationsModal("off"));
    }
    if (!e.target.closest(".user_menu")) {
      dispatch(switchUserMenuModal("off"));
    }
    if (!e.target.closest(".navbar_searchbar")) {
      dispatch(switchSearchbarModal("off"));
    }
    if (!e.target.closest(".messenger_container")) {
      dispatch(switchMessengerModal("off"));
    }
  };

  return <div onClick={(e) => clickHandler(e)}>{children}</div>;
}
