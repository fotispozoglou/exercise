import { useEffect, useState } from "react";
import { getStringFromMillis } from "../utils/time";

export enum TimerState {
  Initialized = 1,
  Started = 2,
  Paused = -2,
  Completed = 4,
};

export enum TimerType {
  Countdown = 1,
  Countup = 2,
};

export const TimerStrings = new Map([
  [ TimerState.Initialized, 'start' ],
  [ TimerState.Started, 'pause' ],
  [ TimerState.Paused, 'continue' ],
  [ TimerState.Completed, 'completed' ],
]);

const useTimer = ( initialTime : number, type : number, onComplete: (() => void) | null ) => {

  const [ millis, setMillis ] = useState( initialTime * 1000 );
  
  const [ state, setState ] = useState( TimerState.Initialized );    

  const toggleState = () => { 

    if ( state === TimerState.Initialized ) return setState( TimerState.Started );
    
    if (!([ TimerState.Started, TimerState.Paused ].includes( state ))) return;

    setState( currentState => currentState * -1  ); 
  
  };

  const reset = () => {

    setState( currentState => {

      setMillis( 0 );

      return TimerState.Initialized;

    }); 

  };

  const setTime = ( seconds : number ) => { setMillis( (seconds + 1) * 1000 ); };

  const start = () => { setState( TimerState.Started ) };

  const startI = ( seconds : number ) => {

    setTime( seconds );

    start();

  };

  const complete = () => { setState( TimerState.Completed ) };

  useEffect(() => {

    if ( state !== TimerState.Started ) return;

    let timerTimeout : ReturnType< typeof setTimeout >;

    if ( millis <= 0 && type === TimerType.Countdown ) {

      return setState( currentState => {
        
        if ( onComplete ) onComplete();

        return TimerState.Completed; 
      
      });

    }

    timerTimeout = setTimeout(() => {

      if ( type === TimerType.Countdown ) {

        setMillis( currentSeconds => currentSeconds - 50 );

      } else {

        setMillis( currentSeconds => currentSeconds + 50 );

      }

    }, 50);

    return () => { clearTimeout( timerTimeout ); };

  }, [ millis, state ]);

  const timeString = getStringFromMillis( millis );  

  return {
    timeString,
    state,
    start,
    complete,
    toggleState,
    reset,
    startI
  };

};

export default useTimer;