import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Alert } from "react-bootstrap";
import { Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { 
   validateUser, loginNetworkError, exist, 
   loginNonExistUserFailure, logout, setPage
} from "../redux/actions";
import { LOGIN_STATE, PAGE } from "../redux/storeConstants";
import { ALERT_MSG_TIME, EMPTY } from "../views/App";

let beginEdit = false;

const Login = () => {
   const [username, setUsername] = useState(EMPTY);
   const [password, setPassword] = useState(EMPTY);
   const [showAlert, setShowAlert] = useState(false);
   const loginState = useSelector(state => state.login);
   const dispatch = useDispatch();

   let network = navigator.onLine;
   let canLogin = username.length > 0 && password.length > 0;

   useEffect(() => {
      if (network) {
         dispatch(logout());
      } else {
         dispatch(loginNetworkError());
      }
   }, [network, dispatch]);

   const clearForm = () => {
      beginEdit = false;
      setUsername(EMPTY);
      setPassword(EMPTY);
   }

   const handleSubmit = () => {
      setShowAlert(true);
      setInterval(()=>setShowAlert(false), ALERT_MSG_TIME);
      clearForm();
   }

   const handleLogin = () => {
      if (loginState !== LOGIN_STATE.NETWORK_ERROR) {
         if (!exist(username)) {
            dispatch(loginNonExistUserFailure());
         } else {
            dispatch(validateUser(username, password));
         }
      }
      handleSubmit();
   }

   const handleKeyPress = event => {
      if (event.keyCode === 13) {
         event.preventDefault();
         handleLogin();
      }
   }

   const handleAlert = () => {
      if (!beginEdit) {
         if (loginState === LOGIN_STATE.NETWORK_ERROR) {
            return (
               <Alert variant="danger">
                  Unable to connect to the server! Please check your internet connection and try again.
               </Alert>
            );
         } else if (loginState === LOGIN_STATE.LOGGED_NON_EXIST_USER_FAILURE) {
            return (
               <Alert variant="danger">
                  This user has not been signed up, please sign up with it or login with another user.
               </Alert>
            );
         } else if (loginState === LOGIN_STATE.LOGGED_INVALID_PASSWORD_FAILURE) {
            return (
               <Alert variant="danger">
                  This password does not match with this user! Please try again.
               </Alert>
            );
         } else if (loginState === LOGIN_STATE.LOGGED_IN) {
            return (
               <Alert variant="success">
                  Successfully logged in!.
               </Alert>
            );
         }
      }
   }

   return (
      <Card 
         className="text-light margin-auto margin-top-5 login-bg-color">
         <Card.Header className="text-center display-3 text-light">
            Login
         </Card.Header>
         <Card.Body>
         <br/>
         <Row>
            <Col xl={1} sm={0}/>
            <Col xl={3} lg={3} sm={12}>
               <Label for="username"
                      className="login-font-size text-light">
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
                      className="login-font-size text-light">
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
               <Button 
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={()=>dispatch(setPage(PAGE.SIGN_UP))}>
                  Sign Up
               </Button>
            </Col>
            <Col lg={2} />
            <Col lg={3} sm={6}>
               <Button disabled={!canLogin}
                  className="login-button-margin login-font-size" block
                  variant="light" onClick={(e)=>handleLogin(e)}>
                  Login
               </Button>
            </Col>
            <Col lg={2} sm={0}/>
         </Row>
         </Card.Footer>   
      </Card>
   );
}

export default Login;