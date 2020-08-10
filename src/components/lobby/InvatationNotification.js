import React from "react";
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { INVITATION_STATUS } from "../../redux/storeConstants";
import { acceptInvitation, declineInvitation, startGame, releaseInvitation } from "../../redux/actions/connectActions";

const InvatationNotification = () => {
    const self = useSelector(state => state.user.user.username);
    const invitationTo = useSelector(state => state.invitation.invitationTo);
    const invitationFrom = useSelector(state => state.invitation.invitationFrom);
    const invitationStatus = useSelector(state => state.invitation.status);

    const dispatch = useDispatch();

    const accept = () => {
        dispatch(acceptInvitation(invitationFrom));
        setTimeout(() => dispatch(startGame(invitationFrom, invitationTo)), 1000);
    }

    const decline = () => {
        dispatch(declineInvitation(invitationFrom));
        setTimeout(() => dispatch(releaseInvitation(invitationFrom, invitationTo), 1000));
    }

    const displayContent = () => {
        switch (invitationStatus) {
            case INVITATION_STATUS.RECEIVE_INVITATION:
                return <ModalBody>You received an invitation from <span className="bold">{invitationFrom}</span>.</ModalBody>
            case INVITATION_STATUS.INVITATION_ACCEPTED:
                return <ModalBody>You accepted <span className="bold">{invitationFrom}</span>'s invitation. <br />Head you to the game. Enjoy!</ModalBody>
            case INVITATION_STATUS.INVITATION_DECLINED:
                return <ModalBody>You declined <span className="bold">{invitationFrom}</span>'s invitation. Head you to the lobby to find your opponent.</ModalBody>
            default:
                return "";
        }
    }

    return (
        <Modal centered isOpen={self === invitationTo}>
            <ModalHeader>New Invitation</ModalHeader>
            {displayContent()}
            {
                invitationStatus === INVITATION_STATUS.RECEIVE_INVITATION &&
                <ModalFooter>
                    <Button color="success" onClick={() => accept()}>Accept</Button>{' '}
                    <Button color="secondary" onClick={() => decline()}>Decline</Button>
                </ModalFooter>
            }
        </Modal>
    )
}

export default InvatationNotification;