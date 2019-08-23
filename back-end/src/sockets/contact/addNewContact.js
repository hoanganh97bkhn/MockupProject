let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    if(clients[currentUserId]) {
      clients[currentUserId].push(socket.id);
    } else {
      clients[currentUserId] = [socket.id];
    }

    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        nickname: socket.request.user.nickname,
        avatar: socket.request.user.avatar
      };

      //emit notification
      if(clients[data.contactId]) {
        clients[data.contactId].forEach(sockeId => {
          io.sockets.connected[sockeId].emit("response-add-new-contact", currentUser);
        });
      }
    });

    socket.on("disconnect", ()=>{
      //remove socketId
      clients[currentUserId] = clients[currentUserId].filter(socketId => {
        return socketId !== socket.id;
      });
      if(!clients[currentUserId].length){
        delete clients[currentUserId]
      }
      console.log(clients);
    })
    console.log(clients);
  })
}

module.exports = addNewContact;
