import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from './Home.module.css';

const AUTH_URL = 'http://localhost:3000/login';

const code = new URLSearchParams( window.location.search ).get('code');
const state = new URLSearchParams( window.location.search ).get('state');

const Home : React.FC = () => {

  useEffect(() => {

    if ( !code || !state ) return;

    const sendRequest = async () => {

      const response = await fetch(`http://localhost:3000/callback?code=${ code }&state=${ state }`);

      

    };
    
    sendRequest();

  }, [  ]);

  return (
    <div className={ classes['home'] }>
      <Link to="/exercise" className={ classes['start-exercise'] }>START EXERCISE</Link>
      <a href={ AUTH_URL }>LOGIN WITH SPOTIFY</a>
    </div>
  );

};

export default Home;