import UserModel from "./../models/userModel";
import ChatGroupModel from './../models/chatGroupModel';
import jwt_decode from 'jwt-decode';

let configSocketIo = (io) =>{
  io.use((socket, next) => {
    let token = socket.request._query.token;
    if(token === "") return next()
    const jwt_payload = jwt_decode(token);
    UserModel.findById(jwt_payload.id ,{"local.password" : 0})
      .then( async (user) => {
          if(user) {
            let groupId = await ChatGroupModel.getChatGroupIdByUser(user._id)
            socket.request.user = user;
            socket.request.groupId = groupId;
            next();
          }
      })
      .catch(err => console.error(err));
  });
}

module.exports = configSocketIo;