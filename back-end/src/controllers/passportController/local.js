import passPort from 'passport';
import passPortJWT from 'passport-jwt';
import UserModel from "./../../models/userModel";


let opts = {};
let JWTStrategy = passPortJWT.Strategy;
let ExtractJWT = passPortJWT.ExtractJwt;

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret';
/**
 * Valid user account type : local
 */
let initPassportJWT = () => {
  passPort.use(new JWTStrategy(opts, (jwt_payload, done) => {
    UserModel.findById(jwt_payload.id)
        .then(user => {
            if(user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.error(err));
}));
}

module.exports = initPassportJWT;
