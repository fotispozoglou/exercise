import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getPlaybackState, transferPlayback, getPlayingTrack, getUserPlaylists, playPlaylist, getPlayerQueue, getDevices } from "../../utils/spotify";
import useInitializeSpotify from "./useInitializeSpotify";
import { setActiveDevice } from '../../store/slices/spotify-player';
import { Device } from "../../types/spotify";

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

  useInitializeSpotify( );

  const token = useSelector(( state : RootState ) => state.spotifyAuth.token );

  const { player, status, deviceID, activeDevice } = useSelector(
    ( state : RootState ) => state.spotifyPlayer
  );

  const dispatch = useDispatch();

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

  const handleGetCurrentTrack = async (  ) => {

    await getPlayingTrack( token );

  };

  const handleLoadCurrentTrack = async (  ) => {

    // await transferPlayback( token, [ deviceID ] );

    const playbackData = await getPlayerQueue( token );

    console.log(playbackData);

  };

  const handleGetActiveDevice = async (  ) => {

    const devicesData = await getDevices( token );

    const activeDevice = devicesData.devices.filter( ( device : Device ) => device && device.is_active )[0];

    dispatch( setActiveDevice( activeDevice ) );

  };

  return {
    transferPlayback: handleTransferPlayback,
    getUserPlaylists: handleGetUserPlaylists,
    playPlaylist: handlePlayPlaylist,
    getCurrentTrack: handleGetCurrentTrack,
    loadCurrentTrack: handleLoadCurrentTrack,
    getActiveDevice: handleGetActiveDevice,
    status,
    activeDevice
  };

};

export default useSpotifyPlayer;