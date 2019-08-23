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

let listAddFriend = async(req,res)=>{
  res.status(201).send('hello')
}

let addNew = async(req, res) => {
  try{
    let newContact = await contact.addNew(req.user.id, req.body.uid);
    res.status(200).send({status: !!newContact})
  }
  catch(error){
    return res.status(500).send(error);
  }
}

let removeRequestContact = async(req, res) => {
  try{
    let removeReq = await contact.removeRequestContact(req.user.id, req.body.uid);
    res.status(200).send({status: !!removeReq})
  }
  catch(error){
    return res.status(500).send(error);
  }
}


module.exports = {
  findUser,
  listAddFriend,
  addNew,
  removeRequestContact
};