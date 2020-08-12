import { 
    SET_GAME_STATUS, SET_GAME_MINES,
    SET_GAME_BOARD, SET_GAME_PAIR, UPDATE_WIN,
    UPDATE_LOSE, SET_GAME_COLOR, SET_GAME_PAIR_COLOR
} from "../actionConstants";
import store from "../store";
import { updateBoard, updateMines, updatePairStatus, sendWinStatusToServer,
    sendLoseStatusToServer } from "../../client";
import { initBoard } from "../../components/game/Board";


/** Game **/
export const setGameStatus = status => ({
    type: SET_GAME_STATUS,
    payload: {
        status
    }
});

export const setGameMines = mines => ({
    type: SET_GAME_MINES,
    payload: {
        mines
    }
});

export const setGameBoard = board => ({
    type: SET_GAME_BOARD,
    payload: {
        board
    }
});

export const getNewBoard = () => {
    const width = store.getState().game.width;
    const height = store.getState().game.height;
    const mines = store.getState().game.mines;
    return initBoard(width, height, mines);
};

export const sendNewBoard = newBoard => (
    dispatch => updateBoard(newBoard)
);

export const sendNewMines = newMines => (
    dispatch => updateMines(newMines)
);

export const sendPairStatus = newStatus => (
    dispatch => updatePairStatus(newStatus)
);

export const updateWinStatus = () => ({
    type: UPDATE_WIN
})

export const setGameWin = player => {
    return dispatch => {
        sendWinStatusToServer(player);
    }
};

export const updateLoseStatus = () => ({
    type: UPDATE_LOSE
});

export const setGameLose = player => {
    return dispatch => {
        sendLoseStatusToServer(player);
    }
};

export const setGamePair = pair => ({
    type: SET_GAME_PAIR,
    payload: {
        pair
    }
});

export const setGameColor = color => ({
    type: SET_GAME_COLOR,
    payload: {
        color
    }
});

export const setGamePairColor = pairColor => ({
    type: SET_GAME_PAIR_COLOR,
    payload: {
        pairColor
    }
});