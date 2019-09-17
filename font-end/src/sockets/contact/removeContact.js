
/** export dispatch action remove-contact */

export const removeContact = (socket,props) => {
  socket.on('response-remove-contact', (response) => {
    props.removeListContacts(response);
    props.removeCountListContacts();
    props.removeListAllConversations(response._id);
    props.removeListUserConversations(response._id);
  }); //lắng nghe khi có tin nhắn mới
}

