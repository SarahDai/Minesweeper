import React from 'react';
import { Card, Row, Alert, Col, Badge } from "react-bootstrap";
import Board from "./Board";
import { useSelector } from "react-redux";
import { GAME } from "../../redux/storeConstants";
import GameOptions from "./GameOptions";
import { FilePerson } from 'react-bootstrap-icons';

const Game = () => {
   const self = useSelector(state => state.user.user.username);
   const pair = useSelector(state => state.game.pair);
   const mines = useSelector(state => state.game.mines);
   const status = useSelector(state => state.game.status);
   const color = useSelector(state => state.game.color);
   const pairColor = useSelector(state => state.game.pairColor);

   const getColor = (cur) => {
      if (cur === "green") {
         return "success";
      } else {
         return "danger";
      }
   }

   return (
      <Card>
         <Card.Header className="text-center display-4">
            {"Mines: " + mines}
         </Card.Header>
         <Card.Body>
            <Row>
               <Col sm={4}>
                  <FilePerson size={96} color={color}
                              style={{ display: "block", margin: "auto" }}/>
                  <h1 style={{ textAlign: "center" }}>
                     ME
                  </h1>
               </Col>
               <Col sm={4}/>
               <Col sm={4}>
                  <FilePerson size={96} color={pairColor}
                              style={{ display: "block", margin: "auto" }}/>
                  <h1 style={{ textAlign: "center" }}>
                     {pair}
                  </h1>
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