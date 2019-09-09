/** export dispatch action add-new-contact */

export const userStatus = (socket,props) => {
  socket.on('server-send-list-user-online', (response) => {
    props.setUserOnline(response)
  }); //lắng nghe khi có tin nhắn mới
}

