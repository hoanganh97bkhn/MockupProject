import express from 'express';
import passPort from 'passport';
import initPassportJWT from './../controllers/passportController/local';
import {home, auth} from './../controllers/index';
import {authValid} from './../validation/index';


//Init all passPort
initPassportJWT();

let router = express.Router();

/**
 * Init all routers
 */

let initRouters = (app) => {
  router.post("/register",authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount);
  router.get("/checkLogin", auth.checkLoggedIn);
  router.post("/login", auth.postLogin);
  router.get('/me', passPort.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.isAuthenticated())
    return res.json({
        id: req.user.id,
        name: req.user.username,
        email: req.user.local.email
    });
});

  // router.get("/", auth.checkLoggedIn, home.getHome);
  // router.get("/logout",auth.checkLoggedIn, auth.getLogout);
  
  return app.use('/',router);

 }

 module.exports = initRouters;
