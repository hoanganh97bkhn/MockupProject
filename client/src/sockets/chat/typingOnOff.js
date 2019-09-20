/** export dispatch action typin-on-off */

export const typingOn = (socket,props) => {
  socket.on('response-user-is-typing-on', (response) => {
    props.addOnTyping(response.currentUserId);
  }); //lắng nghe khi có tin nhắn mới
}

export const typingOff = (socket,props) => {
  socket.on('response-user-is-typing-off', (response) => {
    props.removeOnTyping(response.currentUserId);
  }); //lắng nghe khi có tin nhắn mới
}

