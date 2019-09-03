import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Input, message} from 'antd'
import { Picker, Emoji, getEmojiDataFromNative } from 'emoji-mart';
import * as actions from './../../../../actions/index';
import config from './../../../../config/index';
const {TextArea} = Input;

let ObjectSendMess = (data, id, avatar, name)=>{
    return {
        messageType : "text",
        senderId : id,
        sender : {
            avatar : avatar,
            name : name
        },
        text : data
    }
}
class RightWrite extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'',
            openMoji : false,
            newMessage : '',
            ObjectMessage : {}
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let index = nextProps.dataId
        if(this.state.ObjectMessage[index]){
            this.setState({
                newMessage : this.state.ObjectMessage[index]
            })
        }
        else {
            this.setState({
                ObjectMessage : {...this.state.ObjectMessage, [index] : ''},
                newMessage : ''
            })
        }
    }

    handleOpenMoji = () =>{
        this.setState({
            openMoji : true,
        },() => {
            document.addEventListener('click', this.handleCloseMoji);
        })
    }

    handleCloseMoji = () =>{
        this.setState({
            openMoji : false
        }, () => {
            document.removeEventListener('click', this.handleCloseMoji);
        })
    }
    
    addEmoji = (emoji)=>{
        let index = this.props.dataId;
        document.removeEventListener('click', this.handleCloseMoji);
        const { newMessage } = this.state;
        const text = `${newMessage}${emoji.native}`;
        this.setState({
            newMessage: text,
            ObjectMessage : {...this.state.ObjectMessage, [index] : text},
        });
    }
    
    handleInputChange = (e) => {
        let index = this.props.dataId;
        let data = {
            uid: index,
            isGroup : this.props.isGroup
        }
        this.props.socket.emit("user-is-typing",data);
        this.setState({
            newMessage: e.target.value,
            ObjectMessage : {...this.state.ObjectMessage, [index] : e.target.value},
        })
    }

    handleonBlur = () => {
        let index = this.props.dataId;
        let data = {
            uid: index,
            isGroup : this.props.isGroup
        }
        this.props.socket.emit("user-is-off-typing",data);
    }

    handleSendMessage = (e) =>{
        e.preventDefault();
        let user = this.props.user
        let index = this.props.dataId;
        
        //off typing
        let dataTyping = {
            uid: index,
            isGroup : this.props.isGroup
        }
        this.props.socket.emit("user-is-off-typing",dataTyping);

        //send -chat -realtime
        let messageVal = ObjectSendMess(this.state.newMessage, user._id, user.avatar, user.nickname);
        let data = {
            uid: index,
            messageVal : this.state.newMessage,
            isGroup : this.props.isGroup
        }
        if(this.state.newMessage !== ''){
            axios({
                url : `${config.baseUrl}/message/add-new-text-emoji`, 
                method :'POST',
                data : data
            })
            .then((res)=>{
                this.props.addListAllConversations(this.props.dataId, messageVal);
                this.props.addListGroupConversations(this.props.dataId, messageVal);
                this.props.addListUserConversations(this.props.dataId, messageVal);
                this.props.socket.emit("chat-text-emoji", {uid : this.props.dataId, messageVal : messageVal, isGroup : this.props.isGroup});
                this.setState({
                    newMessage : '',
                    ObjectMessage : {...this.state.ObjectMessage, [index] : ''},
                });
            })
            .catch((error)=>{
                message.error(error.response.statusText,5)
            })
        }
    }
    
    render() {
        return (
            <div className="write">
                <div className="row">
                    <div className="col-2 action-chat">
                        <i className="fa fa-photo"></i>
                        <i className="fa fa-paperclip"></i>
                        <i className="fa fa-video-camera"></i>
                    </div>
                    <div className="col-9"> 
                        <div className="write-chat">
                            <TextArea 
                                onPressEnter={this.handleSendMessage} 
                                rows={1} className="search-txt" 
                                value={this.state.newMessage} 
                                onChange={this.handleInputChange}
                                onBlur = {this.handleonBlur}/>
                            <i className="fa fa-smile-o" onClick={this.handleOpenMoji}></i>
                        </div>
                        <div onClick={this.handleOpenMoji}>{this.state.openMoji ? <Picker set="emojione" onSelect={this.addEmoji} onSkinChange={document.removeEventListener('click', this.handleCloseMoji)}/> : null}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fa fa-paper-plane" onClick={this.handleSendMessage}></i>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        socket : state.socket
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addListAllConversations : (id, data) => {
            dispatch(actions.addListAllConversations(id, data));
        },
        addListGroupConversations : (id, data) => {
            dispatch(actions.addListGroupConversations(id, data));
        },   
        addListUserConversations : (id, data) => {
            dispatch(actions.addListUserConversations(id, data));
        },    
        checkChangeListMessage : (data) => {
            dispatch(actions.checkChangeListMessage(data));
        },  
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(RightWrite);