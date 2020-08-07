import React from "react";
import PropTypes from "prop-types";

const SlideIndicator = props => 
    <button className="indicator" onClick={props.clickHandler} >
        <div className={"circle indicator-" + props.slideStatus}></div>
    </button>


export default SlideIndicator;

SlideIndicator.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    slideStatus: PropTypes.oneOf(["active", "inactive"]).isRequired
}