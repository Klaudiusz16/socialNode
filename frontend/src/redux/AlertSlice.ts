import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: { alertValue: string | boolean } = {
  alertValue: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    updateAlertState: (state, action: PayloadAction<string | false>) => {
      state.alertValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAlertState } = alertSlice.actions;

export default alertSlice.reducer;
