import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import config from "../config/index";
import setAuthToken from './../setAuthToken';

function loginApi(data){
  return axios({
    method: "POST",
    url: `${config.baseUrl}/login`,
    data : data
  });
}

function* loginFlow(action){  
  try {
    const response = yield call(loginApi,action.data); 
    const data = response.data;
    if(response.status === 200){
      const {token} = data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const payload = jwt_decode(token);
      yield put({ type: "LOGIN_SUCCESS", payload });
    }
    else
      yield put({type: "LOGIN_ERROR", data})
  } catch(error){
    yield put({ type: "ERROR_SERVER", error })
  }
}

export function* watchLogin() {
  yield takeLatest("CALL_API_LOGIN", loginFlow);
}
