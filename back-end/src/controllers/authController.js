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
    let createUserSuccess = await auth.register(req.body.nickname, req.body.email, req.body.gender, req.body.password);
    successArr.push(createUserSuccess);
    return res.status(200).json(createUserSuccess);
  }
  catch(error){
    errorArr.push(error);
    return res.status(201).json(errorArr);
  }
}

let postLoginLocal = async(req,res)=>{
  try {
    let loginSuccess = await auth.loginLocal(req.body.email, req.body.password);
    return res.status(200).json(loginSuccess);
  }
  catch(error){
    return res.status(201).json(error);
  }
}

let postLoginFb = async(req, res)=>{
  console.log(req.body)
  try {
    let loginSuccess = await auth.loginFb(req.body);
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


let getInfoUser = async(req, res) => {
  try{
    let userInfo = await auth.infoUser(req.body.id);
    return res.status(200).json(userInfo);
  }
  catch(error){
    return res.status(404).send(error)
  }
}

// let checkLoggedOut = (req, res, next) => {
//   if(req.isAuthenticated()){
//     return res.redirect("/");
//   }
//   next();
// }

module.exports = {
  postRegister,
  postLoginLocal,
  verifyAccount,
  getInfoUser,
  postLoginFb
};
