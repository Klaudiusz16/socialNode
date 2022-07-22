import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  notifications: false,
  userMenu: false,
  searchbar: false,
  messenger: false,
  report: false,
};
export const modalStates = createSlice({
  name: "modalStates",
  initialState: initialState,
  reducers: {
    switchNotificationsModal: (state, action: PayloadAction<"off" | "on">) => {
      switch (action.payload) {
        case "off":
          state.notifications = false;
          break;
        case "on":
          state.notifications = true;
          break;
      }
    },
    switchUserMenuModal: (state, action: PayloadAction<"off" | "on">) => {
      switch (action.payload) {
        case "off":
          state.userMenu = false;
          break;
        case "on":
          state.userMenu = true;
          break;
      }
    },
    switchSearchbarModal: (state, action: PayloadAction<"off" | "on">) => {
      switch (action.payload) {
        case "off":
          state.searchbar = false;
          break;
        case "on":
          state.searchbar = true;
          break;
      }
    },
    switchMessengerModal: (state, action: PayloadAction<"off" | "on">) => {
      switch (action.payload) {
        case "off":
          state.messenger = false;
          break;
        case "on":
          state.messenger = true;
          break;
      }
    },
    switchReportModal: (state, action: PayloadAction<"off" | "on">) => {
      switch (action.payload) {
        case "off":
          state.report = false;
          break;
        case "on":
          state.report = true;
          break;
      }
    },
  },
});

export const {
  switchNotificationsModal,
  switchUserMenuModal,
  switchSearchbarModal,
  switchMessengerModal,
  switchReportModal,
} = modalStates.actions;
export default modalStates.reducer;
