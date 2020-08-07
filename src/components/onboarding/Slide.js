import React from "react";
import PropTypes from "prop-types";

const Slide = props => 
    <div className={"slide-" + props.slideStatus} >
        {props.children}
    </div>

export default Slide;

Slide.propTypes = {
    slideStatus: PropTypes.oneOf(["active", "inactive"]).isRequired,
    children: PropTypes.node.isRequired
}