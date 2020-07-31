import React from 'react';
import { CardDeck, Card, Col, Row, Button } from "react-bootstrap";

const ProjectBoard = () => {

   return (
      <CardDeck className="margin-top-5">
         <Card>
            <Card.Header>DONE</Card.Header>
            <Card.Body>
            Take a photo when everyone detected in the camera is “happy”
            ○ Photos should ​not​ be taken every 300ms that someone is smiling! You’ll need to find a way to reduce the number of photos taken. Whatever you choose to do, it should be predictable so the user can easily understand how to use the app.
            </Card.Body>
            <Card.Footer/>
         </Card>
         <Card>
         <Card.Header>TO DO</Card.Header>
            <Card.Body>
            Component design, visual style, and code style​ requirements are the same as in previous assignments. For grading purposes, you are not expected to make your app fully accessible but screen reader accessibility may be something interesting to consider e.g. how could you help a visually impaired user take selfies with your app?
            </Card.Body>
            <Card.Footer/>
         </Card>
         <Card>
         <Card.Header>DOING</Card.Header>
            <Card.Body>
            Take a photo on voice command. The specific command is up to you. Just make sure that the user knows what that command is.
            Provide instructions / guidance on how to use the app.
            Allow users to view the photos that have been taken. You may want to consider limiting
            the number of photos that are kept in the store.
            </Card.Body>
            <Card.Footer/>
         </Card>
         <Card>
         <Card.Header>CHAT</Card.Header>
            <Card.Body/>
            <Card.Footer/>
         </Card>
      </CardDeck>
   );
};

export default ProjectBoard;