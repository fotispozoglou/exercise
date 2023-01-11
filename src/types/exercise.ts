export enum ExerciseType {
  Time = 1,
  Repeats = 2,
};

export type Exercise = {
  id : string;
  name : string;
  time : number | null;
  repeats : number | null;
  restTime : number;
  type : ExerciseType;
  image : string;
};

export type DatabaseExercise = {
  id : string;
  image : string;
  name : string;
  time : number | null;
  repeats : number | null;
  restTime : number;
  type : ExerciseType;
};