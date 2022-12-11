import { initStore } from './store';

export type SpotifyAuthType = {
  token : string;
};

const configureStore = () => {

  const actions = {
    SET_TOKEN: ( currentToken : string, newToken : string ) => {

      return { token: newToken };

    }
  };

  initStore(actions, {
    token: '',
  }); // Object Should Be The Initial State

};

export default configureStore;