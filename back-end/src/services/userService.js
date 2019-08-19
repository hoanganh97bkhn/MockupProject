import UserModel from '../models/userModel';
import bcrypt from "bcrypt";

let updateUser =  (req, form) => {
  form.parse(req, async(err, fields, files) => {
    if (err) {
      throw "file error!"
    }
    const arrayOfFiles = files["file"];
    let postUser = {};
    const user = await UserModel.findById(fields["_id"]);
    const file = `public/images/${user.path}`;
    if(arrayOfFiles){
      if(user){
        fs.pathExists(file, (err, exists) => {
          if(exists){
            fs.remove(file, err => {
              if (err) throw 'server error!'
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
      let updateInfo = await UserModel.findByIdAndUpdate(fields['_id'], postUser);
      if(!updateInfo){
        throw 'Sever error!'
      }
      else
        return updateInfo;
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

    let newUser = await UserModel.findByIdAndUpdate(id,password);
    if(newUser) return resolve("Change password success!")
  })
}

module.exports = {
  updateUser,
  updatePassword
}