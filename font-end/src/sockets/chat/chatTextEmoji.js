/** export dispatch action add-new-contact */

export const chatTextEmoji = (socket,props) => {
  socket.on('response-chat-text-emoji', (response) => {
    props.changeListAllConversations(response.currentUserId, response.message);
    props.changeListGroupConversations(response.currentUserId, response.message);
    props.changeListUserConversations(response.currentUserId, response.message);
  }); //lắng nghe khi có tin nhắn mới
}

