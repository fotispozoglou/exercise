import { SPOTIFY } from "../config/spotify";
import  { SPOTIFY as STATUS } from "../config/status";

export const getPlayerQueue = async ( token : string ) => {

  const playbackStateResponse = await fetch(`${ SPOTIFY.PLAYER_QUEUE }`, {
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    }
  });

  console.log( playbackStateResponse );

  if ( playbackStateResponse.status !== 200 ) return {};

  const playbackStateData = await playbackStateResponse.json();

  return playbackStateData;

};

export const getPlaybackState = async ( token : string ) => {

  const playbackStateResponse = await fetch(`${ SPOTIFY.SPOTIFY_PLAYER }`, {
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    }
  });

  console.log( playbackStateResponse );

  if ( playbackStateResponse.status !== 200 ) return {};

  const playbackStateData = await playbackStateResponse.json();

  return playbackStateData;

};

export const transferPlayback = async ( token : string | null, deviceIDS : string[] | null ) => {

  if ( !token || !deviceIDS ) return null;

  const transferPlaybackResponse = await fetch(`${ SPOTIFY.SPOTIFY_PLAYER }`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ device_ids: deviceIDS })
  });

  return transferPlaybackResponse.status;

};

export const getPlayingTrack = async ( token : string ) => {

  if ( !token ) return null;

  const playingTrackResponse = await fetch(`${ SPOTIFY.SPOTIFY_CURRENT_TRACK }`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
  });
  
  const data = await playingTrackResponse.json();

  console.log(data);

  // return transferPlaybackResponse.status;

};

export const getUserPlaylists = async ( token : string ) => {

  if ( !token ) return null;

  const userPlaylistsResponse = await fetch(`${ SPOTIFY.USER_PLAYLISTS }`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
  });
  
  const data = await userPlaylistsResponse.json();

  return data;

};

export const playPlaylist = async ( token : string, contextURI: string, deviceID : string ) => {

  const userPlaylistsResponse = await fetch(`${ SPOTIFY.PLAYER_PLAY }?device_id=${ deviceID }`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ context_uri: contextURI })
  });
  
  const data = await userPlaylistsResponse.json();

  return data;

};