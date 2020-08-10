import React from 'react';
import { Card, Row, Alert } from "react-bootstrap";
import Board from "./Board";
import { useSelector } from "react-redux";
import { GAME } from '../../redux/storeConstants';

const Game = () => {
   const self = useSelector(state => state.user.user.username);
   const pair = useSelector(state => state.game.pair);
   const mines = useSelector(state => state.game.mines);
   const status = useSelector(state => state.game.status);

   const getResult = () => {
      if (status === GAME.LOSE) {
         return <Alert variant="danger">Game Over, you lose.</Alert>
      } else if (status === GAME.WIN) {
         return <Alert variant="success">Wooooo, you win!</Alert>
      }
   };

   return (
      <Card className="margin-top-5">
         <Card.Header>
            <Row><h1>{"Hello " + self + "!"}</h1></Row>
            <Row><h1>{"Pair: " + pair}</h1></Row>
            <Row><h1>{"Mines: " + mines}</h1></Row>
            <Row><h1>{"Status: " + status}</h1></Row>
         </Card.Header>
         <Card.Body>
            <div className="game">
               <Board/>
            </div>
         </Card.Body>
         <Card.Footer>
            {getResult()}
         </Card.Footer>
      </Card>
   );
};

export default Game;