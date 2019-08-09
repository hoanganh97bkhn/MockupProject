import {watchRegister} from './callAPIRegister';
import {watchLogin} from './callAPILogin';

const watchSaga = {
  watchRegister : watchRegister,
  watchLogin : watchLogin
}

export default watchSaga;  