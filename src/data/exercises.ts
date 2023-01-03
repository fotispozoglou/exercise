import { Exercise, ExerciseType } from "../types/exercise";

const DEFAULT_REST_TIME = 4;

export const exercises : Exercise[] = [
  {
    id: '1',
    name: 'Crunches',
    time: 5,
    repeats: null,
    restTime: DEFAULT_REST_TIME,
    type: ExerciseType.Time,
  },
  {
    id: '2',
    name: 'Leg Lower',
    time: null,
    repeats: 12,
    restTime: DEFAULT_REST_TIME,
    type: ExerciseType.Repeats,
  },
  {
    id: '3',
    name: 'Russian Twist',
    time: 5,
    repeats: null,
    restTime: DEFAULT_REST_TIME,
    type: ExerciseType.Time,
  },
  // {
  //   id: '4',
  //   name: 'Side Jack-Knife',
  //   time: null,
  //   repeats: 12,
  //   restTime: DEFAULT_REST_TIME,
  //   type: ExerciseType.Repeats,
  // },
  // {
  //   id: '5',
  //   name: 'Cross Body Mountain-Climbers',
  //   time: null,
  //   repeats: 12,
  //   restTime: DEFAULT_REST_TIME,
  //   type: ExerciseType.Repeats,
  // },
  // {
  //   id: '6',
  //   name: 'plank',
  //   time: 60,
  //   repeats: null,
  //   restTime: DEFAULT_REST_TIME,
  //   type: ExerciseType.Time,
  // },
  // {
  //   id: '7',
  //   name: 'Jack Knife',
  //   time: 30,
  //   repeats: null,
  //   restTime: DEFAULT_REST_TIME,
  //   type: ExerciseType.Time,
  // },
  // {
  //   id: '8',
  //   name: 'Flutter Kicks',
  //   time: 35,
  //   repeats: 12,
  //   restTime: DEFAULT_REST_TIME,
  //   type: ExerciseType.Time,
  // },
];