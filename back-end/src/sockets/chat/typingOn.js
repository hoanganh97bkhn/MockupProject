import ActiveAccountModel from './../../models/activeAccount';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';
import _ from 'lodash';

let typingOn = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    let arrayGroupId = socket.request.groupId
    clients = pushSocketIdToArray(clients, currentUserId, socket.id);
    arrayGroupId.forEach((grId)=>{
      clients = pushSocketIdToArray(clients, grId._id, socket.id);
    })

    socket.on("user-is-typing", (data) => {
      if(data.isGroup) {
        let response = {
          currentUserId : data.uid,
        };
        //emit notification "response-chat-text-emoji"
        if(clients[data.uid]) {
          let arrayEmitGroup = clients[data.uid].filter((item)=>{
            return item !== socket.id
          });
          arrayEmitGroup.forEach((socketId)=>{
            io.sockets.connected[socketId].emit("response-user-is-typing-on", response);
          })
        }
      } else {
        let response = {
          currentUserId : socket.request.user._id,
        };

        //emit notification "response-chat-text-emoji"
        if(clients[data.uid]) {
          emitNotifyToArray(clients, data.uid, io, "response-user-is-typing-on", response);
        }
      }
    });

    socket.on("disconnect", async()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);
      arrayGroupId.forEach((grId)=>{
        clients = removeSocketIdFromArray(clients, grId._id, socket);
      })
       //save active to database
      await ActiveAccountModel.updateTimeOffline(socket.request.user._id);

    })
    console.log(clients);
  })
}

module.exports = typingOn;
