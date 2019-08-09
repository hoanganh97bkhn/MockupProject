import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import config from "../config/index"

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
    console.log(data)
    if(response.status === 200)
      yield put({ type: "LOGIN_SUCCESS", data })
    else
      yield put({type: "LOGIN_ERROR", data})
  } catch(error){
    yield put({ type: "ERROR_SERVER", error })
  }
}

export function* watchLogin() {
  yield takeLatest("CALL_API_LOGIN", loginFlow);
}
