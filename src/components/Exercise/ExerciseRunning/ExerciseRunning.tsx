import React from "react";
import { ExerciseColors, ExerciseState } from "../../../hooks/exercises/useExercisesSlider";
import { TimerState } from "../../../hooks/useTimer";
import { Exercise, ExerciseType } from "../../../types/exercise";
import ExerciseResting from "./ExerciseResting";
import classes from './ExerciseRunning.module.css';
import RepeatsExercise from "./RepeatsExercise";
import TimeExercise from "./TimeExercise";

export type ExerciseRunningProps = {
  state : ExerciseState;
  currentExercise : Exercise;
  nextExercise : Exercise | null;
  timeString : string;
  next : () => void;
  toggleState : () => void;
};

const ExerciseRunning : React.FC< ExerciseRunningProps > = (
  { state, currentExercise, nextExercise, timeString, next, toggleState }
  ) => {

  const stateColor = ExerciseColors.get( state );

  document.querySelector('html')!.style.boxShadow = stateColor || '';

  return (
    <div className={ classes['exercise-running'] }>
      {
        ( state === ExerciseState.Started || state === ExerciseState.Paused ) &&
        <div className={ classes['exercise-started'] }>
          <img className={ classes['workout-image'] } src={`${ `${ currentExercise.id }.gif` }`} />
          {
            currentExercise.type === ExerciseType.Time ?
            <TimeExercise 
              currentExercise={ currentExercise } 
              timeString={ timeString }
              state={ state }
              toggleState={ toggleState }
            />
            :
            <RepeatsExercise 
              currentExercise={ currentExercise }
              next={ next }
            />
          }
        </div>
      }
      {
        state === ExerciseState.Resting &&
        <ExerciseResting 
          state={ state }
          timeString={ timeString }
          nextExercise={ currentExercise }
          toggleState={ toggleState }
        />
      }
      {/* {
        state === ExerciseState.Paused &&
        <div>
          <p>Paused</p>
          <button onClick={ toggleState }>aaaa</button>
        </div>
      } */}
    </div>
  );

};

export default ExerciseRunning;