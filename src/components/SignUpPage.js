import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Alert } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { addUser, exist, setPage } from "../redux/actions";
import { SIGN_UP_STATE, PAGE } from "../redux/storeConstants";
import { ALERT_MSG_TIME, EMPTY } from "../views/App";

let beginEdit = false;

const SignUpPage = () => {
   const [username, setUsername] = useState(EMPTY);
   const [password, setPassword] = useState(EMPTY);
   const [showAlert, setShowAlert] = useState(false);
   const [state, setState] = useState(SIGN_UP_STATE.SIGNED_UP_START);
   const dispatch = useDispatch();
   let network = navigator.onLine;
   let canSignUp = username.length > 0 && password.length > 0;

   useEffect(() => {
      if (network) {
         setState(SIGN_UP_STATE.SIGNED_UP_START);
      } else {
         setState(SIGN_UP_STATE.NETWORK_ERROR);
      }
   }, [network]);

   const clearForm = () => {
      beginEdit = false;
      setUsername(EMPTY);
      setPassword(EMPTY);
   }

   const handleSubmit = () => {
      setShowAlert(true);
      setTimeout(()=>setShowAlert(false), ALERT_MSG_TIME);
      clearForm();
   }

   const handleSignUp = () => {
      if (state !== SIGN_UP_STATE.NETWORK_ERROR) {
         if (exist(username)) {
            setState(SIGN_UP_STATE.SIGNED_UP_EXIST_FAILURE);
         } else {
            dispatch(addUser(username, password, setState));
         }
      }
      handleSubmit();
   }

   const handleKeyPress = event => {
      if (event.keyCode === 13) {
         event.preventDefault();
         handleSignUp();
      }
   }

   const handleAlert = () => {
      if (!beginEdit) {
         if (state === SIGN_UP_STATE.SIGNED_UP_EXIST_FAILURE) {
            return (
               <Alert variant="danger">
                  This username has signed up, log in if you know the password,
                  otherwise try another username.
               </Alert>
            );
         } else if (state === SIGN_UP_STATE.NETWORK_ERROR) {
            return (
               <Alert variant="danger">
                  Unable to connect to the server! Please check your internet connection and try again.
               </Alert>
            );
         } else if (state === SIGN_UP_STATE.SIGNED_UP_SUCCESS) {
            return (
               <Alert variant="success">
                  Successfully signed up! Log in with your new account.
               </Alert>
            );
         }
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
         {
            showAlert?
            <Row>
               <Col xl={4} lg={3} sm={0}/>
               <Col xl={6} lg={9} sm={12}>
                  {handleAlert()}
               </Col>
               <Col xl={2} />
            </Row>
            :""
         }
         </Card.Body>
         <Card.Footer>
         <Row>
            <Col lg={2} sm={0}/>
            <Col lg={3} sm={6}>
               <Button disabled={!canSignUp}
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={()=>handleSignUp()}>
                  Sign Up
               </Button>
            </Col>
            <Col lg={2} />
            <Col lg={3} sm={6}>
               <Button 
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={()=>dispatch(setPage(PAGE.LOGIN))}>
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