import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Player from './components/Spotify/Player';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './store/slices/spotify-auth';

function App() {

  const dispatch = useDispatch(  );

  useEffect(() => {

    const requestToken = async () => {

      const tokenResponse = await fetch('http://localhost:3000/refresh', { credentials: 'include' });

      const tokenData = await tokenResponse.json();

      if ( tokenData.error ) return;

      dispatch(setToken( tokenData.token ));

    };

    requestToken();

  }, [  ]);

  return (
    <div className="App">
      <Outlet />
      {
        // spotify.isLoggedIn &&
        // <Player />
      }
    </div>
  );
  
}

export default App
