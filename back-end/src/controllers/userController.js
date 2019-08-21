import fs from 'fs-extra';
import formidable from 'formidable';
import UserModel from '../models/userModel';
import {user} from '../services/index';

let updateUser = async(req, res) => {

  /** Setup folder images */
  let dir = `./public/images`;
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    if(err){
      console.log('...')
    }
  })

  let form = new formidable.IncomingForm(); 
  form.uploadDir = `${dir}`;
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024; //10mb
  form.multiples = true;

  try{
    let userUpdate = await user.updateUser(req, form);
    console.log("dkm",userUpdate);
    if(userUpdate) 
      res.status(200).send("success");
  }
  catch(error){
    res.status(500).end();
  }
}

let updatePassword = async(req, res) => {
  try{
    console.log(req.user.id, req.body.cur_password, req.body.new_password)
    let updatePass = await user.updatePassword(req.body.id, req.body.cur_password, req.body.new_password);
    console.log(updatePass)
    res.status(200).send("success")
  }
  catch(error){
    res.statusMessage = error;
    res.status(401).send("error");
  }
}

let getInfoUser = async(req, res) => {
  console.log(req.user.id)
  try{
    let userInfo = await user.infoUser(req.user.id);
    return res.status(200).json(userInfo);
  }
  catch(error){
    return res.status(404).send(error)
  }
}

module.exports = {
  updateUser,
  updatePassword,
  getInfoUser
};