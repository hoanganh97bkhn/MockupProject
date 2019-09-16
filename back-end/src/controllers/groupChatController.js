import {groupChat} from './../services/index';
import { validationResult } from 'express-validator/check';
import { stat } from 'fs';

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

let listMembers = async(req, res) => {
  try {
    let data = await groupChat.listMembers(req.user._id, req.query.groupId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error)
  }
}

let addNewMember = async(req, res) => {
  try {
    let status = await groupChat.addNewMember(req.body.groupId, req.body.memeberId);
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send(error)
  }
}

let removeMember = async(req, res) => {
  try {
    let status = await groupChat.removeMember(req.body.groupId, req.body.memeberId);
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send(error)
  }
}

let leaveGroup = async(req, res) => {
  try {
    let status = await groupChat.leaveGroup(req.body.data, req.user._id);
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  addNewGroup,
  listMembers,
  addNewMember,
  removeMember,
  leaveGroup
}