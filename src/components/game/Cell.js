import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

const Cell = props => {
   const border = props.value.color === "" ? "" : "border-" + props.value.color;

   const getValue = () => {
      if (!props.value.isRevealed) {
         return props.value.isFlagged ? 
         <FontAwesomeIcon 
            icon={faFlag} 
            className={"fa-flag-" + props.value.flagColor}
            style={{ 
               fontSize: "1.7rem", 
            }}/> 
         : null;
      } else if (props.value.isMine) {
         return <FontAwesomeIcon icon={faBomb} style={{ fontSize: "1.7rem", color:"black"}}/>
      } else if (props.value.neighbor === 0) {
         return null;
      } else {
         return props.value.neighbor;
      }
   }

   const classNames = () => {
      if (!props.value.isRevealed && props.value.isFlagged) {
         return "cell hidden";
      }
      return "cell" +
      (props.value.isRevealed ? "" : " hidden") +
      (props.value.isMine ? " is-mine" : "") +
      (props.value.isFlagged ? " is-flag" : "");
   };

   return (
      <div 
         className={classNames() + " " + border}
         onClick={props.onClick}
         onContextMenu={props.onContextMenu}
      >
         {getValue()}
      </div>
   );
};

export default Cell;