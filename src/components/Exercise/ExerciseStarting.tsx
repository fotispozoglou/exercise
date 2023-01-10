import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Exercise } from "../../types/exercise";
import classes from './ExerciseStarting.module.css';

export type ExerciseStartingProps = {
  preStartString : string;
  currentExercise : Exercise;
  isPaused : boolean;
  toggleState : () => void;
};

const ExerciseStarting : React.FC< ExerciseStartingProps > = ({ preStartString, currentExercise, isPaused, toggleState }) => {

  return (
    <div className={ classes['exercise-starting'] }>
      <img className={ classes['exercise-image'] } src={ `${ currentExercise.id }.gif` } />
      <h1 className={ classes['exercise-next-name'] }>
        Next <span className={ classes['exercise-name'] }>{ currentExercise.name }</span>
      </h1>
      <h1 className={ classes['exercise-pre-timer'] }>{ preStartString }</h1>
      <FontAwesomeIcon
        icon={ isPaused ? 'play' : 'pause' }
        onClick={ toggleState }
        className={ `${ classes['toggle-state-btn']} fa-fw` }
      />
    </div>
  );

};

export default ExerciseStarting;