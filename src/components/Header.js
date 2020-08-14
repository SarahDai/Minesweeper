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
        <>
            <Row className="homepage-header text-left">
                <Col xs={8} md={10}>
                    <div className="icon-size" block>
                        <FontAwesomeIcon
                            className="fa-flag-header"
                            icon={faFlag}
                            style={{ display: "inline" }}/>
                        <p style={{ display: "inline" }}>{" "}Minesweep!</p>
                    </div>
                </Col>
                <Col className="menu">
                {
                    page === PAGE.LOBBY &&
                    <Menu />
                }
                </Col>
            </Row>
            
            <hr/>
            <br/>
        </>
    )
}


export default Header;