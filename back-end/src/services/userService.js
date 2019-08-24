import UserModel from '../models/userModel';
import bcrypt from "bcrypt";
import fs from 'fs-extra';

let updateUser =  (req, form) => {
  return new Promise(async(resolve, reject)=>{
    form.parse(req, async(err, fields, files) => {
      if (err) {
        return reject ("file error!")
      }
      const arrayOfFiles = files["file"];
      let postUser = {};
      const user = await UserModel.findById(req.user.id);
      const file = `public/images/${user.avatar}`;
      if(arrayOfFiles){
        if(user){
          fs.pathExists(file, (err, exists) => {
            if(exists){
              fs.remove(file, err => {
                if (err) return reject ('server error!')
              })
            } // => null
            console.log(err) // => false
          })
        }
        if (arrayOfFiles.length > 0) {
          let fileName = [];
          arrayOfFiles.forEach((eachFile) => {
            fileName.push(eachFile.path.split("/")[2]); 
          });
            
          postUser ={
            nickname: fields['nickname'],
            avatar: fileName,
            gender: fields['gender'],
            phone: '('+fields['prefix']+')'+fields['phone'],
            address: fields['address'],
            updatedAt: Date.now()
          }
        }else {
          postUser = {
            nickname: fields['nickname'],
            avatar: arrayOfFiles.path.split("/")[2],
            gender: fields['gender'],
            phone: '('+fields['prefix']+')'+fields['phone'],
            address: fields['address'],
            updatedAt: Date.now()
          }
        }
        }
        else{
          postUser ={
            nickname: fields['nickname'],
            gender: fields['gender'],
            phone: '('+fields['prefix']+')'+fields['phone'],
            address: fields['address'],
            updatedAt: Date.now()
          }
        }
        let updateInfo = await UserModel.findByIdAndUpdate(req.user.id, postUser);
        console.log(updateInfo)
        if(!updateInfo){
          return reject ('Sever error!')
        }
        else
          return resolve (updateInfo);
    })
  })
}

let updatePassword = (id,curPass,newPass) => {
  return new Promise(async(resolve, reject) => {
    let user = await UserModel.findById(id);
    if(!user) 
      return reject('user not define!');
    let check = await user.comparePassword(curPass);
    if(!check) 
      {
        return reject("Invalid password, please try again!")
      }

    let saltRounds = 7;
    let salt = bcrypt.genSaltSync(saltRounds);
    let password = bcrypt.hashSync(newPass, salt);

    let newUser = await UserModel.findByIdAndUpdate(id,{'local.password':password});
    if(newUser) return resolve("Change password success!")
  })
}

module.exports = {
  updateUser,
  updatePassword,
}