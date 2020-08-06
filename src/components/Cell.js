import React from 'react';

const Cell = props => {

   const getValue = () => {
      if (props.isRevealed) {
         return props.isFlagged ? "🚩" : null;
      }
      if (props.isMine) {
         return "💣";
      }
      if (props.neighbor === 0) {
         return null;
      }
      return props.neighbor;
   }

   return (
      <div
         onClick={props.onClick}
         onContextMenu={props.onContextMenu}
      >
         {getValue()}
      </div>
   );
};

export default Cell;