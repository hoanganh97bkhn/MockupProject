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
  router.post("/register",authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount);
  router.post("/login", auth.postLoginLocal);
  router.post("/facebook/login", auth.postLoginFb);

  //update user
  router.post("/info/user",authLogin, userInfo.getInfoUser);
  router.post("/user/info/update",authLogin, userInfo.updateUser);
  router.post("/user/update/password",authLogin, userInfo.updatePassword);

  //contact
  router.post("/contact/search",authLogin, contact.findUser);

  router.get('/me', passPort.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.isAuthenticated())
    return res.json({
      id: req.user.id,
      name: req.user.nickname,
      email: req.user.local.email
    });
});

  // router.get("/", auth.checkLoggedIn, home.getHome);
  // router.get("/logout",auth.checkLoggedIn, auth.getLogout);
  
  return app.use('/',router);

 }

 module.exports = initRouters;
