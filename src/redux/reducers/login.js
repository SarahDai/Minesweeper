import { LOGIN_STATE } from "../storeConstants";
import {
   LOGIN_SUCCESS, LOGIN_NON_EXIST_USER_FAILURE, 
   LOGIN_NETWORK_ERROR, LOGOUT, LOGIN_INVALID_PASSWORD_FAILURE
} from "../actionConstants";

export const INITIAL_STATE = LOGIN_STATE.LOGGED_OUT;

export const loginReducer = (state=INITIAL_STATE, action) => {
   switch(action.type) {
      case LOGIN_SUCCESS:
         return LOGIN_STATE.LOGGED_IN;
      case LOGIN_NON_EXIST_USER_FAILURE:
         return LOGIN_STATE.LOGGED_NON_EXIST_USER_FAILURE;
      case LOGIN_INVALID_PASSWORD_FAILURE:
         return LOGIN_STATE.LOGGED_INVALID_PASSWORD_FAILURE;
      case LOGIN_NETWORK_ERROR:
         return LOGIN_STATE.NETWORK_ERROR;
      case LOGOUT:
         return LOGIN_STATE.LOGGED_OUT;
      default:
         return state;
      }
};