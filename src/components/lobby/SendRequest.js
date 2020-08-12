import React from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { INVITATION_STATUS } from "../../redux/storeConstants";

const SendRequest = () => {
    const self = useSelector(state => state.user.user.username);
    const invitationTo = useSelector(state => state.invitation.invitationTo);
    const invitationFrom = useSelector(state => state.invitation.invitationFrom);
    const invitationStatus = useSelector(state => state.invitation.status);
    console.log(invitationFrom, "log from sent request component");

    const displayContent = () => {
        switch (invitationStatus) {
            case INVITATION_STATUS.CONNECT_TO_SERVER:
                return <ModalBody><Spinner color="success" />Sending your invatation to server ...</ModalBody>
            case INVITATION_STATUS.WAIT_FOR_RESPONSE:
                return <ModalBody><span className="bold">{invitationTo}</span> has received your invatation. <br />Waiting for <span className="bold">{invitationTo}</span>'s response.</ModalBody>
            case INVITATION_STATUS.INVITATION_ACCEPTED:
                return <ModalBody>Congrats! You paired up with <span className="bold">{invitationTo}</span>. <br />Enjoy the game.</ModalBody>
            case INVITATION_STATUS.INVITATION_DECLINED:
                return <ModalBody>Ooops, <span className="bold">{invitationTo}</span> has other plans. <br />Head you to the lobby ^^</ModalBody>
            default: 
                return "";
        }
    }


    return (
        <Modal centered isOpen={self === invitationFrom}>
            <ModalHeader>Sent Invitation</ModalHeader>
            {displayContent()}
        </Modal>
    )
}

export default SendRequest;