import React from 'react';
import { FilePerson } from 'react-bootstrap-icons';

const PlayerIcon = props => {
   return (
      <div>
         <FilePerson size={96} color={props.color}
                     style={{ display: "block", margin: "auto" }}/>
         <h1 style={{ textAlign: "center" }}>
            {props.name}
         </h1>
      </div>
   );
};

export default PlayerIcon;