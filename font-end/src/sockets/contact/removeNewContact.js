
/** export dispatch action add-new-contact */

export const removeNewContact = (socket,props) => {
  socket.on('response-remove-request-contact', (response) => {props.ResRemoveNewContact(response)}); //lắng nghe khi có tin nhắn mới
}

