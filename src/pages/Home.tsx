import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Player from "../components/Spotify/Player";
import useSpotifyAuth from "../hooks/spotify/useSpotifyAuth";
import { RootState } from "../store";
import classes from './Home.module.css';

const code = new URLSearchParams( window.location.search ).get('code');
const state = new URLSearchParams( window.location.search ).get('state');

const AUTH_URL = 'http://localhost:3000/login';

const Home : React.FC = () => {

  useSpotifyAuth( code, state );

  const isLoggedIn = useSelector(( state : RootState ) => state.spotifyAuth.isLoggedIn );

  return (
    <div className={ classes['home'] }>
      <Link to="/exercise" className={ classes['start-exercise'] }>START EXERCISE</Link>
      {
        !isLoggedIn &&
        <a className={ classes['spotify-btn'] } href={ AUTH_URL }>LOGIN WITH SPOTIFY</a>
      }
      <Player />
    </div>
  );

};

export default Home;