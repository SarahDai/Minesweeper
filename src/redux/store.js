import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { loginReducer } from "./reducers/login";
import { userReducer } from "./reducers/user";

export const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));