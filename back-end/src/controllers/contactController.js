import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import {contact} from '../services/index';


let findUser = async(req,res)=>{
  try{
    let users = await contact.findUserContact(req.user.id, req.body.key);
    console.log(users)
    res.status(200).send(users);
  }
  catch(error){
    console.log(error)
  }
}


module.exports = {
  findUser,
};