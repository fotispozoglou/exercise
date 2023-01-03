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

export const exerciseActiveStates = [
  ExerciseState.Starting,
  ExerciseState.Started,
  ExerciseState.Resting,
];

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
  [ ExerciseState.Paused, 'inset 0px 0px 10px 12px blue' ],
  [ ExerciseState.Resting, 'inset 0px 0px 10px 12px green' ],
  [ ExerciseState.Completed, 'none' ],
]);

const useExerciseSlider = ( exercises : Exercise[] ) => {

  const [ state, setState ] = useState( ExerciseState.Initialized );
  const [ previousState, setPreviousState ] = useState( ExerciseState.Initialized );
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

  const handleSetState = ( newState : ExerciseState ) => {

    if ( exerciseActiveStates.includes( state ) && exerciseActiveStates.includes( newState ) ) {

      setPreviousState( newState );

      setState( newState );

    } else {

      setPreviousState( state );

      setState( newState );

    }

  };

  useEffect(() => {

    if ( timerState === TimerState.Completed ) {      

      if ( state === ExerciseState.Starting ) return handleSetState( ExerciseState.Started );

      if ( state === ExerciseState.Started ) { 

        return setCurrentExercise( currentExercise => {

          if ( currentExercise + 1 >= exercises.length ) {

            handleSetState( ExerciseState.Completed );

            return 0;

          }

          handleSetState( ExerciseState.Resting );

          return currentExercise + 1;

        });

      }

      if ( state === ExerciseState.Resting ) { 

        return handleSetState( ExerciseState.Started );

      }

    }

  }, [ timerState ]);

  useEffect(() => {

    if ( previousState === ExerciseState.Paused && exerciseActiveStates.includes( state ) ) {

      return continueTimer();
      
    }

    if ( state === ExerciseState.Starting ) return startTimer();

    if ( state === ExerciseState.Started ) {

      if ( exercises[ currentExercise ].type !== ExerciseType.Time ) return;

      setTimer( exercises[ currentExercise ].time || 0 );

      startTimer();

    }

    if ( state === ExerciseState.Resting ) {

      setTimer( exercises[ currentExercise ].restTime );

      startTimer();

    }

    if ( state === ExerciseState.Paused ) {

      pauseTimer();

    }

  }, [ state ]);

  const startExercise = (  ) => {

    handleSetState( ExerciseState.Starting );

  };

  const startExerciseRest = (  ) => {

    setCurrentExercise( currentExercise => currentExercise + 1 );

    handleSetState( ExerciseState.Resting );

  };

  const toggleExerciseState = () => {

    handleSetState( 
      exerciseActiveStates.includes( state ) ?  
      ExerciseState.Paused 
      :
      previousState
    );

  };

  return {
    currentExerciseIndex: currentExercise,
    currentExercise: exercises[ currentExercise ],
    nextExercise: exercises[ currentExercise + 1 ],
    timeString,
    state,
    startExercise,
    startExerciseRest,
    toggleExerciseState,
  };

};

export default useExerciseSlider;