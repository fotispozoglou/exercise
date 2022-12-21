import { configureStore } from "@reduxjs/toolkit";
import spotifyAuthReducer from './slices/spotify-auth';
import spotifyPlayer from "./slices/spotify-player";

export const store = configureStore({
  reducer: {
    spotifyAuth: spotifyAuthReducer,
    spotifyPlayer: spotifyPlayer
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;