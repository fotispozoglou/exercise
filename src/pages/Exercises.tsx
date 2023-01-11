import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ExerciseItem from "../components/Exercises/ExerciseItem";
import { database } from "../database/database";
import classes from './Exercises.module.css';

const Exercises : React.FC = () => {

  const exercises = useLiveQuery(() => database.exercises.toArray()) || [];

  const navigate = useNavigate();

  return (
    <div className={ classes['exercises'] }>
      <div className={ classes['header'] }>
        <Link to="/" className={ `${ classes['home-btn'] } reverse` }>
          <FontAwesomeIcon icon="house" />
        </Link>
        <Link className={ `${ classes['add-exercise'] } reverse` } to="/exercises/add">ADD EXERCISE</Link>
      </div>
      {
        exercises.map(
          exercise => <ExerciseItem key={ exercise.id } exercise={ exercise } />
        )
      }
    </div>
  );

};

export default Exercises;