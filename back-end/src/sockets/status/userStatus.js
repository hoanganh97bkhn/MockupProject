import ActiveAccountModel from './../../models/activeAccount';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';
import _ from 'lodash';

let userStatus = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    let arrayGroupId = socket.request.groupId
    clients = pushSocketIdToArray(clients, currentUserId, socket.id);
    arrayGroupId.forEach((grId)=>{
      clients = pushSocketIdToArray(clients, grId._id, socket.id);
    })

    let listUserOnline = Object.keys(clients)
    //step 1: emit to user after login or f5 page
    socket.emit("server-send-list-user-online", listUserOnline);

    //step 2: emit to all another users when has new online
    socket.broadcast.emit("server-send-list-user-online", listUserOnline);

    socket.on("disconnect", async()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);
      arrayGroupId.forEach((grId)=>{
        clients = removeSocketIdFromArray(clients, grId._id, socket);
      })

      let listUserOnlineAfterDis = Object.keys(clients);
      //step 3: emit to all another users when has new offline
      socket.broadcast.emit("server-send-list-user-online", listUserOnlineAfterDis);

       //save active to database
      await ActiveAccountModel.updateTimeOffline(socket.request.user._id);

    })
    console.log(clients);
  })
}

module.exports = userStatus;
