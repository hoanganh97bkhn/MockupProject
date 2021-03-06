import UserModel from './../../models/userModel';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper'; 
import _ from 'lodash';

let addMessage = (io)=> {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    let arrayGroupId = socket.request.groupId
    clients = pushSocketIdToArray(clients, currentUserId, socket.id);
    arrayGroupId.forEach((grId)=>{
      clients = pushSocketIdToArray(clients, grId._id, socket.id);
    })

    socket.on("add-message-after-confirm-friend", async(data) => {
      let getUserContact = await UserModel.getNormalUserDataById(socket.request.user._id);
      getUserContact = getUserContact.toObject();
      getUserContact.updatedAt = data.updatedAt;
      getUserContact.messages = [];

      //emit notification "response-add-message-after-confirm-friend"
      if(clients[data.uid]) {
        emitNotifyToArray(clients, data.uid, io, "response-add-message-after-confirm-friend", getUserContact);
      }
    });

    socket.on("add-message-after-create-group-chat", (data) => {
      //emit notification "response-create-group-chat"
      _.remove(data.members, (item) => {
        return item.userId == socket.request.user._id;
      });

      data.members.forEach((member)=>{
        if(clients[member.userId]) {
          emitNotifyToArray(clients, member.userId, io, "response-add-message-after-create-group-chat", data);
        }
      });
    });

    //remove contact
    socket.on("remove-message-after-delete-friend", async(data) => {
      //emit notification "response-remove-message-after-delete-friend"
      if(clients[data.contactId]) {
        emitNotifyToArray(clients, data.contactId, io, "response-remove-message-after-delete-friend", data.contactId);
      }
    });

    socket.on("add-member-to-group", (data) => {
      //emit notification "response-add-member-to-group"
      if(clients[data.uid]) {
        emitNotifyToArray(clients, data.uid, io, "response-add-member-to-group", data);
      }
    });

    socket.on("remove-member-to-group", (data) => {
      if(clients[data.uid]) {
        emitNotifyToArray(clients, data.uid, io, "response-remove-member-to-group", data);
      }
    });

    socket.on("disconnect", async()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);
      arrayGroupId.forEach((grId)=>{
        clients = removeSocketIdFromArray(clients, grId._id, socket);
      })
       

    })
    console.log(clients);
  })
}

module.exports = addMessage;
