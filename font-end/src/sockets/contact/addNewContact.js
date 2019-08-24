/** export dispatch action add-new-contact */

export const addNewContact = (socket,props) => {
  socket.on('response-add-new-contact', (response) => {props.ResAddNewContact(response)}); //lắng nghe khi có tin nhắn mới
}

