import { REQUEST_TO_LOGIN, LOGIN_RESPONSE, REQUEST_TO_REGISTER, REGISTER_RESPONSE, 
    GET_ALL_USERNAMES, SET_PAGE, INVITATION_SEND_TO_SERVER, WAIT_FOR_RESPONSE, 
    RECEIVE_INVITATION, UPDATE_PLAYERS, INVITATION_ACCEPTED, INVITATION_DECLINED, 
    CLOSE_INVITATION, LOGOUT, SET_ONBOARDING_STATUS, UPDATE_NOTIFICATIONS, GAME_OVER } from "../actionConstants";
import { joinLobby, register, getUsernames, sendInvitationToServer,
    acceptInvitationToServer, declineInvitationToServer,
    startGameToServer, releaseInvitationToServer, setLogoutToServer,
    setOnboardingToServer, closeGameToServer } from "../../client";
import store from "../store";

const requestedLogin = () => ({
    type: REQUEST_TO_LOGIN
})

export const requestLogin = (username, password) => {
    return dispatch => {
        dispatch(requestedLogin());
        joinLobby(username, password);
    }
} 

export const loginResponse = response => ({
    type: LOGIN_RESPONSE,
    payload: {
        user: response.user,
        loginStatus: response.loginStatus,
        page: response.page
    }
})

export const loggedOut = () => ({
    type: LOGOUT
})

export const logout = username => {
    return dispatch => {
        setLogoutToServer(username);
    }
}

const requestedRegister = () => ({
    type: REQUEST_TO_REGISTER
})

export const requestRegister = (username, password) => {
    return dispatch => {
        dispatch(requestedRegister());
        register(username, password);
    }
}

export const registerReponse = response => ({
    type: REGISTER_RESPONSE,
    payload: {
        registerStatus: response.registerStatus,
    }
})

export const requestAllUsernames = () => {
    return dispatch => {
        getUsernames();
    }
}

export const getAllUsernames = allUsernames => ({
    type: GET_ALL_USERNAMES,
    payload: {
        existingUsernames: allUsernames
    }
})

export const updatePlayers = players => ({
    type: UPDATE_PLAYERS,
    payload: {
        players
    }
})

export const updateNotifications = notifications => ({
    type: UPDATE_NOTIFICATIONS,
    payload: {
        notifications
    }
})

export const setPage = page => ({
    type: SET_PAGE,
    payload: {
        page
    }
})

const requestedInvitation = (invitationFrom, invitationTo) => ({
    type: INVITATION_SEND_TO_SERVER,
    payload: {
        invitationFrom,
        invitationTo
    }
})

export const sendInvitation = (invitationFrom, invitationTo) => {
    return dispatch => {
        dispatch(requestedInvitation(invitationFrom, invitationTo));
        sendInvitationToServer(invitationFrom, invitationTo);
    }
}

export const waitForResponse = () => ({
    type: WAIT_FOR_RESPONSE
})

export const receivedInvitation = invitationFrom => {
    const self = store.getState().user.user.username;
    return ({
        type: RECEIVE_INVITATION,
        payload: {
            invitationFrom: invitationFrom,
            invitationTo: self
        }
    })
}

export const acceptInvitation = invitationFrom => {
    return dispatch => {
        dispatch(acceptedInvitation());
        acceptInvitationToServer(invitationFrom);
    }
}

export const declineInvitation = invitationFrom => {
    return dispatch => {
        dispatch(declinedInvitation());
        declineInvitationToServer(invitationFrom);
    }
}

export const acceptedInvitation = () => ({
    type: INVITATION_ACCEPTED
})

export const declinedInvitation = () => ({
    type: INVITATION_DECLINED
})

export const closedInvitation = () => ({
    type: CLOSE_INVITATION
})

export const startGame = (invitationFrom, invitationTo) => {
    return dispatch => {
        startGameToServer(invitationFrom, invitationTo);
    }
}

export const releaseInvitation = (invitationFrom, invitationTo) => {
    return dispatch => {
        releaseInvitationToServer(invitationFrom, invitationTo);
    }
}

export const setgameClosed = () => ({
    type: GAME_OVER
})

export const closeGame = () => {
    const self = store.getState().user.user.username;
    return dispatch => {
        closeGameToServer(self)
    }
}

export const updatedOnboardingStatus = status => ({
    type: SET_ONBOARDING_STATUS,
    payload: status
})

export const setOnboarding = (username, status) => {
    return dispatch => {
        setOnboardingToServer(username, status);
    }
}







