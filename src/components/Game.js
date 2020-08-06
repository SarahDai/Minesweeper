import React from 'react';
import { Card } from "react-bootstrap";
import Board from "./Board";

const Game = () => {

   return (
      <Card className="margin-top-5">
         <Card.Header/>
            <Card.Body>
               <Board/>
            </Card.Body>
            <Card.Footer/>
      </Card>
   );
};

export default Game;