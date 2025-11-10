import { configureStore } from "@reduxjs/toolkit";
import { animeReducer, animeByIdReducer } from "../slices";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    animeById: animeByIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
