declare global {
  interface Window { 
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

import { useEffect, useState } from "react";

const useSpotifyPlayer = ( token : string ) : { player: { isLoaded: boolean } | null } => {

  const [ player, setPlayer ] = useState( null );

  useEffect(() => {

    if ( !token ) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: ( cb : any ) => { cb( token ); },
          volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id } : { device_id : string }) => {
          console.log('Ready with Device ID', device_id);
          player.togglePlay();
        });

        player.addListener('not_ready', ({ device_id } : { device_id : string }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.connect();

    };

  }, [ token ]);

  return { player };

};

export default useSpotifyPlayer;