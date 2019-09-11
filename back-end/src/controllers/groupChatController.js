import {groupChat} from './../services/index';
import { validationResult } from 'express-validator/check';

let addNewGroup = async(req, res) => {
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
    let arrayMemberIds = req.body.arrayIds;
    let groupChatName = req.body.groupChatName;

    let newGroupChat = await groupChat.addNewGroup(currentUserId, arrayMemberIds, groupChatName);
    newGroupChat = newGroupChat.toObject();
    newGroupChat.messages = [];
    return res.status(200).send(newGroupChat);
  }
  catch(error){
    res.status(500).send(error)
  }
}

module.exports = {
  addNewGroup,
}