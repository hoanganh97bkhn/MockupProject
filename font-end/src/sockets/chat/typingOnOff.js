/** export dispatch action typin-on-off */

export const typingOn = (socket,props) => {
  socket.on('response-user-is-typing-on', (response) => {
    console.log("on", response.currentUserId)
    props.addOnTyping(response.currentUserId);
  }); //lắng nghe khi có tin nhắn mới
}

export const typingOff = (socket,props) => {
  socket.on('response-user-is-typing-off', (response) => {
    console.log("off", response.currentUserId)
    props.removeOnTyping(response.currentUserId);
  }); //lắng nghe khi có tin nhắn mới
}

