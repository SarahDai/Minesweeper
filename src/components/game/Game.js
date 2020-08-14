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
      <Card className="game-width">
         <Card.Header className="text-center game-font-size">
            {"Mines: " + mines}
         </Card.Header>
         <Card.Body className="game-body">
            <Row>
               <Col md={4} xs={5}>
                  <PlayerIcon color={color} name='ME'/>
               </Col>
               <Col md={4} xs={2}/>
               <Col md={4} xs={5}>
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
         <Card.Footer className="game-font-size">
            <p>{"Left click -> Reveal"}</p>
            <p>{"First Right click -> Flag"}</p>
            <p>{"Second Right click -> Unflag"}</p>
         </Card.Footer>
      </Card>
   );
};

export default Game;