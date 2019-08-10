import {validationResult} from "express-validator/check";
import {auth} from "./../services/index"
import {transSuccess, transErrors} from "./../../lang/vi";


let postRegister = async(req, res) => {
  let errorArr = [];
  let successArr = [];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let erros = Object.values(validationErrors.mapped());
    erros.forEach(item => {
      errorArr.push(item.msg)
    });
    return res.status(201).json(errorArr);
  }
  try{
    let createUserSuccess = await auth.register(req.body.username, req.body.email, req.body.gender, req.body.password);
    successArr.push(createUserSuccess);
    return res.status(200).json(createUserSuccess);
  }
  catch(error){
    errorArr.push(error);
    return res.status(201).json(errorArr);
  }
}

let postLogin = async(req,res)=>{
  try {
    let loginSuccess = await auth.login(req.body.email, req.body.password);
    return res.status(200).json(loginSuccess);
  }
  catch(error){
    return res.status(201).json(error);
  }
}

let verifyAccount = async(req,res) => {
  let errorArr = [];
  let successArr = [];
  try{
    let verifySuccess = await auth.verifyAccount(req.params.token);
    successArr.push(verifySuccess);
    return res.status(200).json({messageSuccess: successArr});
  }
  catch(error){
    errorArr.push(error);
    return res.status(201).json({messageError: errorArr});
  }
}

let getLogout = (req, res) => {
  req.logout();  //remove session passport user
  return res.status(200).json({messageSuccess: transSuccess.logout_success});
};

let checkLoggedIn = (req, res) => {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return res.status(200).json(req.isAuthenticated());
  }
  else return res.status(201).json(req.username);
}

// let checkLoggedOut = (req, res, next) => {
//   if(req.isAuthenticated()){
//     return res.redirect("/");
//   }
//   next();
// }

module.exports = {
  postRegister,
  postLogin,
  verifyAccount,
  getLogout,
  checkLoggedIn,
  // checkLoggedOut,
};
