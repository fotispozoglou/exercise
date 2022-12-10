export enum ExerciseType {
  Time = 1,
  Repeats = 2,
};

export type Exercise = {
  id : string;
  name : string;
  time : number | null;
  repeats : number | null;
  type : ExerciseType;
};