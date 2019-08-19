import passPort from 'passport';
import passPortFacebook from 'passport-facebook';
import UserModel from "./../../models/userModel";
import {transErrors, transSuccess} from "./../../../lang/vi";

let facebookStrategy = passPortFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbCallbackUrl = process.env.FB_CALLBACK_URL;

/**
 * Valid user account type : Facebook
 */
let initPassportFacebook = () => {
  passPort.use(new facebookStrategy({
    clientID : fbAppId,
    clientSecret : fbAppSecret,
    callbackURL : fbCallbackUrl,
    passReqToCallback: true,
    prodileFields : ["email", "gender", "displayName"]
  }, async(req, accessToken, refreshToken, profile, done) => {
    try{
      let user = await UserModel.findByFacebookUid(profile.id);
      if(user){
        return done(null, user, req.flash("success", transSuccess.loginSuccess(user.nickname)));
      }

      console.log(profile);
      let newUserItem = {
        nickname: profile.displayName,
        gender : profile.gender,
        local : {isActive: true},
        facebook: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails != undefined ? profile.emails[0].value : ""
        }
      };
      let newUser = await UserModel.createNew(newUserItem);
      return done(null, newUser, req.flash("success", transSuccess.loginSuccess(newUser.nickname)));

    } catch(error){
      console.log(error);
      return done(null, false, req.flash("errors", transErrors.server_error))
    }
  }));

  // save userId to session
  passPort.serializeUser((user, done) => {
    done(null, user._id);
  });

  passPort.deserializeUser((id, done) => {
    UserModel.findUserById(id)
      .then(user => {
        return done(null, user);
      })
      .catch(error => {
        return done(error, null)
      })
  });
}

module.exports = initPassportFacebook;
