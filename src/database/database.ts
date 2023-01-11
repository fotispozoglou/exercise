import Dexie, { Table } from 'dexie';
import { DatabaseExercise } from '../types/exercise';
import { v4 as uuidv4 } from 'uuid';

export class ExercisesDatabase extends Dexie {
  exercises !: Table< DatabaseExercise >; 

  constructor() {
    super('ExerciseDatabase');

    this.version(1).stores({
      exercises: '++id, name, type'
    });
  
  }

}

export const database = new ExercisesDatabase();

export const generateUUID = () => {

  return uuidv4();

};