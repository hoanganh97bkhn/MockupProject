import * as types from '../constants/ActionTypes'
import isEmpty from '../validation/is-empty';

let initialState = {
    isAuthenticated: false,
    user: {}
}

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.LOGIN_SUCCESS :
            console.log(!isEmpty(action.payload));
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case types.LOGIN_ERROR :
            state.type = "error"
            state.message = action.data.messageError;
            return state; 
        default : 
            return state;
    }
}

export default myReducer;
