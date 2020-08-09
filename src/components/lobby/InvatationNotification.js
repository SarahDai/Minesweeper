import React from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";

const InvatationNotification = () => {
    const acceptInvitation = () => {

    }

    const declineInvitation = () => {

    }

    return (
        <Modal centered>
            <ModalHeader>{requestFrom} sent you a new Minesweeper game inviatation.</ModalHeader>
            <ModalFooter>
                <Button color="success" onClick={() => acceptInvitation()}>Accept</Button>{' '}
                <Button color="secondary" onClick={() => declineInvitation()}>Decline</Button>
            </ModalFooter>
        </Modal>
    )

}

export default InvatationNotification;