import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ExerciseState } from "../../../hooks/exercises/useExercisesSlider";
import { Exercise } from "../../../types/exercise";
import classes from './ExerciseResting.module.css';

export type ExerciseRestingProps = {
  timeString : string;
  nextExercise : Exercise | null;
  toggleState : () => void;
  state : ExerciseState;
};

const ExerciseResting : React.FC< ExerciseRestingProps > = ({ timeString, nextExercise, toggleState, state }) => {

  if ( !nextExercise ) return <></>;

  return (
    <div className={ classes['exercise-resting'] }>
      <img className={ classes['exercise-image'] } src={ `${ nextExercise.id }.gif` } />
      <h1 className={ classes['exercise-time'] }>{ timeString }</h1>
      { 
        nextExercise && 
        <p className={ classes['next-exercise-name'] }>
          Next <span className={ classes['exercise-name'] }>{ nextExercise.name }</span>
        </p> 
      }
      <FontAwesomeIcon
        icon={ state === ExerciseState.Paused ? 'play' : 'pause' }
        onClick={ toggleState }
        className={ `${ classes['toggle-state-btn']} fa-fw` }
      />
    </div>
  );

};

export default ExerciseResting;