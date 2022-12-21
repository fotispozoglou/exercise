import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../store";

const SpotifyGuard : React.FC = (  ) => {

  const token = useSelector(( state : RootState ) => state.spotifyAuth.token );

  return <Outlet />;

};

export default SpotifyGuard;