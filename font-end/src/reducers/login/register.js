import * as types from './../../constants/ActionTypes'

let initialState = {type:"",message:[]};

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.REGISTER_SUCCESS :
            return {
                ...state,
                type : "success",
                message : action.data
            }
        case types.REGISTER_ERROR :
            return {
                ...state,
                type : "error",
                message : action.data
            }
        case types.ERROR_SERVER :
        return {
            ...state,
            type : "error",
            message : action.data
        }  
        default : 
            return state;
    }
}

export default myReducer;
