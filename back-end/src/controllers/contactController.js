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

let listContacts = async(req,res)=>{
  try {
      //get contacts (10 item one time)
    let contacts = await contact.getContacts(req.user._id);
    //get contacts sent (10 item one time)
    let contactsSent = await contact.getContactsSent(req.user._id);
    //get contacts received (10 item one time)
    let contactsReceived = await contact.getContactsReceived(req.user._id);
    
    // count contacts
    let countAllContacts = await contact.countAllContacts(req.user._id);
    let countAllContactsSent = await contact.countAllContactsSent(req.user._id);
    let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);

    res.status(200).send({
      contacts,
      contactsSent,
      contactsReceived,
      countAllContacts,
      countAllContactsReceived,
      countAllContactsSent
    })
  } catch (error) {
    res.status(500).send(error);
  }
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
  listContacts,
  addNew,
  removeRequestContact
};