import React from 'react';
import { Card, Row, Alert, Col } from "react-bootstrap";
import Board from "./Board";
import { useSelector } from "react-redux";
import { GAME } from "../../redux/storeConstants";
import GameOptions from "./GameOptions";

const Game = () => {
   const self = useSelector(state => state.user.user.username);
   const pair = useSelector(state => state.game.pair);
   const mines = useSelector(state => state.game.mines);
   const status = useSelector(state => state.game.status);

   return (
      <Card className="margin-top-5">
         <Card.Header>
            <Row>
               <Col><h1>{self}</h1></Col>
               <Col><h1>{"Status: " + status}</h1></Col>
               <Col><h1>{pair}</h1></Col>
            </Row>
            <Row><h1>{"Mines: " + mines}</h1></Row>
         </Card.Header>
         <Card.Body>
            <div className="game">
               <Board/>
            </div>
            {
               status !== GAME.IN_PROGRESS &&
               <GameOptions />
            }
         </Card.Body>
      </Card>
   );
};

export default Game;