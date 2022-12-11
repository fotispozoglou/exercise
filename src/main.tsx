import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Exercise from './pages/Exercise';
import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import configureSpotifyStore from './hooks-store/spotify';

configureSpotifyStore();

const routerElements = createRoutesFromElements(
  <Route path='/' element={ <App /> }>
    <Route element={ <RootLayout /> }>
      <Route index path='/' element={ <Home /> } />
    </Route>
    <Route path='/exercise' element={ <Exercise /> } />
  </Route>
);

const router = createBrowserRouter( routerElements );

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={ router } />
);
