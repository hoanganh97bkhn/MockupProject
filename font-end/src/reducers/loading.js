import * as types from '../constants/ActionTypes'
import { stat } from 'fs';

let initialState = false;

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.REGISTER_SUCCESS :
            state = true;
            return state; 
        case types.REGISTER_ERROR :
            stat = true;
            return state; 
        default : 
            return state;
    }
}

export default myReducer;
