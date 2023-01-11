import { useLiveQuery } from "dexie-react-hooks";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../../database/database";
import { saveExercise } from "../../database/exercises";
import ExerciseForm, { ExerciseFormData } from "./ExerciseForm";
import classes from './EditExercise.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditExercise : React.FC = () => {

  const [ isLoaded, setIsLoaded ] = useState( false );

  const params = useParams();

  const id = params.id || '';

  const exercise = useLiveQuery(() => database.exercises.get( id ));

  const handleEditExercise = async ( exerciseData : ExerciseFormData ) => {

    if ( !id ) return;

    const isUpdated = await saveExercise( id, exerciseData );

  };

  useEffect(() => { 
    
    const loadTimeout = setTimeout(() => { 
      
      setIsLoaded( true ); 
    
    }, 2000);
    
    return () => clearTimeout( loadTimeout );
  
  }, [  ]);

  if ( !exercise && !isLoaded ) return <p>LOADING</p>;

  if ( !exercise && isLoaded ) return (
    <div className={ classes['not-found-container'] }>
      <h1 className={ classes['title-error'] }>EXERCISE NOT FOUND</h1>
      <Link className={ classes['return-button'] } to="/exercises">RETURN TO EXERCISES</Link>
    </div>
  );

  return (
    <div>
      <div className={ classes['title-container'] }>
        <Link to="/exercises" className={ classes['back-btn-container'] }>
          <FontAwesomeIcon icon="arrow-left" className={ classes['back-btn'] } />
        </Link>
        <h1 className={ classes['title'] }>EDIT EXERCISE</h1>
      </div>  
      <ExerciseForm exercise={ exercise } onSubmit={ handleEditExercise } submitName="SAVE" />
    </div>
  );

};

export default EditExercise;