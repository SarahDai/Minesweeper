import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./reducers/user";
import { gameReducer } from "./reducers/game";

export const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));