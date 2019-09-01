import {watchRegister} from './callAPIRegister';
import {watchLogin} from './callAPILogin';
import {watchLoginFB} from './callAPILoginFB';

const watchSaga = {
  watchRegister : watchRegister,
  watchLogin : watchLogin,
  watchLoginFB : watchLoginFB
}

export default watchSaga;  