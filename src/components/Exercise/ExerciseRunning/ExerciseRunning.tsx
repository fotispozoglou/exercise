import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ExerciseState } from "../../../hooks/exercises/useExercisesSlider";
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
  isPaused : boolean;
  isResting : boolean;
  toggleState : () => void;
};

const ExerciseRunning : React.FC< ExerciseRunningProps > = (
  { state, currentExercise, nextExercise, timeString, next, toggleState, isPaused, isResting }
  ) => {

  return (
    <div className={ classes['exercise-running'] }>
      {
        !isResting && 
        <img className={ classes['workout-image'] } src={`${ `${ currentExercise.id }.gif` }`} />
      }
      {
        isResting &&
        nextExercise &&
        <img className={ classes['workout-image'] } src={`${ `${ nextExercise.id }.gif` }`} />
      }
      {
        ( state === ExerciseState.Started && !isResting ) &&
        <div className={ classes['exercise-started'] }>
          {
            currentExercise.type === ExerciseType.Time ?
            <TimeExercise 
              currentExercise={ currentExercise } 
              timeString={ timeString }
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
        isResting &&
        <ExerciseResting 
          timeString={ timeString }
          nextExercise={ nextExercise }
        />
      }
      {
        ( currentExercise.type === ExerciseType.Time || isResting ) &&
        <FontAwesomeIcon
          icon={ isPaused ? 'play' : 'pause' }
          onClick={ toggleState }
          className={ `${ classes['toggle-state-btn']} fa-fw` }
        />
      }
    </div>
  );

};

export default ExerciseRunning;