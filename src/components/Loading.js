import React from "react";
import { Spinner, Modal, ModalBody } from "reactstrap";
import { useSelector } from "react-redux";
import { LOGIN_STATE } from "../redux/storeConstants";

const Loading = () => {
    const loginState = useSelector(state => state.user.loginStatus);

    return (
        <Modal centered className="loading" isOpen={loginState === LOGIN_STATE.LOGIN_REQUESTED}>
            <ModalBody>
                <Spinner className="spinner" color="info" size="xl" />
                <p>Verifying... please hold</p>
            </ModalBody>
        </Modal>
    )
}


export default Loading;