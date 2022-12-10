import React from "react";
import classes from './ExerciseDone.module.css';

const ExerciseDone : React.FC = () => {

  return (
    <div className={ classes['exercise-done'] }>
      <h1>Completed</h1>
    </div>
  );

};

export default ExerciseDone;