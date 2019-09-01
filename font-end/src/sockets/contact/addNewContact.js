/** export dispatch action add-new-contact */

export const addNewContact = (socket,props) => {
  socket.on('response-add-new-contact', (response) => {
    props.addListContactsReceived(response);
    props.addCountListContactsReceived(response);
  }); //lắng nghe khi có tin nhắn mới
}

