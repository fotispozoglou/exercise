import { useState, useEffect } from 'react';

let globalState : any = {};
let listeners : any[] = [];
let actions : any = {};

export const useStore = 
    < DataType >(shouldListen = true) : 
    [ DataType, ( actionIdentifier : string, payload : DataType ) => void ] => 
  {
  const setState = useState< DataType >( globalState )[ 1 ];

  const dispatch = ( actionIdentifier : string, payload : DataType ) => {
    const newState = actions[ actionIdentifier ]( globalState, payload );
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = < DataType >( userActions : any , initialState : DataType ) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};