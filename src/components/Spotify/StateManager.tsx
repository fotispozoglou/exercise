import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Range from "../Inputs/Range";
import classes from './StateManager.module.css';

export type StateManagerProps = {
  currentTrack : {
    name : string;
    image : string;
  };
};

const StateManager : React.FC< StateManagerProps > = ({ currentTrack }) => {

  return (
    <div className={ classes['state-manager'] }>
      <div className={ classes['state-manager-image-container'] }>
        <img src={ currentTrack.image } />
      </div>
      <div className={ classes['state-manager-name-time'] }>
        <div className={ classes['state-manager-name-buttons'] }>
          <div className={ classes['state-manager-name'] }>
            <span className={ classes['state-manager-name-text'] }>{ currentTrack.name }</span>
          </div>
          <div className={ classes['state-manager-buttons'] }>
            <FontAwesomeIcon
              icon="backward-step"
              className={ classes['state-manager-back'] }
            />
            <FontAwesomeIcon
              icon="pause"
              className={ classes['state-manager-toggle'] }
            />
            <FontAwesomeIcon
              icon="forward-step"
              className={ classes['state-manager-next'] }
            />
          </div>
        </div>
        <div className={ classes['state-manager-time'] }>
          <Range orient="horizontal" />
        </div>
      </div>
    </div>
  );

};

export default StateManager;