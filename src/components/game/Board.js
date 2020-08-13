import React, {  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Cell from "./Cell";
import { sendNewMines, sendNewBoard, setGameWin, setGameLose } from "../../redux/actions/gameActions";

export const initBoard = (width, height, mines) => {
   let newBoard = createEmptyArray(width, height);
   newBoard = plantMines(width, height, mines, newBoard);
   newBoard = getNeighbors(width, height, newBoard);
   return newBoard;
};

export const createEmptyArray = (width, height) => {
   let newBoard = [];
   for (let i = 0; i < height; i++) {
      newBoard.push([]);
      for (let j = 0; j < width; j++) {
         newBoard[i][j] = {
            x: i,
            y: j,
            isMine: false,
            neighbor: 0,
            isRevealed: false,
            isEmpty: false,
            isFlagged: false,
            color: "", 
            flagColor: ""
         };
      }
   }
   return newBoard;
};

export const plantMines = (width, height, mines, newBoard) => {
   let randX = 0;
   let randY = 0;
   let minesPlanted = 0;
   while (minesPlanted < mines) {
      randX = getRand(width);
      randY = getRand(height);
      if (!newBoard[randX][randY].isMine) {
         newBoard[randX][randY].isMine = true;
         minesPlanted++;
      }
   }
   return newBoard;
};

export const getNeighbors = (width, height, newBoard) => {
   for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
         if (!newBoard[i][j].isMine) {
            let mine = 0;
            const area = traverseBoard(width, height, newBoard[i][j].x, newBoard[i][j].y, newBoard);
            area.forEach(value => {
               if (value.isMine) {
                  mine++;
               }
            });
            if (mine === 0) {
               newBoard[i][j].isEmpty = true;
            }
            newBoard[i][j].neighbor = mine;
         }
      }
   }
   return newBoard;
};

export const traverseBoard = (width, height, x, y, newBoard) => {
   const cur = [];
   if (x > 0) {
      cur.push(newBoard[x - 1][y]);
   }
   if (x < height - 1) {
      cur.push(newBoard[x + 1][y]);
   }
   if (y > 0) {
      cur.push(newBoard[x][y - 1]);
   }
   if (y < width - 1) {
      cur.push(newBoard[x][y + 1]);
   }
   if (x > 0 && y > 0) {
      cur.push(newBoard[x - 1][y - 1]);
   }
   if (x > 0 && y < width - 1) {
      cur.push(newBoard[x - 1][y + 1]);
   }
   if (x < height - 1 && y < width - 1) {
      cur.push(newBoard[x + 1][y + 1]);
   }
   if (x < height - 1 && y > 0) {
      cur.push(newBoard[x + 1][y - 1]);
   }
   return cur;
};

export const getRand = (val) => {
   return Math.floor((Math.random() * 1000 + 1) % val);
};

const Board = () => {
   const self = useSelector(state => state.user.user.username);
   const mines = useSelector(state => state.game.mines);
   const board = useSelector(state => state.game.board);
   const pair = useSelector(state => state.game.pair);
   const width = useSelector(state => state.game.width);
   const height = useSelector(state => state.game.height);
   const color = useSelector(state => state.game.color);
   const dispatch = useDispatch();

   const getTypes = (type, newBoard) => {
      let arr = [];
      newBoard.forEach(row => {
          row.forEach(item => {
              if ((type === "mine" && item.isMine) ||
                  (type === "flag" && item.isFlagged) ||
                  (type === "hide" && !item.isRevealed)) {
                  arr.push(item);
              }
          });
      });
      return arr;
   };

   const renderBoard = () => {
      return board.map((row) => {
         return row.map((item) => {
            return (
               <div key={item.x * row.length + item.y}>
                  <Cell onClick={() => handleClick(item.x, item.y)}
                        onContextMenu={(e) => handleContextMenu(e, item.x, item.y)}
                        value={item}
                  />
                  {(row[row.length - 1] === item) ? <div/> : ""}
               </div>
            )
         })
      })
   };

   const revealBoard = (newBoard) => {
      newBoard.forEach(row => {
         row.forEach(item => {
            item.isRevealed = true;
         });
      });
      return newBoard;
   };

   const handleWin = newBoard => {
      dispatch(sendNewBoard(newBoard));
      dispatch(setGameWin(self));
      dispatch(setGameLose(pair));
   }

   const handleLose = newBoard => {
      dispatch(sendNewBoard(newBoard));
      dispatch(setGameLose(self));
      dispatch(setGameWin(pair));
   }

   const handleClick = (x, y) => {
      if (board[x][y].isRevealed || board[x][y].isFlagged) {
         return null;
      }
      let newBoard = [...board];
      if (newBoard[x][y].isMine) {
         newBoard = revealBoard(newBoard);
         return handleLose(newBoard);
      }
      newBoard[x][y].isFlagged = false;
      newBoard[x][y].isRevealed = true;
      newBoard[x][y].color = color;
      if (newBoard[x][y].isEmpty) {
         newBoard = revealEmpty(x, y, newBoard);
      }
      if (getTypes("hide", newBoard).length === mines) {
         newBoard = revealBoard(newBoard);
         return handleWin(newBoard);
      }
      dispatch(sendNewBoard(newBoard));
      // renderBoard(newBoard);
   };

   const revealEmpty = (x, y, newBoard) => {
      let area = traverseBoard(width, height, x, y, newBoard);
      area.forEach(value => {
         if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
            newBoard[value.x][value.y].isRevealed = true;
            if (value.isEmpty) {
               revealEmpty(value.x, value.y, newBoard);
            }
         }
      });
      return newBoard;
   };

   const handleContextMenu = (e, x, y) => {
      e.preventDefault();
      let newMines = mines;
      let newBoard = [...board];
      if (newBoard[x][y].isRevealed) {
         return;
      }
      if (newBoard[x][y].isFlagged) {
         newBoard[x][y].isFlagged = false;
         newBoard[x][y].flagColor = "";
         newMines++;
      } else if (newMines > 0) {
         newBoard[x][y].isFlagged = true;
         newBoard[x][y].flagColor = color;
         newMines--;
      }
      if (newMines === 0) {
         const mineArr = getTypes("mine", newBoard);
         const flagArr = getTypes("flag", newBoard);
         if (JSON.stringify(mineArr) === JSON.stringify(flagArr)) {
            newBoard = revealBoard(newBoard);
            return handleWin(newBoard);
         }
      }
      dispatch(sendNewBoard(newBoard));
      dispatch(sendNewMines(newMines));
   };

   return (
      <div className="board">
         {renderBoard()}
      </div>
   );
};

export default Board;