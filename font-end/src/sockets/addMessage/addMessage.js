/** export dispatch action add-new-contact */

export const addMessageAfterConfirmFriend = (socket,props) => {
  socket.on('response-add-message-after-confirm-friend', (response) => {
    props.addListUserConversations(response);
    props.addListAllConversations(response);
  }); //lắng nghe khi có tin nhắn mới
}

export const addMessageAfterCreateGroup = (socket,props) => {
  socket.on('response-add-message-after-create-group-chat', (response) => {
    socket.emit('confirm-created-group-chat-by-others', response);
    props.addListAllConversations(response);
    props.addListGroupConversations(response);
  }); //lắng nghe khi có tin nhắn mới
}

