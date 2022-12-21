import { useEffect, useRef } from "react";

const useBeep = () => {

  const audio = new Audio("/beep.mp3");

  const beep = () => {

    audio.play();

  };

  return { beep };

};

export default useBeep;