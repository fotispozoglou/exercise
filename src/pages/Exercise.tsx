import React from "react";
import ExerciseDone from "../components/Exercise/ExerciseDone";
import ExerciseInitial from "../components/Exercise/ExerciseInitial";
import ExerciseRunning from "../components/Exercise/ExerciseRunning";
import ExerciseStarting from "../components/Exercise/ExerciseStarting";
import { exercises } from "../data/exercises";
import useExerciseSlider, { ExerciseState } from "../hooks/useExercisesSlider";
import { ExerciseType } from "../types/exercise";
import classes from './Exercise.module.css';

const Exercise : React.FC = () => {

  const {
    state,
    start,
    toggleState,
    currentExercise,
    nextExercise,
    timeString,
    next
  } = useExerciseSlider( exercises );

  return (
    <div className={ classes['exercise'] }>
      {
        state === ExerciseState.Initialized && 
        (
          <div>
            <ExerciseInitial start={ start } />
            { 
              exercises.map( exercise => (
                <div className={ classes['exercise-preview'] }>
                  <img className={ classes['exercise-preview-image'] } src={ `/${ exercise.id }.gif` } />
                  <h2 className={ classes['exercise-preview-name'] }>{ exercise.name }</h2>
                </div>
              ))
            }
          </div>
        )
      }
      {
        state === ExerciseState.Starting && <ExerciseStarting currentExercise={ currentExercise } preStartString={ timeString } />
      }
      {
        [ ExerciseState.Started, ExerciseState.Resting, ExerciseState.Paused ].includes( state ) &&
        <ExerciseRunning 
          toggleState={ toggleState }
          state={ state } 
          currentExercise={ currentExercise } 
          nextExercise={ nextExercise }
          timeString={ timeString }
          next={ next }
        />
      }
      {
        state === ExerciseState.Completed && <ExerciseDone />
      }
    </div>
  );

};

export default Exercise;