import { LOGIN_STATE } from "../storeConstants";
import {
   LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_NETWORK_ERROR,
   LOGOUT
} from "../actionConstants";

export const INITIAL_STATE = LOGIN_STATE.LOGGED_OUT;

export const loginReducer = (state=INITIAL_STATE, action) => {
   // console.log("action type: " + JSON.stringify(action.type));
   // console.log("action payload: " + JSON.stringify(action.payload));
   switch(action.type) {
      case LOGIN_SUCCESS:
         return LOGIN_STATE.LOGGED_IN;
      case LOGIN_FAILURE:
         return LOGIN_STATE.LOGGED_FAILURE;
      case LOGIN_NETWORK_ERROR:
         return LOGIN_STATE.NETWORK_ERROR;
      case LOGOUT:
         return LOGIN_STATE.LOGGED_OUT;
      default:
         return state;
      }
};