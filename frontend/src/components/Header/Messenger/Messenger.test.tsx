import { screen, fireEvent, render } from "@testing-library/react";
import { usersData } from "../../../data/users";
import { store } from "../../../redux/store";
import { updateState } from "../../../redux/userSlice";

import { ReduxConnection } from "../../__testUtils/ReduxConnection";
import Messenger from "./Messenger";

describe("messenger component", () => {
  it("Messenger opens and closes after click the shortcut", () => {
    render(ReduxConnection(Messenger));
    let state = store.getState().modals;
    const shortcut = screen.getByTestId("messenger_shortcut");

    // initially messenger is close
    expect(state.messenger).toEqual(false);

    // messenger opens on click shortcut
    fireEvent.click(shortcut);
    state = store.getState().modals;
    expect(state.messenger).toEqual(true);

    // messenger close again on click shortcut
    fireEvent.click(shortcut);
    state = store.getState().modals;
    expect(state.messenger).toEqual(false);
  });

  it("All chats render correctly", async () => {
    let state = store;
    state.dispatch(updateState(usersData[0]));
    render(ReduxConnection(Messenger));
    const chatsElements = await screen.findAllByTestId("chat_item");
    console.log(chatsElements.forEach((chat) => {}));
  });
});
