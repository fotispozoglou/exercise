import { Exercise, ExerciseType } from "../types/exercise";

export const exercises : Exercise[] = [
  {
    id: '1',
    name: 'Crunches',
    time: null,
    repeats: 20,
    type: ExerciseType.Repeats,
  },
  {
    id: '2',
    name: 'Leg Lower',
    time: null,
    repeats: 12,
    type: ExerciseType.Repeats,
  },
  {
    id: '3',
    name: 'Russian Twist',
    time: 30,
    repeats: null,
    type: ExerciseType.Time,
  },
  {
    id: '4',
    name: 'Side Jack-Knife',
    time: null,
    repeats: 12,
    type: ExerciseType.Repeats,
  },
  {
    id: '5',
    name: 'Cross Body Mountain-Climbers',
    time: null,
    repeats: 12,
    type: ExerciseType.Repeats,
  },
  {
    id: '6',
    name: 'plank',
    time: 60,
    repeats: null,
    type: ExerciseType.Time,
  },
  {
    id: '7',
    name: 'Jack Knife',
    time: 30,
    repeats: null,
    type: ExerciseType.Time,
  },
  {
    id: '8',
    name: 'Flutter Kicks',
    time: 35,
    repeats: 12,
    type: ExerciseType.Time,
  },
];