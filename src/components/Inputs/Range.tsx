import React, { useState } from "react";
import classes from './Range.module.css';

export type RangeProps = {
  orient : string;

};

const Range : React.FC< RangeProps > = ({ orient }) => {

  const [ value, setValue ] = useState( '0' );

  const handleChange = ( event : React.ChangeEvent< HTMLInputElement > ) => {

    setValue( event.target.value );

  };

  return (
    <div className={ orient === "horizontal" ? classes['range'] : classes['range-vertical'] }>
      <div 
        className={ classes['range-input-track'] }
        style={
          orient === "horizontal" ?
          { width: `${ value }%` } :
          { height: `${ value }%` }
        }
      ></div>
      <input orient={ orient } className={ classes['range-input'] } type="range" onChange={ handleChange } />
    </div>
  );

};

export default Range;