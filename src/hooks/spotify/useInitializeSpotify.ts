import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SPOTIFY } from "../../config/spotify";
import { RootState } from "../../store";
import { UseSpotifyStatus } from "./useSpotifyPlayer";
import { setPlayer, setDeviceID, setStatus } from '../../store/slices/spotify-player';

const useInitializeSpotify = ( ) => {

  const [ token, status ] = useSelector(
    ( state : RootState ) => [ state.spotifyAuth.token, state.spotifyPlayer.status ]
  );

  const dispatch = useDispatch(  );

  useEffect(() => {    

    if ( !token ) return;

    const script = document.createElement("script");
    script.src = SPOTIFY.SPOTIFY_SDK_URL;
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
        name: 'Exercise Application',
        getOAuthToken: ( cb : any ) => { cb( token ); },
        volume: 0.5
      });

      player.addListener('ready', ({ device_id } : { device_id : string }) => {
                  
        dispatch( setStatus( UseSpotifyStatus.Ready ) );
      
      });

      player.addListener('not_ready', ({ device_id } : { device_id : string }) => {
        
        dispatch( setStatus( UseSpotifyStatus.NotReady ) );

      });

      player.addListener('initialization_error', ({ message } : { message : string }) => {
        
        dispatch( setStatus( UseSpotifyStatus.Errored ) );

      });

      player.addListener('authentication_error', ({ message } : { message : string }) => {
          
        dispatch( setStatus( UseSpotifyStatus.Errored ) );

      });

      player.addListener('account_error', ({ message } : { message : string }) => {
        
        dispatch( setStatus( UseSpotifyStatus.Errored ) );

      });

      player.addListener('player_state_changed', ( (state:any) => {

        if (!state) {
        
          return;
        
        }
    
        console.log(state);
    
      }));
    

      player.connect();

    };

  }, [ token ]);

  return {
    player: null,
    deviceID: '',
    status
  };

};

export default useInitializeSpotify;