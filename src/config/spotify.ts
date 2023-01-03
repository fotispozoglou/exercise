import { EXERCISE_API } from "./config";

export const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export const SPOTIFY = {
  SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  SPOTIFY_AUTH_CALLBACK: `${ EXERCISE_API }/callback`,
  SPOTIFY_PLAYER: `${ SPOTIFY_API_BASE }/me/player`,
  USER_PLAYLISTS: `${ SPOTIFY_API_BASE }/me/playlists`,
  PLAYER_PLAY: `${ SPOTIFY_API_BASE }/me/player/play`,
  SPOTIFY_CURRENT_TRACK: `${ SPOTIFY_API_BASE }/me/player/currently-playing`,
  PLAYER_QUEUE: `${ SPOTIFY_API_BASE }/me/player/queue`,
  DEVICES: `${ SPOTIFY_API_BASE }/me/player/devices`,
  // PLAYLIST_ITEMS: `${ SPOTIFY_API_BASE }/playlists/PLAYER_ID/tracks`
  PLAYLIST_ITEMS: ( playerID : string ) => `${ SPOTIFY_API_BASE }/playlists/${ playerID }/tracks`,
  PLAYLIST_COVER: ( playerID : string ) => `${ SPOTIFY_API_BASE }/playlists/${ playerID }/images`,
  // SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  // SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  // SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  // SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  // SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  // SPOTIFY_SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
};