import * as types from './../../constants/ActionTypes'

import isEmpty from '../../validation/is-empty';
import setAuthToken from '../../setAuthToken';


let initialState = {
    isAuthenticated: false,
    user: {}
}

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.LOGIN_SUCCESS :
            return {
                ...state,
                type: "success",
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case types.LOGIN_ERROR :
            return {
                ...state,
                type: "error",
                message : action.data
            }
        case types.LOGOUT_SUCCESS:
            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default : 
            return state;
    }
}

export default myReducer;
