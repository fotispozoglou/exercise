import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useSpotifyPlayer, { UseSpotifyStatus } from "../../hooks/spotify/useSpotifyPlayer";
import StateManager from "./StateManager";

const Player : React.FC = (  ) => {

  const { status } = useSpotifyPlayer( );

  const currentTrack = {
    name : '',
    image: 'https://i.scdn.co/image/ab67616d0000485107a8ed734ef4cf7490f73c8a'
  };

  return (
    <div>
      {
        status === UseSpotifyStatus.Ready && <StateManager currentTrack={ currentTrack } />
      }
    </div>
  );

};

export default Player;