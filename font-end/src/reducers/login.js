import * as types from '../constants/ActionTypes'

let initialState = {type:"",message:[]};

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.LOGIN_SUCCESS :
            state.type = "success"
            state.message = action.data.messageSuccess;
            return state; 
        case types.LOGIN_ERROR :
            state.type = "error"
            state.message = action.data.messageError;
            return state; 
        default : 
            return state;
    }
}

export default myReducer;
