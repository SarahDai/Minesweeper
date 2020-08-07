import React from 'react';
import { Card, Row } from "react-bootstrap";
import Board from "./Board";
import { useSelector } from "react-redux";

const Game = () => {
   const mines = useSelector(state => state.game.mines);
   const status = useSelector(state => state.game.status);

   return (
      <Card className="margin-top-5">
         <Card.Header>
            <Row><h1>{"Mines: " + mines}</h1></Row>
            <Row><h1>{"Status: " + status}</h1></Row>
         </Card.Header>
         <Card.Body>
            <div className="game">
               <Board/>
            </div>
         </Card.Body>
         <Card.Footer/>
      </Card>
   );
};

export default Game;