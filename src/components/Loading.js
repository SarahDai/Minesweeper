import React from "react";
import { Spinner, Modal, ModalBody } from "reactstrap";

const Loading = () => 
    <Modal className="loading">
        <ModalBody>
            <Spinner className="spinner" color="info" size="xl" />
            <p>Fetching... please hold</p>
        </ModalBody>
    </Modal>

export default Loading;