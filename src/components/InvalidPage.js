import React from 'react';
import { Card, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/actions/connectActions";
import { PAGE } from "../redux/storeConstants";


const InvalidPage = () => {
   const dispatch = useDispatch();

   return (
      <Card className="text-light margin-auto margin-top-5 login-bg-color">
         <Card.Header></Card.Header>
         <Card.Body>
            <h1 className="text-center">Invalid Page!</h1>
            <br/>
            <Row>
               <Col sm={4}/>
               <Col sm={4}>
                  <Button block variant="light"
                     onClick={()=>dispatch(setPage(PAGE.LOGIN))}>
                     Back To Login
                  </Button>
               </Col>
               <Col sm={4}/>
            </Row>
         </Card.Body>
         <Card.Footer></Card.Footer>
      </Card>
      
   )
}

export default InvalidPage;