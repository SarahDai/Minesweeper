
import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { PAGE } from "../redux/storeConstants";
import Menu from "./lobby/Menu";

const Header = () => {
    const page = useSelector(state => state.user.page);

    return (
        <Row className="homepage-header text-left">
            <Col xs="12" md="9">
                <h4><FontAwesomeIcon className="fa-flag-header" icon={faFlag} />
                    <span className="left-padding">Minesweep!</span>
                </h4>
            </Col>
            <Col xs="6" md="3" align="right" className="menu">
                {
                    page === PAGE.LOBBY &&
                    <Menu />
                }
            </Col>
            <Col xs="12">
                <hr />
            </Col>
        </Row>
    )
}


export default Header;