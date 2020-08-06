import {
    LOGIN_SUCCESS, LOGIN_INVALID_PASSWORD_FAILURE, 
    LOGOUT, ADD_TIME_ID, LOGIN_NON_EXIST_USER_FAILURE,
    CLEAN_TIME_ID, LOGIN_NETWORK_ERROR, SET_STATUS,
    STORE_USER_LIST, SET_GAME_STATUS, SET_PAGE
} from "./actionConstants";
import store from "./store";
import { STATUS, SIGN_UP_STATE } from "./storeConstants";
import firebase from "../fbConfig";

/** Login **/
export const loginSuccess = username => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            username
        }
    }
};

export const loginNonExistUserFailure = () => ({
    type: LOGIN_NON_EXIST_USER_FAILURE
});

export const loginInvalidPasswordFailure = () => ({
    type: LOGIN_INVALID_PASSWORD_FAILURE
})

export const logout = () => ({
    type: LOGOUT
});

export const loginNetworkError = () => ({
    type: LOGIN_NETWORK_ERROR
});

export const validateUser = (username, password) => {
    let loginStatus = login(username, password);
    if (loginStatus) {
        return loginSuccess(username);
    } else {
        return loginInvalidPasswordFailure();
    }
};

/** Sign Up **/
export const addUser = (username, password, setState) => {
    return dispatch => {
        dispatch(cleanTimeId());
        const database = firebase.firestore();
        database.collection("user").add({
            username,
            password
        })
        .then(() => {
            const userList = store.getState().user.userList;
            const newUserList = [
                ...userList,
                {
                    username,
                    password
                }
            ];
            dispatch(storeUserList(newUserList));
            setState(SIGN_UP_STATE.SIGNED_UP_SUCCESS);
        })
        .catch(error => {
            setState(SIGN_UP_STATE.SIGNED_UP_ADD_FAILURE);
            console.log("Error addUser: " + error);
        })
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

export const setPage = (newPage) => ({
    type: SET_PAGE,
    payload: {
        page: newPage
    }
});

export const storeUserList = userList => ({
    type: STORE_USER_LIST,
    payload: {
        userList
    }
});

export const getUserList = () => {
    return dispatch => {
        dispatch(cleanTimeId());
        const database = firebase.firestore();
        database.collection("user")
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                const userList = [];
                querySnapshot.forEach(doc => {
                    userList.push({
                        username: doc.data().username,
                        password: doc.data().password
                    })
                });
                dispatch(storeUserList(userList));
            } else {
                console.log("Empty user list");
            }
        })
        .catch(error => {
            dispatch(setStatus(STATUS.FAIL));
            console.log("Error: getUserList " + error);
        })
    }
};

export const login = (username, password) => {
    const userList = store.getState().user.userList;
    for (let idx in userList) {
        if (username === userList[idx].username &&
            password === userList[idx].password) {
            return true;
        }
    }
    return false;
};

export const exist = username => {
    const userList = store.getState().user.userList;
    for (let idx in userList) {
        if (username === userList[idx].username) {
            return true;
        }
    }
    return false;
};

export const setGameStatus = status => ({
    type: SET_GAME_STATUS,
    payload: {
        status
    }
});