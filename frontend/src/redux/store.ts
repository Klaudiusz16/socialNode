import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./AlertSlice";
import modalStates from "./modalStates";
import userSlice from "./userSlice";
// ...

export const store = configureStore({
  reducer: {
    user: userSlice,
    modals: modalStates,
    alert: alertSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
