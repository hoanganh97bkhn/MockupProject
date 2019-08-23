import register from './register';
import login from './login';
import listUser from './listUser';
import socket from './socket';
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    register : register,
    login : login,
    listUser : listUser,
    socket : socket
});

export default myReducer;