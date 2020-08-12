import React from 'react';
import { FlagFill } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

const Cell = props => {
   const border = props.value.color === "" ? "" : "5px solid " + props.value.color;
   props.value.color !== "" && console.log(border);

   const getValue = () => {
      if (!props.value.isRevealed) {
         return props.value.isFlagged ? <FlagFill color="red" size="2rem"/> : null;
         // return props.value.isFlagged ? "🚩" : null;
      } else if (props.value.isMine) {
         return <FontAwesomeIcon icon={faBomb} style={{ fontSize: "1.7rem", color:"black"}}/>
         // return "💣";
      } else if (props.value.neighbor === 0) {
         return null;
      } else {
         return props.value.neighbor;
      }
   }

   let className = "cell" +
      (props.value.isRevealed ? "" : " hidden") +
      (props.value.isMine ? " is-mine" : "") +
      (props.value.isFlagged ? " is-flag" : "");
   
   return (
      <div 
         className={className}
         onClick={props.onClick}
         onContextMenu={props.onContextMenu}
         style= {{ border: border }}
      >
         {getValue()}
      </div>
   );
};

export default Cell;