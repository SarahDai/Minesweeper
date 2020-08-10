import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Label, Input, FormFeedback, Spinner, Alert, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
// import { setPage } from "../redux/actions";
import { requestAllUsernames, requestRegister, requestLogin, setPage } from "../../redux/actions/connectActions";
import { SIGN_UP_STATE, PAGE } from "../../redux/storeConstants";
import { ALERT_MSG_TIME, EMPTY } from "../../views/App";

let beginEdit = false;

const isExisting = (username, allUsernames) => {
   return allUsernames.includes(username);
}

const SignUpPage = () => {
   const [username, setUsername] = useState(EMPTY);
   const [password1, setPassword1] = useState(EMPTY);
   const [password2, setPassword2] = useState(EMPTY);
   const [showAlert, setShowAlert] = useState(false);

   const registerStatus = useSelector(state => state.user.registerStatus);
   console.log("Sign up page:", registerStatus);
   const existingUsernames = useSelector(state => state.user.existingUsernames);
   const dispatch = useDispatch();

   let canSignUp = username.length > 0 && password1.length > 0 && password1 === password2;

   const clearForm = () => {
      setUsername(EMPTY);
      setPassword1(EMPTY);
      setPassword2(EMPTY);
   }

   const handleSubmit = () => {
      beginEdit = false;
      setShowAlert(true);
   }

   useEffect(() => {
      dispatch(requestAllUsernames());
   }, [username, dispatch]);

   useEffect(() => {
      if (showAlert) {
         const timer = setTimeout(() => setShowAlert(false), ALERT_MSG_TIME);
         return () => clearTimeout(timer);
      }
   }, [showAlert]);

   const handleSignUp = () => {
      handleSubmit();
      dispatch(requestRegister(username, password2));
      setTimeout(() => {
         dispatch(requestLogin(username, password2));
         clearForm();
      }, ALERT_MSG_TIME);
   }

   const handleKeyPress = event => {
      if (event.keyCode === 13) {
         event.preventDefault();
         handleSignUp();
      }
   }

   const handleAlert = () => {
      if (!beginEdit) {
         if (registerStatus === SIGN_UP_STATE.NETWORK_ERROR) {
            return (
               <Alert color="danger">
                  Unable to connect to the server! Please check your internet connection and try again.
               </Alert>
            );
         } else if (registerStatus === SIGN_UP_STATE.SIGNED_UP_SUCCESS) {
            return (
               <Alert color="success">
                  Successfully signed up! Directing you to the lobby...
               </Alert>
            );
         }
      }
   }

   return (
      <Card 
         className="text-light margin-auto margin-top-4">
         <Card.Header className="text-center display-3 text-dark">
            Sign Up
         </Card.Header>
         <Card.Body>
         <br/>
         {
            registerStatus === SIGN_UP_STATE.SIGNED_UP_REQUESTED &&
            <Spinner color="success" style={{width: "6rem", height: "6rem"}} />
         }
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
                      valid={username.length > 0 && !isExisting(username, existingUsernames)}
                      invalid={isExisting(username, existingUsernames)}
                      onChange={e => {
                         beginEdit = true;
                         setUsername(e.target.value);
                      }}
               />
               <FormFeedback valid>Sweet! that username is available </FormFeedback>
               <FormFeedback>Oh noes! that name is already taken</FormFeedback>
            </Col>
         </Row>
         <br />
         <Row>
            <Col xl={1} sm={0}/>
            <Col xl={3} lg={3} sm={12}>
               <Label for="password1"
                      className="login-font-size text-dark">
                  Password:
               </Label>
            </Col>
            <Col xl={6} lg={9} sm={12}>
               <Input type="password" id="password1"
                      name="password" value={password1}
                      onKeyUp={e => handleKeyPress(e)}
                      aria-label="input-password"
                      className="login-font-size"
                      onChange={e => {
                         beginEdit = true;
                         setPassword1(e.target.value);
                      }}
               />
            </Col>
         </Row>
         <br />
         <Row>
            <Col xl={1} sm={0}/>
            <Col xl={3} lg={3} sm={12}>
               <Label for="password2"
                      className="login-font-size text-dark">
                  Confirm Password:
               </Label>
            </Col>
            <Col xl={6} lg={9} sm={12}>
               <Input type="password" id="password2"
                      name="password" value={password2}
                      onKeyUp={e => handleKeyPress(e)}
                      aria-label="input-password"
                      className="login-font-size"
                      invalid={password2.length > 0 && password1 !== password2}
                      onChange={e => {
                         beginEdit = true;
                         setPassword2(e.target.value);
                      }}
               />
               <FormFeedback>Password doesn't match.</FormFeedback>
            </Col>
         </Row>
         <br />
         {
            showAlert &&
            <Row>
               <Col xl={4} lg={3} sm={0}/>
               <Col xl={6} lg={9} sm={12}>
                  {handleAlert()}
               </Col>
               <Col xl={2} />
            </Row>
         }
         </Card.Body>
         <Card.Footer>
         <Row>
            <Col lg={2} sm={0}/>
            <Col lg={3} sm={6}>
               <Button 
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={()=>dispatch(setPage(PAGE.LOGIN))}>
                  Login
               </Button>
            </Col>
            <Col lg={2} />
            <Col lg={3} sm={6}>
               <Button disabled={!canSignUp}
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={()=>handleSignUp()}>
                  Sign Up
               </Button>
            </Col>
            <Col lg={2} sm={0}/>
         </Row>
         </Card.Footer>   
      </Card>
   );
}

export default SignUpPage;