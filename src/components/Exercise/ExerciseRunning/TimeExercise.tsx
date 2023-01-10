import React from "react";
import { Exercise } from "../../../types/exercise";
import classes from './TimeExercise.module.css';

export type TimeExerciseProps = {
  currentExercise : Exercise;
  timeString : string;
};

const TimeExercise : React.FC< TimeExerciseProps > = ({ currentExercise, timeString }) => {

  return (
    <div className={ classes['time-exercise'] }>
      <h1 className={ classes['exercise-time'] }>{ timeString }</h1>
      <h2 className={ classes['exercise-name'] }>{ currentExercise.name }</h2>
    </div>
  );

};

export default TimeExercise;