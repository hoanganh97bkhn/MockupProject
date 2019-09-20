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
                user: action.payload,
                message : "Login success!"
            }
        case types.LOGIN_ERROR :
            return {
                ...state,
                type: "error",
                message : action.data
            }
        case types.REGISTER_SUCCESS :
            return {
                ...state,
                type : "success",
                message : "Register success, please go to email and confirm"
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
