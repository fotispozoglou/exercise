import { useEffect, useState } from "react";
import { getStringFromMillis } from "../utils/time";

export enum TimerState {
  Initialized = 1,
  Started = 2,
  Paused = 3,
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

const useTimer = ( initialTime : number ) => {

  const [ time, setTime ] = useState( initialTime * 1000 );
  // const [ timeCounted, setTimeCounted ] = useState( 0 );
  const [ state, setState ] = useState< TimerState >( TimerState.Initialized );

  useEffect(() => {

    if ( state !== TimerState.Started ) return;

    if ( time <= 0 ) {

      return setState( TimerState.Completed );

    }

    const timerTimeout = setTimeout(() => {

      setTime( currentTime => currentTime - 50 );

      // setTimeCounted( timeCounted => timeCounted + 50 );

    }, 50);

    return () => clearTimeout( timerTimeout );

  }, [ time, state ]);

  const timeString = getStringFromMillis( time );

  // const timeCountedString = getStringFromMillis( timeCounted );

  const startTimer = ( newTime ?: number ) => {

    if ( newTime ) setTime( newTime * 1000 );

    setState( TimerState.Started );

  };

  const pauseTimer = () => {

    setState( TimerState.Paused );

  };

  const continueTimer = () => {

    setState( TimerState.Started );

  };

  const restartTimer = (  ) => {

    setTime( initialTime );

    setState( TimerState.Started );

  };

  const resetTimer = ( newTime : number | null ) => {

    setTime( newTime ? newTime * 1000 : initialTime );

  };

  const setTimer = ( newTime : number ) => {

    setTime( newTime * 1000 );

  };

  return {
    timeString,
    // timeCountedString,
    state,
    pauseTimer,
    continueTimer,
    restartTimer,
    resetTimer,
    startTimer,
    setTimer
  };

};

export default useTimer;