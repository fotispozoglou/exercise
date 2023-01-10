import React from "react";
import { Exercise } from "../../../types/exercise";
import classes from './ExerciseResting.module.css';

export type ExerciseRestingProps = {
  timeString : string;
  nextExercise : Exercise | null;
};

const ExerciseResting : React.FC< ExerciseRestingProps > = ({ timeString, nextExercise }) => {

  if ( !nextExercise ) return <></>;

  return (
    <div className={ classes['exercise-resting'] }>
      <h1 className={ classes['exercise-time'] }>{ timeString }</h1>
      { 
        nextExercise && 
        <p className={ classes['next-exercise-name'] }>
          Next <span className={ classes['exercise-name'] }>{ nextExercise.name }</span>
        </p> 
      }
    </div>
  );

};

export default ExerciseResting;