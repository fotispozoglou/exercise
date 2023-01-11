import React from "react";
import { useNavigate } from "react-router-dom";
import { Exercise } from "../../types/exercise";
import classes from './ExerciseItem.module.css';

export type ExerciseItemProps = {
  exercise : Exercise;
};

const ExerciseItem : React.FC< ExerciseItemProps > = ({ exercise }) => {

  const navigate = useNavigate();

  return (
    <div 
        className={ classes['exercise'] }
        key={ exercise.id } 
        onClick={ () => { navigate(`/exercises/${ exercise.id }`) } }
      >
      <div className={ classes['exercise-image-container'] }>
        <img src={ `/${ exercise.image }` } className={ classes['exercise-image'] } />
      </div>
      <div className={ classes['exercise-name-container'] }>
        <p className={ classes['exercise-name'] }>{ exercise.name }</p>
      </div>
    </div>
  );

};

export default ExerciseItem;