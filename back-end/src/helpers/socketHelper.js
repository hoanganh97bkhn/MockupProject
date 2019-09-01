export let pushSocketIdToArray = (clients, userId, socketId) => {
  if(clients[userId]){
    clients[userId].push(socketId);
  } else{
    clients[userId] = [socketId];
  }
  return clients
};

export let emitNotifyToArray = (clients, userId, io, eventName, data) => {
    clients[userId].forEach(sockeId => {
    io.sockets.connected[sockeId].emit(eventName, data);
  });
};

export let removeSocketIdFromArray = (clients, userId, socket) => {
  //remove socketId
  clients[userId] = clients[userId].filter(socketId => {
    return socketId !== socket.id;
  });
  if(!clients[userId].length){
    delete clients[userId]
  }
  return clients
};