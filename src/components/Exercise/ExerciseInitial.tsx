import React from "react";
import classes from './ExerciseInitial.module.css';

export type ExercseInitialProps = {
  start : () => void;
};

const ExerciseInitial : React.FC< ExercseInitialProps > = ({ start }) => {

  return (
    <div className={ classes['exercise-initial'] }>
      <button onClick={ start }>START</button>
    </div>
  );

};

export default ExerciseInitial;