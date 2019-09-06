/** export dispatch action video chat */
import Peer from 'peerjs';

export const videoChat = (socket, props) => {
  socket.on('server-send-listener-is-offline', (response) => {
    //offline
  });

  //peerId
  let getPeerId = "";
  const peer = new Peer({
    key : "peerjs",
    host: "peerjs-server-trungquandev.herokuapp.com",
    secure: true,
    port : 443,
    debug : 3
  });
  
  peer.on("open", function(peerId) {
    getPeerId = peerId;
  });

  //step 3 of listener
  socket.on('server-request-peer-id-of-listener', (response) => {
    console.log("step3")
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
    console.log("step5")
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
    props.openModalCaller(dataToEmit);
    

    /**view : caller would like cancel call
     * close modal call
     * emit event "cancel" to listener
     * /step 7 of caller  < cancel call ?     />
     * socket.emit("caller-cancel-request-call-to-server", dataToEmit);
     *  HANDLE IN MODAL CALL VIDEO .JSX
     */

     /** caller
     * step 12, listener reject to caller
     * close modal call
     * socket.on("server-send-reject-call-to-caller", response => {});
     */
    socket.on("server-send-reject-call-to-caller", response => {
      props.closeModalCaller(dataToEmit);
      alert("Client is busy!!!")
    })
  });

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
     * step 9 of listener  (cancel because caller cancel)
     * view cancel call 
     * close modal call
     * socket.on("server-send-cancel-request-call-to-listener", response => {});
    */
    socket.on("server-send-cancel-request-call-to-listener", response => {
      console.log('hello')
      props.closeModalListener();
    })
    
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

  /** caller
  * step 13
  * close modal call
  * show modal video
  */
  socket.on("server-send-accept-call-to-caller", response=>{
    props.closeModalCaller()
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

    getUserMedia({video: true, audio: true}, function(stream) {
      let call = peer.call(response.listenerPeerId, stream);

      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
  })
  
  /** listener
  * step 14
  * show modal video
  */
  socket.on("server-send-accept-call-to-listener", response=>{
    props.closeModalListener()
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

    peer.on('call', function(call) {
      getUserMedia({video: true, audio: true}, function(stream) {

        call.answer(stream);
         // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
          // Show stream in some video/canvas element.
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });
  })



}

