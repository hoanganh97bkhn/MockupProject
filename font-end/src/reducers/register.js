import * as types from '../constants/ActionTypes'

let initialState = {type:"",message:[]};

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.REGISTER_SUCCESS :
            state.type = "success"
            state.message = action.data.messageSuccess;
            return state; 
        case types.REGISTER_ERROR :
            state.type = "error"
            state.message = action.data.messageError;
            return state; 
        default : 
            return state;
    }
}

export default myReducer;
