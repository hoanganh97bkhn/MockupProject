import ActiveAccountModel from './../../models/activeAccount';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';

let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentUserId, socket.id)

    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
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

    socket.on("disconnect", async()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);

       //save active to database
      await ActiveAccountModel.updateTimeOffline(socket.request.user._id);

    })
    console.log(clients);
  })
}

module.exports = addNewContact;
