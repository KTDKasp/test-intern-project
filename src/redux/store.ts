import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSliceReducer, { JWT_STATE } from "./user.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    user: userSliceReducer
  }
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_STATE);
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();