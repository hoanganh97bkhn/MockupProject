import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Input} from 'antd'
import { Picker, Emoji, getEmojiDataFromNative } from 'emoji-mart';
import * as actions from './../../../../actions/index';
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
        this.setState({
            newMessage: e.target.value,
            ObjectMessage : {...this.state.ObjectMessage, [index] : e.target.value},
        })
    }
    handleSendMessage = (e) =>{
        e.preventDefault();
        let user = this.props.user
        let index = this.props.dataId;
        this.props.addListAllConversationWithMessages(this.props.dataId, ObjectSendMess(this.state.newMessage,user._id,user.avatar,user.nickname));
        this.props.handleChangeSendMess(ObjectSendMess(this.state.newMessage,user._id,user.avatar,user.nickname));
        this.setState({
            newMessage : '',
            ObjectMessage : {...this.state.ObjectMessage, [index] : ''},
        });
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
                        <div className="write-chat ">
                            <TextArea 
                                onPressEnter={this.handleSendMessage} 
                                rows={1} className="search-txt" 
                                value={this.state.newMessage} 
                                onChange={this.handleInputChange}/>
                            <i className="fa fa-smile-o" onClick={this.handleOpenMoji}></i>
                        </div>
                        <div onClick={this.handleOpenMoji}>{this.state.openMoji ? <Picker set="emojione" onSelect={this.addEmoji} onSkinChange={document.removeEventListener('click', this.handleCloseMoji)}/> : null}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fa fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user : state.user
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addListAllConversationWithMessages : (id, data) => {
            dispatch(actions.addListAllConversationWithMessages(id, data));
        },   
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(RightWrite);