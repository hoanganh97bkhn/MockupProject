/** export dispatch action add-new-contact */

export const chatTextEmoji = (socket,props) => {
  socket.on('response-chat-text-emoji', (response) => {
    props.addListAllConversations(response.currentUserId, response.message);
    props.addListGroupConversations(response.currentUserId, response.message);
    props.addListUserConversations(response.currentUserId, response.message);
  }); //lắng nghe khi có tin nhắn mới
}

