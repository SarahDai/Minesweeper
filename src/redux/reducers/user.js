import {
   LOGIN_SUCCESS, ADD_TIME_ID,
   LOGOUT, CLEAN_TIME_ID, SET_STATUS
} from "../actionConstants";
import { STATUS } from "../storeConstants";

export const INITIAL_STATE = {
   index: -1,
   name: "",
   timeIds: [],
   status: STATUS.LOADING
}

export const userReducer = (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case LOGIN_SUCCESS:
         return {
            ...INITIAL_STATE,
            index: action.payload.index,
            name: action.payload.name
         };
      case LOGOUT:
         return {
            ...INITIAL_STATE
         };
      case ADD_TIME_ID:
         return {
            ...state,
            timeIds: action.payload.timeIds
         }
      case CLEAN_TIME_ID:
         return {
            ...state,
            timeIds: []
         }
      case SET_STATUS:
         return {
            ...state,
            status: action.payload.status
         }
      default:
         return state;
      }
};