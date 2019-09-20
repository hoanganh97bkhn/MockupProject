import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import config from "../config/index"

function registerApi(data){
  return axios({
    method: "POST",
    url: `${config.baseUrl}/register`,
    data : data
  });
}

function* registerFlow(action){  
  try {
    const response = yield call(registerApi,action.data); 
    const data = response.data;
    if(response.status === 200)
      yield put({ type: "REGISTER_SUCCESS", data })
    else
      yield put({type: "REGISTER_ERROR", data})
  } catch(error){
    yield put({ type: "ERROR_SERVER", error })
  }
}

export function* watchRegister() {
  yield takeLatest("CALL_API_REGISTER", registerFlow);
}
