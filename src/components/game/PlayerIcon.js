import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

const PlayerIcon = props => {
   return (
      <div>
         <FontAwesomeIcon 
            icon={faFlag} 
            className={"fa-flag-" + props.color}
            style={{
               fontSize: "6rem",
               display: "block", 
               margin: "auto" 
            }}/>
         {/* <Flag size={96} color={props.color}
                     style={{ display: "block", margin: "auto" }}/> */}
         <p style={{ textAlign: "center" }} className="game-font-size">
            {props.name}
         </p>
      </div>
   );
};

export default PlayerIcon;