import React from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SPOTIFY } from "../config/spotify";
import useRequest from "../hooks/general/useRequest";
import { RootState } from "../store";
import { RequestMethod } from "../types/request";
import { Playlist, PlaylistCover, PlaylistItems as PlaylistItemsType, PlaylistTrack } from "../types/spotify";
import classes from './PlaylistItems.module.css';

const PlaylistItems : React.FC = () => {

  const params = useParams();

  const token = useSelector(( state : RootState ) => state.spotifyAuth.token );

  const { playlistID } = params;

  const playlistURL = SPOTIFY.PLAYLIST_ITEMS( playlistID || '' );
  const playlistCoverURL = SPOTIFY.PLAYLIST_COVER( playlistID || '' );

  const { status: playlistCoverStatus, data : playlistCoverData } = useRequest< PlaylistCover >({  
    url: playlistCoverURL,
    method: RequestMethod.GET,
    token
  });

  const { status: playlistStatus, data : playlistData } = useRequest< PlaylistItemsType >({  
    url: playlistURL,
    method: RequestMethod.GET,
    token
  });

  return (
    <div className={ classes['playlist-items'] }>
      { playlistCoverData && <img className={ classes['playlist-image'] } src={ playlistCoverData[1].url } /> }
      {
        playlistData?.items.map(
          track => 
          (
            <div className={ classes['playlist-track'] }>
              <img className={ classes['playlist-track-image'] } src={ track.track.album.images[2].url || '' } />
              <p className={ classes['playlist-track-name'] }>{ track.track.name.toUpperCase() }</p>
            </div>
          )
        )
      }
    </div>
  );

};

export default PlaylistItems;