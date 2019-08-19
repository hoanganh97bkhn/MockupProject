import fs from 'fs-extra';
import formidable from 'formidable';
import UserModel from './../models/userModel';


let updateUser = (req, res) => {

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
    form.parse(req, async(err, fields, files) => {
      if (err) {
        res.status(500).json({
          result: "failed",
          data: {},
          message: `${err}`
        })
      }
      const user = await UserModel.findById(fields["_id"]);
      const file = `public/images/${user.path}`;
      if(user){
        fs.pathExists(file, (err, exists) => {
          if(exists){
            fs.remove(file, err => {
              if (err) return res.status(500).send(err)    
            })
          } // => null
          console.log(err) // => false
        })
      }

      const arrayOfFiles = files["file"];
      let postUser = {};
      if(arrayOfFiles){
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
          postUser ={
            nickname: fields['nickname'],
            avatar: arrayOfFiles.path.split("/")[2],
            gender: fields['gender'],
            phone: '('+fields['prefix']+')'+fields['phone'],
            address: fields['address'],
            updatedAt: Date.now()
          }
        }

        let updateInfo = await UserModel.findByIdAndUpdate(fields['_id'], postUser);
        if(!updateInfo){
          res.status(500).send('Sever error!')
        }
        else
        res.status(200).send("success")
      }
    })
}


module.exports = {
  updateUser
};
