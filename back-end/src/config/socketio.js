import UserModel from "./../models/userModel";
import jwt_decode from 'jwt-decode';

let configSocketIo = (io) =>{
  io.use((socket, next) => {
    let token = socket.request._query.token;
    if(token === "") return next()
    const jwt_payload = jwt_decode(token);
    UserModel.findById(jwt_payload.id)
      .then(user => {
          if(user) {
            socket.request.user = user;
            next();
          }
      })
      .catch(err => console.error(err));
  });
}

module.exports = configSocketIo;