import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Modal} from 'antd';
import * as actions from './../../../../actions/index';

function mapStateToProps(state) {
    return {
        socket : state.socket,
        chatVideo : state.chatVideo
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        openStream : (text, data) => {
            dispatch(actions.openStream(text, data))
        },
    }
}

class ModalCallVideo extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            data : {}
        }
    }
    hideModal = () => {
        this.props.socket.emit("listener-reject-request-call-to-server", this.state.data);
        this.setState({
            visible: false,
        });
    };
    handleAnswer = () => {
        console.log('answer')
        this.props.socket.emit("listener-accept-request-call-to-server", this.state.data);
        this.props.openStream("open-modal", this.state.data);
        this.setState({
            visible : false
        })
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.chatVideo.type === "listener"){
            if(nextProps.chatVideo.status === true){
                this.setState({
                    data: nextProps.chatVideo.data,
                    visible : true
                })
            }
            else if(nextProps.chatVideo.status === false){
                this.setState({
                    data: {},
                    visible : false
                })
            }
        }  
    }

    render() {
        return (
            <Modal
                title="Incoming video chat"
                centered
                visible={this.state.visible}
                onOk={this.handleAnswer}
                onCancel={this.hideModal}
                okText="Answer"
                cancelText="Decline"
                maskClosable={false}
                >
                <span><strong style={{fontWeight:"bold"}}>{this.state.data? this.state.data.callerName : ''}</strong> is calling</span>
            </Modal>
            );
    }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ModalCallVideo);
