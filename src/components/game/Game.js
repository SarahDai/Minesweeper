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
         <Card.Header className="text-center display-4">
            {"Mines: " + mines}
         </Card.Header>
         <Card.Body>
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
         <Card.Footer className="game-footer-font">
            <p>Left click reveals the result of the current grid.</p>
            <p>Right click places a flag on the current grid.</p>
            <p>You can unflag pair's flags, remember to use flag within threshold!</p>
         </Card.Footer>
      </Card>
   );
};

export default Game;