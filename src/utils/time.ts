export const getStringFromMillis = ( millis : number ) => {

  const seconds = Math.floor( ( millis / 1000 ) % 60 );
  const minutes = Math.floor( ( millis / 1000 ) / 60 );

  const secondsString = seconds < 10 ? `0${ seconds }` : `${ seconds }`;
  const minutesString = minutes < 10 ? `0${ minutes }` : `${ minutes }`;

  return `${ minutesString }:${ secondsString }`;

};