import { useEffect, useState } from "react";
import { Exercise, ExerciseType } from "../../types/exercise";
import useBeep from "./useBeep";
import useTimer, { TimerState, TimerType } from "../useTimer";

export enum ExerciseState {
  Initialized = 1,
  Starting = 2,
  Started = 3,
  Paused = -3,
  Resting = 4,
  Completed = 5,
};

const useExerciseSlider = ( exercises : Exercise[] ) => {

  const { beep } = useBeep();

  const [ state, setState ] = useState( ExerciseState.Initialized );

  const [ currentExercise, setCurrentExercise ] = useState( 0 );

  const onTimerComplete = () => {

    beep();

    if ( state === ExerciseState.Starting ) return setState( ExerciseState.Started );

    if ( state === ExerciseState.Started ) {
     
      if ( currentExercise + 1 >= exercises.length ) return setState( ExerciseState.Completed );
      
      return setState( ExerciseState.Resting );

    }

    if ( state === ExerciseState.Resting ) {
     
      setCurrentExercise( currentExercise => currentExercise + 1 );
      
      return setState( ExerciseState.Started );

    }

  };

  const next = () => {

    beep();

    if ( currentExercise + 1 >= exercises.length ) return setState( ExerciseState.Completed );

    setState( ExerciseState.Resting );

  };

  const {
    timeString,
    startI,
    start: startTimer,
    toggleState,
  } = useTimer( 5, TimerType.Countdown, onTimerComplete );

  const start = () => {

    setState( ExerciseState.Starting );

    startTimer();

  };

  useEffect(() => {

    if ( !([ ExerciseState.Started, ExerciseState.Resting ].includes( state )) ) return;

    if ( exercises[ currentExercise ].type === ExerciseType.Repeats && state === ExerciseState.Started ) return;

    if ( state === ExerciseState.Started ) {

      startI( exercises[ currentExercise ].time || 0 );

    } else {

      startI( 5 );

    }

  }, [ state ]);

  return {
    timeString,
    start,
    state,
    toggleState,
    next,
    currentExercise: exercises[ currentExercise ],
    nextExercise: exercises[ currentExercise + 1 ]
  }

};

export default useExerciseSlider;