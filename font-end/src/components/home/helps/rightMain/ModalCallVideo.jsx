import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from './../../../../actions/index';

function mapStateToProps(state) {
    return {
        socket : state.socket,
        chatVideo : state.chatVideo
    };
}

class ModalCallVideo extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.chatVideo.data;
        const socket = nextProps.socket;
        let timerInterval;
        if(nextProps.chatVideo.status){
            if(nextProps.chatVideo.type === 'listener'){
                Swal.fire({
                    title : `Calling from &nbsp <span style="color : #2ECC71">${data.callerName}</span> &nbsp <i class="fas fa-phone-volume"></i>...`,
                    html : `time : <strong style="color: #d43f3a;"></strong> seconds <br/> <br/>
                            <button id="btn-cancel-call" class="btn btn-danger">
                            Cancel
                            </button>
                            <button id="btn-accept-call" class="btn btn-success">
                            Accept
                            </button> `,
                    backdrop: "rgba(85,85,85,0.4)",
                    width: "50rem",
                    allowOutsideClick: false,
                    timer: 3000,
                    onBeforeOpen: () => {
                        document.getElementById("btn-cancel-call").addEventListener("click", function(){
                            Swal.close();
                            clearInterval(timerInterval);
                            socket.emit("listener-reject-request-call-to-server", data)
                        });

                        document.getElementById("btn-accept-call").addEventListener("click", function(){
                            Swal.close();
                            clearInterval(timerInterval);
                            socket.emit("listener-accept-request-call-to-server", data);
                        });

                        timerInterval = setInterval(()=>{
                            if(Swal.getContent() !== null){
                                Swal.showLoading();
                                Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft()/1000);
                            } 
                        }, 1000);
                    },
                    onClose: ()=>{
                        clearImmediate(timerInterval);
                    }
                }).then((result) => {
                    return false;
                })
            }
        }
        else {
            Swal.close();
            clearInterval(timerInterval);
        }
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default connect(
  mapStateToProps,
)(ModalCallVideo);
