import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SpotifyAuth {
  token : string;
  isLoggedIn : boolean;
};

const initialState: SpotifyAuth = {
  token: '',
  isLoggedIn: false
};

export const spotifyAuthSlice = createSlice({
  name: 'spotify-auth',
  initialState,
  reducers: {
    setToken: ( state, action : PayloadAction< string > ) => {

      state.token = action.payload;

    }
  }
});

export const { setToken } = spotifyAuthSlice.actions;

export default spotifyAuthSlice.reducer;