import React from "react";
import { Row, Col} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

const Intro = () => {
    return (
        <Row className="homepage-intro margin-bottom-1">
            <Col md={{size: 10, offset: 1}}>
                <p><FontAwesomeIcon icon={faBomb} />
                    <span className="left-padding"><strong>LEFT click</strong> to reveal a zone you regard safe. </span></p>
                <p><FontAwesomeIcon icon={faFlag} />
                    <span className="left-padding"><strong>RIGHT click</strong> to put a flag in a zone when you have confirmed that there is a mine.</span></p>
                <p><FontAwesomeIcon icon={faStar} />
                    <span className="left-padding"><strong>IMPORTANT</strong>: unflag a zone of pair's if you have different opinions.</span></p>
                <p><FontAwesomeIcon icon={faTrophy} />
                    <span className="left-padding"><strong>WIN</strong>: if all unrevealed cells are the same number of remaining mines, you win!</span></p>
            </Col>
        </Row>
    )

}


export default Intro;