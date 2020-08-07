import { GAME } from "../storeConstants";
import { SET_GAME_STATUS, SET_GAME_MINES, SET_GAME_BOARD } from "../actionConstants";

export const INITIAL_STATE = {
   height: 8,
   width: 8,
   mines: 10,
   status: GAME.IN_PROGRESS,
   board: []
};

export const gameReducer = (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case SET_GAME_STATUS:
         return {
            ...state,
            status: action.payload.status
         };
      case SET_GAME_MINES:
         return {
            ...state,
            mines: action.payload.mines
         }
      case SET_GAME_BOARD:
         return {
            ...state,
            board: action.payload.board
         }
      default:
         return state;
   };
};