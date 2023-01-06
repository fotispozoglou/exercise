import { useEffect, useState } from "react";
import { Exercise, ExerciseType } from "../../types/exercise";
import useBeep from "./useBeep";
import useTimer, { TimerState, TimerType } from "../useTimer";

export enum ExerciseState {
  Initialized = 1,
  Starting = 2,
  Started = 3,
  Completed = 4,
};

// export const ExerciseColors = new Map([
//   [ ExerciseState.Initialized, 'none' ],
//   [ ExerciseState.Starting, 'none' ],
//   [ ExerciseState.Started, 'inset 0px 0px 10px 12px rgba(54, 35, 191, 0.34)' ],
//   [ ExerciseState.Paused, 'rgba(32, 28, 151, 0.34) 0px 0px 10px 12px inset' ],
//   [ ExerciseState.Resting, 'inset 0px 0px 10px 12px rgba(54, 35, 191, 0.34)' ],
//   [ ExerciseState.Completed, 'none' ],
// ]);

export const ExerciseColors = new Map([
  [ ExerciseState.Initialized, 'none' ],
  [ ExerciseState.Starting, 'none' ],
  [ ExerciseState.Started, 'inset 0px 0px 10px 12px red' ],
  [ ExerciseState.Completed, 'none' ],
]);

const useExerciseSlider = ( exercises : Exercise[] ) => {

  const [ state, setState ] = useState( ExerciseState.Initialized );
  const [ isResting, setIsResting ] = useState( false );
  const [ isPaused, setIsPaused ] = useState( false );
  const [ currentExercise, setCurrentExercise ] = useState( 0 );

  const {
    timeString,
    state: timerState,
    startTimer,
    resetTimer,
    pauseTimer,
    setTimer,
    continueTimer
  } = useTimer( 5 );

  useEffect(() => {

    if ( timerState === TimerState.Completed ) {

      if ( state === ExerciseState.Starting ) setState( ExerciseState.Started );

      if ( state === ExerciseState.Started && !isResting ) {
      
        if ( currentExercise + 1 >= exercises.length ) return setState( ExerciseState.Completed );

        setIsResting( true );
      
      }

      if ( state === ExerciseState.Started && isResting ) {
        
        setIsResting( false );

        setCurrentExercise( currentExercise => currentExercise + 1 );

      }

    }

  }, [ timerState ]);

  useEffect(() => {

    if ( state === ExerciseState.Starting ) startTimer( 5 );

    if ( state === ExerciseState.Started ) {

      if ( isResting ) {

        startTimer( exercises[ currentExercise ].restTime );

      } else {

        if ( exercises[ currentExercise ].type !== ExerciseType.Time ) return;

        startTimer( exercises[ currentExercise ].time || 0 );

      }

    }

  }, [ state, isResting ]);

  const startExercise = (  ) => {

    setState( ExerciseState.Starting );

  };

  const startExerciseRest = (  ) => {

    setIsResting( true );

  };

  const toggleExerciseState = () => {

    setIsPaused( isPaused => {

      if ( exercises[ currentExercise ].type !== ExerciseType.Time && !isResting ) return isPaused; 

      isPaused ? continueTimer() : pauseTimer();

      return !isPaused;

    });

  };

  return {
    currentExerciseIndex: currentExercise,
    currentExercise: exercises[ currentExercise ],
    nextExercise: exercises[ currentExercise + 1 ],
    timeString,
    isResting,
    isPaused,
    state,
    startExercise,
    startExerciseRest,
    toggleExerciseState,
  };

};

export default useExerciseSlider;