import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ExerciseDone from "../components/Exercise/ExerciseDone";
import ExerciseInitial from "../components/Exercise/ExerciseInitial";
import ExerciseRunning from "../components/Exercise/ExerciseRunning/ExerciseRunning";
import ExerciseStarting from "../components/Exercise/ExerciseStarting";
import { exercises } from "../data/exercises";
import useExerciseSlider, { ExerciseState } from "../hooks/exercises/useExercisesSlider";
import { ExerciseType } from "../types/exercise";
import classes from './Exercise.module.css';

const Exercise : React.FC = () => {

  const {
    currentExercise,
    nextExercise,
    timeString,
    state,
    startExercise,
    startExerciseRest,
    toggleExerciseState,
    currentExerciseIndex
  } = useExerciseSlider( exercises );

  // return (
  //   <div className={ classes['test-container'] }>
  //     { currentExercise && <p>Current: { currentExerciseIndex } { currentExercise.name } - { currentExercise.type === ExerciseType.Repeats ? "REP" : "TIM" }</p> }
  //     { nextExercise && <p>Next: { currentExerciseIndex + 1 } { nextExercise.name } - { nextExercise.type === ExerciseType.Repeats ? "REP" : "TIM" }</p> }
  //     { state === ExerciseState.Initialized && <p>State: Initialized</p> }
  //     { state === ExerciseState.Starting && <p>State: Starting</p> }
  //     { state === ExerciseState.Started && <p>State: Started</p> }
  //     { state === ExerciseState.Resting && <p>State: Resting</p> }
  //     { state === ExerciseState.Paused && <p>State: Paused</p> }
  //     <p className={ classes['test-timer'] }>{ timeString }</p>
  //     { state === ExerciseState.Initialized && <button className={ classes['test-start'] } onClick={ startExercise }>start</button> }
  //     {   
  //       currentExercise &&
  //       ( 
  //         currentExercise.type === ExerciseType.Repeats && 
  //         [ ExerciseState.Started || ExerciseState.Paused ].includes( state ) 
  //       ) &&
  //       <button onClick={ startExerciseRest }>Done</button>
  //     }
  //     <FontAwesomeIcon
  //       className={ `${ classes['test-icon']} fa-fw` }    
  //       icon={ state === ExerciseState.Paused ? 'play' : 'pause' }
  //       onClick={ toggleExerciseState }
  //     />
  //   </div>
  // )

  return (
    <div className={ classes['exercise'] }>
      {
        state === ExerciseState.Initialized && 
        (
          <div>
            <ExerciseInitial start={ startExercise } />
            { 
              exercises.map( exercise => (
                <div key={ exercise.id } className={ classes['exercise-preview'] }>
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
          key={ currentExercise.id }
          toggleState={ toggleExerciseState }
          state={ state } 
          currentExercise={ currentExercise } 
          nextExercise={ nextExercise }
          timeString={ timeString }
          next={ startExerciseRest }
        />
      }
      {
        state === ExerciseState.Completed && <ExerciseDone />
      }
    </div>
  );

};

export default Exercise;