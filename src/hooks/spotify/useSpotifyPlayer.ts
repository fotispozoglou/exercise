import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getPlaybackState, transferPlayback, getPlayingTrack, getUserPlaylists, playPlaylist, getPlayerQueue } from "../../utils/spotify";
import useInitializeSpotify from "./useInitializeSpotify";

declare global {
  interface Window { 
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
    test:any;
  }
}

export enum UseSpotifyStatus {
  Initial = 1,
  Loaded = 2,
  Ready = 3,
  NotReady = 4,
  Errored = 5,
};

const useSpotifyPlayer = ( ) => {  

  const token = useSelector(( state : RootState ) => state.spotifyAuth.token );

  const { player, status, deviceID } = useInitializeSpotify( );

  const handleTransferPlayback = async () => {

    const playbackTransferStatus = await transferPlayback( token, [ deviceID ] );

    return { items : playbackTransferStatus };
  
  };

  const handleGetUserPlaylists = async () : Promise<{ items: [] }> => {

    const playlists = await getUserPlaylists( token );

    return playlists;

  };

  const handlePlayPlaylist = async ( contextURI : string ) => {

    await handleTransferPlayback();

    playPlaylist( token, contextURI, deviceID );

  };

  return {
    transferPlayback: handleTransferPlayback,
    getUserPlaylists: handleGetUserPlaylists,
    playPlaylist: handlePlayPlaylist,
    status,
  };

};

export default useSpotifyPlayer;