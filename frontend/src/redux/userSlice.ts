import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./../interfaces/UserType";

export const initialState: UserType = {
  id: "",
  Firstname: "",
  Surname: "",
  DateOfBirth: new Date().toISOString(),
  Country: "",
  Email: "",
  Password: "",
  Friends: [],
  Avatar: "",
  Notifications: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateState: (state, action: PayloadAction<UserType>) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateState } = userSlice.actions;

export default userSlice.reducer;
