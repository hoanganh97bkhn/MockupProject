
/** export dispatch action add-new-contact */

export const removeNewContactSent = (socket,props) => {
  socket.on('response-remove-request-contact-sent', (response) => {
    props.removeListContactsReceived(response);
    props.removeCountListContactsReceived();
  }); //lắng nghe khi có tin nhắn mới
}

