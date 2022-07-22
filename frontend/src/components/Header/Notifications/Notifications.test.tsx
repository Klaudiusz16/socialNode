import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../../redux/store";
import { ReduxConnection } from "../../__testUtils/ReduxConnection";
import Notifications from "./Notifications";

describe("notifications testing", () => {
  it("Notifications opens and closes after click the shortcut", () => {
    render(ReduxConnection(Notifications));
    let state = store.getState().modals;
    const avatarElement = screen.getByTestId("notifications_icon");

    // initially notifications is close
    expect(state.notifications).toEqual(false);

    // notifications opens on click shortcut
    fireEvent.click(avatarElement);
    state = store.getState().modals;
    expect(state.notifications).toEqual(true);

    // notifications close again on click shortcut
    fireEvent.click(avatarElement);
    state = store.getState().modals;
    expect(state.notifications).toEqual(false);
  });
});
