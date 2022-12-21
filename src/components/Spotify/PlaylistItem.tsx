import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Playlist } from "../../types/spotify";
import classes from './PlaylistItem.module.css';

export type PlaylistItemProps = {
  playlist : Playlist;
  onSelect ?: () => void;
  onPlay : ( contextURI : string ) => void;
};

const PlaylistItem : React.FC< PlaylistItemProps > = ({ playlist, onPlay }) => {

  return (
    <Link to={ `/playlists/${ playlist.id }` } className={ classes['playlist-item'] }>
      <img src={ playlist.images[ 2 ].url } />
      <p className={ classes['playlist-item-name'] }>{ playlist.name }</p>
      <FontAwesomeIcon
        icon="play"
        onClick={ onPlay.bind( null, playlist.context_uri ) }
        className={ classes['playlist-item-play'] }
      />
    </Link>
  );

};

export default PlaylistItem;