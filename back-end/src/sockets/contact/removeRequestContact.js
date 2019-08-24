import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';


let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentUserId, socket.id)

    socket.on("remove-request-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        nickname: socket.request.user.nickname,
        avatar: socket.request.user.avatar
      };

      //emit notification
      if(clients[data.contactId]) {
        emitNotifyToArray(clients, data.contactId, io, "response-remove-request-contact", currentUser);
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
