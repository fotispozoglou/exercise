import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useSpotifyAuth from "../hooks/useSpotifyAuth";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import classes from './Home.module.css';

const code = new URLSearchParams( window.location.search ).get('code');
const state = new URLSearchParams( window.location.search ).get('state');

const AUTH_URL = 'http://localhost:3000/login';

const Home : React.FC = () => {

  const { token } = useSpotifyAuth( code, state );

  const { player } = useSpotifyPlayer( token );

  return (
    <div className={ classes['home'] }>
      <Link to="/exercise" className={ classes['start-exercise'] }>START EXERCISE</Link>
      <a className={ classes['spotify-btn'] } href={ AUTH_URL }>LOGIN WITH SPOTIFY</a>
    </div>
  );

};

export default Home;