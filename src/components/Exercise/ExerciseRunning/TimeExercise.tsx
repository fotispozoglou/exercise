import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ExerciseState } from "../../../hooks/exercises/useExercisesSlider.copy";
import { TimerState } from "../../../hooks/useTimer";
import { Exercise } from "../../../types/exercise";
import classes from './TimeExercise.module.css';

export type TimeExerciseProps = {
  currentExercise : Exercise;
  timeString : string;
  state : ExerciseState;
  toggleState : () => void;
};

const TimeExercise : React.FC< TimeExerciseProps > = ({ currentExercise, timeString, toggleState, state }) => {

  return (
    <div className={ classes['time-exercise'] }>
      <h1 className={ classes['exercise-time'] }>{ timeString }</h1>
      <h2 className={ classes['exercise-name'] }>{ currentExercise.name }</h2>
      <FontAwesomeIcon
        icon={ state === ExerciseState.Paused ? 'play' : 'pause' }
        onClick={ toggleState }
        className={ `${ classes['toggle-state-btn']} fa-fw` }
      />
    </div>
  );

};

export default TimeExercise;