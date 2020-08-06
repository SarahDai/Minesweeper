import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { loginReducer } from "./reducers/login";
import { userReducer } from "./reducers/user";
import { gameReducer } from "./reducers/game";

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    game: gameReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));