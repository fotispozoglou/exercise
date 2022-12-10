import { useEffect, useState } from "react";
import { Exercise, ExerciseType } from "../types/exercise";
import useTimer, { TimerState, TimerType } from "./useTimer";

export enum ExerciseState {
  Initialized = 1,
  Starting = 2,
  Started = 3,
  Paused = -3,
  Resting = 4,
  Completed = 5,
};

const useExerciseSlider = ( exercises : Exercise[] ) => {

  const [ state, setState ] = useState( ExerciseState.Initialized );

  const [ currentExercise, setCurrentExercise ] = useState( 0 );

  const start = () => { 
    
    setState( ExerciseState.Starting ); 

    startPreStartTimer(); 
  
  };

  const onRestComplete = () => {

    setCurrentExercise( currentExercise => currentExercise + 1 );

    setState( ExerciseState.Started );

  };

  const onExerciseComplete = () => {

    if ( currentExercise + 1 >= exercises.length ) return setState( ExerciseState.Completed );

    setState( ExerciseState.Resting );

    startRestTimer( 5 );

  };

  const onPreStartComplete = () => {

    setState( ExerciseState.Started );

  };

  const next = () => {

    onExerciseComplete();

  };

  const {
    timeString: restString,
    startI: startRestTimer,
    toggleState: toggleRest,
    state: restState
  } = useTimer( 5, TimerType.Countdown, onRestComplete );

  const {
    timeString: exerciseString,
    startI: startExerciseTimer,
    toggleState: toggleExercise,
    state: exerciseState
  } = useTimer( 5, TimerType.Countdown, onExerciseComplete );

  const {
    timeString: preStartString,
    start: startPreStartTimer,
    toggleState: togglePreStart,
    state: preStartState
  } = useTimer( 5, TimerType.Countdown, onPreStartComplete );

  useEffect(() => {

    if ( !([ ExerciseState.Started, ExerciseState.Resting ].includes( state )) ) return;

    if ( exercises[ currentExercise ].type === ExerciseType.Repeats ) return;

    if ( state === ExerciseState.Started ) {

      startExerciseTimer( exercises[ currentExercise ].time || 0 );

    } else {

      startRestTimer( 5 );

    }

  }, [ state ]);

  return {
    state,
    start,
    next,
    togglePreStart,
    toggleExercise,
    toggleRest,
    restState,
    exerciseState,
    preStartState,
    preStartString,
    restString,
    exerciseString,
    currentExercise: exercises[ currentExercise ],
    nextExercise: exercises[ currentExercise + 1 ]
  };

};

export default useExerciseSlider;