import React, { useEffect, useState } from "react";
import classes from './Range.module.css';

export type RangeProps = {
  orient : string;
};

type RangeDragEvent = React.TouchEvent | React.MouseEvent;

const Range : React.FC< RangeProps > = ({ orient }) => {

  const [ isMoving, setIsMoving ] = useState( false );
  const [ value, setValue ] = useState( 0 );

  useEffect(() => {

    const timeout = setTimeout(() => {

      if ( isMoving ) return;

      setValue( currentValue => currentValue + 1 );

    }, 1000);

    return ( ) => clearTimeout( timeout );

  }, [ value, isMoving ]);

  const handleSetValue = ( event : RangeDragEvent ) => {

    event.persist();

    var rect = event.currentTarget.getBoundingClientRect();

    let x = rect.width;

    if ( window.TouchEvent && event.nativeEvent instanceof window.TouchEvent ) {

      x = event.nativeEvent.changedTouches[0].clientX - rect.left;

    }

    if ( event.nativeEvent instanceof MouseEvent ) {

      x = event.nativeEvent.clientX - rect.left;

    }

    setValue( (x / rect.width) * 100 );

  };

  const handleDragStart = ( event : RangeDragEvent ) => {

    handleSetValue( event );

    setIsMoving( true );

  };

  const handleDragging = ( event : RangeDragEvent ) => {

    if ( !isMoving ) return;

    handleSetValue( event );

  };

  const handleDragStop = ( event : RangeDragEvent ) => {

    handleSetValue( event );

    setIsMoving( false );

  };

  return (
    <div
      onMouseDown={ handleDragStart } 
      onMouseUp={ handleDragStop } 
      onMouseMove={ handleDragging }
      // onTouchStart={ () => { setIsMoving( true ); } }
      // onTouchMove={ handleChange }
      className={ orient === "horizontal" ? classes['range'] : classes['range-vertical'] }
      >
      <div 
        className={ classes['range-input-track'] }
        style={
          orient === "horizontal" ?
          { width: `${ value }%` } :
          { height: `${ value }%` }
        }
      ></div>
    </div>
  );

};

export default Range;