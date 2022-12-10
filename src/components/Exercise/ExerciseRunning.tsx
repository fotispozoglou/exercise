import React from "react";
import { ExerciseState } from "../../hooks/useExercisesSlider";
import { Exercise, ExerciseType } from "../../types/exercise";
import classes from './ExerciseRunning.module.css';

export type ExerciseRunningProps = {
  state : ExerciseState;
  currentExercise : Exercise;
  nextExercise : Exercise;
  timeString : string;
  next : () => void;
  toggleState : () => void;
};

const ExerciseRunning : React.FC< ExerciseRunningProps > = (
  { state, currentExercise, nextExercise, timeString, next, toggleState }
  ) => {

  document.querySelector('html')!.style.boxShadow = 'inset 0px 0px 10px 12px rgba(54, 35, 191, 0.34)';

  return (
    <div className={ classes['exercise-running'] }>
      {
        state === ExerciseState.Started &&
        <div className={ classes['exercise-started'] }>
          <img className={ classes['workout-image'] } src={`${ `${ currentExercise.id }.gif` }`} />
          {
            currentExercise.type === ExerciseType.Time ?
            <div>
              <h2>{ currentExercise.name }</h2>
              <h1>{ timeString }</h1>
              <button onClick={ toggleState }>pause/continue</button>
            </div>
            :
            <div className={ classes['exercise-repeats'] }>
              <h1 className={ classes['exercise-repeats-text'] }>x{ currentExercise.repeats }</h1>
              <button onClick={ next }>done</button>
            </div>
          }
        </div>
      }
      {
        state === ExerciseState.Resting &&
        <div>
          <h2>Resting</h2>
          <h1>{ timeString }</h1>
          <h3>
            { nextExercise && `Next ${ nextExercise.name }` }
          </h3>
          <button onClick={ toggleState }>pause/continue</button>
        </div>
      }
      {
        state === ExerciseState.Paused &&
        <p>Paused</p>
      }
    </div>
  );

};

export default ExerciseRunning;