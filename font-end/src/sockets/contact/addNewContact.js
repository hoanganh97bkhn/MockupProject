let addNewContact = (socket) => {
  socket.on('response-add-new-contact', (response) => { console.log(response); }); //lắng nghe khi có tin nhắn mới
}

module.exports = addNewContact;
