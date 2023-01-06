import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        (state === ExerciseState.Resting || state === ExerciseState.Started || state === ExerciseState.Paused) &&
        <img className={ classes['workout-image'] } src={`${ `${ currentExercise.id }.gif` }`} />
      }
      {
        ( state === ExerciseState.Started ) &&
        <div className={ classes['exercise-started'] }>
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
      {
        state === ExerciseState.Paused &&
        <FontAwesomeIcon
          icon={ state === ExerciseState.Paused ? 'play' : 'pause' }
          onClick={ toggleState }
          className={ `${ classes['toggle-state-btn']} fa-fw` }
        />
      }
    </div>
  );

};

export default ExerciseRunning;