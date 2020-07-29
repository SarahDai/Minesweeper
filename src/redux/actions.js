import {
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
    ADD_TIME_ID, CLEAN_TIME_ID,
    LOGIN_NETWORK_ERROR, SIGN_UP,
    SET_STATUS
} from "./actionConstants";
import { login } from "../data/userData";
import store from "./store";
import { STATUS } from "./storeConstants";

export const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            index: user.index,
            name: user.name
        }
    }
};

export const loginFailure = () => ({
    type: LOGIN_FAILURE
});

export const logout = () => ({
    type: LOGOUT
});

export const loginNetworkError = () => ({
    type: LOGIN_NETWORK_ERROR
});

// export const signUp = () => ({
//     type
// })

export const validateUser = (username, password) => {
    let user = login(username, password);
    if (user.index) {
        return loginSuccess(user);
    } else {
        return loginFailure();
    }
};

export const addTimeId = (tid) => {
    let lst = [tid];
    store.getState().user.timeIds
         .forEach(element => lst.push(element));
    return {
        type: ADD_TIME_ID,
        payload: {
            timeIds: lst
        }
    }
};

export const cleanTimeId = () => {
    store.getState().user.timeIds
         .forEach(element => clearTimeout(element));
    return {
        type: CLEAN_TIME_ID
    }
};

export const setStatus = (newStatus) => ({
    type: SET_STATUS,
    payload: {
        status: newStatus
    }
});