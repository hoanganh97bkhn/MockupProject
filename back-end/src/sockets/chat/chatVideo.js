import ActiveAccountModel from './../../models/activeAccount';
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';
import _ from 'lodash';

let chatVideo = (io)=> {
  let clients = {};
  io.on("connection", (socket) => {

    // push socket id to array
    let currentUserId = socket.request.user._id;
    let arrayGroupId = socket.request.groupId
    clients = pushSocketIdToArray(clients, currentUserId, socket.id);
    arrayGroupId.forEach((grId)=>{
      clients = pushSocketIdToArray(clients, grId._id, socket.id);
    })

    /**
     * check on-offline
     * online: send req to listener: get peerId
     */
    socket.on("caller-check-listener-online-or-not", (data) => {
      if(clients[data.listenerId]){
        //online
        let response = {
          callerId: socket.request.user._id,
          listenerId : data.listenerId,
          callerName : data.callerName,
          listenerName : data.listenerName,
        };

        emitNotifyToArray(clients, data.listenerId, io, "server-request-peer-id-of-listener", response);
      } else {
        //offline
        socket.emit("server-send-listener-is-offline");

      }
    });

    /**
     * on:                  get peerId from listener success!
     * emit-to-caller:      send peerId to caller
     */
    socket.on("listener-emit-peer-id-to-server", (data) => {
      let response = {
        callerId : data.callerId,
        listenerId : data.listenerId,
        callerName : data.callerName,
        listenerName : data.listenerName,
        listenerPeerId : data.listenerPeerId
      };
      if(clients[data.callerId]){
        emitNotifyToArray(clients, data.callerId, io, "server-send-peer-id-of-listener-to-caller", response);
      }
      
    });

    /**
     * on:                caller request call with listener
     * emit-to-listener:  server-send-request call to listener
     */
    socket.on("caller-request-call-to-server", (data) => {
      let response = {
        callerId : data.callerId,
        listenerId : data.listenerId,
        callerName : data.callerName,
        listenerName : data.listenerName,
        listenerPeerId : data.listenerPeerId
      };
      if(clients[data.listenerId]){
        emitNotifyToArray(clients, data.listenerId, io, "server-send-request-call-to-listener", response);
      }
    });

    /**
     * on:                caller request cancel call
     * emit-to-listener:  server send request cancel to listener
     */
    socket.on("caller-cancel-request-call-to-server", (data) => {
      console.log('=====')
      let response = {
        callerId : data.callerId,
        listenerId : data.listenerId,
        callerName : data.callerName,
        listenerName : data.listenerName,
        listenerPeerId : data.listenerPeerId
      };
      if(clients[data.listenerId]){
        emitNotifyToArray(clients, data.listenerId, io, "server-send-cancel-request-call-to-listener", response);
      }
    });

    /**
     * on:                listener request reject call
     * emit-to-caller:    server send request reject to caller
     */
    socket.on("listener-reject-request-call-to-server", (data) => {
      let response = {
        callerId : data.callerId,
        listenerId : data.listenerId,
        callerName : data.callerName,
        listenerName : data.listenerName,
        listenerPeerId : data.listenerPeerId
      };
      if(clients[data.callerId]){
        emitNotifyToArray(clients, data.callerId, io, "server-send-reject-call-to-caller", response);
      }
    });

    /**
     * on:                            listener accept request call to server
     * emit-to-caller & listener :    server send request accept to 2 client
     */
    socket.on("listener-accept-request-call-to-server", (data) => {
      let response = {
        callerId : data.callerId,
        listenerId : data.listenerId,
        callerName : data.callerName,
        listenerName : data.listenerName,
        listenerPeerId : data.listenerPeerId
      };
      if(clients[data.callerId]){
        emitNotifyToArray(clients, data.callerId, io, "server-send-accept-call-to-caller", response);
      }
      if(clients[data.listenerId]){
        emitNotifyToArray(clients, data.listenerId, io, "server-send-accept-call-to-listener", response);
      }
    });

    /**
     * end call {caller-listener}
     */
    socket.on("request-end-call-to-server", (data) => {
      let response = {
        callerId : data.callerId,
        listenerId : data.listenerId,
        callerName : data.callerName,
        listenerName : data.listenerName,
        listenerPeerId : data.listenerPeerId
      };
      if(clients[data.callerId]){
        emitNotifyToArray(clients, data.callerId, io, "server-send-end-call", response);
      }
      if(clients[data.listenerId]){
        emitNotifyToArray(clients, data.listenerId, io, "server-send-end-call", response);
      }
    })

    

    socket.on("disconnect", ()=>{
      //remove socketId
      clients = removeSocketIdFromArray(clients, currentUserId, socket);
      arrayGroupId.forEach((grId)=>{
        clients = removeSocketIdFromArray(clients, grId._id, socket);
      })
    })
    console.log(clients);
  })
}

module.exports = chatVideo;
