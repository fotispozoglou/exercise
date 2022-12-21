import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SPOTIFY } from "../../config/spotify";
import { setToken } from "../../store/slices/spotify-auth";

const useSpotifyAuth = ( code : string | null, state : string | null ) => {

  const dispatch = useDispatch( );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {

    if ( !code || !state ) return;

    async function getToken() {
    
      const response = await fetch(`${ SPOTIFY.SPOTIFY_AUTH_CALLBACK }?code=${ code }&state=${ state }`, { credentials: 'include' });
    
      const json = await response.json();

      dispatch( setToken( json.token ) );
    
      searchParams.delete('code');
      searchParams.delete('state');

      setSearchParams( searchParams );
    
    }

    getToken();

  }, [ code, state ]);

};

export default useSpotifyAuth;