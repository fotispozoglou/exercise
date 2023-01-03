import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Exercise } from "../../../types/exercise";
import classes from './RepeatsExercise.module.css';

export type RepeatsExerciseProps = {
  currentExercise : Exercise;
  next : () => void;
};

const RepeatsExercise : React.FC< RepeatsExerciseProps > = ({ currentExercise, next }) => {

  return (
    <div className={ classes['exercise-repeats'] }>
      <h1 className={ classes['exercise-repeats-text'] }>x{ currentExercise.repeats }</h1>
      <FontAwesomeIcon
        icon="check"
        className={ classes['exercise-done'] }
        onClick={ next }
      />
    </div>
  );

};

export default RepeatsExercise;