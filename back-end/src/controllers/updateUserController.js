import fs from 'fs-extra';
import formidable from 'formidable';
import UserModel from './../models/userModel';
import {user} from './../services/index';


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
    if(userUpdate) 
      res.status(200).send("success");
  }
  catch(error){
    res.status(500).end();
  }
}

let updatePassword = async(req, res) => {
  try{
    let updatePass = user.updatePassword(req.body.id, req.body.cur_password, req.body.new_password);
    res.status(200).send("success")
  }
  catch(error){
    res.statusMessage = error;
    res.status(500).end();
  }
}


module.exports = {
  updateUser,
  updatePassword
};