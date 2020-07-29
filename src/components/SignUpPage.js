import React, { useState } from "react";
import { Card, Col, Row, Button, Alert } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { validateUser } from "../redux/actions";

const EMPTY = "";
let beginEdit = false;

const SignUpPage = props => {
   const [username, setUsername] = useState(EMPTY);
   const [password, setPassword] = useState(EMPTY);
   const dispatch = useDispatch();

   const clearForm = () => {
      beginEdit = false;
      setUsername(EMPTY);
      setPassword(EMPTY);
   }

   const handleLogin = () => {
      dispatch(validateUser(username, password));
      clearForm();
   }

   const handleKeyPress = event => {
      if (event.keyCode === 13) {
         event.preventDefault();
      }
   }

   return (
      <Card 
         className="text-light margin-auto margin-top-5" bg="warning">
         <Card.Header className="text-center display-3 text-dark">
            Sign Up
         </Card.Header>
         <Card.Body>
         <br/>
         <Row>
            <Col xl={1} sm={0}/>
            <Col xl={3} lg={3} sm={12}>
               <Label for="username"
                      className="login-font-size text-dark">
                  Username:
               </Label>
               
            </Col>
            <Col xl={6} lg={9} sm={12}>
               <Input type="text" id="username"
                      name="username" value={username}
                      onKeyUp={e => handleKeyPress(e)}
                      aria-label="input-username"
                      className="login-font-size"
                      onChange={e => {
                         beginEdit = true;
                         setUsername(e.target.value);
                      }}
               />
            </Col>
         </Row>
         <br />
         <Row>
            <Col xl={1} sm={0}/>
            <Col xl={3} lg={3} sm={12}>
               <Label for="password"
                      className="login-font-size text-dark">
                  Password:
               </Label>
            </Col>
            <Col xl={6} lg={9} sm={12}>
               <Input type="password" id="password"
                      name="password" value={password}
                      onKeyUp={e => handleKeyPress(e)}
                      aria-label="input-password"
                      className="login-font-size"
                      onChange={e => {
                         beginEdit = true;
                         setPassword(e.target.value);
                      }}
               />
            </Col>
         </Row>
         <br />
         </Card.Body>
         <Card.Footer>
         <Row>
            <Col lg={2} sm={0}/>
            <Col lg={3} sm={6}>
               <Button 
                  className="login-button-margin login-font-size" block
                  variant="light">
                  Sign Up
               </Button>
            </Col>
            <Col lg={2} />
            <Col lg={3} sm={6}>
               <Button 
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={()=>props.showLogin()}>
                  Login
               </Button>
            </Col>
            <Col lg={2} sm={0}/>
         </Row>
         </Card.Footer>   
      </Card>
   );
}

export default SignUpPage;