import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Exercise from './pages/Exercise';
import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faForwardStep, faBackwardStep, faPodcast } from '@fortawesome/free-solid-svg-icons';
import Playlists from './pages/Playlists';
import SpotifyGuard from './components/Auth/SpotifyGuard';
import PlaylistItems from './pages/PlaylistItems';
import { store } from './store';
import { Provider } from 'react-redux';

library.add( faPlay, faPause, faForwardStep, faBackwardStep, faPodcast );

const routerElements = createRoutesFromElements(
  <Route path='/' element={ <Provider store={ store }><App /></Provider> }>
    <Route element={ <RootLayout /> }>
      <Route index path='/' element={ <Home /> } />
    </Route>
    <Route path='/exercise' element={ <Exercise /> } />
    <Route element={ <SpotifyGuard /> }>
      <Route path='/playlists' element={ <Playlists /> } />
      <Route path='/playlists/:projectID' element={ <PlaylistItems /> } />
    </Route>
  </Route>
);

const router = createBrowserRouter( routerElements );

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={ router } />
);
