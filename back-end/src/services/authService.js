import UserModel from './../models/userModel';
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import {transErrors, transSuccess, transMail} from './../../lang/vi';
import sendMail from './../config/mailer';
import config from './../config/host';
import jwt from 'jsonwebtoken';
import { rejects } from 'assert';
import decode from 'jwt-decode';

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
    nickname: name,
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

let loginLocal = (email, password) => {
  return new Promise(async(resolve, reject) => {
    let user = await UserModel.findByEmail(email);
    if(!user){
      return reject(transErrors.login_failed);
    }
    if(!user.local.isActive){
      return reject( transErrors.account_not_active);
    }
    let checkPassword = await user.comparePassword(password);
    if(!checkPassword) {
      return reject(transErrors.login_failed);
    }

    const payload = {
      id: user.id,
      email: user.local.email,
    }
    jwt.sign(payload, 'secret', {
        expiresIn: 3600
    }, (err, token) => {
        if(err) console.error('There is some error in token', err);
        else {
          return resolve({message: transSuccess.loginSuccess(user.nickname), token: `Bearer ${token}`});
        }
    });
    
  })
}

let loginFb = (data ) => {
  return new Promise(async(resolve, reject) => {
    let newUser;
    let user = await UserModel.findByFacebookUid(data.id);
    if(!user){
      let newUserItem = {
        nickname: data.name,
        gender : data.gender !=undefined ? data.gender : "",
        local : {
          isActive: true,
          email : data.email != undefined ? data.email : ""
        },
        facebook: {
          uid: data.id,
          token: data.accessToken,
          email: data.email != undefined ? data.email : ""
        }
      };
      newUser = await UserModel.createNew(newUserItem);
    }
    user = user ? user : newUser;     
    const payload = {
      id: user.id,
      email: user.local.email,
    }
    jwt.sign(payload, 'secret', {
        expiresIn: 3600
    }, (err, token) => {
        if(err) console.error('There is some error in token', err);
        else {
          return resolve({message: transSuccess.loginSuccess(user.nickname), token: `Bearer ${token}`});
        }
    });
    
  })
}

let verifyAccount = (token) => {
  return new Promise(async(resolve, reject) => {
    let userByToken = await UserModel.findByToken(token);
    if(!userByToken){
      return reject(transErrors.token_undefined);
    }
    await UserModel.verify(token);
    const payload = userByToken.email;
    const jwtToken = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: '1d',
    });
    resolve({message:transSuccess.account_actived, access_token:jwtToken});
  });
};

module.exports = {
  register,
  verifyAccount,
  loginLocal,
  loginFb,
}