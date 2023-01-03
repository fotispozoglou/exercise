import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../store";

const SpotifyGuard : React.FC = (  ) => {

  const isLoggedIn = useSelector(( state : RootState ) => state.spotifyAuth.isLoggedIn );

  if ( !isLoggedIn ) return null;

  return <Outlet />;

};

export default SpotifyGuard;