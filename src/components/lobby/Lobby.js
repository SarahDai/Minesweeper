import React from "react";
import OnboardingSlides from "../onboarding/OnboardingSlides";
import OnlinePlayers from "./OnlinePlayers";
import { useSelector } from "react-redux";
import SendRequest from "./SendRequest";
import InvitationNotification from "./InvatationNotification";
import { Row, Col} from "reactstrap";
import SystemNotification from "./SystemNotification";


const Lobby = () => {
    const self = useSelector(state => state.user.user.username);
    const invitationFrom = useSelector(state => state.invitation.invitationFrom);
    const invitationTo = useSelector(state => state.invitation.invitationTo);
    const onboardingComplete = useSelector(state => state.user.user.onboardingComplete);

    console.log("lobby invitation to", invitationTo);
    console.log("lobby invitation from", invitationFrom);
    console.log("lobby self", self);
    const displayModal = () => {
        if (self === invitationFrom) {
            return <SendRequest />
        } else if (self === invitationTo) {
            return <InvitationNotification />
        } else {
            return "";
        }
    }

    return (
        onboardingComplete?
        <>
            <Row>
                <Col xs="12" md="5">
                    <SystemNotification />
                </Col>
                <Col xs="12" md="7">
                    <OnlinePlayers />
                    {displayModal()}
                </Col>
            </Row>
        </>
        :
        <OnboardingSlides />
    )
}


export default Lobby;