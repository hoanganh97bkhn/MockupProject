/** export dispatch action video chat */
import Peer from 'peerjs';
import {notification} from 'antd';
import request from 'request';

let getICETurnServer = () => {
  return new Promise(async(resolve, reject)=>{
    // Node Get ICE STUN and TURN list
    let o = {
      format: "urls"
    };

    let bodyString = JSON.stringify(o);
    
    let options = {
      url : 'https://global.xirsys.net/_turn/MockProject',
      method: "PUT",
      headers: {
        "Authorization": "Basic " + Buffer.from("HoangAnh:c53ffbc0-d1ef-11e9-8e1d-0242ac110007").toString("base64"),
        "Content-Type": "application/json",
        "Content-Length": bodyString.length
      }
    };

    // call a request to get ICE list of turn server
    request(options, function(error, response, body){
      if(error){
        console.log('error')
        return reject(error)
      }
      let bodyJson = JSON.parse(body);
      resolve(bodyJson.v.iceServers);
    })
  })
}

export const videoChat = async(socket, props) => {
  
  socket.on('server-send-listener-is-offline', (response) => {
    //offline
    openNotificationOffline('error');
  });

  // get ICE turn server
  let iceServerList = await getICETurnServer();
  
  //peerId
  let getPeerId = "";
  const peer = new Peer({
    key : "peerjs",
    host: "peerjs-server-trungquandev.herokuapp.com",
    secure: true,
    port : 443,
    config : iceServerList 
  });
  
  peer.on("open", function(peerId) {
    getPeerId = peerId;
  });

  //step 3 of listener
  socket.on('server-request-peer-id-of-listener', (response) => {
    let dataToEmit = {
      callerId : response.callerId,
      listenerId : response.listenerId,
      callerName : response.callerName,
      listenerName : response.listenerName,
      listenerPeerId : getPeerId
    };

    //step 4 of listener
    socket.emit("listener-emit-peer-id-to-server", dataToEmit);
  });

  //step 5 of caller
  socket.on("server-send-peer-id-of-listener-to-caller", (response) => {
    let dataToEmit = {
      callerId : response.callerId,
      listenerId : response.listenerId,
      callerName : response.callerName,
      listenerName : response.listenerName,
      listenerPeerId : response.listenerPeerId
    };

    //step 6 of caller
    /** view open modal caller
    *  caller is calling
    */
    socket.emit("caller-request-call-to-server", dataToEmit);
    props.openStream("open-modal", dataToEmit);
    

    /**view : caller would like cancel call
     * close modal call
     * emit event "cancel" to listener
     * /step 7 of caller  < cancel call ?     />
     * socket.emit("caller-cancel-request-call-to-server", dataToEmit);
     *  HANDLE IN MODAL CALL VIDEO .JSX
     */
  });

  /** caller
     * step 12, listener reject to caller
     * close modal call
     * socket.on("server-send-reject-call-to-caller", response => {});
     */
    socket.on("server-send-reject-call-to-caller", response => {
      props.closeStream();
      openNotificationBusy('error');
    })

  //step 8 of listener request call
  /**view request call 
   * open modal call
  */
  socket.on("server-send-request-call-to-listener", response => {
    let dataToEmit = {
      callerId : response.callerId,
      listenerId : response.listenerId,
      callerName : response.callerName,
      listenerName : response.listenerName,
      listenerPeerId : response.listenerPeerId
    };
    props.openModalListener(dataToEmit);
    
      /**
     * step 10 of listener   (cancel because listener cancel)
     * listener reject request call to server
     * close modal call
     * socket.emit("listener-reject-request-call-to-server", dataToEmit);
     * HANDLE MODAL_CALL_VIDEO.JSX
     */

     /**
     * step 11 of listener   (accept because listener )
     * listener accept request call to server
     * close modal call
     * HANDLE MODAL_CALL_VIDEO.JSX
     */
    
  });

  /**
     * step 9 of listener  (cancel because caller cancel)
     * view cancel call 
     * close modal call
     * socket.on("server-send-cancel-request-call-to-listener", response => {});
    */
   socket.on("server-send-cancel-request-call-to-listener", response => {
    props.closeModalListener();
  })

  /** caller
  * step 13
  * close modal call
  * show modal video
  */
  socket.on("server-send-accept-call-to-caller", function(response){
    console.log('close modal caller')
    props.closeModalCaller();
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);
    getUserMedia({video: true, audio: true}, function(stream) {
      props.openStream("local-stream",stream);

      let call = peer.call(response.listenerPeerId, stream);

      call.on('stream', function(remoteStream) {
        props.openStream("remote-stream",remoteStream);
      });

      //stop stream
      socket.on("server-send-end-call", response=>{
        stopStream(stream);
        props.closeStream();
      })
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
  })
  
  /** listener
  * step 14
  * show modal video
  */
  socket.on("server-send-accept-call-to-listener", function(response){
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

    peer.on('call', function(call) {
      getUserMedia({video: true, audio: true}, function(stream) {
        props.openStream("local-stream",stream);

        call.answer(stream);
         // Answer the call with an A/V stream.

        call.on('stream', function(remoteStream) {
          // Show stream in some video/canvas element.
          props.openStream("remote-stream",remoteStream);
        });

        //stop stream
        socket.on("server-send-end-call", response=>{
          stopStream(stream);
          props.closeStream();
        })
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });
  })

  /**
   * end call
   */

  const openNotificationBusy = type => {
    notification[type]({
      message: 'Notification',
      description:
        'Client is busy!!!',
      duration: 5
    });
  };
  
  const openNotificationOffline = type => {
    notification[type]({
      message: 'Notification',
      description:
        'Client is busy!!!',
      duration: 5
    });
  };
  
  function stopStream (stream){
    return stream.getTracks().forEach(track => track.stop());
  }

}

