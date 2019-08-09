import {validationResult} from "express-validator/check";
import {auth} from "./../services/index"
import {transSuccess} from "./../../lang/vi";


let postRegister = async(req, res) => {
  console.log(req.body)
  let errorArr = [];
  let successArr = [];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let erros = Object.values(validationErrors.mapped());
    erros.forEach(item => {
      errorArr.push(item.msg)
    });
    return res.status(201).json({messageError: errorArr});
  }
  try{
    let createUserSuccess = await auth.register(req.body.name, req.body.email, req.body.gender, req.body.password);
    successArr.push(createUserSuccess);
    return res.status(200).json({messageSuccess: successArr});
  }
  catch(error){
    errorArr.push(error);
    return res.status(201).json({messageError: errorArr});
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
  req.flash("success", transSuccess.logout_success);
  return res.redirect("/login-register");
};

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.redirect("/login-register");
  }
  next();
}

let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()){
    return res.redirect("/");
  }
  next();
}

module.exports = {
  postRegister,
  verifyAccount,
  getLogout,
  checkLoggedIn,
  checkLoggedOut,
};
