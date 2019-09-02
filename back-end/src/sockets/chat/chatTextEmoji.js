import ActiveAccountModel from './../../models/activeAccount';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';

let chatTextEmoji = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentUserId, socket.id)

    socket.on("chat-text-emoji", (data) => {
      if(data.isGroup) {
        let response = {
          currentGroupId : data.uid,
          currentUserId : socket.request.user._id,
          message : data.messageVal
        };

        //emit notification "response-chat-text-emoji"
        if(clients[data.uid]) {
          emitNotifyToArray(clients, data.uid, io, "response-chat-text-emoji", response);
        }
      } else {
        let response = {
          currentUserId : socket.request.user._id,
          message : data.messageVal
        };

        //emit notification "response-chat-text-emoji"
        if(clients[data.uid]) {
          emitNotifyToArray(clients, data.uid, io, "response-chat-text-emoji", response);
        }
      }
    });

    socket.on("disconnect", async()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);

       //save active to database
      await ActiveAccountModel.updateTimeOffline(socket.request.user._id);

    })
    console.log(clients);
  })
}

module.exports = chatTextEmoji;
