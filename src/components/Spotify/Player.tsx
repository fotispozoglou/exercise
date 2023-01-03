import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import useSpotifyPlayer, { UseSpotifyStatus } from "../../hooks/spotify/useSpotifyPlayer";
import StateManager from "./StateManager";

const Player : React.FC = (  ) => {

  const { 
    status,
    transferPlayback,
    playPlaylist,
    getCurrentTrack,
    loadCurrentTrack,
    getActiveDevice,
    activeDevice
  } = useSpotifyPlayer( );

  const currentTrack = {
    name : '',
    image: 'https://i.scdn.co/image/ab67616d0000485107a8ed734ef4cf7490f73c8a'
  };

  return (
    <div>
      {
        status === UseSpotifyStatus.Ready && <StateManager currentTrack={ currentTrack } />
      }
      {
        activeDevice && <p>{ activeDevice.name }</p>
      }
    </div>
  );

};

export default Player;