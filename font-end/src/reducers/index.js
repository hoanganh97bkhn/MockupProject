import register from './register';
import login from './login';
import listUser from './listUser';
import socket from './socket';
import addContact from './addContact';
import countNotifi from './countNotifi';
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    register ,
    login ,
    listUser ,
    socket ,
    addContact,
    countNotifi
});

export default myReducer;