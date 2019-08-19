import UserModel from './../models/userModel';
import {transErrors, transSuccess, transMail} from './../../lang/vi';

let saltRounds = 7;

let updateUser =  (formData) => {
  
  return new Promise( async(resolve, reject) => {
    
    let userByEmail = await UserModel.findByEmail(email);
    if(userByEmail){
      if(userByEmail.deleteAt != null){
        return reject(transErrors.account_removed);
      }
      if(!userByEmail.local.isActive){
        return reject(transErrors.account_not_active);
      }
      return reject(transErrors.account_in_use);
    }
  })
}

module.exports = {
  updateUser
}