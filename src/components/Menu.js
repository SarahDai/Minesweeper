import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfo, faBars } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                <FontAwesomeIcon icon={faBars} />
                <span className="left-padding">Menu</span>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>
                    <FontAwesomeIcon icon={faInfo} />
                    <span className="left-padding">Help</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="left-padding">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
      );
}

export default Menu;