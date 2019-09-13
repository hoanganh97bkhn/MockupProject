import ActiveAccountModel from './../../models/activeAccount';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';

let addNewContact = (io)=> {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentUserId, socket.id)

    socket.on("add-new-contact", (data) => {
      let currentUser = {
        _id: socket.request.user._id,
        nickname: socket.request.user.nickname,
        avatar: socket.request.user.avatar,
        content: "send you a friend invitation",
        isRead: false,
      };

      //emit notification "response-add-new-contact"
      if(clients[data.contactId]) {
        emitNotifyToArray(clients, data.contactId, io, "response-add-new-contact", currentUser);
      }
    });

    socket.on("disconnect", ()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);
    })
    console.log(clients);
  })
}

module.exports = addNewContact;
