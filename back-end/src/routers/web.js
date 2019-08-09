import express from 'express';
import passPort from 'passport';
import initPassportLocal from './../controllers/passportController/local';
import {home, auth} from './../controllers/index';
import {authValid} from './../validation/index';


//Init all passPort
initPassportLocal();

let router = express.Router();

/**
 * Init all routers
 */

 let initRouters = (app) => {
  router.post("/register",authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount);
  // router.get("/login-success", auth.getLoginSuccess);
  // router.get("/login-failed", auth.getLoginFailed);

  router.post("/login", passPort.authenticate("local",{
    successFlash: true,
    failureFlash: true,
  }),(req,res)=>{console.log(req.flash('errors')); res.status(200).json('hello world')});

  router.get("/", auth.checkLoggedIn, home.getHome);
  router.get("/logout",auth.checkLoggedIn, auth.getLogout);
  
  return app.use('/',router);

 }

 module.exports = initRouters;
