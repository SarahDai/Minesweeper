import { REQUEST_TO_LOGIN, LOGIN_RESPONSE, REQUEST_TO_REGISTER, REGISTER_RESPONSE, 
   GET_ALL_USERNAMES, SET_PAGE, UPDATE_PLAYERS, LOGOUT, SET_ONBOARDING_STATUS, 
   UPDATE_NOTIFICATIONS, UPDATE_WIN, UPDATE_LOSE } from "../actionConstants";
import { LOGIN_STATE, PAGE, SIGN_UP_STATE } from "../storeConstants";

const INITIAL_STATE = {
   user: {},
   loginStatus: LOGIN_STATE.LOGGED_OUT,
   registerStatus: SIGN_UP_STATE.SIGNED_UP_CLOSED,
   page: PAGE.LOGIN,
   existingUsernames: [],
   onlinePlayers: {},
   notifications: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case REQUEST_TO_LOGIN: {
         return {
            ...state,
            loginStatus: LOGIN_STATE.LOGIN_REQUESTED
         }
      }
      case LOGIN_RESPONSE: {
         return {
            ...state,
            user: action.payload.user,
            loginStatus: action.payload.loginStatus,
            page: action.payload.page,
            registerStatus: SIGN_UP_STATE.SIGNED_UP_CLOSED
         }
      }
      case SET_ONBOARDING_STATUS: {
         return {
            ...state,
            user: {
               ...state.user,
               onboardingComplete: action.payload
            }
         }
      }
      case REQUEST_TO_REGISTER: {
         return {
            ...state,
            registerStatus: SIGN_UP_STATE.SIGNED_UP_REQUESTED
         }
      }
      case REGISTER_RESPONSE: {
         return {
            ...state,
            registerStatus: action.payload.registerStatus
         }
      }
      case GET_ALL_USERNAMES: {
         return {
            ...state,
            existingUsernames: action.payload.existingUsernames
         }
      }
      case SET_PAGE: {
         return {
            ...state,
            page: action.payload.page
         }
      }
      case UPDATE_PLAYERS: {
         return {
            ...state,
            onlinePlayers: action.payload.players
         }
      }
      case UPDATE_NOTIFICATIONS: {
         return {
            ...state,
            notifications: action.payload.notifications
         }
      }
      case LOGOUT: {
         return INITIAL_STATE;
      }
      case UPDATE_WIN: {
         return {
            ...state,
            user: {
               ...state.user,
               win: state.user.win + 1
            }
         }
      }
      case UPDATE_LOSE: {
         return {
            ...state,
            user: {
               ...state.user,
               lose: state.user.lose + 1
            }
         }
      }
      default:
         return state;
   }
}




// import {
//    LOGIN_SUCCESS, ADD_TIME_ID, STORE_USER_LIST, LOGOUT, 
//    CLEAN_TIME_ID, SET_STATUS, SET_PAGE, SET_ALL_MESSAGES,
//    SET_CONNECTED, SET_CLIENT_ID
// } from "../actionConstants";
// import { PAGE } from "../storeConstants";

// // export const INITIAL_STATE = {
// //    username: "",
// //    timeIds: [],
// //    userList: [],
// //    page: PAGE.LOGIN,
// // }

// export const INITIAL_STATE = {
//    username: "user",
//    timeIds: [],
//    userList: [{
//       username: "user",
//       password: "user"
//    }],
//    page: PAGE.GAME,
//    isConnected: true,
//    messages: [],
//    clientID: "",
// }

// export const userReducer = (state=INITIAL_STATE, action) => {
//    console.log("action type: " + action.type);
//    // console.log("action load: " + JSON.stringify(action.payload));
//    switch(action.type) {
//       case LOGIN_SUCCESS:
//          return {
//             ...INITIAL_STATE,
//             username: action.payload.username
//          };
//       case LOGOUT:
//          return {
//             ...INITIAL_STATE,
//             page: PAGE.LOGIN,
//             userList: state.userList
//          };
//       case ADD_TIME_ID:
//          return {
//             ...state,
//             timeIds: action.payload.timeIds
//          }
//       case CLEAN_TIME_ID:
//          return {
//             ...state,
//             timeIds: []
//          }
//       case SET_STATUS:
//          return {
//             ...state,
//             status: action.payload.status
//          }
//       case SET_PAGE:
//          return {
//             ...state,
//             page: action.payload.page
//          }
//       case STORE_USER_LIST:
//          return {
//             ...state,
//             userList: [
//                ...action.payload.userList
//             ]
//          }
//       case SET_ALL_MESSAGES:
//          return {
//             ...state,
//             messages: action.payload.messages
//          }
//       case SET_CONNECTED:
//          return {
//             ...state,
//             isConnected: true
//          }
//       case SET_CLIENT_ID:
//          return {
//             ...state,
//             clientID: action.payload.clientID
//          }
//       default:
//          return state;
//       }
// };