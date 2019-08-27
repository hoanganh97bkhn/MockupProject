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

export const getListAddFriend = () => {
    return{
        type : types.ADD_FRIEND,
    }
}

export const setupSocket = (data) => {
    return{
        type : types.SETUP_SOCKET,
        data : data
    }
}

export const ResAddNewContact = (data) => {
    return{
        type: types.RES_ADD_NEW_CONTACT,
        data : data
    }
}  

export const ResRemoveNewContact = (data) => {
    return{
        type: types.RES_REMOVE_NEW_CONTACT,
        data : data
    }
}

export const resetNotifi = () => {
    return{
        type: types.RESET_NOTIFI,
    }
}

export const resetIsRead = () => {
    return {
        type : types.MARK_ALL_READ
    }
}

