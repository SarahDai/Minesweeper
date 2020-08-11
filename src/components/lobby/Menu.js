import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfo, faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, setOnboarding } from "../../redux/actions/connectActions";

const Menu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const self = useSelector(state => state.user.user.username);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout(self));
    }

    const handleHelp = () => {
        dispatch(setOnboarding(self, false));
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                <FontAwesomeIcon icon={faBars} />
                <span className="left-padding">Menu</span>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => handleHelp()}>
                    <FontAwesomeIcon icon={faInfo} />
                    <span className="left-padding">Help</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => handleLogout()}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="left-padding">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
      );
}

export default Menu;