import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UseSpotifyStatus } from "../../hooks/spotify/useSpotifyPlayer";
import { Player } from "../../types/spotify";

export interface SpotifyPlayer {
  player : Player | null;
  deviceID : string;
  status : UseSpotifyStatus;
};

const initialState: SpotifyPlayer = {
  player: null,
  deviceID: '',
  status: 1
};

export const spotifyPlayerSlice = createSlice({
  name: 'spotify-player',
  initialState,
  reducers: {
    setPlayer: ( state, action : PayloadAction< Player > ) => {

      state.player = action.payload;

    },
    setDeviceID: ( state, action : PayloadAction< string > ) => {

      state.deviceID = action.payload;

    },
    setStatus: ( state, action : PayloadAction< UseSpotifyStatus > ) => {

      state.status = action.payload;

    }
  }
});

export const { setPlayer, setDeviceID, setStatus } = spotifyPlayerSlice.actions;

export default spotifyPlayerSlice.reducer;