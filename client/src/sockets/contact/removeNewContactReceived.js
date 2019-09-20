
/** export dispatch action remove-new-contact- received */

export const removeNewContactReceived = (socket,props) => {
  socket.on('response-remove-request-contact-received', (response) => {
    props.removeListContactsSent(response);
    props.removeCountListContactsSent();
  }); //lắng nghe khi có tin nhắn mới
}

