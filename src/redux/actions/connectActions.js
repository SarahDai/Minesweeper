import { REQUEST_TO_LOGIN, LOGIN_RESPONSE, REQUEST_TO_REGISTER, REGISTER_RESPONSE, GET_ALL_USERNAMES, SET_PAGE } from "../actionConstants";
import { joinLobby, register, getUsernames } from "../../client";

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
        // user: response.user,
        registerStatus: response.registerStatus,
        // page: response.page,
        // loginStatus: response.loginStatus
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

export const setPage = page => ({
    type: SET_PAGE,
    payload: {
        page
    }
})

