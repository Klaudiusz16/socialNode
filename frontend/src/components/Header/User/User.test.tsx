import React from "react";
import User from "./User";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { ReduxConnection } from "../../__testUtils/ReduxConnection";

describe("user menu testing", () => {
  it("user menu opens and closes after click the shortcut", () => {
    render(ReduxConnection(User));
    let state = store.getState().modals;
    const avatarElement = screen.getByTestId("navbar_user_avatar");

    // initially user menu is close
    expect(state.userMenu).toEqual(false);

    // user menu opens on click shortcut
    fireEvent.click(avatarElement);
    state = store.getState().modals;
    expect(state.userMenu).toEqual(true);

    // user menu close again on click shortcut
    fireEvent.click(avatarElement);
    state = store.getState().modals;
    expect(state.userMenu).toEqual(false);
  });
});
