import express from 'express';
import passPort from 'passport';
import initPassportJWT from './../controllers/passportController/local';
import {home, auth, userInfo, contact} from './../controllers/index';
import {authValid} from './../validation/index';


//Init all passPort
initPassportJWT();
let router = express.Router();

//authenticate
let authLogin = passPort.authenticate('jwt', { session: false });

/**
 * Init all routers
 */

let initRouters = (app) => {

  //login-register
  router.post("/register",authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount);
  router.post("/login", auth.postLoginLocal);
  router.post("/facebook/login", auth.postLoginFb);

  //update user
  router.post("/user/info/update",authLogin, userInfo.updateUser);
  router.post("/user/update/password",authLogin, userInfo.updatePassword);

  //contact
  router.post("/contact/search",authLogin, contact.findUser);
  router.get("/contact/list/addfriend",authLogin, contact.listAddFriend);
  router.post("/contact/add-new",authLogin, contact.addNew);
  router.delete("/contact/remove-request-contact", authLogin, contact.removeRequestContact)

  //home-get data
  router.post("/home/user",authLogin, home.getHome);
  
  
  return app.use('/',router);

 }

 module.exports = initRouters;
