import {
   LOGIN_SUCCESS, ADD_TIME_ID, STORE_USER_LIST, LOGOUT, 
   CLEAN_TIME_ID, SET_STATUS, SET_PAGE
} from "../actionConstants";
import { PAGE } from "../storeConstants";

// export const INITIAL_STATE = {
//    username: "",
//    timeIds: [],
//    userList: [],
//    page: PAGE.LOGIN,
// }

export const INITIAL_STATE = {
   username: "user",
   timeIds: [],
   userList: [{
      username: "user",
      password: "user"
   }],
   page: PAGE.GAME,
}

export const userReducer = (state=INITIAL_STATE, action) => {
   console.log("action type: " + action.type);
   // console.log("action load: " + JSON.stringify(action.payload));
   switch(action.type) {
      case LOGIN_SUCCESS:
         return {
            ...INITIAL_STATE,
            username: action.payload.username
         };
      case LOGOUT:
         return {
            ...INITIAL_STATE,
            page: PAGE.LOGIN,
            userList: state.userList
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
      case SET_PAGE:
         return {
            ...state,
            page: action.payload.page
         }
      case STORE_USER_LIST:
         return {
            ...state,
            userList: [
               ...action.payload.userList
            ]
         }
      default:
         return state;
      }
};