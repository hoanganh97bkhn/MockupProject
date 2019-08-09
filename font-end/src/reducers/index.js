import register from './register';
import login from './login';
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    register : register,
    login : login
});

export default myReducer;