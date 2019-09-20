import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';

let confirmRequestContactReceived = (io)=> {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentUserId, socket.id)

    socket.on("confirm-request-contact-received", (data) => {
      let currentUser = {
        _id: socket.request.user._id,
        nickname: socket.request.user.nickname,
        avatar: socket.request.user.avatar,
        content: "accepted the friend request",
        isRead: false,
      };

      //emit notification "response-add-new-contact"
      if(clients[data.contactId]) {
        emitNotifyToArray(clients, data.contactId, io, "response-confirm-request-contact-received", currentUser);
      }
    });

    socket.on("disconnect", ()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);
    })
    console.log(clients);
  })
}

module.exports = confirmRequestContactReceived;
