export const LOGIN_STATE = {
    LOGIN_REQUESTED: "login requested",
    LOGGED_IN: "logged in",
    LOGGED_OUT: "logged out",
    LOGGED_NON_EXIST_USER_FAILURE: "logged non exist user failure",
    LOGGED_INVALID_PASSWORD_FAILURE: "logged invalid password failure",
    NETWORK_ERROR: "network error"
};

export const SIGN_UP_STATE = {
    SIGNED_UP_CLOSED: "signed up closed",
    SIGNED_UP_SUCCESS: "signed up success",
    SIGNED_UP_ADD_FAILURE: "signed up add failure",
    SIGNED_UP_EXIST_FAILURE: "signed up exist failure",
    SIGNED_UP_REQUESTED: "signed up requested",
    NETWORK_ERROR: "network error"
};

export const STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAIL: "fail"
};

export const PAGE = {
    LOGIN: "log in",
    SIGN_UP: "sign up",
    INVALID: "invalid",
    LOBBY: "lobby",
    GAME: "game"
};

export const GAME = {
    LOSE: "lose",
    WIN: "win",
    IN_PROGRESS: "in progress"
};

export const PLAYER_STATUS = {
    AVAILABLE: "Available",
    PENDING: "Pending",
    IN_GAME: "In a game",
}

export const INVITATION_STATUS = {
    CONNECT_TO_SERVER: "Connect to server",
    WAIT_FOR_RESPONSE: "Wait for response",
    RECEIVE_INVITATION: "Receive invitation",
    INVITATION_ACCEPTED: "Invitation accepted",
    INVITATION_DECLINED: "Invitation declined"
}
