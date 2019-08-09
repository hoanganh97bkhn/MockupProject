import * as types from './../constants/ActionTypes';
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

