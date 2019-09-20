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

export const addMemberToGroup = (socket,props) => {
  socket.on('response-add-member-to-group', (response) => {
    socket.emit('confirm-created-group-chat-by-others', response.data);
    props.addListAllConversations(response.data);
    props.addListGroupConversations(response.data);
  }); //lắng nghe khi có tin nhắn mới
}

export const removeMemberToGroup = (socket,props) => {
  socket.on('response-remove-member-to-group', (response) => {
    socket.emit('confirm-remove-member-to-group', response.groupId);
    props.removeListAllConversations(response.groupId);
    props.removeListGroupConversations(response.groupId);
  }); //lắng nghe khi có tin nhắn mới
}

