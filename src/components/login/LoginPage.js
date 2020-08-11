import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Label, Input, Row, Col, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { requestLogin, setPage } from "../../redux/actions/connectActions";
import { LOGIN_STATE, PAGE } from "../../redux/storeConstants";
import { ALERT_MSG_TIME, EMPTY } from "../../views/App";
import Loading from "../Loading";

let beginEdit = false;

const Login = () => {
   const [username, setUsername] = useState(EMPTY);
   const [password, setPassword] = useState(EMPTY);
   const [showAlert, setShowAlert] = useState(false);

   const loginState = useSelector(state => state.user.loginStatus);
   const dispatch = useDispatch();

   let canLogin = username.length > 0 && password.length > 0;

   const clearForm = () => {
      beginEdit = false;
      setUsername(EMPTY);
      setPassword(EMPTY);
   }

   const handleSubmit = () => {
      setShowAlert(true);
      clearForm();
   }

   useEffect(() => {
      if (showAlert) {
         const timer = setTimeout(() => setShowAlert(false), ALERT_MSG_TIME);
         return () => clearTimeout(timer);
      }
   }, [showAlert])

   const handleLogin = () => {
      dispatch(requestLogin(username, password))
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
               <Alert color="danger">
                  Unable to connect to the server! Please check your internet connection and try again.
               </Alert>
            );
         } else if (loginState === LOGIN_STATE.LOGGED_NON_EXIST_USER_FAILURE) {
            return (
               <Alert color="danger">
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
                  Successfully logged in!
               </Alert>
            );
         }
      }
   }

   return (
      <>
      <Card className="margin-auto margin-top-4 width-30">
         <Card.Header className="text-center text-dark">
            <h1>Please sign in</h1>
         </Card.Header>
         <Card.Body>
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
         <br/>
         <Row>
            <Col sm={1}/>
            <Col sm={10}>
               <Input type="text" id="username"
                        name="username" value={username}
                        onKeyUp={e => handleKeyPress(e)}
                        aria-label="input-username"
                        placeholder="Username"
                        onChange={e => {
                           beginEdit = true;
                           setUsername(e.target.value);
                        }}
               />
            </Col>
            <Col sm={1}/>
         </Row>
         <br />
         <Row>
            <Col sm={1}/>
            <Col sm={10}>
               <Input type="password" id="password"
                        name="password" value={password}
                        onKeyUp={e => handleKeyPress(e)}
                        aria-label="input-password"
                        placeholder="Password"
                        onChange={e => {
                           beginEdit = true;
                           setPassword(e.target.value);
                        }}
               />
            </Col>
            <Col sm={1}/>
         </Row>
         <br />
         </Card.Body>
         <Card.Footer>
         <Row>
            <Col sm={1}/>
            <Col sm={10}>
               <Button disabled={!canLogin}
                  className="login-button-margin login-font-size" block
                  variant="primary" onClick={(e)=>handleLogin(e)}>
                  Sign In
               </Button>
            </Col>
            <Col sm={1} />
         </Row>
         <br/>
         <Row>
            <a 
               className="text-primary" block
               onClick={()=>dispatch(setPage(PAGE.SIGN_UP))}>
               <h5>Don't have an account? Create one now.</h5>
            </a>
         </Row>
         </Card.Footer>   
      </Card>
      {
         loginState === LOGIN_STATE.LOGIN_REQUESTED &&
         <Loading />
      }
      </>
   );
}

export default Login;