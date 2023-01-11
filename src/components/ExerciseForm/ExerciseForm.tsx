import React, { useState } from "react";
import { Exercise, ExerciseType } from "../../types/exercise";
import classes from './ExerciseForm.module.css';

export type ExerciseFormData = {
  image : string;
  name : string;
  type : ExerciseType;
  restTime : number;
  time : number | null;
  repeats : number | null;
};

export type ExerciseFormProps = {
  submitName : string;
  exercise ?: ExerciseFormData;
  onSubmit : ( exercise : ExerciseFormData ) => void;
};

const ExerciseForm : React.FC< ExerciseFormProps > = ({ submitName, onSubmit, exercise }) => {

  const [ image, setImage ] = useState( exercise?.image || '' );
  const [ imageBlob, setImageBlob ] = useState< string | null >( null );
  const [ name, setName ] = useState( exercise?.name || '' );
  const [ type, setType ] = useState( exercise?.type || ExerciseType.Time );
  const [ time, setTime ] = useState( exercise?.time || 10 );
  const [ repeats, setRepeats ] = useState( exercise?.repeats || 10 );
  const [ restTime, setRestTime ] = useState( exercise?.restTime || 10 );

  const handleSubmit = () => {

    const exerciseData = {
      image,
      name,
      type,
      time,
      repeats,
      restTime
    };

    onSubmit( exerciseData );

  };

  const handleSetImage = ( event : React.ChangeEvent< HTMLInputElement > ) => {

    if ( !event.target.files ) return;

    const imageName : string | null = event!.target!.files[0]!.name;

    setImage( imageName );

    const imageSrc = URL.createObjectURL( event!.target!.files[0] );

    setImageBlob( imageSrc );

  };

  const handleSetName = ( event : React.ChangeEvent< HTMLInputElement > ) => {  

    setName( event.target.value );

  };

  const handleTypeChange = ( event : React.ChangeEvent< HTMLSelectElement > ) => {

    const newType = Number( event.target.value );

    if ( newType === ExerciseType.Time ) return setType( ExerciseType.Time );

    if ( newType === ExerciseType.Repeats ) return setType( ExerciseType.Repeats );

    setType( ExerciseType.Time );

  };

  const handleSetTime = ( event : React.ChangeEvent< HTMLInputElement > ) => {  

    setTime( Number( event.target.value ) );

  };

  const handleSetRepeats = ( event : React.ChangeEvent< HTMLInputElement > ) => {  

    setRepeats( Number( event.target.value ) );

  };

  const handleSetRestTime = ( event : React.ChangeEvent< HTMLInputElement > ) => {  

    setRestTime( Number( event.target.value ) );

  };  

  return (
    <div className={ classes['exercise-form'] }>
      <div className={ classes['exercise-form-control'] }>
        <label className={ classes['input-label'] }>IMAGE</label>
        { ( imageBlob || image ) && <img className={ classes['exercise-image'] } src={ imageBlob || `/${ image} ` } /> }
        <input type="file" onChange={ handleSetImage } placeholder="NAME" />
      </div>
      <div className={ classes['exercise-form-control'] }>
        <label className={ classes['input-label'] }>NAME OF EXERCISE</label>
        <input type="text" onChange={ handleSetName } defaultValue={ name } placeholder="NAME" />
      </div>
      <div className={ classes['exercise-form-control'] }>
        <label className={ classes['input-label'] }>TYPE</label>
        <select defaultValue={ type } onChange={ handleTypeChange }>
          <option value={ ExerciseType.Time }>Time</option>
          <option value={ ExerciseType.Repeats }>Repeats</option>
        </select>
      </div>
      <div className={ classes['exercise-form-control'] }>
        <label className={ classes['input-label'] }>
          { type === ExerciseType.Time ? "TIME" : "REPEATS" }
          { type === ExerciseType.Time && <span className={ classes['label-hint'] }>seconds</span> }
        </label>
        { 
          type === ExerciseType.Time && <input type="number" onChange={ handleSetTime } defaultValue={ time } placeholder="EXERCISE DURATION" /> 
        }
        { 
          type === ExerciseType.Repeats && <input type="number" onChange={ handleSetRepeats } defaultValue={ repeats } placeholder="NUMBER OF REPEATS" /> 
        }
      </div>
      <div className={ classes['exercise-form-control'] }>
        <label className={ classes['input-label'] }>
          REST TIME <span className={ classes['label-hint'] }>seconds</span>
        </label>
        <input type="number" onChange={ handleSetRestTime } defaultValue={ restTime } placeholder="REST TIME AFTER THIS EXERCISE" />
      </div>
      <button onClick={ handleSubmit } className={ classes['submit-btn'] }>{ submitName }</button>
    </div>
  );

};

export default ExerciseForm;