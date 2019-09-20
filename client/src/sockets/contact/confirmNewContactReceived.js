
/** export dispatch action add-new-contact */

export const confirmNewContactReceived = (socket,props) => {
  socket.on('response-confirm-request-contact-received', (response) => {
    props.removeListContactsSent(response);
    props.removeCountListContactsSent();
    props.addListContacts(response);
    props.addCountListContacts();
  }); //lắng nghe khi có tin nhắn mới
}

