
import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

const Header = () => 
    <Row className="homepage-header text-center">
        <Col md={{size: 10, offset: 1}}>
            <h1><FontAwesomeIcon className="fa-flag" icon={faFlag} />
                <span className="left-padding">Minesweep!</span></h1>
            <hr />
        </Col>
    </Row>

export default Header;