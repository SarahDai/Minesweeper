import React, { useState } from 'react';
import { Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { GAME } from "../redux/storeConstants";

const Board = () => {
   const height = useSelector(state => state.game.height);
   const width = useSelector(state => state.game.width);
   const mines = useSelector(state => state.game.mines);
   const status = useSelector(state => state.game.status);
   const dispatch = useDispatch();
   const [data, setData] = useState([]);
   const [curMines, setCurMines] = useState(mines);

   // returns a random int from 0 to val
   const getRand = (val) => {
      return Math.floor(Math.random() * (val + 1));
   };

   const createEmptyArray = () => {
      let newData = [];
      for (let i = 0; i < height; i++) {
         newData.push([]);
         for (let j = 0; j < width; j++) {
            newData[i][j] = {
               x: i,
               y: j,
               isMine: false,
               neighbor: 0,
               isRevealed: false,
               isEmpty: false,
               isFlagged: false,
            };
         }
      }
      setData(newData);
   };
   
   const plantMines = () => {
      let newData = [...data];
      let randX = 0;
      let randY = 0;
      let minesPlanted = 0;
      while (minesPlanted < mines) {
         randX = getRand(width);
         randY = getRand(height);
         if (!newData[randX][randY].isMine) {
            newData[randX][randY].isMine = true;
            minesPlanted++;
         }
      }
      setData(newData);
   };

   const getNeighbors = () => {
      let newData = [...data];
      for (let i = 0; i < height; i++) {
         for (let j = 0; j < width; j++) {
            if (!data[i][j].isMine) {
               let mine = 0;
               const area = traverseBoard(data[i][j].x, data[i][j].y, data);
               area.map(value => {
                  if (value.isMine) {
                     mine++;
                  }
               });
               if (mine === 0) {
                  newData[i][j].isEmpty = true;
               }
               newData[i][j].neighbor = mine;
            }
         }
      }
      setData(newData);
   };

   const traverseBoard = (x, y) => {
      const cur = [];
      if (x > 0) {
         cur.push(data[x - 1][y]);
      }
      if (x < height - 1) {
         cur.push(data[x + 1][y]);
      }
      if (y > 0) {
         cur.push(data[x][y - 1]);
      }
      if (y < width - 1) {
         cur.push(data[x][y + 1]);
      }
      if (x > 0 && y > 0) {
         cur.push(data[x - 1][y - 1]);
      }
      if (x > 0 && y < width - 1) {
         cur.push(data[x - 1][y + 1]);
      }
      if (x < height - 1 && y < width - 1) {
         cur.push(data[x + 1][y + 1]);
      }
      if (x < height - 1 && y > 0) {
         cur.push(data[x + 1][y - 1]);
      }
      return cur;
   };

   const initBoard = () => {
      createEmptyArray();
      plantMines();
      getNeighbors();
   };

   const renderBoard = () => {
      return data.map((row) => {
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

   const handleClick = (x, y) => {
      if (data[x][y].isRevealed || data[x][y].isFlagged) {
         return null;
      }
      if (data[x][y].isMine) {
         dispatch(setGameState(GAME.LOSE));
         revealBoard();
         alert("game over");
      }
      if (data[x][y].isEmpty) {
         revealEmpty(x, y);
      }
      if (getHidden(data).length === mines) {
         dispatch(setGameState(GAME.WIN));
         revealBoard();
         alert("you win");
      }

   };

   const revealEmpty = () => {
      let area = traverseBoard(x, y);
      let newData = [...data];
      area.map(value => {
         if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
            newData[value.x][value.y].isRevealed = true;
            if (value.isEmpty) {
               revealEmpty(value.x, value.y);
            }
         }
      });
      setData(newData);
   };

   const handleContextMenu = (e, x, y) => {
      e.preventDefault();
      let newData = [...data];
      if (newData[x][y].isRevealed) {
         return;
      }
      if (newData[x][y].isFlagged) {
         newData[x][y].isFlagged = false;
         setCurMines(curMines + 1);
      } else {
         newData[x][y].isFlagged = true;
         setCurMines(curMines - 1);
      }
      if (curMines === 0) {
         const mineArr = getMines(newData);
         const flagArr = getFlags(newData);
         if (JSON.stringify(mineArr) === JSON.stringify(flagArr)) {
            revealBoard();
            alert("you win");
         }
      }
   };

   return (
      <Card className="margin-top-5">
         <Card.Header>
            <Row>{"Mines: " + mines}</Row>
            <Row>{"Status: " + status}</Row>
         </Card.Header>
            <Card.Body>
               {/* {renderBoard()} */}
            </Card.Body>
            <Card.Footer/>
      </Card>
   );
};

export default Board;