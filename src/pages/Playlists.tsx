import React, { useEffect, useState } from "react";
import { Playlist } from "../types/spotify";
import PlaylistItem from "../components/Spotify/PlaylistItem";
import useSpotifyPlayer from "../hooks/spotify/useSpotifyPlayer";

export type PlaylistProps = {
};

const Playlists : React.FC< PlaylistProps > = () => {

  const { status, transferPlayback, getUserPlaylists, playPlaylist } = useSpotifyPlayer( );

  const [ playlists, setPlaylists ] = useState< Playlist[] >( [] );

  useEffect(() => {

    const getPlaylists = async () => {

      const playlists = await getUserPlaylists();

      setPlaylists( playlists.items );

    };

    getPlaylists();

  }, [  ]);

  return (
    <div>
      {
        playlists && playlists.length > 0 &&
        playlists.map( playlist => 
          <PlaylistItem 
            key={ playlist.id } 
            playlist={ playlist } 
            onPlay={ () => {} }
          /> 
        )
      }
    </div>
  );

};

export default Playlists;