import { ExerciseFormData } from "../components/ExerciseForm/ExerciseForm";
import { Exercise } from "../types/exercise";
import { database, generateUUID } from "./database";

export const addExercise = async ( exerciseData : ExerciseFormData ) : Promise< boolean > => {

  const newExercise = {
    id: generateUUID(),
    ...exerciseData
  };

  try {

    database.exercises.add( newExercise, newExercise.id );

    return true;

  } catch {

    return false;

  }

};

export const saveExercise = async ( exerciseID : string, updatedExercise : ExerciseFormData ) : Promise< boolean > => {

  try {

    database.exercises.update( exerciseID, updatedExercise );

    return true;

  } catch {

    return false;

  }

};