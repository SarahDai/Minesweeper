import { GAME } from "../storeConstants";
import { SET_GAME_STATUS, SET_GAME_MINES, SET_GAME_BOARD, SET_GAME_PAIR, 
   UPDATE_WIN, UPDATE_LOSE, GAME_OVER } from "../actionConstants";

export const INITIAL_STATE = {
   height: 8,
   width: 8,
   mines: 10,
   status: GAME.IN_PROGRESS,
   board: [],
   pair: ""
};

export const gameReducer = (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case SET_GAME_STATUS:
         return {
            ...state,
            status: action.payload.status
         };
      case UPDATE_WIN:
         return {
            ...state,
            status: GAME.WIN
         }
      case UPDATE_LOSE:
         return {
            ...state,
            status: GAME.LOSE
         }
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
      case SET_GAME_PAIR:
         return {
            ...state,
            pair: action.payload.pair
         }
      case GAME_OVER:
         return INITIAL_STATE
      default:
         return state;
   };
};