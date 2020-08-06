import { GAME } from "../storeConstants";
import { SET_GAME_STATUS } from "../actionConstants";

export const INITIAL_STATE = {
   height: 8,
   width: 8,
   mines: 10,
   status: GAME.PROGRESS
};

export const gameReducer = (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case SET_GAME_STATUS:
         return {
            ...state,
            status: action.payload.status
         };
      default:
         return state;
   };
};