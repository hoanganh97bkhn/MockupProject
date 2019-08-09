import UserModel from './../models/userModel';
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import {transErrors, transSuccess, transMail} from './../../lang/vi';
import sendMail from './../config/mailer';
import config from './../config/host';

let saltRounds = 7;

let register =  (name, email, gender, password) => {
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

  let salt = bcrypt.genSaltSync(saltRounds);
  let userItem = {
    userName: name,
    gender,
    local: {
      email,
      password: bcrypt.hashSync(password, salt),
      verifyToken: uuidv4()
    }
  };

  let user = await UserModel.createNew(userItem);
  let linkVerify = `${config.baseUrl}/login-register/${user.local.verifyToken}`;
  //send email
  sendMail(email, transMail.subject, transMail.template(linkVerify))
    .then(success => {
      resolve(transSuccess.userCreated(user.local.email))
    })
    .catch(async(error) => {
      //remove user
      await UserModel.removeById(user._id);
      console.log(error);
      reject(transMail.send_failed)
    })

  resolve(transSuccess.userCreated(user.local.email));
  });
  
};

let verifyAccount = (token) => {
  return new Promise(async(resolve, reject) => {
    let userByToken = await UserModel.findByToken(token);
    if(!userByToken){
      return reject(transErrors.token_undefined);
    }
    await UserModel.verify(token);
    resolve(transSuccess.account_actived);
  });
};

module.exports = {
  register,
  verifyAccount
}