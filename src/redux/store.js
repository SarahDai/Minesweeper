import {createStore} from "redux";
import {INITIAL_STATE} from "./stateConstants";
import { UPDATE_PROP1, INCREMENT_PROP2 } from "./actionConstants";


function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_PROP1:
            return {...state, stateProp1: action.payload.prop1};
        case INCREMENT_PROP2:
            return {...state, stateProp2: state.stateProp2 + 1}; 
        default:
            return state;
    }
}

export default createStore(rootReducer);