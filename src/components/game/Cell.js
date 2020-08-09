import React from 'react';

const Cell = props => {

   const getValue = () => {
      if (!props.value.isRevealed) {
         return props.value.isFlagged ? "🚩" : null;
      } else if (props.value.isMine) {
         return "💣";
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
      >
         {getValue()}
      </div>
   );
};

export default Cell;