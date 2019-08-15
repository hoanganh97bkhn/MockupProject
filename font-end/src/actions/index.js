import * as types from './../constants/ActionTypes';
import setAuthToken from './../setAuthToken';
let data = [];

export const register = (data) => {
    return{
        type : types.CALL_API_REGISTER,
        data
    }
}

export const login = (data) => {
    return{
        type : types.CALL_API_LOGIN,
        data
    }
}

export const loginFB = (data) => {
    return{
        type : types.CALL_API_LOGIN_FB,
        data
    }
}

export const loginSuccess = (payload) => {
    return{
        type : types.LOGIN_SUCCESS,
        payload
    }
}

export const logoutUser = (payload) => {
    return{
        type : types.LOGOUT_SUCCESS,
        payload
    }
    // loginSuccess({});
    // history.push('/login');
}

