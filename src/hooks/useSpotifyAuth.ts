import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSpotifyPlayer = ( code : string | null, state : string | null ) => {

  const [ token, setToken ] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {

    if ( !code || !state ) return;

    async function getToken() {
    
      const response = await fetch(`http://localhost:3000/callback?code=${ code }&state=${ state }`);
    
      const json = await response.json();
    
      setToken(json.token);

      searchParams.delete('code');
      searchParams.delete('state');

      setSearchParams( searchParams );
    
    }

    getToken();

  }, [ code, state ]);

  return { token };

};

export default useSpotifyPlayer;