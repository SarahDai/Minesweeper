import { INVITATION_SEND_TO_SERVER, WAIT_FOR_RESPONSE, RECEIVE_INVITATION, INVITATION_ACCEPTED, INVITATION_DECLINED } from "../actionConstants";
import { INVITATION_STATUS } from "../storeConstants";

const INITIAL_STATE = {
    invitationTo: null,
    invitationFrom: null,
    status: null
}

export const invitationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVITATION_SEND_TO_SERVER:
            return {
                ...state,
                invitationFrom: action.payload.invitationFrom,
                invitationTo: action.payload.invitationTo,
                status: INVITATION_STATUS.CONNECT_TO_SERVER
            }
        case WAIT_FOR_RESPONSE:
            return {
                ...state,
                status: INVITATION_STATUS.WAIT_FOR_RESPONSE
            }
        case RECEIVE_INVITATION:
            return {
                ...state,
                invitationFrom: action.payload.invitationFrom,
                invitationTo: action.payload.invitationTo,
                status: INVITATION_STATUS.RECEIVE_INVITATION
            }
        case INVITATION_ACCEPTED:
            return {
                ...state,
                status: INVITATION_STATUS.INVITATION_ACCEPTED
            }
        case INVITATION_DECLINED:
            return {
                ...state,
                status: INVITATION_STATUS.INVITATION_DECLINED
            }
        default:
            return state;
    }
}