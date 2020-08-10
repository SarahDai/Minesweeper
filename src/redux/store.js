import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./reducers/user";
import { gameReducer } from "./reducers/game";
import { invitationReducer } from "./reducers/invitation"

export const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    invitation: invitationReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));