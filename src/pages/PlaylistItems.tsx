import React from "react"
import { useParams } from "react-router-dom";

const PlaylistItems : React.FC = () => {

  const params = useParams();

  const { projectID } = params;

  return (
    <div>

    </div>
  );

};

export default PlaylistItems;