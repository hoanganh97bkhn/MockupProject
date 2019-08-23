let addNewContact = (io) => {
  io.on("connection", (socket) => {
    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        nickname: socket.request.user.nickname,
        avatar: socket.request.user.avatar
      };
      io.sockets.emit("response-add-new-contact",currentUser);
    })
  })
}

module.exports = addNewContact;
