import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Modal, Spin, Icon} from 'antd'

function mapStateToProps(state) {
    return {
        stream : state.stream,
        chatVideo : state.chatVideo,
        socket  : state.socket
    };
}
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class VideoCall extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            streamRemote : '',
            streamLocal : '',
            dataToEmit : '',
            openVideo : false
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.stream.text === "local-stream") {
            const vidLocal = document.getElementById("local-stream");
            if(vidLocal) {
                console.log("1")
                vidLocal.srcObject = nextProps.stream.data;
                vidLocal.onloadeddata = function(){
                    vidLocal.play();
                }
            }
            this.setState({
                streamLocal: nextProps.stream.data,
                visible : true,
                openVideo : true
            })
        }
        else if(nextProps.stream.text === "remote-stream") {
            const vidRemote = document.getElementById("remote-stream");
            if(vidRemote) {
                console.log('2')
                vidRemote.srcObject = nextProps.stream.data;
                vidRemote.onloadeddata = function(){
                    vidRemote.play();
                }
            }
            this.setState({
                streamRemote: nextProps.stream.data,
                visible : true,
                openVideo : true
            })
        }
        else if(nextProps.stream.text === "open-modal"){
            this.setState({
                dataToEmit : nextProps.stream.data,
                visible : true,
            })
        }
        else if(nextProps.stream.text === "connecting"){
            this.setState({
                openVideo : true
            })
        }
        else {
            this.setState({
                visible : false
            })
        }
    }

    handleCancel = () =>{
        this.props.socket.emit("caller-cancel-request-call-to-server", this.state.dataToEmit);
        this.state.streamLocal.getTracks().forEach(track => track.stop());
        this.state.streamRemote.getTracks().forEach(track => track.stop());
        this.setState({
            visible : false,
            streamRemote : '',
            streamLocal : '',
            dataToEmit : '',
            openVideo : false
        })
    }

    render() {
        return (
            <Modal
                title="Streaming Video & Audio"
                visible={this.state.visible}
                width={'70vw'}
                footer = {null}
                closable = {false}
                
                >
                    {!this.state.openVideo ?
                    <div style={{textAlign:'center'}}><Spin indicator={antIcon}/></div>:
                    <div>
                        <div style={{textAlign:'start'}}>
                            <video 
                                id="remote-stream" 
                                width="650" 
                                height="450" 
                                controls 
                                style={{marginLeft : '15%'}}
                                type="video/mp4">
                                
                            </video>
                            <br></br>
                        </div>
                        <div>
                            <video
                                id="local-stream" 
                                width="200" 
                                height="150" 
                                controls 
                                style={{marginLeft : '15%'}}
                                type="video/mp4"
                                >
                            </video>
                            <br></br>
                        </div>
                    </div>
                    }
                    <div style={{textAlign : 'center', marginTop : '15px'}}>
                        <a className="lgscreenphone phonelink" 
                            onClick={this.handleCancel} 
                            title="Cancel">
                            <img className="phoneicon" src="https://freeiconshop.com/wp-content/uploads/edd/cross-flat.png"></img>
                        </a>
                    </div>
            </Modal>
        );
    }
}

export default connect(
  mapStateToProps,
)(withRouter(VideoCall));
