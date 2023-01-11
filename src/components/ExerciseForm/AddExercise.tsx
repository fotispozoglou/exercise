import React from "react";
import { addExercise } from "../../database/exercises";
import ExerciseForm, { ExerciseFormData } from "./ExerciseForm";
import classes from './AddExercise.module.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddExercise : React.FC = () => {

  const handleAddExercise = async ( exerciseData : ExerciseFormData ) => {

    const isAdded = await addExercise( exerciseData );

  };

  return (
    <div>
      <div className={ classes['title-container'] }>
        <Link to="/exercises" className={ classes['back-btn-container'] }>
          <FontAwesomeIcon icon="arrow-left" className={ classes['back-btn'] } />
        </Link>
        <h1 className={ classes['title'] }>ADD EXERCISE</h1>
      </div> 
      <ExerciseForm onSubmit={ handleAddExercise } submitName="ADD" />
    </div>
  );

};

export default AddExercise;