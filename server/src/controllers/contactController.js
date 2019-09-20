import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import {contact} from '../services/index';
import { validationResult } from 'express-validator/check';


let findUser = async(req,res)=>{
  try{
    let users = await contact.findUserContact(req.user._id, req.body.key);
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
    let newContact = await contact.addNew(req.user._id, req.body.uid);
    res.status(200).send({status: !!newContact})
  }
  catch(error){
    return res.status(500).send(error);
  }
}

let removeRequestContactSent = async(req, res) => {
  try{
    let removeReq = await contact.removeRequestContactSent(req.user._id, req.body.uid);
    res.status(200).send({status: !!removeReq})
  }
  catch(error){
    return res.status(500).send(error);
  }
}

let removeRequestContactReceived = async(req, res) => {
  try{
    let removeReq = await contact.removeRequestContactReceived(req.user._id, req.body.uid);
    res.status(200).send({status: !!removeReq})
  }
  catch(error){
    return res.status(500).send(error);
  }
}

let removeContact = async(req, res) => {
  try{
    let removeContact = await contact.removeContact(req.user._id, req.body.uid);
    res.status(200).send({status: !!removeContact})
  }
  catch(error){
    return res.status(500).send(error);
  }
}

let confirmRequestContactReceived = async(req, res) => {
  try{
    let confirmReq = await contact.confirmRequestContactReceived(req.user._id, req.body.uid);
    res.status(200).send(confirmReq)
  }
  catch(error){
    return res.status(500).send(error);
  }
}

let readMoreContacts = async(req, res) => {
  try {
    //get skip number from query
    let skipNumberContacts = +(req.body.skip);
    //get more item
    let newContactUsers = await contact.readMoreContacts(req.user._id, skipNumberContacts);
    res.status(200).send(newContactUsers)
  } catch (error) {
    res.status(500).send(error)
  }
}

let readMoreContactsSent = async(req, res) => {
  try {
    //get skip number from query
    let skipNumberContacts = +(req.body.skip);
    //get more item
    let newContactUsers = await contact.readMoreContactsSent(req.user._id, skipNumberContacts);
    res.status(200).send(newContactUsers)
  } catch (error) {
    res.status(500).send(error)
  }
}

let readMoreContactsReceived = async(req, res) => {
  try {
    //get skip number from query
    let skipNumberContacts = +(req.body.skip);
    //get more item
    let newContactUsers = await contact.readMoreContactsReceived(req.user._id, skipNumberContacts);
    res.status(200).send(newContactUsers)
  } catch (error) {
    res.status(500).send(error)
  }
}

let searchFriends = async(req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    erros.forEach(item => {
      errorArr.push(item.msg);
    });

  return res.status(500).send(errorArr)
  }

  try{
    let currentUserId = req.user._id;
    let keyword = req.params.keyword;

    let users = await contact.searchFriends(currentUserId, keyword);
    return res.status(200).send(users)
  }
  catch(error){
    res.status(500).send(error)
  }
}


module.exports = {
  findUser,
  listContacts,
  addNew,
  removeRequestContactSent,
  removeRequestContactReceived,
  removeContact,
  confirmRequestContactReceived,
  readMoreContacts,
  readMoreContactsSent,
  readMoreContactsReceived,
  searchFriends
};