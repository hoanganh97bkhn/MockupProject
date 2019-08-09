import jwt from 'jsonwebtoken';
import UserModel from './../models/userModel';

let isAuthenticated = (req, res, next) => {
  if (req.headers && req.headers['access_token']) {
    const jwtToken = req.headers['access_token'];
    jwt.verify(jwtToken, process.env.JWTSECRET, function(err, payload) {
      if (err) {
        res.status(401).json({ message: 'Unauthorized user!' });
      } else {
        // console.log('decoder: ' + payload.email);
        // find
        UserModel.findOne(
          {
            email: payload.email,
          },
          function(err, user) {
            if (user) {
              req.user = user;
              req.user.password = null;
              next();
            } else {
              res.status(401).json({ message: 'Unauthorized user!' });
            }
          },
        );
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized user!' });
  }
}

module.exports = isAuthenticated;