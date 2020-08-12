import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import Board from "./Board";
import { useSelector } from "react-redux";
import { GAME } from "../../redux/storeConstants";
import GameOptions from "./GameOptions";
import PlayerIcon from './PlayerIcon';

const Game = () => {
   const pair = useSelector(state => state.game.pair);
   const mines = useSelector(state => state.game.mines);
   const status = useSelector(state => state.game.status);
   const color = useSelector(state => state.game.color);
   const pairColor = useSelector(state => state.game.pairColor);

   return (
      <Card>
         <Card.Header className="text-center display-4">
            {"Mines: " + mines}
         </Card.Header>
         <Card.Body>
            <Row>
               <Col sm={4}>
                  <PlayerIcon color={color} name='ME'/>
               </Col>
               <Col sm={4}/>
               <Col sm={4}>
                  <PlayerIcon color={pairColor} name={pair}/>
               </Col>
            </Row>
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