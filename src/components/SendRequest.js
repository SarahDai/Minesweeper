import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ModalFooter } from "react-bootstrap";

const SendRequest = () => {
    const cancelRequest = () => {

    }

    return (
        <Modal centered>
            <ModalHeader>Invitation Sent</ModalHeader>
            <ModalBody>Waiting for {requestTo}'s response.</ModalBody>
            <ModalBody>Change your mind? Click to cancel this invitation.</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => cancelRequest()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}