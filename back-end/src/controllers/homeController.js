import {transSuccess, transErrors} from './../../lang/vi';

let getHome = (req,res) => {
  res.status(200).json({message: transSuccess.loginSuccess(req.user.userName)})
};

module.exports = {
  getHome
};
